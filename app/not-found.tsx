"use client";
import { Button, Typography } from "@material-tailwind/react";

function NotFoundPage() {
  const backToPreviouspage = () => {
    window.history.back();
  };
  return (
    <>
      <section className="h-screen w-screen flex flex-col items-center justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7465/7465751.png"
          alt="404 not found"
          className="w-2/12"
        />
        <Button
          onClick={backToPreviouspage}
          variant="text"
          className="my-10 hover:scale-110"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Back To Previous
        </Button>
      </section>
    </>
  );
}

export default NotFoundPage;
