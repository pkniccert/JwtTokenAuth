const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      return res.status(400).json({ 'status': 'error', 'message': 'All input is required' });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).json({ 'status': 'error', 'message': 'User Already Exist. Please Login' });
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    return res.status(201).json({ 'status': 'success', 'user': user });
  } catch (err) {
    return res.status(400).json({ 'status': 'error', 'message': err })
  }
  // Our register logic ends here
};

// Login
exports.signin = async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).json({ 'status': 'error', 'message': 'All input is required' });
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json({ 'status': 'success', 'user': user });
    }
    return res.status(401).send({ 'status': 'error', 'message': 'Invalid Credentials' });
  } catch (err) {
    return res.status(400).json({ 'status': 'error', 'message': err });
  }
  // Our register logic ends here
};

exports.logout = async (req, res) => {
  // Assuming you have retrieved the token from the request
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ 'status': 'error', 'message': 'Token not provided' });
  }
    
  // Set the expiration time to the current time or a past date
  const expiredToken = jwt.sign({}, process.env.TOKEN_KEY, { expiresIn: 0 });

  // Return the expired token as a response
  return res.status(200).json({ 'status': 'success', 'message': 'Logout successful', 'token': expiredToken});
}

exports.getUser = async (req, res) => {
  try {
    const allUser = await User.find({});
    return res.status(200).json({ 'status': 'success', 'users': allUser });
  } catch (err) {
    return res.status(400).json({ 'status': 'error', 'message': err });
  }
}
