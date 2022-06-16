import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());

server.use(express.json());

const usersList = [
    {
        username: 'bobesponja', 
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
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
       avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
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

server.get('/', (request, response) => {
    response.send(usersList);
});


server.post('/sign-up', (request, response) => {

  console.log(request.body)

    usersList.push(
      request.body
    );
    response.send('ok');
});


server.post('/tweets', (request, response) => {
    const username = request.body.username;
    const user = usersList.find(newUser => newUser.username === username);
    const tweetObj = {
        username: username,
        tweet: request.body.tweet,
        avatar: user.avatar
    }

    tweetsList.push(
        tweetObj
    );
    response.send('ok');

});

server.get('/tweets', (request, response) => {
    const lastTweets = [];
    let qtdOfTweets = 0;
    for (let count = tweetsList.length-1; count >= 0; count--){
        lastTweets.push(tweetsList[count]);
        qtdOfTweets++
        if(qtdOfTweets === 10)
            break;
    }
    response.send(lastTweets);
});

server.listen(5000);