import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2A', (req, res) => {
  const a = Number(req.query.a) || 0;
  const b = Number(req.query.b) || 0;
  var sum = a+b;
  res.send(String(sum));
});

app.get('/task2B', function (req, res)  {
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


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
