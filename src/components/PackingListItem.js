import React, { useState } from "react";
import axios from "axios";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

export default function PackingListItem(props) {
  let value = 0;
  const [checked, setChecked] = useState([1]);
  const [text, setText] = useState();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  function keyPressed(event) {
    if (event.key === "Enter") {
      event.target.blur();
      axios({
        method: "POST",
        url: "/api/packing_items",
        data: {
          description: text,
          trip_id: "1", ///how do we get this
        },
      }).then((res) => {
        console.log("resdata", res.data);
      });
    } else {
    } //setstate to whatever is typed and also update state on enter
  }

  return (
    <ListItem key={props.id} role={undefined} dense button>
      <ListItemIcon class="list-item-icons">
        <Checkbox
          edge="start"
          checked={checked.indexOf(value) !== -1}
          tabIndex={props.id}
          disableRipple
          inputProps={{ "aria-labelledby": props.id }}
          onClick={handleToggle(value)}
        />
      </ListItemIcon>

      <ListItemText id={props.id} onKeyPress={keyPressed}>
        <TextField
          type="text"
          value={props.text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
      </ListItemText>
    </ListItem>
  );
}
