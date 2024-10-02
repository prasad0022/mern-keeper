import { create } from "zustand";
import axios from "axios";

export const useNotes = create((set) => ({
    notes: [],
    setNotes: (notes) => set({ notes }),
    fetchNotes: async () => {
        const res = await axios.get("/api/keeper");
        set({ notes: res.data.data });
    },
    createNote: async (newNote) => {
        console.log(newNote);
        if (!newNote.title || !newNote.description) {
            return { success: false, message: "Please fill in all the fields." }
        };

        const res = await axios.post("/api/keeper", newNote);
        set((state) => ({ notes: [...state.notes, res.data] }));
        return { success: true }
    },
    deleteNote: async (id) => {
        const res = await axios.delete(`/api/keeper/${id}`);
        if (!res.data.success) {
            return { success: false, message: res.data.message };
        };

        set((state) => ({ notes: state.notes.filter((note) => note._id !== id) }));
        return { success: true, message: res.data.message };
    }
}));