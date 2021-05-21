import React, {ChangeEvent, useState} from "react";
import {CardPacksType} from "../../redux/packs-reducer";
import s from "./Packs.module.css"
import {PATH} from "../../Routes";
import {NavLink} from "react-router-dom";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";


export type CardPacksPropsType = {
    cardPacks: Array<CardPacksType>
    cardPacksTotalCount: number
    currentPage: number
    pagesSize: number
    onPageChanged: (pageNumber: number)=>void
    addCardsPack: ()=>void
    deleteCardsPack: (id: string) => void
    updateCardsPack: (id: string) => void
    isMyPacksHandler: (checked:boolean)=>void
    isMyPacks:boolean
}

export const Packs = (props: CardPacksPropsType) => {
    // const [checked, setChecked] = useState<boolean>(false)

    let pageCount = Math.ceil(props.cardPacksTotalCount / props.pagesSize)
    let arrayPageCount: Array<number> = []
    for (let i = 1; i <= pageCount; i++) {
        arrayPageCount.push(i)
    }

    return <div>
        <SuperCheckbox
            checked={props.isMyPacks}
            onChangeChecked={(checked)=>props.isMyPacksHandler(checked)}>Мои колоды</SuperCheckbox>
        <div>
            {arrayPageCount.map(p => {
                return <span className={props.currentPage === p?s.selectedPage:''}
                onClick={()=>props.onPageChanged(p)} key={p}>{p}</span>
            })}
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
                <th><button onClick={props.addCardsPack}>add</button></th>
            </tr>
            {
                props.cardPacks.map(c=><tr key={c._id}>
                    <th>{c.name}</th>
                    <th>{c.cardsCount}</th>
                    <th>{c.updated}</th>
                    <th></th>
                    <th>
                        <button onClick={()=>{props.deleteCardsPack(c._id)}}>del</button>
                        <button onClick={()=>{props.updateCardsPack(c._id)}}>update</button>
                        <NavLink to={`${PATH.CARDS}/${c._id}`}>Cards</NavLink>
                    </th>
                </tr>)
            }
        </table>


    </div>
}

export default Packs