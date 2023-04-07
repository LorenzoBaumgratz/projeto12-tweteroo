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

    userArr.push(user);
    res.send("Ok");
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;

    if (!username || !userArr.find(t => t.username === username))
        return res.send("UNAUTHORIZED");

    const savedTweet =
    {
        username: username,
        tweet: tweet
    }

    tweetArr.push(savedTweet);
    res.send("Ok");
})

app.get("/tweets", (req, res) => {
    let recentTweetsArr = [];
    let lim;
    if (tweetArr.length >= 10) {
        lim=10;
    }else{
        lim=tweetArr.length;
    }
    for (let i = 0; i < lim; i++) {
        let recentTweet =
        {
            username: tweetArr[i].username,
            avatar: userArr.find(t => t.username === tweetArr[i].username).avatar,
            tweet: tweetArr[i].tweet
        }
        recentTweetsArr.push(recentTweet);
    }

    res.send(recentTweetsArr)

})

app.listen(5000);