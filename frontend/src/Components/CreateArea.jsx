import React from "react";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";
import { Fab } from "@mui/material";
import { useNotes } from "../notes/notes.js";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const { createNote } = useNotes();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNote((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleAddNote = async () => {
    const { success } = await createNote(note);
    setNote({ title: "", description: "" });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <form className="create-note" onSubmit={handleAddNote}>
        {isExpanded && (
          <input
            onChange={handleChange}
            name="title"
            placeholder="Title"
            value={note.title}
            required={true}
          />
        )}

        <textarea
          onClick={handleExpand}
          onChange={handleChange}
          name="description"
          placeholder="Take a note..."
          value={note.description}
          rows={isExpanded ? "3" : "1"}
          required={true}
        />
        <Zoom in={isExpanded}>
          <Fab type="Submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
