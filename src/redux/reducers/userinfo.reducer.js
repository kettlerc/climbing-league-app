const userInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return action.payload[0];
        default:
            return state;
    }
}

export default userInfoReducer;