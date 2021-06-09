import React from "react";
import s from "./Modal.module.css"

type PropsType = {
    showModal: (value: boolean) => void
}

const Modal: React.FC<PropsType> = (
    {
        showModal,
        children
    }
) => {

    return <>
        <div className={s.backgraund} onClick={() => showModal(false)}></div>
        <div className={s.modal}>
            <i className={`${s.icon} icon-close`} onClick={() => showModal(false)}></i>
            {children}
        </div>
    </>
}

export default Modal