import { useContext } from "react";

import TaskContext from "../store/TaskContext";
import { IoSend } from "react-icons/io5";

type buttonProps = {
    onSelect: () => void
}

export default function SendButton( props : buttonProps ) {
    const taskCtx = useContext(TaskContext)

    const handleSendClick = () => {
        props.onSelect()
    }

    return (
        <>
            {taskCtx?.isThinking
            ?
            <div className="flex items-center justify-center w-[40px] h-[40px] bg-cc-prim rounded-full">
                <IoSend className="text-cc-offw"/>
            </div>
            :
            <button className="flex items-center justify-center w-[40px] h-[40px] bg-cc-tert rounded-full"
                type="button"
                onClick={handleSendClick}>
                <IoSend className="text-cc-offw"/>
            </button>
            }
        </>
    )
}