import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello from the main router!");
});

router.get("/about", (req, res) => {
    res.send("About Us");
});

// POST request to add a user to the global users array in memory
const users = [];
router.post("/addUser", (req, res) => {
    const { name, email, role, profile } = req.body;
    
    // Check for required user information
    if (!name || !email || !role || !profile) {
        return res.status(400).send("Missing required user information");
    }
    
    // Check for profile details
    const { age, location, interests } = profile;
    if (!age || !location || !interests) {
        return res.status(400).send("Missing profile information");
    }

    const newUser = {
        name,
        email,
        role,
        profile: {
            age,
            location,
            interests
        }
    };

    users.push(newUser);
    res.send(`User added: ${JSON.stringify(newUser)}`);
    console.log(newUser);
});

export default router;

