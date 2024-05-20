const express = require('express');
const router = express.Router();
const Equipaments = require('../models/Equipaments');

router.post('/', async (req, res) => {
    const { tag, data, latitude, longitude, type } = req.body;

    try {
        const newEquipament = await Equipaments.create({ tag, data, latitude, longitude, type });
        res.status(201).json(newEquipament);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const equipaments = await Equipaments.findAll();
        res.status(200).json(equipaments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
        const equipament = await Equipaments.findByPk(id);
  
        if (!equipament) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
    
        await equipament.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { tag, data, latitude, longitude, type } = req.body;
    
    try {
        const equipament = await Equipaments.findByPk(id);
    
        if (!equipament) {
            return res.status(404).json({ message: 'Equipamento não encontrado' });
        }
    
        equipament.tag = tag !== undefined ? tag : equipament.tag;
        equipament.data = data !== undefined ? data : equipament.data;
        equipament.latitude = latitude !== undefined ? latitude : equipament.latitude;
        equipament.longitude = longitude !== undefined ? longitude : equipament.longitude;
        equipament.type = type !== undefined ? type : equipament.type;
  
        await equipament.save();
        res.status(200).json(equipament);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
        const equipament = await Equipaments.findByPk(id);
    
        if (!equipament) {
            return res.status(404).json({ message: 'Equipamento não encontrado' });
        }
    
        res.status(200).json(equipament);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;