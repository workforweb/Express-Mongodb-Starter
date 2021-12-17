require('dotenv').config();
const express = require('express');
const db = require('./models');
const User = require('./models/users');

const app = express();

const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add new User

app.post('/users', async (req, res) => {
  try {
    let { firstname, lastname, email } = req.body;

    const user = await new User({ firstname, lastname, email });

    const result = await user.save();

    return res.status(201).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ status: false, errors: error });
  }
});

// List all Users

app.get('/users', async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json({ status: true, data: user });
  } catch (error) {
    res.status(500).json({ status: false, errors: error });
  }
});

// Search a single User

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json({ status: true, data: user });
  } catch (error) {
    res.status(500).json({ status: false, errors: error });
  }
});

// Update an User

app.put('/users/:id', async (req, res) => {
  try {
    let { firstname, lastname, email } = req.body;

    const user = await User.findOne({ _id: req.params.id });

    if (!user) return res.status(404).json({ status: false, error: 'No User' });

    user.firstname = firstname ? firstname : user.firstname;
    user.lastname = lastname ? lastname : user.lastname;
    user.email = email ? email : user.email;

    const updatedUser = await user.save();

    return res.status(200).json({ status: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ status: false, errors: error });
  }
});

// Delete an User

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) return res.status(404).json({ status: false, error: 'No User' });

    await user.remove();
    return res
      .status(200)
      .json({ status: true, msg: 'User deleted successfully!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, errors: error });
  }
});

app.listen(port, () => {
  try {
    console.log(`Server started on http://localhost:${port}`);
    db.once('open', function () {
      console.log('Connected to Mongoose');
    });
  } catch (error) {
    db.on('error', console.error.bind(console, 'connection error:'));
  }
});
