import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUserInfo() {
    try {
        const response = yield axios.get('/api/teams/userinfo');
        yield put({
            type: 'SET_USER_INFO',
            payload: response.data
        })
    } catch (error) {
        console.error('GET user info failed', error);
    }
}


function* userInfoSaga() {
    yield takeLatest('FETCH_USER_INFO', fetchUserInfo);
}

export default userInfoSaga;