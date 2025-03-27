const express=require("express");
const {
    addNote,
    deleteNote,
    editNote,
    getAllNotes,
    searchNote,
    updateNotePinned,
} = require("../Controllers/NoteController.js");
const { userVerification } =require("../middleware.js");

const router = express.Router()

router.post("/add", userVerification, addNote)
router.post("/edit/:noteId", userVerification, editNote)
router.get("/all", userVerification, getAllNotes)
router.delete("/delete/:noteId", userVerification, deleteNote)
router.put("/update-note-pinned/:noteId", userVerification, updateNotePinned)
router.get("/search", userVerification, searchNote)

module.exports= router