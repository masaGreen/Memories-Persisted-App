const router = require("express").Router();
const Moment = require("../models/memories");


//getallmemories
router.get("/", async (req, res) => {
  tagName = req.query.tag;
  
  if (tagName) {
    try {
      const allMemories = await Moment.find({ tag: tagName });
      
      res.status(200).json(allMemories);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    try {
      const allMemories = await Moment.find();
      res.status(200).json(allMemories);
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

//creating a Moment

router.post("/", async (req, res) => {
  try {
    const newpost = new Moment(req.body);
    await newpost.save();

    res.status(201).json(newpost);
  } catch (error) {
    res.status(500).send(error);
  }
});

//updating a Moment

router.put("/:id", async (req, res) => {
  const exists = await Moment.findById(req.params.id);
  if (!exists)
    return res.status(404).send("moment to be updated doesn't exist");

  try {
    const updatedPost = await Moment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
    
  } catch (error) {
    res.status(500).send("somthing went wrong, try again");
  }
});

//deleting a resource

router.delete("/:id", async (req, res) => {
  const exists = await Moment.findById(req.params.id);
  if (!exists) return res.status(404).send("user  doesn't exist");
  try {
    await Moment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).send("somthing went wrong, try again");
  }
});

//get one resource
router.get("/:id", async (req, res) => {
  const exists = await Moment.findById(req.params.id);
  if (!exists) return res.status(404).send("user  doesn't exist");
  try {
    const memory = await Moment.findById(req.params.id);
   
    res.status(200).json(memory);
  } catch (error) {
    res.status(500).send("somthing went wrong, try again");
  }
});

module.exports = router;
