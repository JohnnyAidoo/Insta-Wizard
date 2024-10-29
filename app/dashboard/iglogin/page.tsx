"use client";
import MainURL from "@/app/components/url";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function IgSignUp() {
  const [alert, setAlert] = useState({ message: "", color: "" });
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userId = useAuth().userId;
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    axios
      .post(`${MainURL}/api/user`, {
        clerkId: userId,
        igUsername: username,
        igPassword: password,
      })
      .then((response) => {
        console.log(response.data);
      });

    // Redirect to app
    localStorage.setItem("igUsername", "true");
    window.location.href = "/dashboard";
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

      <section className="w-full flex justify-center">
        <Card
          className="bg-white/50 p-10 rounded-none py-20"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            variant="h4"
            color="blue-gray"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Sign Up To Your Instagram Account
          </Typography>
          <Typography
            color="gray"
            className="mt-1 font-normal w-2/3"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span className="text-tertiary font-bold">Connect</span> to your
            instagram account , let begin to{" "}
            <span className="text-tertiary font-bold">post</span>
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-3"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                User Name
              </Typography>
              <Input
                size="lg"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="username"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-3"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Button
              onClick={handleSubmit}
              className="mt-6 bg-tertiary"
              fullWidth
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Connect
            </Button>
          </form>
        </Card>
      </section>
    </>
  );
}
