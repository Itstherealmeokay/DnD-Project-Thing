import express from 'express';
import Class from '../models/class.models.js';

const router = express.Router();

// Get all classes
router.get('/', async (req, res) => {
    try {
        const classes = await Class.find();
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single class by ID
router.get('/:id', async (req, res) => {
    try {
        const classData = await Class.findById(req.params.id);
        if (!classData) return res.status(404).json({ message: 'Class not found' });
        res.json(classData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new class
router.post('/', async (req, res) => {
    const classData = new Class({
        name: req.body.name,
        hitDie: req.body.hitDie,
        armorProficiencies: req.body.armorProficiencies,
        weaponProficiencies: req.body.weaponProficiencies,
        savingThrows: req.body.savingThrows,
        skills: req.body.skills,
        classFeatures: req.body.classFeatures,
    });

    try {
        const newClass = await classData.save();
        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a class
router.patch('/:id', async (req, res) => {
    try {
        const classData = await Class.findById(req.params.id);
        if (!classData) return res.status(404).json({ message: 'Class not found' });

        if (req.body.name != undefined) classData.name = req.body.name;
        if (req.body.hitDie != undefined) classData.hitDie = req.body.hitDie;
        if (req.body.armorProficiencies != undefined) classData.armorProficiencies = req.body.armorProficiencies;
        if (req.body.weaponProficiencies != undefined) classData.weaponProficiencies = req.body.weaponProficiencies;
        if (req.body.savingThrows != undefined) classData.savingThrows = req.body.savingThrows;
        if (req.body.skills != undefined) classData.skills = req.body.skills;
        if (req.body.classFeatures != undefined) classData.classFeatures = req.body.classFeatures;

        const updatedClass = await classData.save();
        res.json(updatedClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a class
router.delete('/:id', async (req, res) => {
    try {
        await Class.findByIdAndDelete(req.params.id);
        res.json({ message: 'Class deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
