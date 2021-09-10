import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addClimb (action) {
    try {
        yield axios.post('/api/addClimb', action.payload);
        console.log('payload is:', action.payload);
    } catch (error) {
        console.log('error with addClimb', error);   
    }
    
}

function* addClimbSaga() {
    yield takeLatest('ADD_CLIMB', addClimb);
}

export default addClimbSaga;