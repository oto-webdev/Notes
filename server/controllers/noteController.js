import Note from "../models/noteModel.js";
import mongoose from "mongoose";

export const getAllNotes = async (req, res) => {
  try {
    const note = await Note.find();
    return res.status(200).json({ message: "All Notes", note });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(404).json({ message: "All fields are required" });
  }

  try {
    const note = await Note.create({ title, body });
    return res.status(201).json({ message: "New Note", note });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOneNote = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ message: "Invalid Id" });
  }

  try {
    const note = await Note.findById(id);
    return res.status(200).json({ message: "Note Found", note });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateOneNote = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ message: "Invalid Id" });
  }

  const updatedNote = req.body;

  try {
    const note = await Note.findByIdAndUpdate(id, updatedNote, { new: true });
    return res.status(200).json({ message: "Updated Note", note });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteOneNote = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ message: "Invalid Id" });
  }

  try {
    const note = await Note.findByIdAndDelete(id);
    return res.status(200).json({ message: "Note Deleted", note });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
