import express from "express";
import {
  createNote,
  deleteOneNote,
  getAllNotes,
  getOneNote,
  updateOneNote,
} from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNote);
router.get("/:id", getOneNote);
router.put("/:id", updateOneNote);
router.delete("/:id", deleteOneNote);

export default router;
