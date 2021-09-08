import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Button from '@material-ui/core/Button';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />

      <center>
        <Button
          variant="outlined"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          RETURN TO LOGIN
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
