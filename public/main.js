const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const JWT_SECRET = "HARSH12342"; // Define a secret key for JWT

const users = []; // Changed 'user' to 'users' for clarity

// Signup route
app.post("/SignUp", (req, res) => {
    const { username, password } = req.body;

    users.push({ username, password });

    res.json({
        message: "You just signed up!"
    });
});

// Signin route
app.post("/Signin", (req, res) => {
    const { username, password } = req.body;

    let foundUser = users.find(user => user.username === username && user.password === password);

    if (!foundUser) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
});
app.get("/",(req , res)=>{
    res.sendFile(__dirname+"/index.html")
})
// Protected route
app.get("/me", (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const userDetails = jwt.verify(token, JWT_SECRET);
        const foundUser = users.find(user => user.username === userDetails.username);

        if (!foundUser) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        res.json({ username: foundUser.username });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
});

// Start server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
