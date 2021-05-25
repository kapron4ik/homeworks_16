import React, {ChangeEvent, useState} from "react";
// import {CardPacksType} from "../../redux/packs-reducer";
import s from "./Packs.module.css"
import {PATH} from "../../Routes";
import {NavLink} from "react-router-dom";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import Pagination from '@material-ui/lab/Pagination';
import SuperDoubleRange from "../common/c8-SuperDoubleRange/SuperDoubleRange";
import {loginTC} from "../../redux/auth-reducer";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import {CardsType, PacksType} from "../../types/entities";
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";


type PropsType = {
    cardPacks: Array<CardsType>
    cardPacksTotalCount: number
    currentPage: number
    pagesSize: number
    onPageChanged: (pageNumber: number) => void
    addCardsPack: () => void
    deleteCardsPack: (id: string) => void
    updateCardsPack: (id: string) => void
    maxCardsCount: number
    minCardsCount: number
    isMyPacksHandler: (checked: boolean) => void
    isMyPacks: boolean
    changeFilter: (min: number, max: number, packName:string) => void
}

// type PacksPropsType = PacksType & PropsType

export const Packs = (props: PropsType) => {
    // const [checked, setChecked] = useState<boolean>(false)
    const [value1, setValue1] = useState(props.minCardsCount);
    const [value2, setValue2] = useState(props.maxCardsCount);
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
        props.changeFilter(value1, value2, packName)
    }


    return <div>
        <SuperCheckbox
            checked={props.isMyPacks}
            onChangeChecked={(checked) => props.isMyPacksHandler(checked)}>Мои колоды</SuperCheckbox>
        <div>
            {/*{arrayPageCount.map(p => {*/}
            {/*    return <span className={props.currentPage === p?s.selectedPage:''}*/}
            {/*    onClick={()=>props.onPageChanged(p)} key={p}>{p}</span>*/}
            {/*})}*/}
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



        </div>
        {/*<div>*/}
        {/*    <span>Page - {props.currentPage}</span>*/}
        {/*    <span>TotalCount - {props.cardPacksTotalCount}</span>*/}
        {/*    <span>PageSize - {props.pagesSize}</span>*/}
        {/*</div>*/}
        <table>
            <tr>
                <th>Name</th>
                <th>CardsCount</th>
                <th>Update</th>
                <th>url</th>
                <th>
                    <button onClick={props.addCardsPack}>add</button>
                </th>
            </tr>
            {
                props.cardPacks.map(c => <tr key={c._id}>
                    <th>{c.name}</th>
                    <th>{c.cardsCount}</th>
                    <th>{c.updated}</th>
                    <th></th>
                    <th>
                        <button onClick={() => {
                            c._id && props.deleteCardsPack(c._id) //поменять тип??
                        }}>del
                        </button>
                        <button onClick={() => {
                            c._id && props.updateCardsPack(c._id) //поменять тип??
                        }}>update
                        </button>
                        <NavLink to={`${PATH.CARDS}/${c._id}`}>Cards</NavLink>
                    </th>
                </tr>)
            }
        </table>


    </div>
}

export default Packs