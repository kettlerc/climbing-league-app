import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';


function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <>
    <center>
      <Button
        variant="text"
        className={props.className}
        onClick={() => dispatch({ type: 'LOGOUT' })}
      >
        Log Out
      </Button>
    </center>
    </>
  );
}

export default LogOutButton;
