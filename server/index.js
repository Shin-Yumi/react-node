const express = require('express');
//server는 오래전부터 사용된 문법이 많기 때문에 import로 변경시 특정 포트에서 구동이 안될 수 있다

const app = express();
const port = 5500;

app.get('/', (req, res) => {
	res.send('hello world!');
});

app.listen(port, () => {
  console.log(`server app listening on port ${port}`);
  
})
