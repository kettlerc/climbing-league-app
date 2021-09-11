import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRecentClimbs() {
    try {
        const response = yield axios.get('/api/score');
        console.log('recent climbs response', response.data);
        
        yield put({
            type: 'SET_RECENT_CLIMBS',
            payload: response.data
        })
    } catch (error) {
        console.error('Get recent climbs error', error)
    }
}

function* scoreSaga() {
    yield takeLatest('FETCH_RECENT_CLIMBS', fetchRecentClimbs);
}

export default scoreSaga;