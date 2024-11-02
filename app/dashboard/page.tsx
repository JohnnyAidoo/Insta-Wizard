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
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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

function App() {
  const router = useRouter();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [automations, setAutomations] = useState<AutomationCardType[]>([]);
  const user = useUser();

  const postUserToDB = async () => {
    axios
      .post(`${MainURL}/api/user`, {
        clerkId: userId,
        email: await user.user?.emailAddresses,
        igUsername: localStorage.getItem("igUsername"),
        igPassword: localStorage.getItem("igPassword"),
      })
      .then((response) => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    postUserToDB();
  }, []);

  useEffect(() => {
    if (!isLoaded || !userId) return;

    axios.get(`${MainURL}/api/postCron?clerkId=${userId}`).then((response) => {
      setAutomations(response.data);
    });
  }, [isLoaded, userId]);

  useEffect(() => {
    if (!isLoaded || !userId) return;

    const igUsername = localStorage.getItem("igUsername");
    if (!igUsername) {
      axios
        .get(`${MainURL}/api/user/?clerkId=${userId}`)
        .then((response) => {
          console.log(response);
          localStorage.setItem("igUsername", response.data.igUsername);
          localStorage.setItem("igPassword", response.data.igPassword);
        })
        .catch((err) => {
          router.replace("/dashboard/iglogin");
        });
    }
  }, [isLoaded, userId, router]);

  useEffect(() => {
    AOS.init({
      easing: "ease-out-quad",
      duration: 500,
    });
  }, []);

  if (!isLoaded || !userId) {
    return null;
  }

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
