import {AppStateType} from "../../redux/store";
import {connect} from "react-redux";
import {
    addCardsPack,
    deleteCardsPack,
    updateCardsPack
} from "../../redux/packs-reducer";
import Packs from "./Packs";
import {useEffect} from "react";
import {getAuthUserDataTC} from "../../redux/auth-reducer";
import {getPacksReqTC, resetDataPack, setIsMyPack} from "../../redux/packs-request-reducer";
import {CardReqType, NewPackType, PacksReqType} from "../../types/entities";
import { getCardReqTC } from "../../redux/card-request-reducer";


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
        props.me()
        props.getPacks({page: props.currentPage, pageCount: props.pagesSize})


    }, [])


    const onPageChanged = (pageNumber: number) => {
        // '6092ea40f1101a5af084112b'
        props.getPacks({page: pageNumber, pageCount: props.pagesSize})
    }


    const isMyPacksHandler = (checked: boolean) => {
        // props.setIsMyPack()
        // const user_id = checked ? props.userId : ''
        // props.getPacks(props.currentPage, props.pagesSize, user_id)
        // props.getPacks({user_id})
        if(checked){
            props.setIsMyPack(true, props.userId)
            // props.me()
            // props.getPacks({user_id:props.userId})
            props.getPacks({})
        } else {
            props.setIsMyPack(false, '')
            // props.getPacks({user_id:''})
            props.getPacks({})
        }
    }

    // const changeFilterHandler = (min: number, max: number, packName: string) => {
    //     props.getPacks({max, min, packName})
    // }
    const changeFilterHandler = (data:PacksReqType) => {
        props.getPacks(data)
    }

    const getCardsHandler = (data: CardReqType) => {
        props.getCards(data)
    }

    const resetFilterHandler = () => {
        props.resetFilter()
        props.setIsMyPack(false)
        props.getPacks({user_id:''})
    }

    const addCardsPackHandler = (data:NewPackType) => {
        props.addPack(data)
    }


    return <div>
        <Packs
                cardPacks={props.cardPacks}
                cardPacksTotalCount={props.cardPacksTotalCount}
                currentPage={props.currentPage} //currentPage
                pagesSize={props.pagesSize} //pagesSize
                onPageChanged={onPageChanged}
                addCardsPack={addCardsPackHandler}
                deleteCardsPack={props.deletePack}
                updateCardsPack={props.updatePack}
                isMyPacksHandler={isMyPacksHandler}
                isMyPacks={props.isMyPacks}
                maxCardsCount={props.maxCardsCount}
                minCardsCount={props.minCardsCount}
                changeFilter={changeFilterHandler}
                loading={props.loading}
                resetFilter={resetFilterHandler}
                userId={props.userId}
                reqUserID={props.reqUserID}
                getCards={getCardsHandler}
                cards={props.cards}
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
        isMyPacks: state.packsReq.isMyPacks,
        maxCardsCount: state.packsReq.max,
        minCardsCount: state.packsReq.min,
        loading: state.auth.isLoading,
        reqUserID: state.packsReq.user_id,
        cards: state.cards.cards,
    }
}

export default connect(mapStateToProps, {
    me: getAuthUserDataTC,
    // setCurrentPage: setCurrentPage,
    getPacks: getPacksReqTC,//VV
    addPack: addCardsPack,
    deletePack: deleteCardsPack,
    updatePack: updateCardsPack,
    setIsMyPack: setIsMyPack,
    getAuthUser: getAuthUserDataTC,//VV
    resetFilter: resetDataPack,//VV
    getCards: getCardReqTC
})(PacksContainer)

