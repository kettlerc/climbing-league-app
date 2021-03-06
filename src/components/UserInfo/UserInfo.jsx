import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    info: {
        marginTop: 30,
        paddingRight: 30,
        paddingLeft: 30,
    }
})

function UserInfo() {
    const classes = useStyles();
    const user = useSelector((store) => store.user);
    const userInfo = useSelector((store) => store.userinfo);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
        type: 'FETCH_USER_INFO',
        payload: user.id
        })
    }, [dispatch]);


    return (
        <div className={classes.info}>
            <Typography variant="h4" align="right">{userInfo.firstName} {userInfo.lastName}</Typography>
            <Typography variant="subtitle1" align="right">{userInfo.flashLevel}</Typography>
            <Typography variant="subtitle1" align="right">{userInfo.teamName}</Typography>
      </div>
    )
}

export default UserInfo;