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

const POLLING_INTERVAL = 1000 * 60 * 10;
const MAX_VISIBLE_TOASTS = 3;
const READ_NOTIFICATIONS_KEY = "read_notification_ids";

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
  localReadIds: Set<string>,
) {
  const currentById = new Map(current.map((item) => [item.id, item]));
  const nextItems = incoming.map((item) => ({
    ...item,
    isRead: localReadIds.has(item.id) || currentById.get(item.id)?.isRead || item.isRead,
  }));

  return nextItems.sort(
    (left, right) =>
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

function readStoredNotificationIds() {
  if (typeof window === "undefined") {
    return new Set<string>();
  }

  try {
    const value = window.localStorage.getItem(READ_NOTIFICATIONS_KEY);
    const ids = value ? (JSON.parse(value) as unknown) : [];

    return new Set(Array.isArray(ids) ? ids.filter((id) => typeof id === "string") : []);
  } catch {
    return new Set<string>();
  }
}

function writeStoredNotificationIds(ids: Set<string>) {
  window.localStorage.setItem(READ_NOTIFICATIONS_KEY, JSON.stringify([...ids]));
}

function getNotificationSignature(notification: Notification) {
  return [
    notification.id,
    notification.status,
    notification.message,
    notification.createdAt,
    notification.sentAt ?? "",
    notification.readAt ?? "",
  ].join("|");
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [visibleToasts, setVisibleToasts] = useState<NotificationToastItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const knownIdsRef = useRef<Set<string>>(new Set());
  const knownSignaturesRef = useRef<Map<string, string>>(new Map());
  const localReadIdsRef = useRef<Set<string>>(new Set());
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
      const next = mergeNotifications(current, incoming, localReadIdsRef.current);
      const freshItems = next.filter((item) => {
        const signature = getNotificationSignature(item);
        const previousSignature = knownSignaturesRef.current.get(item.id);

        return !knownIdsRef.current.has(item.id) || previousSignature !== signature;
      });

      knownIdsRef.current = new Set(next.map((item) => item.id));
      knownSignaturesRef.current = new Map(
        next.map((item) => [item.id, getNotificationSignature(item)]),
      );

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
    let isMounted = true;

    getNotifications(controller.signal)
      .then((incoming) => {
        if (!isMounted) {
          return;
        }

        const next = incoming.sort(
          (left, right) =>
            new Date(right.createdAt).getTime() -
            new Date(left.createdAt).getTime(),
        );
        const localReadIds = readStoredNotificationIds();
        localReadIdsRef.current = localReadIds;
        const nextWithLocalReadState = next.map((item) => ({
          ...item,
          isRead: localReadIds.has(item.id) || item.isRead,
        }));

        knownIdsRef.current = new Set(nextWithLocalReadState.map((item) => item.id));
        knownSignaturesRef.current = new Map(
          nextWithLocalReadState.map((item) => [
            item.id,
            getNotificationSignature(item),
          ]),
        );
        isInitializedRef.current = true;
        setNotifications(nextWithLocalReadState);
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error(error);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      refreshNotifications().catch(() => setIsLoading(false));
    }, POLLING_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [refreshNotifications]);

  const markAsRead = useCallback((id: string) => {
    localReadIdsRef.current.add(id);
    writeStoredNotificationIds(localReadIdsRef.current);

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
    setNotifications((current) => {
      current.forEach((item) => localReadIdsRef.current.add(item.id));
      writeStoredNotificationIds(localReadIdsRef.current);

      return current.map((item) => ({
        ...item,
        isRead: true,
      }));
    });
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
