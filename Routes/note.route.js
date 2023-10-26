const express = require("express");
const { auth } = require("../Middleware/auth.middleware");
const { NoteModel } = require("../Model/note.model");

const noteRouter = express.Router();
noteRouter.use(auth);

noteRouter.post("/create", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "note has been registered" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ username: req.body.username });
    res.status(200).send(notes);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

noteRouter.patch("/update/:noteID", async(req, res) => {
  // if(userid in the notes collection  === user id  in the user collection ){
  //     update
  // }else{
  //     not authorised
  // }
  const { noteID } = req.params;
  const note = await NoteModel.findOne({_id:noteID})
  try {
    if(req.body.userID == note.userID){
        await NoteModel.findIdAndUpdate({_id:noteID},req.body)
        res.status(200).send({"msg" : `The Note with id ${noteID} was updated`})
    }
  } catch (err) {
    res.status(400).send({"error" : err});
  }
});

noteRouter.delete("/delete/:noteID", async(req, res) => {
  // if(userid in the notes collection  === user id  in the user collection ){
  //     delete
  // }else{
  //     not authorised
  // }

  const { noteID } = req.params;
  const note = await NoteModel.findOne({_id:noteID})
  try {
    if(req.body.userID == note.userID){
        await NoteModel.findIdAndDelete({_id:noteID})
        res.status(200).send({"msg" : `The Note with id ${noteID} was Deleted`})
    }
  } catch (err) {
    res.status(400).send({"error" : err});
  }

});

module.exports = {
  noteRouter,
};
