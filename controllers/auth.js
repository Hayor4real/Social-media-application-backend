import bcrypt from "bcrypt"; // this will allow us crypt our password
import jwt from "jsonwebtoken"; // this will give a way to send the user a web token
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body; //destructure the parameter from the req.body

    const salt = await bcrypt.genSalt(); // i will used the salt to crypt the password
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); //used this to send the user if the code above doesnot give error
  } catch (err) {
    res.status(500).json({ error: err.message }); // this will happen when something goes wrong
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // destructured email and password from req.body
    const user = await User.findOne({ email: email }); // use mongo to find the email
    if (!user) return res.status(400).json({ msg: "User does not exist. " }); //if user not found

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password; //delete so it doesnot send back to the frontend
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
