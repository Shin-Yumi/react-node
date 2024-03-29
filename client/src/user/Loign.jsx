import Layout from '../common/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import styled from 'styled-components';

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
	display: flex;
	justify-content: flex-end;
	width: 100%;
	gap: 20px;
	margin-top: 20px;
`;

function Loign() {
	const navigate = useNavigate();
	const [Email, setEmail] = useState('');
	const [Pwd, setPwd] = useState('');
	const [Err, setErr] = useState('');

	const handleLogin = async () => {
		if (!(Email && Pwd)) return alert('모든 값을 입력하세요');

		try {
			await firebase.auth().signInWithEmailAndPassword(Email, Pwd);
			navigate('/');
		} catch (err) {
			if (err.code === 'auth/user-not-found') setErr('존재하지 않는 이메일입니다.');
			else if (err.code === 'auth/wrong-password') setErr('비밀번호 정보가 일치하지 않습니다.');
			else setErr('로그인에 실패했습니다');
		}
	};

	return (
		<Layout name={'Login'}>
			<Login>
				<div className='inner'>
					<input type='email' value={Email} placeholder='이메일 주소를 입력하세요.' onChange={(e) => setEmail(e.target.value)} />
					<input type='password' value={Pwd} placeholder='비밀번호를 입력하세요.' onChange={(e) => setPwd(e.target.value)} />

					<BtnSet>
						<button onClick={handleLogin}>로그인</button>
						<button onClick={() => navigate('/join')}>회원가입</button>
					</BtnSet>
					{Err !== '' && <p>{Err}</p>}
				</div>
			</Login>
		</Layout>
	);
}

export default Loign;
