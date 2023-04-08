import express from "express"
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());

let userArr = [];
let tweetArr = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    const user =
    {
        username: username,
        avatar: avatar
    }

    if (typeof (username) != "string" || typeof (avatar) != "string" || !username || !avatar) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }


    userArr.push(user);
    res.status(201).send("Ok");
})

app.post("/tweets", (req, res) => {
    const { tweet } = req.body;
    const { user } = req.headers;


    if (typeof (user) != "string" || typeof (tweet) != "string" || !user || !tweet) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    if (!userArr.find(t => t.username === user)) {
        return res.sendStatus(401);
    }

    const savedTweet =
    {
        username: user,
        tweet: tweet
    }

    tweetArr.push(savedTweet);
    res.status(201).send("Ok");
})

app.get("/tweets", (req, res) => {
    const { page } = req.query;

    let recentTweetsArr = [];
    let lim;
    let start = 0;

    if (page < 1) return res.status(400).send("Informe uma página válida!");

    if (page && page >= 1) {
        lim = page * 10;
        start = lim - 10;
    } else if (tweetArr.length >= 10) {
        lim = 10;
    } else {
        lim = tweetArr.length;
    }
    for (let i = start; i < lim; i++) {
        let recentTweet =
        {
            username: tweetArr[i].username,
            avatar: userArr.find(t => t.username === tweetArr[i].username).avatar,
            tweet: tweetArr[i].tweet
        }
        recentTweetsArr.push(recentTweet);
    }

    res.status(200).send(recentTweetsArr);

})

app.get("/tweets/:username", (req, res) => {
    const { username } = req.params;
    const AuxArr = tweetArr.filter((i) => i.username === username);
    res.send(AuxArr);

})

app.listen(5000);