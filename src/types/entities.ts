import {setAuthUserDataAC, setErrorAC} from "../redux/auth-reducer";
import {setCards, setCurrentPageCards, setTotalCardsCount} from "../redux/card-reducer";
import {setCardPacks, setCurrentPage, setIsMyPack, setTotalCardPacksCount} from "../redux/packs-reducer";


export type DispathActionType = ReturnType<typeof setAuthUserDataAC> |
    ReturnType<typeof setErrorAC> |
    ReturnType<typeof setCardPacks> |
    ReturnType<typeof setTotalCardPacksCount> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setCards> |
    ReturnType<typeof setTotalCardsCount> |
    ReturnType<typeof setCurrentPageCards> |
    ReturnType<typeof setIsMyPack>