
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NoteCard from "../../components/Cards/NoteCard";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import Notebar from "../../components/Notebar";
import baseURL from "../../environment";
import AddEditNotes from "./AddEditNotes";

const Note = () => {
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      toast.error("Unauthorized! Please log in.");
      navigate("/login");
    } else {
      getAllNotes();
    }
  }, [navigate]);

  const getAllNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(`${baseURL}/api/note/all`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res.data.success) {
        setAllNotes(res.data.notes);
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Failed to fetch notes.");
    }
  };

  const handleEdit = (note) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: note });
  };


  const confirmDelete = async () => {
    const userToken = localStorage.getItem("token");
    try {
      const res = await axios.delete(`${baseURL}/api/note/delete/${noteToDelete._id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
        withCredentials: true,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        toast.success("Note deleted successfully.");
        getAllNotes();
      }
    } catch (error) {
      toast.error("Error deleting note.");
    } finally {
      setNoteToDelete(null);
      setShowConfirmModal(false);
    }
  };


  // const deleteNote = async (note) => {
  //   const token = localStorage.getItem("token");

  //   try {
  //     const res = await axios.delete(`${baseURL}/api/note/delete/${note._id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //       withCredentials: true,
  //     });

  //     if (!res.data.success) {
  //       toast.error(res.data.message);
  //       return;
  //     }

  //     toast.success("Note deleted.");
  //     getAllNotes();
  //   } catch {
  //     toast.error("Error deleting note.");
  //   }
  // };

  const onSearchNote = async (query) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${baseURL}/api/note/search`, {
        params: { query },
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res.data.success) {
        setIsSearch(true);
        setAllNotes(res.data.notes);
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Search failed.");
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned = async (note) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `${baseURL}/api/note/update-note-pinned/${note._id}`,
        { isPinned: !note.isPinned },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Note updated.");
        getAllNotes();
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Error updating note.");
    }
  };

  return (
    <>
      <Notebar onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-6 min-h-screen">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {allNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => {
                  setNoteToDelete(note);
                  setShowConfirmModal(true);
                }}

                onPinNote={() => updateIsPinned(note)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={
              isSearch
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtakcQoMFXwFwnlochk9fQSBkNYkO5rSyY9A&s"
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDCtZLuixBFGTqGKdWGLaSKiO3qyhW782aZA&s"
            }
            message={
              isSearch
                ? "Oops! No Notes found matching your search"
                : "Ready to capture your ideas? Click the 'Add' button to start noting down your thoughts!"
            }
          />
        )}
      </div>

      {/* Floating Add Button */}
      <button
        className="fixed bottom-5 right-5 w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white text-3xl shadow-lg transition-transform transform hover:scale-105 z-50"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
        aria-label="Add Note"
      >
        <MdAdd />
      </button>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false })}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.4)" } }}
        className="w-[90%] mt-6 max-w-lg bg-white rounded-lg shadow-lg mx-auto mt-20 p-6 overflow-auto outline-none"
      >
        <AddEditNotes
          onClose={() => setOpenAddEditModal({ isShown: false })}
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
        />
      </Modal>

      {/* deletion model */}
      <Modal
        isOpen={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            padding: "10px"
          },
          content: {
            maxWidth: "400px",
            margin: "auto",
            padding: "0",
            border: "none",
            borderRadius: "12px",
            overflow: "hidden",
            inset: "40px",
            height: "200px",
            maxHeight: "250px"
          },
        }}
        ariaHideApp={false}
      >
        <div className="bg-white p-6 text-center shadow-xl rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Confirm Deletion
          </h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this note? This action cannot be undone.
          </p>

          <div className="flex justify-center gap-4 px-6">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded transition duration-200"
              onClick={confirmDelete}
            >
              Delete
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-5 py-2 rounded transition duration-200"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal >

    </>
  );
};

export default Note;

