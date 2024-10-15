import { Card, Typography } from "@material-tailwind/react";
import { FaInstagram } from "react-icons/fa";

function AutomationCard(props: {
  captionValue: string;
  scheduledTime: number | string;
}) {
  return (
    <>
      <a href="#">
        <Card
          className="p-5 shadow-md rounded-xl hover:shadow-2xl "
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex items-center gap-3">
            <FaInstagram className="h-16 w-16" />
            <div>
              <Typography
                variant="h6"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Title
              </Typography>
              <Typography
                variant="paragraph"
                className="text-xs"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                media type : img
              </Typography>
              <Typography
                variant="paragraph"
                className="text-xs"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Caption: {props.captionValue}
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-3 py-5">
            <Typography
              variant="paragraph"
              className="text-xs"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Scheduled Time: {props.scheduledTime}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Status: Pending
            </Typography>
          </div>
        </Card>
      </a>
    </>
  );
}

export default AutomationCard;
