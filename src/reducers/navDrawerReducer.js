
export const navDrawerReducer = (state = false, action) => {
    switch (action.type) {
        case "SET_NAV_VISIBLE":
            return action.payload;
        default:
            return state;
    }
};
