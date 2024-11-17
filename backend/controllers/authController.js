const { registerUser, authenticateUser } = require('../services/authService');

// const register = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Server-side validation
//         if (!username || !password) {
//             return res.status(400).json({ message: 'Username and password are required' });
//         }

//         await registerUser(username, password);
//         res.status(201).send('User created');
//     } catch (err) {
//         res.status(400).send(err.message);
//     }
// };

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Server-side validation
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const result = await authenticateUser(username, password);
        res.json(result); // Send token and username
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


module.exports = {
    // register,
    login,
};
