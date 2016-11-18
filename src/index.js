import express from 'express';    // import all required variables and functions from EXISTING libraries
import cors from 'cors';
import fetch from 'node-fetch';
import PComp from './PC_import';
import { objectPathResolver} from './resolver'

                            // assigning all required objects
const app = express();      // init express
app.use(cors());            // init cors
const model = new PComp;


app.get('/', (req, res) => {        // this app is giving the default response
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2A', (req, res) => {     // this app is summing two constants specified in the query
  const a = Number(req.query.a) || 0;
  const b = Number(req.query.b) || 0;
  var sum = a+b;
  res.send(String(sum));
});

app.get('/task2B', function (req, res)  {    // this app is reading the name specified in the query
  const a = String(req.query.fullname) ;
  if (!!a)
  {var arr = a.split(' ');
  if (arr.length==3) {
  if (!!arr[2]) {var surname = arr[2] + ' ' } else {var surname = ''};
  if (!!arr[0]) {var f_name = arr[0][0] + '. '} else {var f_name = ''};
  if (!!arr[1]) {var s_name = arr[1][0] + '.'} else {var s_name = ''};
  res.send(surname + f_name + s_name );
  }
  else if (arr.length==2) {
  if (!!arr[1]) {var surname = arr[1] + ' ' } else {var surname = ''};
  if (!!arr[0]) {var f_name = arr[0][0] + '.'} else {var f_name = ''};
  res.send(surname + f_name);
  }
  else if (arr.length==1) {
  if (!!arr[0]) {var surname = arr[0] } else {var surname = ''};
  res.send(surname);
  }
  else {res.send('Invalid fullname');}
}
else {
  res.send('Invalid fullname');
}
});


// task3A (1)
app.get('/task3A/volumes', (req, res) => {
  if (model.isEmpty()) return res.send('Model is empty', 404);

  let assignHdds = {};
  model.attributes.hdd.forEach((hdd) => {
    assignHdds[hdd.volume] = assignHdds[hdd.volume] || 0;
    assignHdds[hdd.volume] = parseInt(assignHdds[hdd.volume]) + hdd.size + `B`;
  });

  return res.json(assignHdds);        // возвращение значения
});

// task3A (pathresolver)
app.get('/task3A/*?', (req, res) => {
  req.params[0] = req.params[0] || '';

  if (model.isEmpty()) return res.send('Model is empty', 404);

  let path = req.params[0]
    .replace(/[.]|[\/]+$/g, '')
    .replace(/\//g, '.');

  if (path !== 'length') path = path.replace(/length/, '');

  const resultObject = path ? objectPathResolver(path, model.attributes) : model.attributes;

  if (resultObject === undefined) return res.send('Not Found', 404);

  res.json(resultObject);             // возвращение значения
});


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
