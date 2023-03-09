import { Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import Main from './common/Main';
import Create from './community/Create';
import Detail from './community/Detail';
import List from './community/List';
import Edit from './community/Edit';
import Join from './user/Join';
import Login from './user/Login';

import GlobalStyle from './GlobalStyle';

function App() {
	return (
		<>
			<GlobalStyle />
			<Header />

			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/list' element={<List />} />
				<Route path='/create' element={<Create />} />
				<Route path='/detail/:num' element={<Detail />} />
				<Route path='/edit/:num' element={<Edit />} />
				<Route path='/join' element={<Join />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	);
}

export default App;