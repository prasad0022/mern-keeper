import express from "express";
import { createNote, deleteNote, fetchNotes, updateNote } from "../controllers/keeper.controller.js";

const router = express.Router();

router.get("/", fetchNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;