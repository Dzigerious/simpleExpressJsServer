const express = require('express');
const app = express();
const fs = require(`fs`);
const path = require(`path`);
const moment = require('moment');
const morgan = require('morgan');
const multer = require('multer');

const port = 3000;

const upload = multer({dest: `uploads/`});
app.use(`/uploads`, express.static(path.join(__dirname, `uploads`)));

app.use(morgan('tiny')); //combined - ideal for production, dev - tiny + contant-length 

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

app.get('/api/data', (req, res) => {
    const filePath = path.join(__dirname, `api`, `data`, `students.json`);
    const students = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    res.status(200).json(students);
})

app.post('/upload', upload.single('file'), (req, res) => {
  const photoUrl = `/uploads/${req.file.filename}`;
  res.send(`<h2>Photo that u uploaded</h2> <img src="${photoUrl}" alt = "Uploaded photo">`);
})




app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});