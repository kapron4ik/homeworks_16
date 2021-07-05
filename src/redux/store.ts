import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./auth-reducer";
import {packsReducer} from "./packs-reducer";
import {cardsReducer} from "./cards-reducer";
import {packsReqReducer} from "./packs-request-reducer";
import {cardsReqReducer} from "./cards-request-reducer";
import {recoveryPasReducer} from "./recoveryPass-reducer";


const rootReducer = combineReducers(
    {
        auth: authReducer,
        cardPacks: packsReducer,
        cards: cardsReducer,
        packsReq: packsReqReducer,
        cardsReq: cardsReqReducer,
        recoveryPas: recoveryPasReducer
    }
)

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

