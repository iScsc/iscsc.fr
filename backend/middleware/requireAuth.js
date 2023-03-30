const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers
  if (!authorization) {
    res.status(401).json({ error: 'Authorization token required' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findOne({ _id }).select('_id username')
    next()
  } catch (err) {
    res.status(401).json({ error: 'Request not authorized' })
  }
}

module.exports = requireAuth
