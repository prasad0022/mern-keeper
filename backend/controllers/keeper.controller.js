import mongoose from "mongoose";
import Keeper from "../model/keeper.model.js";

export const fetchNotes = async (req, res) => {
    try {
        const notes = await Keeper.find({});
        res.status(200).json({ success: true, count: notes.length, data: notes });
    } catch (error) {
        console.error("Error in fetching keeper notes", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const createNote = async (req, res) => {
    const note = req.body;

    if (!note.title || !note.description) {
        return res.status(404).json({ success: false, message: "Please provide all the fields" });
    };

    const newNote = new Keeper(note);
    try {
        await newNote.save();
        res.status(201).json({ success: true, data: newNote });
    } catch (error) {
        console.error("Error in create note", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid note Id" });
    };

    const note = req.body;
    try {
        const updatedNote = await Keeper.findByIdAndUpdate(id, note, { new: true });
        if (!updatedNote) return res.status(404).json({ success: false, message: "Note not found" });
        res.status(200).json({ success: true, data: updatedNote });
    } catch (error) {
        console.error("Error updating note", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }

};

export const deleteNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid note Id" });
    };

    try {
        const isDeleted = await Keeper.findByIdAndDelete(id);
        if (!isDeleted) return res.status(404).json({ success: false, message: "Note not found" });
        res.status(200).json({ success: true, message: "Note deleted" });
    } catch (error) {
        console.error("Error in deleting note", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};