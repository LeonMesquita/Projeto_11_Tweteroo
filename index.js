import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json());

const usersList = [];
const tweetsList = [];



server.post('/sign-up', (request, response) => {
   if(request.body.username !== "" && request.body.avatar !== ""){
      usersList.push(request.body);
      response.status(201).send('ok');
      }
   else
      response.status(400).send("Todos os campos são obrigatórios!");
});




server.post('/tweets', (request, response) => {
   const username = request.headers.user;
    const tweet = request.body.tweet;
    if (tweet !== ""){
      const user = usersList.find(newUser => newUser.username === username);
      const tweetObj = {
         username: username,
         tweet: tweet,
         avatar: user.avatar
      }
      tweetsList.push(
         tweetObj
      );
      response.status(201).send('ok');
    }
    else
      response.status(400).send("Todos os campos são obrigatórios!");
});


server.get('/tweets', (request, response) => {
   const page = parseInt(request.query["page"]);
   if (page > 0){
      const currentIndex = page === 1 ? tweetsList.length-1 : (tweetsList.length-1) - (page-1) * 10; 
      const lastTweets = [];
      let qtdOfTweets = 0;
      for (let count = currentIndex; count >= 0; count--){
         lastTweets.push(tweetsList[count]);
         qtdOfTweets++
         if(qtdOfTweets === 10)
               break;
      }
      response.send(lastTweets);       
    }
    else
      response.status(400).send("Informe uma página válida!");

});

server.get('/tweets/:username', (request, response) => {
   const username = request.params.username;
   const userTweets = tweetsList.filter(tweet => tweet.username === username);
   response.send(userTweets);
});

server.listen(5000);