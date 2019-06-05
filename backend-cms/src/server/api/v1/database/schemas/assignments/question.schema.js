import mongoose from 'mongoose';

const Base = require('./base.schema');

const Question = Base.discriminator('Question', new mongoose.Schema(
  {
    question: { type: String, required: true },
    posibilities: { type: Array, required: true },
    answer: { type: Number, required: true }
  }),
);

module.exports = mongoose.model('Question');