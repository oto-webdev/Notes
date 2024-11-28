import Note from '../model/note.js';
import expressAsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

export const getNotes = expressAsyncHandler(async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({createdAt: "desc"});
        return res.status(200).json({ message: "All Notes", notes, email: req.user.email });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export const createNote = expressAsyncHandler(async (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newNote = await Note.create({
            title,
            body,
            user: req.user._id 
        });
        return res.status(201).json({ message: "New note has been created", note: newNote });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export const getNote = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Id" });
    }

    try {
        const notes = await Note.findById(id)
        return res.status(200).json({ message: "Note Found", notes })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

export const updateNote = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const updatedNote = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Id" });
    }

    try {
        const note = await Note.findById(id);
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to update this note" });
        }

        const updated = await Note.findByIdAndUpdate(id, updatedNote, { new: true });
        return res.status(200).json({ message: "Note updated successfully", note: updated });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export const deleteNote = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Id" });
    }

    try {
        const note = await Note.findById(id);
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this note" });
        }

        const deletedNote = await Note.findByIdAndDelete(id);
        return res.status(200).json({ message: "Note has been deleted", note: deletedNote });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
