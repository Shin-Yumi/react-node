import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../firebase';
import styled from 'styled-components';

const HeaderWrap = styled.header`
	width: 25%;
	height: 100vh;
	background: transparent;
	position: fixed;
	top: 0;
	left: 0;
	padding: 10vh 5vw;
	display: flex;
	align-items: center;
	flex-direction: column;

`;

const Logo = styled.h1`
text-align: center;
margin-bottom: 70px;
	a {
		display: block;
		width: 60px;
		height: 60px;
		color: #fff;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
`;

const Gnb = styled.ul`
width: 100%;
	a {
		font-size: 12px;
		display: block;
		color: #fff;
	}
`;

const Copyright = styled.ul`
position: absolute;
bottom: 0;
left: 0;
padding: 0 5vw 10vh;
	p {
		font-size: 10px;
		color: #ddd;
	}
`


function Header() {

	const user = useSelector((store) => store.user);
	const activeStyle = { color: '#ddd' };

	return (
		<HeaderWrap>
			<Logo>
					<Link to='/'>
						<img src={process.env.PUBLIC_URL + 'logo.svg'} alt="" />
						
					</Link>
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
				<Copyright>
					<p>Copyright © 2023 Yoom ALL Right reserved</p>
				</Copyright>
			
		</HeaderWrap>
	);
}

export default Header;
