import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularInput, CircularTrack, CircularProgress, CircularThumb, } from 'react-circular-input'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    btn: {
        marginTop: 30,
        marginBottom: 30
    },
    input: {
        marginTop: 10,
        marginBottom: 5
    },
    title: {
      marginTop: 30
    }
})

function RegisterForm() {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [flashLevel, setFlashLevel] = useState('5.7');
  const [gradeValue, setGradeValue] = useState(0);
  const [photo, setPhoto] = useState('');
  const [teamId, setTeamId] = useState("");

  const [value, setValue] = useState(0.1);

  const errors = useSelector((store) => store.errors);
  const teams = useSelector((store) => store.team);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_TEAMS'
    });
  }, [dispatch]);

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
        gradeLevel: gradeValue,
        photo: photo,
        teamId: teamId
      },
    });
  }; // end registerUser

  //parameters for circular input
  const stepValue = v => Math.round(v * 10) / 10
  const min = 0.1
  const max = 0.9
  const valueWithinLimits = v => Math.min(Math.max(v, min), max)
  const changeValue = v => {
      setValue(stepValue(v));
      switch(value) {
          case 0.1:
              setFlashLevel('5.7')
              setGradeValue(1)
              break;
          case 0.2:
              setFlashLevel('5.8')
              setGradeValue(2)
              break;
          case 0.3:
              setFlashLevel('5.9')
              setGradeValue(3)
              break;
          case 0.4:
              setFlashLevel('5.10')
              setGradeValue(4)
              break;
          case 0.5:
              setFlashLevel('5.11-')
              setGradeValue(5)
              break;
          case 0.6:
              setFlashLevel('5.11+')
              setGradeValue(6)
              break;
          case 0.7:
              setFlashLevel('5.12-')
              setGradeValue(7)
              break;
          case 0.8:
              setFlashLevel('5.12+')
              setGradeValue(8)
              break;
          case 0.9:
              setFlashLevel('5.13-')
              setGradeValue(9)
              break;
        }
    }

  return (
    <FormControl className="formPanel">
      <center>
      <Typography className={classes.title} variant="h6">PERSONAL INFORMATION</Typography>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          <TextField
            className={classes.input}
            variant="outlined"
            name="username"
            placeholder="username"
            size="small"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <TextField
            className={classes.input}
            variant="outlined"
            type="password"
            name="password"
            placeholder="password"
            size="small"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="firstName">
          <TextField
            className={classes.input}
            variant="outlined"
            name="firstName"
            placeholder="first name"
            size="small"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="lastName">
          <TextField
            className={classes.input}
            variant="outlined"
            name="lastName"
            placeholder="last name"
            size="small"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>
      {/* <div>
        <input
          accept="image/*"
          multiple
          type="file"
        />
        <label htmlFor="outlined-button-file">
          <Button variant="outlined" color="primary" component="span">
            UPLOAD PHOTO
          </Button>
        </label>
      </div> */}
      <div>
        <Typography variant="h6" className={classes.title} gutterBottom>SET YOUR FLASH LEVEL</Typography>
      </div>
      <div>
        <label htmlFor="flashLevel"></label>
        <CircularInput
        className={classes.input}
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
        <Typography variant="h6" className={classes.title} gutterBottom>SELECT A TEAM</Typography>
      </div>
      <div>
        <Select
        className={classes.input}
          variant="outlined"
          value={teamId}
          required
          onChange={(event) => setTeamId(event.target.value)}>
          {teams.map(team => {
            return (
              <MenuItem key={team.id} value={team.id}>{team.teamName}</MenuItem>
            );
          })}
        </Select>
      </div>
      <div>
        <Button
          variant="outlined"
          className={classes.btn}
          type="submit"
          onClick={registerUser}
          size="large"
        >Register & Login</Button>
      </div>
      </center>
    </FormControl>
  );
}

export default RegisterForm;
