import mongoose from 'mongoose';
import Class from './class.models.js';

const characterSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    class: {type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true}, 
    level: {type: Number, required: true, min: 1, max: 20}, 
    background: {type: String}, 
    race: {type: String, required: true}, 
    alignment: {type: String, required: false},

    strength: {type: Number, required: true, min: 1, max: 30}, 
    dexterity: {type: Number, required: true, min: 1, max: 30}, 
    constitution: {type: Number, required: true, min: 1, max: 30}, 
    intelligence: {type: Number, required: true, min: 1, max: 30}, 
    wisdom: {type: Number, required: true, min: 1, max: 30}, 
    charisma: {type: Number, required: true, min: 1, max: 30}, 

    proficiencyBonus: {type: Number, required: true}, 

    currentHitPoints: {type: Number, required: true},
    maxHitPoints: {type: Number, required: true},
    hitDie: {type: Number, required: false, default: 8},
    hitDieAmount: {type: Number, required: false, default: 1},
    safeHitDieAmount: {type: Number, required: false, default: 1},
    overrideHitPoints: {type: Boolean, required: false, default: false},

    skillProficiencies: [{type: String}],

    //equipment: [equipmentSchema], 
    //spells: [spellSchema], 
});

const Character = mongoose.model('Character', characterSchema);

export default Character;