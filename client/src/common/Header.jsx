import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../firebase';
import styled from 'styled-components';

const HeaderWrap = styled.header`
	width: 100%;
	background: transparent;
	position: fixed;
	top: 0;
	left: 0;
`;

const HeaderTop = styled.div`
	width: 100%;
	padding: 10px;
	display: flex;
	justify-content: flex-end;
	border-bottom: 1px solid #ddd;
`;

const Util = styled.ul`
	display: flex;
	gap: 20px;
	
	li {
		color: #ddd;
		cursor: pointer;
		a {
			font: 10px/1 'arial';
			color: #ddd;
		}
		> p {
			font: 10px/1 'arial';
			color: #ddd;
		}
	}
`;

const HeaderBottom = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
`;

const Logo = styled.h1`
	a {
		font: 40px/1 'arial';
		color: #fff;
	}
`;

const Gnb = styled.ul`
	display: flex;
	align-items: center;
	a {
		display: block;
		padding: 10px;
		font: bold 16px/1 'arial';
		color: #bbb;
	}
`;

function Header() {
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);
	const activeStyle = { color: '#ddd' };

	return (
		<HeaderWrap>
			<HeaderTop>
				{/* 로그인 유무에 따라 로그인 메뉴 및 인사메세지 분기처리 */}
				{user.uid === '' ? (
					<Util>
						<li>
							<NavLink to='/login' style={({ isActive }) => (isActive ? activeStyle : null)}>
								Login
							</NavLink>
						</li>
						<li>
							<NavLink to='/join' style={({ isActive }) => (isActive ? activeStyle : null)}>
								Join
							</NavLink>
						</li>
					</Util>
				) : (
					<Util>
						<li>
							<p>{`${user.displayName}님 반갑습니다.`}</p>
						</li>

						<li
							onClick={() => {
								firebase.auth().signOut();
								alert('로그아웃 되었습니다. 메인페이지로 이동합니다.');
								navigate('/');
							}}
						>
							<p>로그아웃</p>
						</li>
					</Util>
				)}
			</HeaderTop>
			<HeaderBottom>
				<Logo>
					<Link to='/'>Board</Link>
				</Logo>
				<Gnb>
					<li>
						<NavLink to='/list' style={({ isActive }) => (isActive ? activeStyle : null)}>
							Show List
						</NavLink>
					</li>
					{/* 로그인 유무에 따라 글작성 메뉴 보임처리 */}
					{user.uid !== '' && (
						<li>
							<NavLink to='/create' style={({ isActive }) => (isActive ? activeStyle : null)}>
								Write Post
							</NavLink>
						</li>
					)}
				</Gnb>
			</HeaderBottom>
		</HeaderWrap>
	);
}

export default Header;
