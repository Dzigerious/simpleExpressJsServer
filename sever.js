const express = require('express');
const app = express();
const port = 3000;
const moment = require('moment');

app.use((req, res, next) => {
    console.log(`Used method:  ${req.method}`);
    console.log(`Req was did on: ${req.url}`);
    console.log(`The time of req: ` + moment().format('HH:mm:ss'));
    next()
})

app.use((req, res, next) => {
    const token = req.query.token;
    console.log(`The token is: ${token}`);

    if(!token){
        console.log(`There is no token in the program!!!`);
        return res.status(403).send({message: `forbidden`})
        }
    next();
    })

app.use(express.static(__dirname + `/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/user/:name', (req, res) => {
  const { name } = req.params;
  res.send(`Hello, ${name}`);
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  res.json({ message: `Welcome, ${username}!` })
});




app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});