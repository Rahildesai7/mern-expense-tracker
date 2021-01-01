const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    category :{
        type: String,
        trim: true,
        required: 'Category is required'
    },
    amount: {
        type: Number,
        required: 'Amount is required',
        min: 0
    },
    title: {
        type: String,
        trim: true,
        required: 'Title is required'
    },
    incurred_on: {
        type: Date,
        default: Date.now
      },
    notes: {
        type: String,
        trim: true
      },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
      },
    recordedBy: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    }
});

module.exports = mongoose.model('Expense',expenseSchema); 