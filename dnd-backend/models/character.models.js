import mongoose from 'mongoose';

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
    //equipment: [equipmentSchema], 
    //spells: [spellSchema], 
});

const Character = mongoose.model('Character', characterSchema);

export default Character;