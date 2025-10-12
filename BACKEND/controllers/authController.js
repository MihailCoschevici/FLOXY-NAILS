const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
      
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Utente già esistente" });
        }

       
        user = new User({
            email,
            password,
        });

        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        
        
        res.status(201).json({ message: "Utente registrato con successo" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Errore del server");
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Credenziali non valide" });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Credenziali non valide" });
        }

        
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, 
            { expiresIn: '10h' }, 
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Errore del server");
    }
};