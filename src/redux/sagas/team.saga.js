import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchTeams() {
    try {
        const response = yield axios.get('/api/teams');
        yield put({
            type: 'SET_TEAMS',
            payload: response.data
        })
    } catch (error) {
        console.error('Get team request failed', error); 
    }
}

function* teamSaga() {
    yield takeLatest('FETCH_TEAMS', fetchTeams);
}

export default teamSaga;