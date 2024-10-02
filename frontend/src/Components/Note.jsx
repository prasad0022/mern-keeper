import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNotes } from "../notes/notes.js";

function Note(props) {
  const { deleteNote } = useNotes();

  const handleDeleteNote = async (id) => {
    const { success, message } = await deleteNote(id);
  };

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={() => handleDeleteNote(props.id)}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
