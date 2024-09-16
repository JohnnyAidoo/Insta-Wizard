"use client";
import { Button, Typography } from "@material-tailwind/react";
import { FaArrowDown } from "react-icons/fa";
//@ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-quad",
      duration: 500,
    });
  }, []);

  return (
    <>
      <section id="main" className="w-full h-full ">
        <div className="w-full h-[calc(80vh)] flex flex-col justify-center items-center">
          <Typography
            className="p-5"
            variant="h5"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            No Automation Created ... Create New Here
          </Typography>
          <div data-aos="zoom-in">
            <a href="/dashboard/create">
              <Button
                size="lg"
                className="bg-tertiary"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Create New Automation
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
