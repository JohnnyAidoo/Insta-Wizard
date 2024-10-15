"use client";
import { Button, Typography } from "@material-tailwind/react";
//@ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useEffect, useState } from "react";
import MainURL from "../components/url";
import AutomationCard from "../components/automationCard";

function App() {
  type AutomationCardType = {
    id: number;
    clerkId: number;
    igUsername: string;
    igPassword: string;
    imageUrl: string;
    captionValue: string;
    scheduledTime: string;
    easycronId: string;
    status: string;
  };

  const [automations, setAutomations] = useState<AutomationCardType[]>([]);
  useEffect(() => {
    AOS.init({
      easing: "ease-out-quad",
      duration: 500,
    });
  }, []);

  useEffect(() => {
    axios.get(`${MainURL}/api/postCron`).then((response) => {
      setAutomations(response.data);
    });
  }, []);

  return (
    <>
      <section id="main" className="w-full h-full ">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5 p-10">
          {automations.map((automation) => (
            <AutomationCard
              key={automation.id}
              captionValue={automation.captionValue}
              scheduledTime={automation.scheduledTime}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default App;

function EmptyDashboard() {
  return (
    <>
      \{" "}
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
    </>
  );
}
