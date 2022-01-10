import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { navDrawerReducer } from "./navDrawerReducer";
import { couponReducer } from "./couponReducer";
import { CODReducer } from "./CODreducer";
import { heroReducer } from "./heroReducer";


const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    nav: navDrawerReducer,
    coupon: couponReducer,
    COD: CODReducer,
    hero: heroReducer,
});

export default rootReducer;