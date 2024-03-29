import Layout from '../common/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import styled from 'styled-components';
import axios from 'axios';

const Login = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	.inner {
		width: 80%;
		border: 1px solid #ddd;
		padding: 50px 30px;
	}
`;

const BtnSet = styled.div`
	margin-top: 20px;
	display: flex;
	gap: 20px;
`;

function Join() {
	const navigate = useNavigate();
	const [Email, setEmail] = useState('');
	const [Pwd1, setPwd1] = useState('');
	const [Pwd2, setPwd2] = useState('');
	const [Name, setName] = useState('');

	const handleJoin = async () => {
		if (!(Name && Email && Pwd1 && Pwd2)) return alert('모든 양식을 입력하세요.');
		if (Pwd1 !== Pwd2) return alert('비밀번호 2개를 동일하게 입력하세요.');

		let createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, Pwd1);
		await createdUser.user.updateProfile({ displayName: Name });
		firebase.auth().signOut();

		const item = {
			displayName: createdUser.user.multiFactor.user.displayName,
			uid: createdUser.user.multiFactor.user.uid,
		};

		axios.post('/api/user/join', item).then((res) => {
			if (res.data.success) {
				navigate('/login');
			} else return alert('회원가입에 실패했습니다.');
		});
	};

	return (
		<Layout name={'Join'}>
			<Login>
				<div className='inner'>
					<input type='email' value={Email} placeholder='이메일 주소를 입력하세요.' onChange={(e) => setEmail(e.target.value)} />
					<input type='password' value={Pwd1} placeholder='비밀번호를 입력하세요.' onChange={(e) => setPwd1(e.target.value)} />
					<input type='password' value={Pwd2} placeholder='비밀번호를 재입력하세요.' onChange={(e) => setPwd2(e.target.value)} />
					<input type='text' value={Name} placeholder='사용자명을 입력하세요.' onChange={(e) => setName(e.target.value)} />
					<BtnSet>
						<button onClick={() => navigate(-1)}>가입취소</button>
						<button onClick={handleJoin}>회원가입</button>
					</BtnSet>
				</div>
			</Login>
		</Layout>
	);
}

export default Join;
