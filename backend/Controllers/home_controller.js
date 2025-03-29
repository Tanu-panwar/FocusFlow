
const Habit = require('../models/habit');

const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return `${dd}/${mm}/${yyyy}`;
};

// Get next seven dates for the week
const getOneWeekDate = () => {
    let arr = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        let mm = d.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        let dd = d.getDate();
        if (dd < 10) dd = '0' + dd;
        const yyyy = d.getFullYear();
        arr.push(`${dd}/${mm}/${yyyy}`);
    }
    return arr;
};

// Home controller
module.exports.home = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        let habits = await Habit.find({ userRef: req.user._id });
        return res.status(200).json({
            title: "Habit Tracker App",
            habits: habits,
            weeklyDate: getOneWeekDate()
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
