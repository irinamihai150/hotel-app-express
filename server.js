const express = require("express");
const app = express();
app.use(express.json());
const { v4: uuidv4 } = require("uuid");

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");
app.get("/", function (req, res) {
  res.send("Hotel booking");
});
//read all bookings
app.get("/bookings", (req, res) => {
  res.send(bookings);
});
app.post("/bookings", (req, res) => {
  //validate our input
  const newBooking = req.body;
  newBooking.id = bookings.length + 1;
  //build our booking
  for (let field in newBooking) {
    if (!newBooking[field]) {
      res.status(400).send("Please fill out all fields");
    } else {
      bookings.push(newBooking);
      res.status(201).json(newBooking);
    }
  }
});

app.get("/bookings/:id", (req, res) => {
  const bookingId = parseInt(req.params.id);
  res.json(bookings.find((b) => b.id === bookingId));
});
app.delete("/bookings/:id", (req, res) => {
  const bookingId = bookings.find((b) => b.id === parseInt(req.params.id));
  if (!bookingId)
    return res.status(404).send("The booking with the given ID was not found.");
  const index = bookings.indexOf(bookingId);
  //delete
  bookings.splice(index, 1);
  res.send(bookingId);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
