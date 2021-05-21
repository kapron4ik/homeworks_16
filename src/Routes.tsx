import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from "./coponents/Login/Login";
import Registration from "./coponents/Registration/Registration";
import Profile from "./coponents/Profile/Profile";
import RecoveryPassword from "./coponents/RecoveryPassword/RecoveryPassword";
import EnterNewPassword from "./coponents/EnterNewPassword/EnterNewPassword";
import Test from "./coponents/Test/Test";
import Error404 from "./coponents/404/Error404";
import CardPacksContainer from "./coponents/Packs/PacksContainer";
import CardsContainer from './coponents/Packs/Cards/CardsContainer';

export const PATH = {
    LOGIN: "/login",
    REGISTRATION: "/registration",
    PROFILE: "/profile",
    RECOVERY_PASSWORD: "/recovery_password",
    ENTER_NEW_PASSWORD: "/enter_new_password",
    TEST: "/test",
    CARD_PACKS: "/card_packs",
    CARDS: "/cards"
}

const Routes = () => {
    return (
        <Switch>
            < Route path={'/'} exact render={() => <Redirect to={PATH.TEST}/>}/>
            < Route path={PATH.LOGIN} render={() => <Login/>}/>
            < Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
            < Route path={PATH.PROFILE} render={() => <Profile/>}/>
            < Route path={PATH.RECOVERY_PASSWORD} render={() => <RecoveryPassword/>}/>
            < Route path={PATH.ENTER_NEW_PASSWORD} render={() => <EnterNewPassword/>}/>
            < Route path={PATH.TEST} render={() => <Test/>}/>
            < Route path={PATH.CARD_PACKS} render={() => <CardPacksContainer/>}/>
            < Route path={PATH.CARDS && (PATH.CARDS + '/:id')} render={() => <CardsContainer/>}/>
            < Route render={() => <Error404/>}/>
        </Switch>
    )
}

export default Routes
