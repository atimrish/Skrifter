import Modal from "@components/ui/modal/Modal.tsx";
import Cross from "@components/icons/cross/Cross.tsx";

const ActiveModal = (props: ModalProps) => {

    return (
        <>
            <Modal
                isOpen={props.isOpen}
                setIsOpen={props.setIsOpen}
            >
                <div className="bg-white shadow-2xl rounded-[20px] p-[20px] transition-all ease-in-out duration-[1000]">
                    <div className="flex justify-end">
                        <div onClick={() => props.setIsOpen(false)}>
                            <Cross/>
                        </div>
                    </div>
                    <div>
                        {props.children}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ActiveModal