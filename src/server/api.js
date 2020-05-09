import express from 'express';
import bodyParser from 'body-parser';

const port = 3200;
const app = express();

app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const router = express.Router();

// move to db
let data = [];

router.get('/', function(req, res) {
  res.json({ message: 'hooray! we can build APIs!' });
});

// app.use('/api', router); // could namespace 
// I think would want two servers, one to load the app... another for the api, another for the client?
app.use('/v1', router);

// move to user controller file
router.get('/recipe', (req, res) => {
  res.json(data);
});

router.post('/recipe', (req, res) => {
  data.push(req.body);
  res.json(data);
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
