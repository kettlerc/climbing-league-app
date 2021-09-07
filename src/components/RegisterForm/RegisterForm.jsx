import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularInput, CircularTrack, CircularProgress, CircularThumb, } from 'react-circular-input'

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [flashLevel, setFlashLevel] = useState('5.7');
  const [photo, setPhoto] = useState('');
  const [teamId, setTeamId] = useState(1);

  const [value, setValue] = useState(0.1);

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        flashLevel: flashLevel,
        photo: photo,
        teamId: teamId
      },
    });
  }; // end registerUser

  const stepValue = v => Math.round(v * 10) / 10

  const min = 0.1
  const max = 0.9

  const valueWithinLimits = v => Math.min(Math.max(v, min), max)

  const changeValue = v => {
      setValue(stepValue(v));
      switch(value) {
          case 0.1:
              setFlashLevel('5.7')
              break;
          case 0.2:
              setFlashLevel('5.8')
              break;
          case 0.3:
              setFlashLevel('5.9')
              break;
          case 0.4:
              setFlashLevel('5.10')
              break;
          case 0.5:
              setFlashLevel('5.11-')
              break;
          case 0.6:
              setFlashLevel('5.11+')
              break;
          case 0.7:
              setFlashLevel('5.12-')
              break;
          case 0.8:
              setFlashLevel('5.12+')
              break;
          case 0.9:
              setFlashLevel('5.13-')
              break;
        }
    }

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <center>
      <h2>Register New Climber</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="firstName">
          <input
            type="text"
            name="firstName"
            placeholder="first name"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="lastName">
          <input
            type="text"
            name="lastName"
            placeholder="last name"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <h3>Flash Level</h3>
      </div>
      <div>
        <label htmlFor="flashLevel"></label>
        <CircularInput
            value={valueWithinLimits(value)}
            onChange={changeValue}
            radius={50}>
            <CircularTrack className="circularTrack"/>
            <CircularProgress className="circularProgress"/>
            <CircularThumb className="circularThumb"/>
            <text 
                x={50} 
                y={50} 
                textAnchor="middle" 
                dy="0.3em"
                fontSize="25" 
                fontWeight="bold">
                {flashLevel}
            </text>
          </CircularInput>
      </div>
      <div>
        <label htmlFor="team">
          Choose your team:</label>
        <select 
          name="teams"
          value={teamId}
          required
          onChange={(event) => setTeamId(event.target.value)}>
            {/* hard coded in, needs to be retrieved via a reducer from the db */}
            <option value="1">Rock Crushers</option>
            <option value="2">Hard Rock</option>
            <option value="3">We Climb Good</option>
        </select>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
      </center>
    </form>
  );
}

export default RegisterForm;
