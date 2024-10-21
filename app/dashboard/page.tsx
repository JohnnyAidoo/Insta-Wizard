"use client";
import { Button, Typography } from "@material-tailwind/react";
//@ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useEffect, useState } from "react";
import MainURL from "../components/url";
import AutomationCard from "../components/automationCard";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "@clerk/nextjs";

function App() {
  const { isLoaded, userId, sessionId, getToken } = useAuth(); // Move useAuth here
  const [automations, setAutomations] = useState<AutomationCardType[]>([]); // Move useState here

  useEffect(() => {
    if (isLoaded && userId) {
      AOS.init({
        easing: "ease-out-quad",
        duration: 500,
      });
      axios
        .get(`${MainURL}/api/postCron?clerkId=${userId}`)
        .then((response) => {
          setAutomations(response.data);
        });
    }
  }, [isLoaded, userId]); // Add isLoaded and userId to dependencies

  if (!isLoaded || !userId) {
    return null;
  }

  type AutomationCardType = {
    _id: string | number;
    title: string;
    clerkId: number;
    igUsername: string;
    igPassword: string;
    imageUrl: string;
    captionValue: string;
    scheduledTime: string;
    easycronId: string;
    status: string;
  };

  return (
    <>
      <section id="main" className="w-full h-full ">
        {automations.length === 0 ? (
          <EmptyDashboard />
        ) : (
          <>
            <nav className="w-full flex justify-between p-5 pb-0">
              <Typography
                variant="h3"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                My Automations
              </Typography>
              <a href="/dashboard/create">
                <Button
                  size="lg"
                  className="bg-tertiary flex items-center"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {<FaPlus />} New Automation
                </Button>
              </a>
            </nav>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5 p-10">
              {automations.map((automation) => (
                <AutomationCard
                  key={automation._id}
                  id={automation._id}
                  title={automation.title}
                  captionValue={automation.captionValue}
                  scheduledTime={automation.scheduledTime}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default App;

function EmptyDashboard() {
  return (
    <>
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
              className="bg-tertiary flex items-center"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {<FaPlus />} New Automation
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}
