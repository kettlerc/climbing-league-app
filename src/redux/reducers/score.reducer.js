const scoreReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_RECENT_CLIMBS':
            return action.payload;
        default:
            return state;
    }
};

export default scoreReducer;