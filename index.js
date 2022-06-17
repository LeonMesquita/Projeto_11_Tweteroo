import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());

server.use(express.json());

const usersList = [
    {
        username: 'bobesponja', 
		avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw_nkNsV5AxgWJmck8iIom70JkIno1QmDHUA&usqp=CAU",
    },
    {
        username: 'patrick', 
		avatar: "https://zonacuriosa.com/wp-content/uploads/2020/11/curiosidades-incriveis-sobre-o-patrick-estrela.jpg",
    },
    {
        username: 'molusco', 
		avatar: "https://www.correiodopovo.com.br/image/policy:1.380556:1573842729/lulaa%20.jpg.jpg?a=1%3A1&$p$a=9519e63",
    },
    
];

const tweetsList = [
    {
       username: "bobesponja",
       tweet: "eu amo o hub",
       avatar: usersList[0].avatar,
    },
    {
        username: "patrick",
        tweet: "teste 1",
        avatar: usersList[1].avatar,
     },
     {
        username: "molusco",
        tweet: "teste 2",
        avatar: usersList[2].avatar,
     },
     {
        username: "bobesponja",
        tweet: "teste 3",
        avatar: usersList[0].avatar,
     },
     {
        username: "patrick",
        tweet: "teste 4",
        avatar: usersList[1].avatar,
     },
     {
        username: "molusco",
        tweet: "teste 5 ",
        avatar: usersList[2].avatar,
     },
     {
        username: "patrick",
        tweet: "teste 6",
        avatar: usersList[1].avatar,
     },
     {
        username: "patrick",
        tweet: "teste 7",
        avatar: usersList[1].avatar,
     },
     {
        username: "patrick",
        tweet: "teste 8",
        avatar: usersList[1].avatar,
     },
     {
        username: "patrick",
        tweet: "teste 9",
        avatar: usersList[1].avatar,
     },
     {
        username: "patrick",
        tweet: "teste 10",
        avatar: usersList[1].avatar,
     },

     {
        username: "bobesponja",
        tweet: "teste 11",
        avatar: usersList[0].avatar,
      },
      {
        username: "molusco",
        tweet: "teste 12",
        avatar: usersList[2].avatar,
     },
   
             
];


let tweetsIndex = tweetsList.length-1;

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
    console.log(request.headers)

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
      const limit = 10 * page;
      const currentIndex = page === 1 ? tweetsList.length - page : (tweetsList.length-1) - (page-1) * 10; 
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