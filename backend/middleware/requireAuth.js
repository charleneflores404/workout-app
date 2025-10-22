const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  // verify that user is authenticated
  // in the frontend, we add the authorization prop in the request header we send
  // which will be the token
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  // the authorization has the form 'Bearer <token>'
  // so we split it by space and access the second element in the array'
  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET); // returns the user payload, we only grab the _id

    // add a user prop in the req object containing only the id
    // to later use this in the controller functions
    // mainly to filter the workouts by id so that the displayed workouts are unique to the user
    req.user = await User.findOne({ _id }).select('_id');
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
