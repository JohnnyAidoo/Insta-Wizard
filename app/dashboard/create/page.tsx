"use client";
import MainURL from "@/app/components/url";
import { useAuth } from "@clerk/nextjs";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { headers } from "next/headers";
import React from "react";
import { useState } from "react";

function CreateNewAutomation() {
  const [igCredentials, setIgCredentials] = useState({
    username: "speeq.up",
    password: "1752004GRACIOUS",
  });
  const userId = useAuth().userId;
  const [imageUrlValue, setImageUrlValue] = useState("");
  const [captionValue, setCaptionValue] = useState("");
  const [alert, setAlert] = useState({ message: "", color: "" });
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setloading] = useState(false);
  const [scheduleTime, setScheduleTime] = useState<string | Date>(new Date());

  // post now
  const postnow = () => {
    setloading(true);
    console.log(imageUrlValue);
    axios
      .post(`${MainURL}/api/uploadToIG`, {
        igUsername: igCredentials.username,
        igPassword: igCredentials.password,
        imageUrl: imageUrlValue,
        caption: captionValue,
      })
      .then((response) => {
        console.log("Instagram post success:", response.data);
        setOpen(true);
        setAlert({ message: "Image posted to Instagram", color: "green" });
        setImageUrlValue("");
        setCaptionValue("");
        setloading(false);
      })
      .catch((error) => {
        console.error("Error posting to Instagram:", error.response.data);
        setImageUrlValue("");
        setCaptionValue("");
        setOpen(true);
        setAlert({
          message: "Failed to post image to Instagram",
          color: "red",
        });
        setloading(false);
      });
  };

  // date to cron expression
  function dateToCron(date: string) {
    const d = new Date(date);
    const minute = d.getMinutes();
    const hour = d.getHours();
    const dayOfMonth = d.getDate();
    const month = d.getMonth() + 1; // JS months are 0-based, so add 1
    return `${minute} ${hour} ${dayOfMonth} ${month} *`;
  }

  //  schedule post function

  const schedulePost = async () => {
    setloading(true);
    const cronExpression = dateToCron(scheduleTime as string);
    console.log(cronExpression);

    axios
      .post(`${MainURL}/api/easycron`, {
        url: `https://insta-wizard.vercel.app/api/uploadToIG`,
        cron_expression: cronExpression as string,
        http_message_body: `{
          IGusername: ${igCredentials.username},
          IGpassword: ${igCredentials.password},
          imageUrl: ${imageUrlValue},
          caption: ${captionValue},
        }`,
      })
      .then((response) => {
        console.log("Cron job scheduled successfully:", response.data);
        setOpen(true);
        setAlert({ message: "Cron job scheduled", color: "green" });
        setImageUrlValue("");
        setCaptionValue("");
        setScheduleTime(new Date());
        setloading(false);
      })
      .catch((error) => {
        console.error("Error scheduling cron job:", error.response.data);
        setOpen(true);
        setAlert({
          message: "Failed to schedule cron job",
          color: "red",
        });
        setloading(false);
      });

    // axios.post(`${MainURL}/postCron`, {
    //   clerkId: userId,
    //   IGusername: igCredentials.username,
    //   IGpassword: igCredentials.password,
    //   imageUrl: imageUrlValue,
    //   caption: captionValue,
    //   scheduledTime: cronExpression,
    // });
  };

  return (
    <>
      <Alert
        // @ts-ignore
        color={alert.color}
        open={open}
        onClose={() => setOpen(false)}
        className="absolute  w-fit"
      >
        {alert.message}
      </Alert>
      <section className="w-full flex flex-col md:px-10 items-center">
        <Typography
          variant="h3"
          className="text-2xl mb-5"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Create New Post Automation
        </Typography>
        <Card
          className="w-full md:w-3/4 flex-column flex items-center p-5 md:px-40 bg-white/60 rounded-none md:h-full h-screen"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="w-full">
            <Typography
              variant="h5"
              className="text-left text-secondary/70 py-5"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Set Post Details
            </Typography>
          </div>

          {/* post form */}
          <div className="w-full flex items-center gap-3">
            {/* image url form */}
            <Input
              value={imageUrlValue}
              onChange={(e) => {
                setImageUrlValue(e.target.value);
              }}
              variant="outlined"
              label="Image URL"
              placeholder="http://example.jpg"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <Typography
            variant="small"
            className="text-secondary text-sm"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            image must be in .jpg
          </Typography>

          {/* caption form */}
          <div className="w-full flex items-center gap-3 mt-3 mb-2">
            <Textarea
              size="lg"
              value={captionValue}
              onChange={(e) => {
                setCaptionValue(e.target.value);
              }}
              variant="outlined"
              label="Caption"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </div>
          <Typography
            variant="h6"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="text-left text-secondary/70 w-full"
          >
            Schedule date
          </Typography>
          <div className="w-full flex items-center  gap-3 mt-3 mb-2">
            <div className="w-2/3">
              <Input
                disabled={checked ? true : false}
                label="date and time"
                type="datetime-local"
                onChange={(e) => setScheduleTime(e.target.value)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
            <Checkbox
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
              label="Post Now"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <Button
            loading={loading}
            className="from-tertiary to-tertiary2 hover:shadow-lg hover:scale-105 my-5"
            variant="gradient"
            onClick={checked ? postnow : schedulePost}
            placeholder={undefined}
            type="submit"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {checked ? "Post Now" : "Schedule Post"}
          </Button>
        </Card>
      </section>
    </>
  );
}

export default CreateNewAutomation;
