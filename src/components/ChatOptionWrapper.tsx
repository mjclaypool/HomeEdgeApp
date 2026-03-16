import { useContext } from "react"

import TaskContext from "../store/TaskContext"

type optionProps = {
    chatOption: string
}

export default function ChatOptionWrapper( props : optionProps ) {
    const taskCtx = useContext(TaskContext);

    const handleOptionClick = () => {
        taskCtx?.updateChatProgress()
    }

    return (
        <button className="flex items-center justify-center bg-cc-offw w-full min-h-[40px] rounded-lg p-2"
            type="button"
            onClick={handleOptionClick}>
            <p className="text-cc-prim text-[12px]">{props.chatOption}</p>
        </button>
    )
}