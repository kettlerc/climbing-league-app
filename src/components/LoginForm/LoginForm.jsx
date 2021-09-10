import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <center>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          <TextField
            label="Username"
            variant="outlined"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          {/* <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          /> */}
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {/* <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          /> */}
        </label>
      </div>
      <div>
        <Button
          variant="outlined"
          type="submit"
          name="submit"
        >LOG IN</Button>
      </div>
      </center>
    </form>
  );
}

export default LoginForm;
