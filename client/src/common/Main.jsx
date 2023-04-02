import Layout from './Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import firebase from '../firebase';
import { useSelector } from 'react-redux';

const Item = styled.article`
	width: 100%;
	padding: 30px 40px;
	background: #fff;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
	margin-bottom: 50px;
`;

const Util = styled.ul`
	position: absolute;
	top: 30px;
	right: 30px;
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

function Main() {
	const [List, setList] = useState([]);
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);
	const activeStyle = { color: '#ddd' };

	useEffect(() => {
		axios.get('/api/community/read/3').then((res) => {
			if (res.data.success) setList(res.data.communityList);
		});
	}, []);

	return (
		<Layout name={'Main'}>
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
			{List.map((post) => {
				return (
					<Item key={post._id}>
						<h2>
							<Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
						</h2>
						<p>작성자: {post.writer.displayName}</p>
						{post.createdAt === post.updatedAt ? (
							<p>작성일: {post.createdAt.split('T')[0]}</p>
						) : (
							<p>수정일: {post.updatedAt.split('T')[0]}</p>
						)}
					</Item>
				);
			})}
		</Layout>
	);
}

export default Main;
