import {AppStateType} from "../../redux/store";
import {connect} from "react-redux";
import {
    addCardsPack,
    deleteCardsPack,
    getPacksTC,
    setCurrentPage, setIsMyPack, updateCardsPack
} from "../../redux/packs-reducer";
import Packs from "./Packs";
import {ChangeEvent, useEffect} from "react";
import {getAuthUserDataTC} from "../../redux/auth-reducer";
import { getPacksReqTC } from "../../redux/packs-request-reducer";


// type PropsType = {
//     cardPacks: Array<CardPacksType>
//     totalCardPacksCount: number
//     currentPage: number
//     pagesSize: number
//     setCurrentPage: ()=>void,
//     getCardPacks: ()=>void
// }

const PacksContainer: React.FC<any> = (props) => {
    useEffect(() => {
        // props.getAuthUser()
        props.getPacks({page:props.currentPage, pageCount:props.pagesSize})

    }, [])


    const onPageChanged = (pageNumber: number) => {
        // '6092ea40f1101a5af084112b'
        props.getPacks({page:pageNumber, pageCount:props.pagesSize})
    }


    const isMyPacksHandler = (checked: boolean) => {
        props.setIsMyPack()
        debugger
        const user_id = checked ? props.userId : ''
        // props.getPacks(props.currentPage, props.pagesSize, user_id)
        props.getPacks({user_id})
    }

    const changeFilterHandler = (min:number, max:number, packName:string) => {
        props.getPacks({max, min, packName})
    }


    return <div>
        <Packs
            cardPacks={props.cardPacks}
            cardPacksTotalCount={props.cardPacksTotalCount}
            currentPage={props.currentPage} //currentPage
            pagesSize={props.pagesSize} //pagesSize
            onPageChanged={onPageChanged}
            addCardsPack={props.addPack}
            deleteCardsPack={props.deletePack}
            updateCardsPack={props.updatePack}
            isMyPacksHandler={isMyPacksHandler}
            isMyPacks={props.isMyPacks}
            maxCardsCount={props.maxCardsCount}
            minCardsCount={props.minCardsCount}
            changeFilter = {changeFilterHandler}
        />
    </div>
}

let mapStateToProps = (state: AppStateType) => {
    return {
        cardPacks: state.cardPacks.cardPacks,
        pagesSize: state.cardPacks.pageCount,
        cardPacksTotalCount: state.cardPacks.cardPacksTotalCount,
        currentPage: state.cardPacks.page,
        userId: state.auth._id,
        isMyPacks: state.cardPacks.isMyPacks,
        maxCardsCount: state.cardPacks.maxCardsCount,
        minCardsCount: state.cardPacks.minCardsCount,
    }
}

export default connect(mapStateToProps, {
    setCurrentPage: setCurrentPage,
    getPacks: getPacksReqTC,
    addPack: addCardsPack,
    deletePack: deleteCardsPack,
    updatePack: updateCardsPack,
    setIsMyPack: setIsMyPack,
    getAuthUser: getAuthUserDataTC
})(PacksContainer)

