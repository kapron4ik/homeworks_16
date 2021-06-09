import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./auth-reducer";
import { packsReducer } from "./packs-reducer";
import {cardsReducer} from "./card-reducer";
import { packsReqReducer } from "./packs-request-reducer";
import { cardReqReducer } from "./card-request-reducer";


const rootReducer = combineReducers(
    {
        auth: authReducer,
        cardPacks: packsReducer,
        cards: cardsReducer,
        packsReq: packsReqReducer,
        cardReq:cardReqReducer
    }
)

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

