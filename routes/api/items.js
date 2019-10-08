const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Private

// router.post('/', auth, (req, res) => {
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description
  });

  newItem.save().then(item => res.json(item));
});

// @route   PUT api/items/:id
// @desc    Update A Item
// @access  Private

router.put('/:id', (req,res) => {
  let updated = {
    name: req.body.name,
    description: req.body.description
  }
  
  Item.findOneAndUpdate(
    { _id: req.params.id },
      updated
    ).then(result => {
      res.json("Successfully updated")
    })
    .catch(err => console.log('error',err))
  
});


// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private

// router.delete('/:id', auth, (req, res) => {
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
