import axios from 'axios';
import { useEffect, useMemo } from 'react';
function App() {
	const item = useMemo(() => ({
		name: 'David',
	}), []);
	useEffect(() => {
		axios
			.post('./api/send', item)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [item]);
	return <div className='App'>hello world</div>;
}

export default App;
