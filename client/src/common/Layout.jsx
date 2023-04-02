import styled from 'styled-components';

const MainWrap = styled.main`
	width: 100%;
	padding-left: 25%;
	height: 100vh;
	min-height: 100vh;

	> .inner {
		width: 100%;
		height: 100%;

		section {
			width: 100%;
			height: 100%;
			label {
				display: block;
				font: 16px/1 'arial';
				color: #555;
				margin-bottom: 5px;
			}
			input[type='text'],
			input[type='password'],
			input[type='email'],
			textarea {
				width: 100%;
				min-width: 300px;
				padding: 10px;
				border: 1px solid #333;
				margin-bottom: 20px;
				resize: none;
				display: block;
				background: rgba(0,0,0,.2);
				&::placeholder {
					font-size: 12px;
					color: #ddd;
				}
			}
			button {
				display: inline-block;
				padding: 5px 20px;
				background: rgba(0,0,0,.2);
				color: #ddd;
				border: none;
				cursor: pointer;
				a {
					color: #ddd;
				}
			}
		}
	}
`;

function Layout({ children, name }) {
	return (
		<MainWrap className={`content ${name}`}>
			<div className='inner'>
				<section>{children}</section>
			</div>
		</MainWrap>
	);
}

export default Layout;
