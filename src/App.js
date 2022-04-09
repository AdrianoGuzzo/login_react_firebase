import logo from './logo.svg';
import './App.css';
import Routes from "./components/Routes";
import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB53t754Z0t9BVkcDPbKQw9LvURcyqqMq0",
  authDomain: "login-9d933.firebaseapp.com",
  projectId: "login-9d933",
  storageBucket: "login-9d933.appspot.com",
  messagingSenderId: "885845336331",
  appId: "1:885845336331:web:4cc9ef6562dac14b8e020e",
  measurementId: "G-SRLGB7769S"
};

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <Routes/>
  );
}

export default App;
