const Todo = require("../models/todoModel.js");

const getData = async (req, res) => {
    try {
        const response = await Todo.find({ userId: req.userId });
        res.json(response);
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

const addData = async (req, res) => {
    try {
        const newTodo = new Todo({
            task: req.body.task,
            userId: req.userId
        });
        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

const updateData = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate({ _id: req.params.id, userId: req.userId }, {
            task: req.body.task,
            isCompleted: req.body.isCompleted
        }, { new: true });
        const savedTodo = await todo.save();
        res.json(savedTodo);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

const deleteData = async (req, res) => {
    try {
        await Todo.findByIdAndDelete({ _id: req.params.id, userId: req.userId });
        res.json({ message: "Task Deleted Successfully" });
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

module.exports = { getData, updateData, addData, deleteData };