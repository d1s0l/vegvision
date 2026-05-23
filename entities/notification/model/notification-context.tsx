"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getNotifications } from "../api/notifications-api";
import type {
  Notification,
  NotificationToastItem,
} from "./types";

const POLLING_INTERVAL = 30000;
const MAX_VISIBLE_TOASTS = 3;

interface NotificationContextValue {
  notifications: Notification[];
  visibleToasts: NotificationToastItem[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissToast: (toastId: string) => void;
  refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

interface NotificationProviderProps {
  children: ReactNode;
}

function mergeNotifications(
  current: Notification[],
  incoming: Notification[],
) {
  const currentById = new Map(current.map((item) => [item.id, item]));
  const nextItems = incoming.map((item) => ({
    ...item,
    isRead: currentById.get(item.id)?.isRead ?? item.isRead,
  }));

  return nextItems.sort(
    (left, right) =>
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [visibleToasts, setVisibleToasts] = useState<NotificationToastItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const knownIdsRef = useRef<Set<string>>(new Set());
  const isInitializedRef = useRef(false);
  const toastQueueRef = useRef<NotificationToastItem[]>([]);

  const enqueueToast = useCallback((notification: Notification) => {
    const toastItem: NotificationToastItem = {
      ...notification,
      toastId: `${notification.id}-${Date.now()}`,
    };

    setVisibleToasts((current) => {
      if (current.length < MAX_VISIBLE_TOASTS) {
        return [...current, toastItem];
      }

      toastQueueRef.current = [...toastQueueRef.current, toastItem];
      return current;
    });
  }, []);

  const refreshNotifications = useCallback(async () => {
    const incoming = await getNotifications();

    setNotifications((current) => {
      const next = mergeNotifications(current, incoming);
      const freshItems = next.filter((item) => !knownIdsRef.current.has(item.id));

      knownIdsRef.current = new Set(next.map((item) => item.id));

      if (isInitializedRef.current) {
        freshItems.forEach(enqueueToast);
      } else {
        isInitializedRef.current = true;
      }

      return next;
    });

    setIsLoading(false);
  }, [enqueueToast]);

  useEffect(() => {
    const controller = new AbortController();

    getNotifications(controller.signal)
      .then((incoming) => {
        const next = incoming.sort(
          (left, right) =>
            new Date(right.createdAt).getTime() -
            new Date(left.createdAt).getTime(),
        );

        knownIdsRef.current = new Set(next.map((item) => item.id));
        isInitializedRef.current = true;
        setNotifications(next);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      refreshNotifications().catch(() => setIsLoading(false));
    }, POLLING_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [refreshNotifications]);

  const markAsRead = useCallback((id: string) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              isRead: true,
            }
          : item,
      ),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        isRead: true,
      })),
    );
  }, []);

  const dismissToast = useCallback((toastId: string) => {
    setVisibleToasts((current) => {
      const filteredToasts = current.filter((item) => item.toastId !== toastId);
      const [nextToast, ...restQueue] = toastQueueRef.current;

      if (nextToast && filteredToasts.length < MAX_VISIBLE_TOASTS) {
        toastQueueRef.current = restQueue;
        return [...filteredToasts, nextToast];
      }

      return filteredToasts;
    });
  }, []);

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  const value = useMemo(
    () => ({
      notifications,
      visibleToasts,
      unreadCount,
      isLoading,
      markAsRead,
      markAllAsRead,
      dismissToast,
      refreshNotifications,
    }),
    [
      notifications,
      visibleToasts,
      unreadCount,
      isLoading,
      markAsRead,
      markAllAsRead,
      dismissToast,
      refreshNotifications,
    ],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotifications должен использоваться внутри NotificationProvider");
  }

  return context;
}
