"use client";
import MainURL from "@/app/components/url";
import { useAuth } from "@clerk/nextjs";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  IconButton,
  Input,
  Radio,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { UploadButton } from "../../utils/uploadthing";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

function CreateNewAutomation() {
  const router = useRouter();

  const { userId } = useAuth();
  const [igCredentials, setIgCredentials] = useState({
    username: "",
    password: "",
  });
  const [imageUrlValue, setImageUrlValue] = useState("");
  const [imageKeyValue, setImageKeylValue] = useState("");
  const [imageName, setImageName] = useState("");
  const [captionValue, setCaptionValue] = useState("");
  const [cronJobName, setCronJobName] = useState("");
  const [alert, setAlert] = useState({ message: "", color: "" });
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setloading] = useState(false);
  const [mediaType, setMediaType] = useState("image");
  const [scheduleTime, setScheduleTime] = useState<string | Date>(new Date());

  useEffect(() => {
    const igUsername = localStorage.getItem("igUsername");
    if (!igUsername) {
      router.replace("/dashboard/iglogin");
    }
  }, []);

  // post now
  const postnow = async () => {
    setloading(true);
    const igPassword = await localStorage.getItem("igPassword");
    const igUsername = await localStorage.getItem("igUsername");
    setIgCredentials({
      username: igUsername as string,
      password: igPassword as string,
    });
    // console.log(mediaType);
    axios
      .post(`${MainURL}/api/uploadToIG?mediaType=${mediaType as string}`, {
        igUsername: igCredentials.username,
        igPassword: igCredentials.password,
        imageUrl: imageUrlValue,
        imageKey: imageKeyValue,
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
    console.log(userId);

    setloading(true);
    const cronExpression = dateToCron(scheduleTime as string);
    console.log(cronExpression);

    //post to easycron api
    axios
      .post(`${MainURL}/api/easycron`, {
        url: `https://insta-wizard.vercel.app/api/uploadToIG`,
        cron_expression: cronExpression as string,
        cron_job_name: cronJobName,
        http_message_body: `{"igUsername": "${igCredentials.username}","igPassword": "${igCredentials.password}","imageUrl": "${imageUrlValue}","imageKey:"${imageKeyValue}"","caption":" ${captionValue}"}`,
      })
      .then((response) => {
        console.log(
          "Cron job scheduled successfully:",
          response.data.data.cron_job_id
        );

        //post to database after job is scheduled successfully
        axios.post(`${MainURL}/api/postCron`, {
          clerkId: userId,
          title: cronJobName as string,
          igUsername: "speeq.up",
          igPassword: "1752004GRACIOUS",
          easycronId: response.data.data.cron_job_id,
          imageUrl: imageUrlValue as string,
          imageKey: imageKeyValue as string,
          scheduledTime: scheduleTime as string,
          status: "pending",
        });
        setOpen(true);
        setAlert({ message: "Automation Created", color: "green" });
        window.location.replace("/dashboard");
      })
      // Handle error scheduling cron job
      .catch((error) => {
        console.error("Error scheduling cron job:", error.response.data);
        setOpen(true);
        setAlert({
          message: "Failed to create automation",
          color: "red",
        });
        setloading(false);
      });
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
            <a href="/dashboard">
              <IconButton
                className=""
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <FaArrowLeft size={25} />
              </IconButton>
            </a>
            <div className="flex gap-10 w-full items-center">
              <Radio
                name="type"
                label="Image Post"
                id="image"
                defaultChecked
                onChange={(e) => setMediaType(e.target.id)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Radio
                name="type"
                label="Reel"
                id="reel"
                disabled
                onChange={(e) => setMediaType(e.target.id)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
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
          {/* Automation / cron job name */}
          <Input
            required
            value={cronJobName}
            onChange={(e) => {
              setCronJobName(e.target.value);
            }}
            variant="outlined"
            label="Automation Name"
            placeholder="Automation 1"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
          <div className="w-full flex flex-col items-center gap-3 mt-5">
            {/* image url form */}
            <div className="flex">
              <UploadButton
                appearance={{
                  button: {
                    background: "#67bf78",
                  },
                }}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Files: ", res);
                  setImageUrlValue(res[0].appUrl);
                  setImageKeylValue(res[0].key);
                  setImageName(res[0].name);
                  setAlert({ color: "success", message: "Success" });
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  setAlert({ message: error.message, color: "danger" });
                }}
              />
            </div>
            <img
              src={imageUrlValue}
              alt={imageName}
              className={`w-1/2  ${imageUrlValue == "" ? "hidden" : ""} px-2`}
            />

            <p>{imageName}</p>
          </div>

          {/* schedule date form */}
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
            {checked ? "Post Now" : "Create Automation"}
          </Button>
        </Card>
      </section>
    </>
  );
}

export default CreateNewAutomation;
