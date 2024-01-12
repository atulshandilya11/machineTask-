const User = require('../model/User');
const bcrypt = require('bcrypt');
const geolib = require('geolib');
const uploadOnCloudinary = require('../utils/cloudinary');
const create_token = require('../utils/generateToken');

const userController = {
  oneUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  allUser: async (req, res) => {
    try {
      const allUsers = await User.find();
      res.json(allUsers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  registerUser: async (req, res) => {
    const {
      name,
      email,
      password,
      phone,
      mobile,
      zipCode,
      lat,
      long,
    } = req.body;

    const profilePicLocalPath = req.file?.path;
    const pic = await uploadOnCloudinary(profilePicLocalPath);
    const profilePic = pic.url;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      mobile,
      zipCode,
      profilePic,
      lat,
      long,
    });

    try {
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        bcrypt.compare(
          password,
          user.password,
          async (err, response) => {
            if (err) {
              res.json('The password is incorrect');
            }
            if (response) {
              const tokenData = await create_token(user._id);
              const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { $set: { token: tokenData } }
              );

              return res.json(updatedUser);
            }
          }
        );
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  fetchThreeNearUser: async (req, res) => {
    const currentUser = await User.findById(req.params.userId);

    const { lat, long } = currentUser;
    try {
      const nearestUsers = await User.find({
        _id: { $ne: currentUser._id },
        lat: { $exists: true },
        long: { $exists: true },
      });

      const usersWithDistance = nearestUsers.map((user) => ({
        ...user.toObject(),
        distance: geolib.getDistance(
          { latitude: lat, longitude: long },
          { latitude: user.lat, longitude: user.long }
        ),
      }));

      const sortedNearestUsers = usersWithDistance
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);
      const mappedUsers = sortedNearestUsers.map((user) => ({
        name: user.name,
        profilePic: user.profilePic,
        email: user.email,
        zipCode: user.zipCode,
      }));

      res.json(mappedUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  updateUser: async (req, res) => {
    const {
      name,
      email,
      password,
      phone,
      mobile,
      zipCode,
      profilePic,
    } = req.body;

    try {
      const user = await User.findById(req.params.userId);

      if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.mobile = mobile || user.mobile;
        user.zipCode = zipCode || user.zipCode;
        user.profilePic = profilePic || user.profilePic;

        if (password) {
          user.password = await bcrypt.hash(password, 10);
        }
        const updatedUser = await user.save();
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = userController;
