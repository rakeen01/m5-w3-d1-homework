import React, { useState } from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { Card } from 'react-bootstrap';
import Home from './Home';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

  const handleLoginSuccess = (response) => {
    console.log(response);
    if (response.accessToken) {
      setLogin(true);
    }
  };

  const handleProfileSuccess = (response) => {
    console.log(response);
    setData(response);
    setPicture(response?.picture?.data?.url || '');
    setLogin(true);
  };

  const handleLoginFail = (error) => {
    console.error(error);
    setLogin(false);
  };

  return (
    <div className="Container">
      <Card style={{ width: '800px' }} className="mt-5 mx-auto">
        <Card.Header className="pb-4">My React App</Card.Header>
        <Card.Body>
          <Card.Text>
            {!login &&
              <React.Fragment>
                <h3> Please login using one of following:</h3>
                <LoginForm />
                <FacebookLogin
                  appId="1800606037287767"
                  autoLoad={true}
                  scope="public_profile,user_friends"
                  fields="name,email,picture"
                  onSuccess={handleLoginSuccess}
                  onProfileSuccess={handleProfileSuccess}
                  onFail={handleLoginFail}
                >
                  Login with Facebook
                </FacebookLogin>
              </React.Fragment>
            }
            {login &&
              <Home fbpic={picture} fbdata={data} />
            }
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

function LoginForm() {
  return (
    <form className="border mt-3 mb-5 p-3 bg-white">
      <label className="m-2">Name:</label>
      <input type="text" name="name" placeholder="Your name" />
      <label className="m-2">Email:</label>
      <input type="email" name="email" placeholder="Your Email" />
      <input type="submit" value="Login" className="btn bg-success text-white my-3" />
    </form>
  )
}

export default App;
