import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyB7DhSo1zMivirNMpGcU2OeX73sPxZNekI',
	authDomain: 'react2023-9df28.firebaseapp.com',
	projectId: 'react2023-9df28',
	storageBucket: 'react2023-9df28.appspot.com',
	messagingSenderId: '353235598540',
	appId: '1:353235598540:web:ce2c8c507a71984b629669',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
