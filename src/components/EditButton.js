import React, { useState } from "react";
import useAppData from "../hooks/useAppData.js";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import SearchIcon from "@material-ui/icons/Search";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import Textbox from "./Textbox";

import axios from "axios";
import { Button, Typography } from "@material-ui/core";

export default function EditButton(props) {
  // const [onEdit, setOnEdit] = useState(false);
  // const [onDelete, setOnDelete] = useState(false);
  // const [onSearch, setOnSearch] = useState(false);
  // const [onText, setOnText] = useState(false);
  const [mode, setMode] = useState("EDIT");

  const onDelete = () => {
    axios({
      method: "DELETE",
      url: `/api/components/${props.component_id}`,
      data: {
        destination_id: props.destination_id,
      },
    })
      .then((res) => {
        props.getData()
        console.log("DELETE:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const text = (
    <div>
      <Textbox mode={mode} getData={props.getData} component_id={props.component_id}></Textbox>
    </div>
  );

  const search = (
    <div>
      <Textbox mode={mode} getData={props.getData} component_id={props.component_id}></Textbox>
    </div>
  );

  return (
    <div>
      {mode === "EDIT" && <CreateTwoToneIcon onClick={() => setMode("SHOW")} />}
      {(mode === "SHOW" || mode === "TEXT" || mode === "SEARCH") && (
        <>
          <TextFieldsIcon onClick={() => setMode("TEXT")} />
          <SearchIcon onClick={() => setMode("SEARCH")} />
          <DeleteIcon onClick={() => setMode("VERIFYDELETING")} />
          <CloseIcon onClick={() => setMode("EDIT")} />
        </>
      )}
      {mode === "TEXT" && text}
      {mode === "SEARCH" && search}
      {mode === "VERIFYDELETING" && (
        <Typography>
          Are you sure you want to delete?
          <Button onClick={() => setMode("EDIT")}>No</Button>
          <Button onClick={() => onDelete()}>Yes</Button>
        </Typography>
      )}
    </div>
  );
}
