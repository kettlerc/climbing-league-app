import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function UserInfo() {
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
        <div>
            <h2>{userInfo.firstName} {userInfo.lastName}</h2>
            <h3>{userInfo.flashLevel}</h3>
            <h3>{userInfo.teamName}</h3>
      </div>
    )
}

export default UserInfo;