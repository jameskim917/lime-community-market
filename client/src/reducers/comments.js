const commentsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_COMMENTS': 
            return action.payload
        case 'COMMENT': 
            return [...state, action.payload]
        default:
            return state
    }
}

export default commentsReducer