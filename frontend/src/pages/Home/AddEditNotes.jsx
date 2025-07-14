import axios from "axios"
import React, { useState } from "react"
import { MdClose } from "react-icons/md"
import { toast } from "react-toastify"
import TagInput from "../../components/Input/TagInput"
import baseURL from "../../environment"

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "")
  const [content, setContent] = useState(noteData?.content || "")
  const [tags, setTags] = useState(noteData?.tags || [])
  const [error, setError] = useState(null)

  //   Edit Note
  const editNote = async () => {
    const noteId = noteData._id
    try {
      const res = await axios.post(
        `${baseURL}/api/note/edit/${noteId}`,
        { title, content, tags },
        { withCredentials: true }
      )

      if (!res.data.success) {
        setError(res.data.message)
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message)
      getAllNotes()
      onClose()
    } catch (error) {
      toast.error(error.message)
      setError(error.message)
    }
  }

  //   Add Note
  const addNewNote = async () => {
    try {
      const res = await axios.post(
        `${baseURL}/api/note/add`,
        { title, content, tags },
        { withCredentials: true }
      )

      if (!res.data.success) {
        setError(res.data.message)
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message)
      getAllNotes()
      onClose()
    } catch (error) {
      toast.error(error.message)
      setError(error.message)
    }
  }

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title")
      return
    }
    if (!content) {
      setError("Please enter the content")
      return
    }

    setError("")

    type === "edit" ? editNote() : addNewNote()
  }

  return (
    <div className="fixed inset-0 mt-8 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="relative bg-white shadow-xl rounded-lg p-6 w-full max-w-lg">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:bg-gray-100 p-2 rounded-full"
          onClick={onClose}
        >
          <MdClose className="text-2xl" />
        </button>

        <h2 className="text-2xl font-bold text-[#f23064] text-center">
          {type === "edit" ? "Edit Note" : "Add New Note"}
        </h2>

        {/* Title Input */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-[#f23064] focus:border-[#f23064]"
            placeholder="What’s on your mind today?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Content Input */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-[#f23064] focus:border-[#f23064] resize-none"
            rows={5}
            placeholder="Start jotting down your ideas, thoughts, or reminders..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Tags Input */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        {/* Submit Button */}
        <button
          className="w-full mt-5 p-3 bg-[#f23064] text-white font-semibold rounded-lg hover:bg-[#d91c52] transition-all"
          onClick={handleAddNote}
        >
          {type === "edit" ? "UPDATE" : "ADD NOTE"}
        </button>
      </div>
    </div>
  )
}

export default AddEditNotes

