import {Button} from "@mui/material";
import React from "react";

const RequestActions = (props) => {
  return (
      <div
          className="flex justify-end gap-4">
          <Button onClick={openCautionModalHandler} variant={'outlined'} color={"error"}>Reject
              Request</Button>
          <Button onClick={toggleCreateAccountModalHandler} variant={'contained'}>Accept
              Request</Button>
      </div>
  )
}
export default RequestActions;