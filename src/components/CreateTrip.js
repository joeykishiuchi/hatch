import React, { useState } from "react";
import Nav from "./Nav";
import Calendar from "./Calendar";
import PlaceSearch from "./PlaceSearch";
import axios from "axios";
import Card from "@material-ui/core/Card";
import "./CreateTrip.scss";
import InputField from "./InputField";
import UserSearch from "./UserSearch";
import Button from "@material-ui/core/Button";
import classnames from "classnames";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

function CreateTrip() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [places, setPlaces] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [currentTripID, setCurrentTripID] = useState(0);

  const user = JSON.parse(Cookies.get("user"));

  function submit() {
    collaborators.push(user);
    if (title && description && places) {
      axios({
        method: "POST",
        url: "/api/trips",
        data: {
          title: title,
          description: description,
          start_date: startDate,
          end_date: endDate,
          destinations: places,
          collaborators: collaborators,
        },
      })
        .then((res) => {
          setCurrentTripID(res.data.trip.id);
        })
        .then(() => {
          setIsSubmitted(true);
        });
    } else {
      setError(true);
    }
  }

  const errorClass = classnames("error-message", {
    "error-message--active": error,
    "error-message--disabled": error === false,
  });

  return !user ? (
    <Redirect to="/login" />
  ) : isSubmitted ? (
    <Redirect to={`/trip/${currentTripID}`} />
  ) : (
    <>
      <Nav />
      <div id="create-trip">
        <Card>
          <h2 id="create-title">start planning.</h2>
          <span class={errorClass}>* Missing mandatory fields</span>
          <form onSubmit={(event) => event.preventDefault()}>
            <InputField setTitle={setTitle} setDescription={setDescription} />
            <PlaceSearch setPlaces={setPlaces} />
            <UserSearch setCollaborators={setCollaborators} collaborators={collaborators}/>
            <Calendar setStartDate={setStartDate} setEndDate={setEndDate} />
            <Button
              color="primary"
              variant="contained"
              onClick={() => submit()}
            >
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default React.memo(CreateTrip);
