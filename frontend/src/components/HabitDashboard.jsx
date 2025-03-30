
import axios from "axios";
import { useEffect, useState } from "react";
import server from "../environment";
import HabitTracker from "./HabitTracker";

const HabitDashboard = () => {
  const [user, setUser] = useState({});
  const [habits, setHabits] = useState([]);
  const [weeklyDate, setWeeklyDate] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    axios.get(`${server.prod}/api/habits`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setHabits(response.data.habits)})
      .catch((err) => console.error("Error fetching habits:", err));

    // 3. Generate weekly dates
    const generateWeekDates = () => {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Start from Sunday

      let dates = [];
      for (let i = 0; i < 7; i++) {
        let newDate = new Date(startOfWeek);
        newDate.setDate(startOfWeek.getDate() + i);
        let formattedDate = `${String(newDate.getDate()).padStart(2, "0")}/${String(newDate.getMonth() + 1).padStart(2, "0")}/${newDate.getFullYear()}`;
        dates.push(formattedDate);
      }
      setWeeklyDate(dates);
    };

    generateWeekDates();
  }, []);

  return <HabitTracker user={user} habits={habits} weeklyDate={weeklyDate} />;
};

export default HabitDashboard;
