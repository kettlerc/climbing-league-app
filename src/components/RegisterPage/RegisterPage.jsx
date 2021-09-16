import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    btn: {
        marginTop: 30,
        marginBottom: 30
    }
})

function RegisterPage() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div>
      <RegisterForm />

      <center>
        <Button
          variant="outlined"
          className={classes.btn}
          size="small"
          onClick={() => {
            history.push('/login');
          }}
        >
          BACK
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
