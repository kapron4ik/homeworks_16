import {AppStateType} from "../../redux/store";
import {connect} from "react-redux";
import {
    addCardsPack,
    CardPacksType,
    deleteCardsPack,
    getPacksTC,
    setCurrentPage, setIsMyPack, updateCardsPack
} from "../../redux/packs-reducer";
import Packs from "./Packs";
import {ChangeEvent, useEffect} from "react";
import {getAuthUserDataTC} from "../../redux/auth-reducer";


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
        props.getAuthUser()
        props.getPacks(props.currentPage, props.pagesSize)

    }, [])


    const onPageChanged = (pageNumber: number) => {
        // '6092ea40f1101a5af084112b'
        props.getPacks(pageNumber, props.pagesSize)
    }

    const isMyPacksHandler = (checked:boolean) => {
        props.setIsMyPack()
        const user_id = checked?props.userId:''
        props.getPacks(props.currentPage, props.pagesSize, user_id)
    }


    return <div>
        <Packs
            cardPacks={props.cardPacks}
            cardPacksTotalCount={props.cardPacksTotalCount}
            currentPage={props.currentPage}
            pagesSize={props.pagesSize}
            onPageChanged={onPageChanged}
            addCardsPack={props.addPack}
            deleteCardsPack={props.deletePack}
            updateCardsPack={props.updatePack}
            isMyPacksHandler={isMyPacksHandler}
            isMyPacks={props.isMyPacks}
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
        isMyPacks: state.cardPacks.isMyPacks
    }
}

export default connect(mapStateToProps, {
    setCurrentPage: setCurrentPage,
    getPacks: getPacksTC,
    addPack: addCardsPack,
    deletePack: deleteCardsPack,
    updatePack: updateCardsPack,
    setIsMyPack: setIsMyPack,
    getAuthUser:getAuthUserDataTC
})(PacksContainer)

