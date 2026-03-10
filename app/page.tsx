import Image from "next/image";
import Header  from "@/components/Landing/Header/Header";
import Landing from "@/components/Landing/Landing";
import { Footer } from "@/components/Landing/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Landing />
      <Footer />
    </main>
  );
}
