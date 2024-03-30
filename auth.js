const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');

require("dotenv").config()

const prisma = new PrismaClient();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {
        console.log(err);

        if (err) return res.sendStatus(403);

        req.user = user;

        next(); 
    });
}


// Consider loading the JWT secret key from environment variables for security
const jwtSecretKey = (process.env.TOKEN_SECRET);

async function signUp(name, email, password, profile, userType) {
    const hashedPassword = await argon2.hash(password);
    try {
        console.log(email)

        const user = await prisma.admin.create({
            data: {
                email: email,
                name: name,
                profile,
                password: hashedPassword,
                userType 
            },
        });

        const token = await generateToken();
        console.log(token)
        return {
            "id" : user.id,
            "token" : token,
        };
    } catch (error) {
        console.log(error)
        if (error && error.code === 'P2002') {
            // Unique constraint violation (email already exists)
            return 'Email address is already in use.';
        } else {
            // Handle other errors
            throw error;
        }
    }
}
  
async function signIn(email, password) {
 
    const user = await prisma.admin.findUnique({
        where: {
            email: email, // Add this line to specify the email
        },
    });

    if (user && (await argon2.verify(user.password, password))) {
        const token = await generateToken(user.id);
        return {
            "id" : user.id,
            "token" : token,
        };
    } else {
        return "Invalid email or password";
    }
}

async function generateToken(id) {
    const data = {
        time: Date(),
        userId: id,
    };

    const token =  jwt.sign(data, jwtSecretKey);
    return token;
}

module.exports = {signUp,signIn}