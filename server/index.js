const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5500;

//client에서 보내는 데이터를 전달받도록 설정(body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express에서 react안쪽 build폴더까지의 경로를 static으로 지정
app.use(express.static(path.join(__dirname, '../client/build')));

//mongoDB 접속구문
app.listen(port, () => {
	mongoose
		.connect(
			'mongodb+srv://Yumi:!abcd1234@cluster0.okq8xhc.mongodb.net/?retryWrites=true&w=majority'
		)
		//접속 성공시
		.then(() => console.log(`Server app listening on port ${port} with MongoDB`))
		//접속 실패시
		.catch((err) => console.log(err));
});

//기본 router 설정
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//어떤 URL에서 접속하더라도 화면이 뜨도록 설정
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//react 요청 router
app.post('./api/send', (req, res) => {
	console.log(req.body);
});
