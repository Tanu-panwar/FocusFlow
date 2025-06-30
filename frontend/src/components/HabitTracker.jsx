
import axios from "axios";
import { useEffect, useState } from "react";
import avatarLogo from "../assets/avatar.png";
import baseURL from "../environment";

const HabitTracker = ({ user, habits, weeklyDate}) => {
  const [today, setToday] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const dd = String(currentDate.getDate()).padStart(2, "0");
    const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
    const yyyy = currentDate.getFullYear();
    setToday(`${dd}/${mm}/${yyyy}`);
  }, []);

  const handleAddHabit = async (e) => {
    e.preventDefault();
    const habitContent = document.getElementById("habit").value;
    try {
      const response = await axios.post(
        `${baseURL}/api/habits/create`,
        { content: habitContent },
        { withCredentials: true } 
      );

      console.log("Response:", response.data);

      if (response.status === 201) {
        window.location.reload(); // Refresh to see the new habit
      } else {
        alert(response.data.message || "Failed to create habit");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleStatusUpdate = async (habitId, date) => {
    try {
      const response = await axios.get(`${baseURL}/api/habits/status-update?id=${habitId}&date=${date}`, { withCredentials: true });
      if (response.status === 200) {
        window.location.reload(); // Refresh state after update
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleFavoriteToggle = async (habitId) => {
    try {
      const response = await axios.get(`${baseURL}/api/habits/favorite-habit?id=${habitId}`, { withCredentials: true });
      if (response.status === 200) {
        window.location.reload(); // Refresh state after update
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const handleDeleteHabit = async (habitId) => {
    try {
      const response = await axios.get(`${baseURL}/api/habits/remove?id=${habitId}`, { withCredentials: true });
      if (response.status === 200) {
        window.location.reload(); // Refresh state after update
      }
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 text-gray-900 font-poppins">
      <nav className="bg-[#f23064] text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Habit Tracker</h1>
        <div className="flex items-center space-x-4">
        <p className="font-semibold text-lg mr-2">Welcome {user.username}</p>
          <img src={avatarLogo} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white" />
        </div>
      </nav>

      <div className="flex flex-wrap justify-center mt-6 px-2">
      <form onSubmit={handleAddHabit} className="flex w-full max-w-lg gap-4">
        <input
          name="habit"
          type="text"
          placeholder="Write your habit here ..."
          required
          className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f23064]"
          id="habit"
        />
        <button type="submit" className="bg-[#f23064] text-white py-1 px-4 rounded-lg font-semibold hover:bg-[#d02050] transition-all w-full sm:w-auto">
          + Add Habit
        </button>
      </form>
    </div>

      <div className="max-w-4xl mx-auto mt-6 px-4">
        <ul className="space-y-4">
          {habits.map((details) => {
            let found = false;
            let status = "";
            details.dates.forEach((item) => {
              if (item.date === today) {
                found = true;
                status = item.complete;
              }
            });

            return (
              <li key={details._id} className="bg-white p-4 rounded-md shadow-md">
                <div className="flex justify-between items-center">
                  <button onClick={() => handleStatusUpdate(details._id, today)}>
                    {found ? (
                      status === "yes" ? (
                        <i className="fas fa-check-circle text-green-500"></i>
                      ) : (
                        <i className="fas fa-times-circle text-red-500"></i>
                      )
                    ) : (
                      <i className="fas fa-minus-circle text-gray-500"></i>
                    )}
                  </button>
                  <div className="text-lg font-semibold">{details.content}</div>
                  <div className="flex space-x-4">
                    <button onClick={() => handleFavoriteToggle(details._id)}>
                      {details.favorite ? (
                        <i className="fa-solid fa-star text-yellow-500"></i>
                      ) : (
                        <i className="fa-regular fa-star"></i>
                      )}
                    </button>
                    <button onClick={() => handleDeleteHabit(details._id)}>
                      <i className="fa-solid fa-trash text-red-500"></i>
                    </button>
                  </div>
                </div>

                <div className="flex justify-around mt-4">
                  {weeklyDate.map((d) => {
                    let find = false;
                    let stat = "";
                    details.dates.forEach((item) => {
                      if (item.date === d) {
                        find = true;
                        stat = item.complete;
                      }
                    });
                    return (
                      <div key={d} className="text-center">
                        <p>{d}</p>
                        <button onClick={() => handleStatusUpdate(details._id, d)}>
                          {find ? (
                            stat === "yes" ? (
                              <i className="fas fa-check-circle text-green-500"></i>
                            ) : (
                              <i className="fas fa-times-circle text-red-500"></i>
                            )
                          ) : (
                            <i className="fas fa-minus-circle text-gray-500"></i>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HabitTracker;
