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
];

const tweetsList = [
    {
       username: "bobesponja",
       tweet: "eu amo o hub",
       avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",

    }
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
   
    response.send(tweetsList);
});

server.listen(5000);