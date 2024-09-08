"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import MainURL from "../components/url";
import {
  Alert,
  Button,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { redirect } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

function App() {
  // const [image, setImage] = useState(null);
  const [igCredentials, setIgCredentials] = useState({
    username: "",
    password: "",
  });
  const [imageUrlValue, setImageUrlValue] = useState("");
  const [captionValue, setCaptionValue] = useState("");
  const [alert, setAlert] = useState({ message: "", color: "" });
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);

  // const getImage = (e: any) => {
  //   setImage(e.target.files[0]);
  // };

  useEffect(() => {
    // const clerkId = useAuth().userId;
    const igUsername = localStorage.getItem("igUsername");
    const igPassword = localStorage.getItem("igPassword");
    axios.get(`${MainURL}/user/${"clerkId"}`).then((response) => {
      console.log(response);
    });

    if (igUsername && igPassword) {
      setIgCredentials({ username: igUsername, password: igPassword });
    } else {
      redirect("/app/iglogin");
    }
  }, []);

  const post = () => {
    setloading(true);
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
      <section className="w-full h-screen flex justify-center items-center flex-col px-10">
        {/* post form */}
        <div className="w-full md:w-1/2 flex items-center gap-3">
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
        <div className="w-full md:w-1/2 flex items-center gap-3 mt-3 mb-2">
          <Textarea
            size="lg"
            value={captionValue}
            onChange={(e) => {
              setCaptionValue(e.target.value);
            }}
            variant="outlined"
            label="Caption"
            placeholder="this is a nice photo #photo"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <Button
          loading={loading}
          className="from-tertiary to-tertiary2 hover:shadow-lg hover:scale-105"
          variant="gradient"
          onClick={post}
          placeholder={undefined}
          type="submit"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Download and Post
        </Button>
      </section>
    </>
  );
}

export default App;
