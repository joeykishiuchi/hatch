import React, {useState} from "react";
// import Typography from "@material-ui/core/Typography";
import moment from "moment";

export default function TripDates(props) {


  return (
    <div>
      <h2>
      {props.startDate} - {props.endDate}
      </h2>
    </div>
  );
}
