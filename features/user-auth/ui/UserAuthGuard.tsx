"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { USER_LOGIN_PATH } from "@/shared/lib/user-auth/constants";
import { useUserAuth } from "../model/use-user-auth";

interface UserAuthGuardProps {
  children: ReactNode;
}

export function UserAuthGuard({ children }: UserAuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useUserAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`${USER_LOGIN_PATH}?next=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return children;
}
