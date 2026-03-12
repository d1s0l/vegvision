import type { PropsWithChildren } from "react";
import { Sidebar } from "@/components";

export default function LkLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return(
        <div className="min-h-screen">
            <Sidebar />
            <div className="p">
                {children}
            </div>
        </div>
    )
}