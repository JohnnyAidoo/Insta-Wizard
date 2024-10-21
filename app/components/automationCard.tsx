import {
  Card,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { FaInstagram, FaTrash } from "react-icons/fa";
import MainURL from "./url";

function AutomationCard(props: {
  captionValue: string;
  title?: string;
  scheduledTime: number | string;
  id: string | number;
}) {
  const deleteAutomation = (e: any) => {
    e.preventDefault();
    axios.delete(`${MainURL}/api/postCron?id=${props.id}`).then((response) => {
      console.log(response.data);
      // refresh the automations list
      window.location.reload();
    });
  };

  return (
    <>
      <Card
        className="p-5 shadow-md rounded-xl hover:shadow-2xl "
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardHeader
          className="self-end"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <IconButton
            onClick={deleteAutomation}
            className="bg-transparent shadow-none"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <FaTrash color="red" className="bg-transparent" />
          </IconButton>
        </CardHeader>
        <div className="flex items-center gap-3">
          <FaInstagram className="h-16 w-16" />
          <div>
            <Typography
              variant="h6"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Id: {props.title}
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
              {/* Caption: {props.captionValue} */}.
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
    </>
  );
}

export default AutomationCard;
