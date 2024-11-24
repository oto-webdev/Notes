import Note from '../model/noteModel.js';

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        return res.status(200).json({ message: "All Notes", notes });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createNotes = async (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const notes = await Note.create({ title, body });
        return res.status(201).json({ message: "New Note", notes });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateNotes = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Note ID" });
    }

    const updatedNote = req.body;

    try {
        const notes = await Note.findByIdAndUpdate(id, updatedNote, { new: true });
        if (!notes) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json({ message: "Note Updated", notes });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteNotes = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Note ID" });
    }

    try {
        const notes = await Note.findByIdAndDelete(id);
        if (!notes) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json({ message: "Note Deleted", notes });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
