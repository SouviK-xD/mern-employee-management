const jwt = require('jsonwebtoken');
const User = require('../models/User');

// const registerUser = async (username, password) => {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, password: hashedPassword });
//     return await user.save();
// };

const authenticateUser = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
        throw new Error('Invalid login details');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, username: user.username };
};


module.exports = {
    // registerUser,
    authenticateUser,
};
