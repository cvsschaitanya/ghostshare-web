// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

import { getDatabase, ref as dbref, child as dbchild, push as dbpush, onValue as dbOnValue } from 'firebase/database';

import { getStorage, ref as stref, child as stchild, getDownloadURL } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyC5TU_LPT9DkNNqmBi1O_53IVA8OG5tBKU',
	authDomain: 'ghostshare-f5e7a.firebaseapp.com',
	projectId: 'ghostshare-f5e7a',
	storageBucket: 'ghostshare-f5e7a.appspot.com',
	messagingSenderId: '73056414190',
	appId: '1:73056414190:web:ec3da06f4491094050c6ff',
	measurementId: 'G-CYW384Z1G6'
};

// Initialize Firebase
// const app =
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase();
let changeListener = () => {};

const createKey = () => {
	console.log('A');
	const key = dbpush(dbchild(dbref(database), 'keys'), {
        filename:"",
        status:"waiting",
    }).key;
	dbOnValue(dbchild(dbref(database), `keys/${key}`), (snapshot) => {
		changeListener(snapshot);
	});
	return key;
};

let key = createKey();
const setKey = (newKey) => {
	key = newKey;
};
const setKeyChangeListener = (listener) => {
	changeListener = listener;
};

const storage = getStorage();
const storageRef = stref(storage);

const downloadKeyFile = (data) => {
    console.log(data);

	getDownloadURL(stref(storage, `${key}/${data.filename}`))
		.then((url) => {
			console.log(url);
			const xhr = new XMLHttpRequest();
			xhr.responseType = 'blob';
			xhr.onload = (event) => {
				const url = window.URL.createObjectURL(xhr.response);
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', data.filename);

				// Append to html link element page
				document.body.appendChild(link);

				// Start download
				link.click();

				// Clean up and remove the link
				link.parentNode.removeChild(link);
			};
			xhr.open('GET', url);
			xhr.send();
		})
		.catch((error) => {
			console.log(error);
		});
};

export { key, setKey, setKeyChangeListener, downloadKeyFile };
