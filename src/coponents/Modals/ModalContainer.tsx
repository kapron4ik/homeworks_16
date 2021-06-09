import React, {useState} from "react";
import Modal from "./Modal";
import SuperButton from "../common/c2-SuperButton/SuperButton";

const ModalContainer: React.FC<any> = (
    {
        name,
        disabled,
        children
    }
) => {
    const [showModal, setShowModal] = useState(false)

    return <>
        <SuperButton disabled={disabled} onClick={() => setShowModal(true)}>{name}</SuperButton>
        {showModal &&
        <Modal
            showModal={setShowModal}>
            {children}
        </Modal>}
    </>
}

export default ModalContainer