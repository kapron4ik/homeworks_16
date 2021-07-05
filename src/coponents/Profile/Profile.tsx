import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AuthStateType, getAuthUserDataTC, logoutTC} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/store";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import Preloader from "../common/Preloader/Preloader";

const Profile: React.FC<any> = (props) => {
    const dispatch = useDispatch()
    const auth = useSelector<AppStateType, AuthStateType>(state => state.auth)
    const loading = useSelector<AppStateType, boolean>((state) => state.auth.isLoading)

    useEffect(() => {
        dispatch(getAuthUserDataTC())
    }, [])

    return <div>
        {loading
            ? <Preloader/>
            : <>
                <h1>Profile</h1>
                <div>
                    <span>name - </span>{auth.name}
                </div>
                <div>
                    <span>publicCardPacksCount - </span>{auth.publicCardPacksCount}
                </div>
                <SuperButton
                    onClick={() => {
                        dispatch(getAuthUserDataTC())
                    }
                    }>Me</SuperButton>
                <SuperButton
                    onClick={() => {
                        dispatch(logoutTC())
                    }
                    }>Выйти</SuperButton>
            </>}
    </div>
}

export default Profile