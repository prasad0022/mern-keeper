import React, { useEffect, useState } from "react";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer";
import Note from "./Components/Note";
import CreateArea from "./Components/CreateArea";
import { useNotes } from "./notes/notes.js";

const App = () => {
  const { fetchNotes, notes } = useNotes();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div>
      <Header />
      <CreateArea />
      {notes.map((note, index) => (
        <Note
          key={index}
          id={note._id}
          title={note.title}
          content={note.description}
        />
      ))}

      <Footer />
    </div>
  );
};

export default App;
