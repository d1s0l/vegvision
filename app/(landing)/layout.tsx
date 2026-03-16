import type { PropsWithChildren } from "react";
import Header from "@/components/Landing/Header/Header";
import { Footer } from "@/components/Landing/Footer/Footer";

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return(
        <div className="min-h-screen">
            <div>
                {children}
            </div>
            <Footer />
        </div>
    )
}