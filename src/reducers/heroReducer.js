
export const heroReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_HERO":
            return action.payload;
        default:
            return state;
    }
};