const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Public
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Add task
// @route   POST /api/v1/tasks
// @access  Public
exports.addTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create(req.body);

    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// @desc    Delete transaction
// @route   DELETE /api/v1/tasks/:id
// @access  Public
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'No task found',
      });
    }

    await task.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
