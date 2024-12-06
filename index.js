import express from "express";

const app = express();

app.use(express.json());

const contacts = [];

const about = {
    "info": "This is the about page."
};

app.get("/", (req, res) => {
    res.send("Hello!");
});

app.get("/about", (req, res) => {
    res.json(about);
});

app.post("/contact", (req, res) => {
    const contactsData = req.body;
    if (contactsData.name && contactsData.email) {
        contacts.push(contactsData);
        const id = contacts.length -1;
        console.log(`contacts added: ${contactsData.name}`);
        res.status(200).send({id, ...contactsData});
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

app.get("/search", (req,res) => {
    const term = req.query.term;
    const sort = req.query.sort;
    res.json({
        term: term,
        sort: sort
    });
});

app.use((req,res)=> {
    res.status(404).send({
        error: "Not Found"
    });
});

app.listen(3000, () => {
    console.log("Express server initialized");
})