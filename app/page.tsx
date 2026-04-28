import { LandingFooter } from "@/widgets/landing/footer";
import { LandingHeader } from "@/widgets/landing/header";
import { LandingHero } from "@/widgets/landing/main-hero";

export default function Home() {
  return (
    <main className="landing-layout">
      <LandingHeader variant="light"/>
      <LandingHero />
      <LandingFooter />
    </main>
  );
}
