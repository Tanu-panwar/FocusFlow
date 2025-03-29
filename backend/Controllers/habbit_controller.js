
const Habit = require('../models/habit');

function getTodayDate() {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
}

module.exports.createHabit = async (req, res) => {
    try {
        console.log("Request Body:", req.body); 
        
        if (!req.body.content) {
            return res.status(400).json({ message: "Habit content is required" });
        }

        let habit = await Habit.findOne({ content: req.body.content, userRef: req.user._id });
        
        if (!habit) {
            let newHabit = new Habit({
                content: req.body.content,
                userRef: req.user._id,
                dates: [{ date: getTodayDate(), complete: "none" }]
            });
            await newHabit.save();
            return res.status(201).json({ message: "Habit created successfully", habit: newHabit });
        }
        return res.status(400).json({ message: "Habit already exists" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.favoriteHabit = async (req, res) => {
    try {

        console.log("User Object:", req.user); 
        console.log("Habit ID:", req.query.id); 

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized - User not found in request" });
        }
        if (!req.query.id) {
            return res.status(400).json({ message: "Bad Request - Habit ID is required" });
        }

        let habit = await Habit.findOne({ _id: req.query.id, userRef: req.user._id });
        if (habit) {
            habit.favorite = !habit.favorite;
            await habit.save();
            return res.status(200).json({ message: "Habit favorite status updated", habit });
        }
        return res.status(404).json({ message: "Habit not found" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports.destroyHabit = async (req, res) => {
    try {
        let result = await Habit.deleteOne({ _id: req.query.id, userRef: req.user._id });
        if (result.deletedCount > 0) {
            return res.status(200).json({ message: "Habit deleted successfully" });
        }
        return res.status(404).json({ message: "Habit not found" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports.statusUpdate = async (req, res) => {
    try {
        let habit = await Habit.findById(req.query.id);
        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }
        let found = false;
        habit.dates.forEach(item => {
            if (item.date === req.query.date) {
                item.complete = item.complete === 'yes' ? 'no' : item.complete === 'no' ? 'none' : 'yes';
                found = true;
            }
        });
        if (!found) {
            habit.dates.push({ date: req.query.date, complete: 'yes' });
        }
        await habit.save();
        return res.status(200).json({ message: "Habit status updated", habit });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
