const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add title'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Please add some description'],
  },
  status: {
    type: String,
    required: [true],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
