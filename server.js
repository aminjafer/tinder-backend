import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors'
import config from 'config'

// App Config 
const app = express();
const port = process.env.PORT || 8001;
const dbPass = config.get('mongodb.password');
const connection_url = `mongodb+srv://admin:${dbPass}@cluster0.sgblzhf.mongodb.net/tinderdb?retryWrites=true&w=majority`

// Middleware
app.use(express.json());
app.use(Cors());

// DB Config
//mongodb+srv://admin:<password>@cluster0.sgblzhf.mongodb.net/?retryWrites=true&w=majority
// mongoose.connect(connection_url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
// })
mongoose.connect(connection_url);

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello Clever Person!!"));

app.post("/tinder/cards", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if(err) {
            res.status(500).send(err.message);
            console.log(err);
        } else {
            res.status(201).send(data)
        }
    });
});

app.get("/tinder/cards", (req, res) => {

    Cards.find((err, data) => {
        if(err) {
            res.status(500).send(err.message)
        } else {
            res.status(200).send(data)
        }
    });
});

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));