import React from 'react';
import { useHistory } from 'react-router';
import Drawer from '@material-ui/core/Drawer';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import InfoIcon from '@material-ui/icons/Info';
import LogOutButton from '../LogOutButton/LogOutButton';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';

import './userPage.css';
import { Typography } from '@material-ui/core';


function UserPage() {
  const history = useHistory();


  //parameters for drawer component
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const menuItems = [
    {
      text: 'ADD CLIMB',
      icon: <AddCircleOutlineIcon />,
      path: '/addclimb'
    },
    {
      text: 'SUBMIT SCORES',
      icon: <ListAltIcon />,
      path: '/submitscores'
    },
    {
      text: 'LEADERBOARDS',
      icon: <FormatListNumberedIcon />,
      path: '/leaderboards'
    },
    {
      text: 'ABOUT',
      icon: <InfoIcon />,
      path: '/about'
    }
  ]
  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
    >
      <List>
        {menuItems.map(item => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => history.push(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text}/>
          </ListItem>
        ))}
      </List>
    </div>
  );
  

  return (
    <div className="container">
      <div className="drawerButton">
        {[<FilterHdrIcon style={{ fontSize: 100}} color="primary"/>].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer anchor="left" open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
      <div>
        <LogOutButton className="navLink" />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
