import express from 'express';
import Character from '../models/character.models.js';

const router = express.Router();

//Get all characters
router.get('/', async (req, res) => {
    try {
        const characters = await Character.find().populate('class');
        res.json(characters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new character
router.post('/', async (req, res) => {
    const character = new Character({
        name: req.body.name,
        class: req.body.class,
        level: req.body.level,
        background: req.body.background,
        race: req.body.race,
        alignment: req.body.alignment,
        strength: req.body.strength,
        dexterity: req.body.dexterity,
        constitution: req.body.constitution,
        intelligence: req.body.intelligence,
        wisdom: req.body.wisdom,
        charisma: req.body.charisma,
        proficiencyBonus: req.body.proficiencyBonus,
        /*equipment: req.body.equipment,
        spells: req.body.spells,*/
    });

    try {
        const newCharacter = await character.save();
        await newCharacter.populate('class');
        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Update a character

router.patch('/:id', async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) return res.status(404).json({ message: 'Character not found' });
        
        if (req.body.name !=undefined) {
            character.name = req.body.name;
        }
        if (req.body.class !=undefined) {
            character.class = req.body.class;
        }
        if (req.body.level !=undefined) {
            character.level = req.body.level;
        }
        if (req.body.background !=undefined) {
            character.background = req.body.background;
        }
        if (req.body.race !=undefined) {
            character.race = req.body.race;
        }
        if (req.body.alignment !=undefined) {
            character.alignment = req.body.alignment;
        }
        if (req.body.strength !=undefined) {
            character.strength = req.body.strength;
        }
        if (req.body.dexterity !=undefined) {
            character.dexterity = req.body.dexterity;
        }
        if (req.body.constitution !=undefined) {
            character.constitution = req.body.constitution;
        }
        if (req.body.intelligence !=undefined) {
            character.intelligence = req.body.intelligence;
        }
        if (req.body.wisdom !=undefined) {
            character.wisdom = req.body.wisdom;
        }
        if (req.body.charisma !=undefined) {
            character.charisma = req.body.charisma;
        }
        if (req.body.proficiencyBonus !=undefined) {
            character.proficiencyBonus = req.body.proficiencyBonus;
        }
        /*if (req.body.equipment !=undefined) {
            character.equipment = req.body.equipment;
        }
        if (req.body.spells !=undefined) {
            character.spells = req.body.spells;
        }*/

        const updatedCharacter = await character.save();
        await updatedCharacter.populate('class');
        res.json(updatedCharacter);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a character
router.delete('/:id', async (req, res) => {
    try {
        await Character.findByIdAndDelete(req.params.id);
        res.json({ message: 'Character deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//View Character Details
router.get('/:id', async (req, res) => {
    try {
        const character = await Character.findById(req.params.id).populate('class');
        if (!character) return res.status(404).json({ message: 'Character not found' });
        res.json(character);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;