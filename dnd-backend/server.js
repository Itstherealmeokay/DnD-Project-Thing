const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Basic route to test server
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const mongoose = require('mongoose');
const e = require('express');

const equipmentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: false},
    description: {type: String},
    weight: {type: Number},
    cost: {type: Number},
    //rarity: common, uncommon, rare, very rare, legendary, artifact
    rarity: {type: String,
        enum: ['common', 'uncommon', 'rare', 'very rare', 'legendary', 'artifact'],
        default: 'common'
    },

    // Charges if applicable
    charges: {type: Number},
    recharge_long_rest: {type: Boolean},
    recharge_short_rest: {type: Boolean},

    // For weapons
    damage: {type: String},
    damageType: {type: String},
    properties: [{type: String}],

    // For armor
    armorClass: {type: Number},
    armorType: {type: String},
   
});

spellSchema = new mongoose.Schema({
    name: {type: String, required: true},
    level: {type: Number, required: true, min: 0, max: 9},
    school: {type: String, required: true},

    castingTime: {type: String, required: true},
    range: {type: String, required: true},
    components: {
        verbal: {type: Boolean, required: true},
        somatic: {type: Boolean, required: true},
        material: {type: Boolean, required: true},
    },

    duration: {type: String, required: true},
    description: {type: String, required: true},
    higherLevel: {type: String},
});

const characterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    class: {type: String, required: true},
    level: {type: Number, required: true, min: 1, max: 20},
    background: {type: String},
    playerName: {type: String},
    race: {type: String, required: true},
    alignment: {type: String, required: false},
    
    //ability scores
    strength: {type: Number, required: true, min: 1, max: 20},
    dexterity: {type: Number, required: true, min: 1, max: 20},
    constitution: {type: Number, required: true, min: 1, max: 20},
    intelligence: {type: Number, required: true, min: 1, max: 20},
    wisdom: {type: Number, required: true, min: 1, max: 20},
    charisma: {type: Number, required: true, min: 1, max: 20},
    proficiencyBonus: {type: Number, required: true},

    equipment: [equipmentSchema],
    spells: [spellSchema],
});

app.post('/characters', async (req, res) => {
    try {
        const { name, class: characterClass, level, race, strength, dexterity, constitution, intelligence, wisdom, charisma, proficiencyBonus, equipment, spells } = req.body;
        const character = new Character({
            name,
            class: characterClass,
            level,
            race,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            proficiencyBonus,
            equipment,
            spells
        });
        await character.save();
        res.status(201).json({ message: 'Character created successfully', character });
    } catch (err) {
        res.status(400).json({ error: "Error creating character", details: err.message });
    }
});

// GET to fetch all characters
app.get('/characters', async (req, res) => {
    try {
        const characters = await Character.find();
        res.json(characters);
    } catch (err) {
        res.status(500).json({ error: "Error fetching characters", details: err.message });
    }
});