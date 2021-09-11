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

function* submitScores() {
    try {
        const response = yield axios.put('/api/score');
        console.log('submitted score!');
        
        yield put({
            type: 'SCORES_SUBMITTED',
            payload: response.data
        })
    } catch (error) {
        console.error('Scores not submitted', error)
    }
}

function* scoreSaga() {
    yield takeLatest('FETCH_RECENT_CLIMBS', fetchRecentClimbs);
    yield takeLatest('SUBMIT_SCORES', submitScores)
}

export default scoreSaga;