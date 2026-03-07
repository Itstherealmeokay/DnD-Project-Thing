import express from 'express';
import Character from '../models/character.models.js';
import Class from '../models/class.models.js';

const router = express.Router();

const calculateDefaultHitPoints = async ({ classId, level, constitution }) => {
    let defaultHitPoints = 1;

    if (!classId) {
        return defaultHitPoints;
    }

    const selectedClass = await Class.findById(classId);
    if (!selectedClass) {
        return defaultHitPoints;
    }

    const classHitDie = Number(selectedClass.hitDie ?? selectedClass.hitdie ?? 0);
    const safeLevel = Number(level ?? 1);
    const constitutionModifier = Math.floor((Number(constitution ?? 10) - 10) / 2);
    const hitDieBonus = Math.floor(((classHitDie / 2) + 1) * (safeLevel - 1));

    defaultHitPoints = classHitDie + hitDieBonus + (constitutionModifier * safeLevel);
    return defaultHitPoints;
};

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
    try {
        const defaultHitPoints = await calculateDefaultHitPoints({
            classId: req.body.class,
            level: req.body.level,
            constitution: req.body.constitution,
        });

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
            maxHitPoints: req.body.maxHitPoints ?? defaultHitPoints,
            currentHitPoints: req.body.currentHitPoints ?? req.body.maxHitPoints ?? defaultHitPoints,
            /*equipment: req.body.equipment,
            spells: req.body.spells,*/
        });

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

        if (character.maxHitPoints == undefined || character.currentHitPoints == undefined) {
            const defaultHitPoints = await calculateDefaultHitPoints({
                classId: character.class,
                level: character.level,
                constitution: character.constitution,
            });

            if (character.maxHitPoints == undefined) {
                character.maxHitPoints = defaultHitPoints;
            }
            if (character.currentHitPoints == undefined) {
                character.currentHitPoints = character.maxHitPoints;
            }
        }
        
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
        if (req.body.maxHitPoints !=undefined) {
            character.maxHitPoints = req.body.maxHitPoints;
        }
        if (req.body.currentHitPoints !=undefined) {
            character.currentHitPoints = req.body.currentHitPoints;
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