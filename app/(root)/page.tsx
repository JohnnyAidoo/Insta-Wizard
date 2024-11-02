"use client";
import { useEffect } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { FAQ } from "../ui/faq";
import Features from "../ui/featuresPage";
import Hero from "../ui/heroPage";
import Pricing from "../ui/pricing";
import { useRouter } from "next/navigation";

function LandingPage() {
  const router = useRouter();

  localStorage.getItem("user_id") ? router.push("/sign-in") : null;

  return (
    <>
      <Header />
      <Hero />
      {/* <Features /> */}
      {/* <Pricing /> */}
      {/* <FAQ /> */}
      {/* <Footer /> */}
    </>
  );
}

export default LandingPage;
