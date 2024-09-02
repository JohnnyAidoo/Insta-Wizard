"use client";
import React from "react";
import { Navbar, Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/public/icon.png";

export function Header() {
  const navList = (
    <ul className="mt-2 mb-4  flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* <Link href="#features" className="hover:underline text-secondary">
        Features
      </Link>
      <Link href="#pricing" className="hover:underline text-secondary">
        Pricing
      </Link>
      <Link href="#faqs" className="hover:underline text-secondary">
        FAQs
      </Link> */}
    </ul>
  );

  return (
    <div className=" max-h-[768px] w-[calc(100%+20px)] bg-primary ">
      <Navbar
        className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 lg:px-8 lg:py-4 bg-primary border-primary"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-extrabold text-2sxl flex items-center gap-2 justify-center"
          >
            <Image src={logoImg} alt={"logo"} width={50} height={50} />
            <Typography
              variant="h1"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="text-secondary text-lg"
            >
              Insta Wizard
            </Typography>
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <a href="/sign-in">
                <Button
                  variant="text"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className="text-secondary bg-secondary/10 hover:shadow-md"
                >
                  Sign In
                </Button>
              </a>
              <a href="/sign-up">
                <Button
                  className="from-tertiary to-tertiary2"
                  variant="gradient"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Sign Up
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
