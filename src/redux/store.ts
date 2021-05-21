import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./auth-reducer";
import { packsReducer } from "./packs-reducer";
import {cardsReducer} from "./card-reducer";


const rootReducer = combineReducers(
    {
        auth: authReducer,
        cardPacks: packsReducer,
        cards: cardsReducer
    }
)

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

