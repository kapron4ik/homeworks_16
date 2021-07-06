import React, {useEffect} from "react";
import s from "./Modal.module.css"

type PropsType = {
    showModal: (value: boolean) => void
    setCardQuestion?: (cardQuestion: string)=>void
    cardQuestion?: string
    setCardAnswer?: (cardAnswer: string)=>void
    cardAnswer?: string
}

const Modal: React.FC<PropsType> = (
    {
        showModal,
        setCardQuestion,
        cardQuestion,
        setCardAnswer,
        cardAnswer,
        children
    }
) => {

    useEffect(()=>{
        if(setCardQuestion && cardQuestion) {setCardQuestion(cardQuestion)}
        if(setCardAnswer && cardAnswer) {setCardAnswer(cardAnswer)}
        // return setCardQuestion && setCardQuestion('')
    },[cardQuestion,cardAnswer])

    return <>
        <div className={s.backgraund} onClick={() => showModal(false)}></div>
        <div className={s.modal}>
            <i className={`${s.icon} icon-close`} onClick={() => showModal(false)}></i>
            {children}
        </div>
    </>
}

export default Modal