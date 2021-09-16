const scoreReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_RECENT_CLIMBS':
            return action.payload;
        case 'SCORES_SUBMITTED':
            return action.payload;
        default:
            return state;
    }
};

export default scoreReducer;