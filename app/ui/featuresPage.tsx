"use client";
import { Typography } from "@material-tailwind/react";
import FeatureComp from "../components/featureComp";
import scheduleImg from "../images/schedule.png";
import userMgtImg from "../images/user-group.png";
import analyticsImg from "../images/analytics.png";
function Features() {
  return (
    <section id="features" className="bg min-h-fit px-20 bg-white py-10">
      <Typography
        className="text-center py-20  text-6xl font-extrabold"
        variant="h2"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Features
      </Typography>
      <div
        id="cards"
        className="w-full justify-between gap-10 h-1/3 flex text-center text-secondary "
      >
        <FeatureComp
          title="Schedule posts directly to Instagram."
          image={scheduleImg}
          colorGradient="from-red-100 to-red-50"
        />
        <FeatureComp
          title="Manage multiple accounts from one dashboard."
          image={userMgtImg}
          colorGradient="from-green-100 to-green-50"
        />
        <FeatureComp
          title="Detailed analytics to track engagement."
          image={analyticsImg}
          colorGradient="from-purple-100 to-purple-50"
        />
      </div>
    </section>
  );
}

export default Features;
