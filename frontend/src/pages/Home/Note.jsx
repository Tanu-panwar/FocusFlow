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
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

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
    const userToken = localStorage.getItem("token");
    if (!userToken) return;

    try {
      const res = await axios.get(`${baseURL}/api/note/all`, {
        headers: { Authorization: `Bearer ${userToken}` },
        withCredentials: true,
      });

      if (res.data.success) {
        setAllNotes(res.data.notes);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch notes.");
    }
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const deleteNote = async (data) => {
    const userToken = localStorage.getItem("token");

    try {
      const res = await axios.delete(
        `${baseURL}/api/note/delete/${data._id}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
          withCredentials: true,
        }
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success("Note deleted successfully.");
      getAllNotes();
    } catch (error) {
      toast.error("Error deleting note.");
    }
  };

  const onSearchNote = async (query) => {
    const userToken = localStorage.getItem("token");

    try {
      const res = await axios.get(`${baseURL}/api/note/search`, {
        params: { query },
        headers: { Authorization: `Bearer ${userToken}` },
        withCredentials: true,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      setIsSearch(true);
      setAllNotes(res.data.notes);
    } catch (error) {
      toast.error("Search failed.");
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned = async (noteData) => {
    const userToken = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `${baseURL}/api/note/update-note-pinned/${noteData._id}`,
        { isPinned: !noteData.isPinned },
        {
          headers: { Authorization: `Bearer ${userToken}` },
          withCredentials: true,
        }
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success("Note updated successfully.");
      getAllNotes();
    } catch (error) {
      toast.error("Error updating note.");
    }
  };

  return (
    <>
      <Notebar onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

      <div className="container mx-auto shadow-xl py-4 px-5 rounded w-[100%] h-screen">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 max-md:m-5">
            {allNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note)}
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

      {/* Floating Add Note Button */}
      <button
        className="fixed bottom-6 right-6 w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-700 shadow-lg transition-transform transform hover:scale-105"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      {/* Add/Edit Note Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false })}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.4)" },
        }}
        className="w-full max-w-lg sm:max-w-md bg-white rounded-lg shadow-lg mx-auto mt-20 p-6 overflow-auto"
      >
        <AddEditNotes
          onClose={() => setOpenAddEditModal({ isShown: false })}
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
};

export default Note;

