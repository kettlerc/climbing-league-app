import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';



const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function UserPage() {
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const history = useHistory();

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
      <img src={user.photo} alt="" />
      <h2>{user.firstName} {user.lastName}</h2>
      <h3>{user.flashLevel}</h3>
      <LogOutButton className="btn" />
      <div>
      {['CLIMB ON'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor="left" open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
