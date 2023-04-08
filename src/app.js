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
    if (!username) return res.sendStatus(400);

    if (typeof (username) != "string" || typeof (avatar) != "string") {
        return res.send("Todos os campos são obrigatórios!").status(400);
    }


    userArr.push(user);
    res.send("Ok").status(201);
})

app.post("/tweets", (req, res) => {
    const { tweet } = req.body;
    const { user } = req.headers;


    if (typeof (user) != "string" || typeof (tweet) != "string") {
        return res.send("Todos os campos são obrigatórios!").status(400);
    }

    if (!user || !userArr.find(t => t.username === user))
        return res.sendStatus(400);


    const savedTweet =
    {
        username: user,
        tweet: tweet
    }

    tweetArr.push(savedTweet);
    res.send("Ok").status(201);
})

app.get("/tweets", (req, res) => {
    const { page } = req.query;

    let recentTweetsArr = [];
    let lim;
    let start = 0;

    if (page < 1) return res.send("Informe uma página válida!").status(400);

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

    res.send(recentTweetsArr).status(200);

})

app.get("/tweets/:username", (req, res) => {
    const { username } = req.params;
    const AuxArr = tweetArr.filter((i) => i.username === username);
    res.send(AuxArr);

})

app.listen(5000);