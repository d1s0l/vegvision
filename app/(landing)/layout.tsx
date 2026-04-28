import { Footer } from "@/components/Landing/Footer/Footer";

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return(
        <div className="landing-layout min-h-screen">
            <div>
                {children}
            </div>
            <Footer />
        </div>
    )
}
