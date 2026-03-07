import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hitDie: {
    type: Number,
    required: true,
  },
  armorProficiencies: {
    type: [String],
    required: true,
  },
  weaponProficiencies: {
    type: [String],
    required: true,
  },
  savingThrows: {
    type: [String],
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  classFeatures: {
    type: [String], // Assuming class features are strings
    required: true,
  },
});

export default mongoose.model("Class", classSchema);