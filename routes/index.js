const express = require('express');
const router = express.Router();

const items = [];
var id = 1;

// This route GET list of shopping items.
router.get('/items', (req, res, next) => {
    res.status(200).json(items);
});

// This route allow addition to the shopping list.
router.post('/items', (req, res, next) => {
    items.push({
        itemName: req.body.itemName,
        itemPrice: req.body.price,
        id: ++id
    });
    res.status(201).json({message: "Item Created."});
});

//This route  display a single item in the shopping list
router.get('/items/:id', (req, res, next) => {
    const item = items.find( item => item.id === +req.params.id);
    res.status(200).json(item);
});

// This route allow modification of existing item.
router.patch('/items/:id', (req, res, next) => {
    const item = items.find( item => item.id === +req.params.id );
    item.itemName = req.body.itemName;
    item.itemPrice = req.body.price;

    res.status(201).json({message: "Item updated."});
});

// This route allow removal(deletion) of an item from the array.
router.delete('/items/:id', (req, res, next) => {
    const itemIndex = items.findIndex( item => item.id === +req.params.id );
    items.splice(itemIndex, 1);

    res.status(200).json({message: "Item deleted."});
});


module.exports = router;