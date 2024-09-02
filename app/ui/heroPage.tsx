"use client";
import { Button, Typography } from "@material-tailwind/react";
//@ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Hero() {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-quad",
      duration: 900,
    });
  }, []);

  return (
    <section
      id="hero"
      data-aos="fade-up"
      data-aos-duration="500"
      style={{
        height: "85dvh",
        backgroundImage: `url(https://utfs.io/f/acf699b7-902d-43b1-b571-7fd33ec56557-h6ijfl.svg)`, // Set background image URL
        backgroundSize: "cover", // Cover entire section
        backgroundPosition: "center", // Center the image
      }}
      className=" flex flex-col justify-center items-center relative py-10 bg-primary px-10 w-full gap-5"
    >
      <Typography
        data-aos="zoom-in"
        variant="h1"
        className="font-bold text-6xl text-secondary/90 md:px text-center w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Automate Your Instagram Posts
      </Typography>
      <Typography
        data-aos="fade-up"
        className="text-secondary/90  "
        variant="paragraph"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Effortlessly schedule and manage your Instagram content to maximize
        engagement
      </Typography>
      <a href="/sign-in">
        <Button
          data-aos="fade-up"
          data-aos-duration="1500"
          size="lg"
          variant="gradient"
          className=" from-tertiary to-tertiary2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Get Started
        </Button>
      </a>
    </section>
  );
}

export default Hero;
