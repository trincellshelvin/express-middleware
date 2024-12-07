import express from "express";
import authUser from "./middleware/authUser.js";
import { logRequestDetails } from "./middleware/authUser.js";
import limiter from "./middleware/rateLimiter.js";
import { logRequestInfo } from "./middleware/logRequestInfo.js";

const app = express();
app.use(express.json());
app.use(limiter);
app.use(logRequestDetails);
app.use(authUser);
app.use(logRequestInfo);


const contacts = [];

const about = {
    "info": "This is the about page."
};

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/about", (req, res) => {
    res.json(about);
});

app.post("/contact", (req, res) => {
    const contactsData = req.body;
    if (contactsData.name && contactsData.email) {
        contacts.push(contactsData);
        const id = contacts.length - 1;
        console.log(`contacts added: ${contactsData.name}`);
        res.status(200).send({ id, ...contactsData });
    } else {
        res.status(400).send({
            error: "contacts information required"
        })
    }
});

app.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const contactsData = contacts[id];
    if (contactsData) {
        res.json(contactsData);
    } else {
        res.status(404).send({
            error: "User not found"
        });
    }
    console.log(`User ID requested: ${id}`);
});

app.post('/user', (req, res) => {
    const { id, name, email, role, profile } = req.body;
    if (contacts[id]) { return res.status(400).json({ error: "User already exists" }); }
    contacts[id] = { id, name, email, role, profile };
    res.status(201).json(contacts[id]);
}); app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

app.get("/search", (req, res) => {
    const term = req.query.term;
    const sort = req.query.sort;
    res.json({
        term: term,
        sort: sort
    });
});

app.use((req, res) => {
    res.status(404).send({
        error: "Not Found"
    });
});

app.listen(3000, () => {
    console.log("Express server initialized");
})