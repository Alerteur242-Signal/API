
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;

    if (!req.body.userId || req.body.userId !== userId) {
      res.status(200).json({ code : "error", message : 'API access prohibited, token is expired' })
    } else {
      next();
    }
    
  }catch {
    res.status(200).json({
      error: 'Invalid request !'
    });
  }
};