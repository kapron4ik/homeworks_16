import React, {useEffect} from "react";
import s from "./Modal.module.css"

type PropsType = {
    showModal: (value: boolean) => void
    setInput1?: (cardQuestion: string)=>void
    input1?: string
    setInput2?: (cardAnswer: string)=>void
    input2?: string
}

const Modal: React.FC<PropsType> = (
    {
        showModal,
        setInput1,
        input1,
        setInput2,
        input2,
        children
    }
) => {

    useEffect(()=>{
        if(setInput1 && input1) {setInput1(input1)}
        if(setInput2 && input2) {setInput2(input2)}
        // return setCardQuestion && setCardQuestion('')
    },[input1,input2])

    return <>
        <div className={s.backgraund} onClick={() => showModal(false)}></div>
        <div className={s.modal}>
            <i className={`${s.icon} icon-close`} onClick={() => showModal(false)}></i>
            {children}
        </div>
    </>
}

export default Modal