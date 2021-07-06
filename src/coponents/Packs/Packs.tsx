import React, {ChangeEvent, useEffect, useState} from "react";
import s from "./Packs.module.css"
import {PATH} from "../../Routes";
import {NavLink} from "react-router-dom";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import Pagination from '@material-ui/lab/Pagination';
import SuperDoubleRange from "../common/c8-SuperDoubleRange/SuperDoubleRange";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import {
    CardReqType,
    CardResType,
    CardsReqType,
    CardsType,
    NewPackType,
    PacksReqType,
    PacksType
} from "../../types/entities";
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import Preloader from "../common/Preloader/Preloader";
import ModalContainer from "../Modals/ModalContainer";
import ModalEducationContainer from "../Modals/ModalEducation/ModalEducationContainer";


type PropsType = {
    cardPacks: Array<CardsType>
    cardPacksTotalCount: number
    currentPage: number
    pagesSize: number
    onPageChanged: (pageNumber: number) => void
    addCardsPack: (data: NewPackType) => void
    deleteCardsPack: (id: string) => void
    updateCardsPack: (id: string, packName: string) => void
    maxCardsCount: number
    minCardsCount: number
    isMyPacksHandler: (checked: boolean) => void
    isMyPacks: boolean
    changeFilter: (data: PacksReqType) => void
    loading: boolean
    resetFilter: () => void
    userId: string
    reqUserID: string
    getCards: (data: CardsReqType) => void
    cards: Array<CardResType>
}

// type PacksPropsType = PacksType & PropsType

export const Packs = (props: PropsType) => {
    // const [checked, setChecked] = useState<boolean>(false)
    const [value1, setValue1] = useState(props.minCardsCount);
    const [value2, setValue2] = useState(props.maxCardsCount);
    const [showModalEducation, setShowModalEducation] = useState('')
    useEffect(() => {
        setValue1(props.minCardsCount)
        setValue2(props.maxCardsCount)
    }, [props.minCardsCount, props.maxCardsCount])
    const [packName, setPackName] = useState('')


    let pageCount = Math.ceil(props.cardPacksTotalCount / props.pagesSize)
    // let arrayPageCount: Array<number> = []
    // for (let i = 1; i <= pageCount; i++) {
    //     arrayPageCount.push(i)
    // }
    const handleChange = (event: React.FormEvent<EventTarget>, value: number) => {
        props.onPageChanged(value)
    };

    const changeDoubleRange = (value: [number, number]) => {
        setValue1(value[0])
        setValue2(value[1])
    }

    const changeFilter = () => {
        props.changeFilter({min: value1, max: value2, packName: packName})
    }

    const resetFilter = () => {
        props.resetFilter()
        setPackName('')
    }

    const addPackHandler = () => {
        props.addCardsPack({name: packName})
        setPackName('')
    }

    return <div>
        <div>
            <span>Мой id:{props.reqUserID}</span>
            <SuperCheckbox
                checked={props.isMyPacks}
                onChangeChecked={(checked) => props.isMyPacksHandler(checked)}>Мои колоды</SuperCheckbox>
            <Pagination count={pageCount} page={props.currentPage} onChange={handleChange} variant="outlined"
                        color="primary"/>
            <SuperDoubleRange
                value={[value1, value2]}
                onChangeRange={changeDoubleRange}
            />
            <SuperInputText
                value={packName}
                onChangeText={setPackName}
                placeholder={'введите название колоды'}
            />
            <SuperButton
                onClick={() => changeFilter()}>Применить</SuperButton>
            <SuperButton
                onClick={() => resetFilter()}>Reset</SuperButton>
        </div>
        {props.loading
            ? <Preloader/>
            : <table>
                <tr>
                    <th>Name</th>
                    <th>CardsCount</th>
                    <th>Update</th>
                    <th>url</th>
                    <th>
                        <ModalContainer name={'Добавить колоду'}>
                            <h3>Добавить новую колоду</h3>
                            <SuperInputText
                                value={packName}
                                onChangeText={setPackName}
                                placeholder={'название колоды'}/>
                            <SuperButton
                                onClick={addPackHandler}>Добавить</SuperButton>
                        </ModalContainer>
                    </th>
                </tr>
                {
                    props.cardPacks.map(c => <tr key={c._id}>
                        <th>{c.name}</th>
                        <th>{c.cardsCount}</th>
                        <th>{c.updated}</th>
                        <th></th>
                        <th>
                            <ModalContainer name={'Delete'}
                                            disabled={c.user_id !== props.userId ? true : false}>
                                <h3>Вы действительно хотите удалить колоду и все ее содержимое?</h3>
                                <SuperButton
                                    onClick={() => c._id && props.deleteCardsPack(c._id)}>Применить</SuperButton>
                            </ModalContainer>
                            <ModalContainer name={'Update'}
                                            disabled={c.user_id !== props.userId ? true : false}
                                            cardQuestion = {c.name}
                                            setCardQuestion = {setPackName}>
                                <h3>Обновить название колоды</h3>
                                <SuperInputText
                                    value={packName}
                                    onChangeText={setPackName}
                                    placeholder={'новое название колоды'}/>
                                <SuperButton
                                    onClick={() => c._id && props.updateCardsPack(c._id, packName)}>Применить</SuperButton>
                            </ModalContainer>

                            <NavLink to={`${PATH.CARDS}/${c._id}`}>Cards</NavLink>

                            {/*<NavLink to={`${PATH.LEARN}/${c._id}`}>Learn</NavLink>*/}
                            <SuperButton
                                onClick={() =>c._id &&  setShowModalEducation(c._id)}
                                disabled={c.cardsCount === 0 ? true : false}>Обучение</SuperButton>
                            {showModalEducation === c._id?
                                c._id && <ModalEducationContainer idPack={c._id} isClose={setShowModalEducation} getCards={props.getCards}/>
                            :''}



                        </th>
                    </tr>)
                }
            </table>}


    </div>
}

export default Packs