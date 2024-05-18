import {Children} from "react";

const Modal = (props: ModalProps) => {
    return (
        <>
            <div
                className="fixed top-[100px] z-50 w-[328px] transition-all ease-in-out duration-600"
                style={{
                    display: props.isOpen ? "block" : "none",
                    left: 'calc(50% - 164px)',
                    top: props.isOpen ? '40px' : '100px',
                    opacity: props.isOpen ? 1 : 0,
                }}
            >
                {Children.map(props.children, child => child)}
            </div>
        </>
    )
}

export default Modal