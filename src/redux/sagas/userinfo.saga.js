import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUserInfo(action) {
    try {
        console.log('id is:', action.payload);
        const response = yield axios.get(`/api/userinfo/${action.payload}`);
        console.log('response is', response.data[0]);
        yield put({
            type: 'SET_USER_INFO',
            payload: response.data
        })
    } catch {
        console.log('get user info error');
    }
}

function* userInfoSaga() {
    yield takeLatest('FETCH_USER_INFO', fetchUserInfo);
}

export default userInfoSaga;