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
        // This button shows up in multiple locations and is styled differently
        // because it's styled differently depending on where it is used, the className
        // is passed to it from it's parents through React props
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
