import { Card, CardBody, Typography } from "@material-tailwind/react";

import Image from "next/image";
function FeatureComp(props: {
  title?: string;
  description?: string;
  image?: any;
  colorGradient?: any;
}) {
  return (
    <Card
      className={`w-1/2 flex items-center py-5 bg-gradient-to-tr hover:scale-105 ${props.colorGradient}`}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className=" py-10 flex justify-center items-center">
        <Image src={props.image} alt="find study partners" objectFit="cover" />
      </div>
      <CardBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography
          className="text-secondary"
          variant="h5"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {props.title}
        </Typography>
        {/* <Typography
          className="text-secondary"
          variant="paragraph"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {props.description}
        </Typography> */}
      </CardBody>
    </Card>
  );
}

export default FeatureComp;
