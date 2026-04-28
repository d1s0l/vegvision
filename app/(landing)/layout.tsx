import { LandingFooter } from "@/widgets/landing/footer";

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
            <LandingFooter />
        </div>
    )
}
