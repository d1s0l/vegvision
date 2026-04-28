import Header  from "@/components/Landing/Header/Header";
import Landing from "@/components/Landing/Landing";
import { Footer } from "@/components/Landing/Footer/Footer";

export default function Home() {
  return (
    <main className="landing-layout">
      <Header variant="light"/>
      <Landing />
      <Footer />
    </main>
  );
}
