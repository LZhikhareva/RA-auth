import { useEffect, useState } from 'react';
import './App.css';
import Landing from './components/Landing';
import Account from './components/Account';

function App() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setLogin] = useState(false);
  const [news, setNews] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setLogin(true);
      setUser(JSON.parse(storedUser));
      fetchData(storedToken);
    } else {
      fetchUserInfo();
    }
  }, []);

  function handleSubmit(e, props) {
    e.preventDefault();
    console.log(props)
    let newUser = {
      'login': props.inputOne,
      'password': props.inputTwo
    };
    sendRequest(newUser);
  }

  const sendRequest = async (props) => {
    console.log(props)
    {
      try {
        const response = await fetch('http://localhost:7070/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(props),
        });
        const data = await response.json();
        if (data.message !== "user not found") {
          setToken(data.token);
          setLogin(true);
          localStorage.setItem('token', data.token);
          fetchData(data.token);
          fetchUserInfo(data.token);
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  const fetchData = async (token) => {
    const header = 'Bearer ' + token;
    console.log(header)
    {
      try {
        const response = await fetch('http://localhost:7070/private/news', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': header }
        });
        const data = await response.json();
        console.log(data)
        setNews(data);
      } catch (e) {
        if (e.status === 401) {
          logout();
        }
        console.log(e)
      }
    }
  }

  const fetchUserInfo = async (token) => {
    const header = 'Bearer ' + token;
    console.log(header)
    {
      try {
        const response = await fetch('http://localhost:7070/private/me', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': header }
        });
        const data = await response.json();
        console.log(data)
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      } catch (e) {
        if (e.status === 401) {
          logout();
        }
        console.log(e)
      }
    }
  }

  const logout = (e) => {
    e.preventDefault();
    setToken(null);
    setLogin(false);
    setNews([]);
    setUser([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <div className='app'>
      {!isLoggedIn && <Landing handleSubmit={handleSubmit} />}
      {isLoggedIn && (<Account token={token} isLoggedIn={isLoggedIn} news={news} user={user} logout={logout} />)}
    </div>
  )
}

export default App
