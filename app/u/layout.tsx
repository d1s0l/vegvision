import type { PropsWithChildren } from "react";
import { Sidebar } from "@/components";

export default function LkLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return(
        <div className="flex">
            <Sidebar />
            <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 lg:px-12.5 lg:py-8 flex-1">
                {children}
            </div>
        </div>
    )
}