import { useContext } from "react"
import { IoSend } from "react-icons/io5";

import TaskContext from "../store/TaskContext";

export default function SendButton() {
    const taskCtx = useContext(TaskContext);

    const handleSendClick = () => {
        taskCtx?.updateChatProgress()
    }

    return (
        <button className="flex items-center justify-center w-[40px] h-[40px] bg-cc-tert rounded-full"
            type="button"
            onClick={handleSendClick}>
            <IoSend className="text-cc-offw"/>
        </button>
    )
}