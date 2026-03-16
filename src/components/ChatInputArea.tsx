import { useState, useContext } from "react"

import SendButton from "../UI/SendButton";
import TaskContext from "../store/TaskContext";
import ChatOptionWrapper from "./ChatOptionWrapper";

export default function ChatInputArea() {
    const taskCtx = useContext(TaskContext);
    const [inputText, setInputText] = useState('')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value)
    }

    return (
        <div className="flex justify-between gap-[8px] w-full bg-cc-sec rounded-lg p-2">
            {taskCtx?.chatProgress && taskCtx.chatProgress.length > 0 && taskCtx.chatNext.type == "a" && taskCtx.chatNext.text.length > 1
            ?
            <div className="flex flex-col gap-[8px] w-full">
                {taskCtx.chatNext.text.map(option => (
                    <div key={option}>
                        <ChatOptionWrapper chatOption={option}/>
                    </div>
                ))}
            </div>
            :
            <div className="flex justify-between gap-[8px] w-full">
                <input className="flex-1 h-[40px] bg-cc-offw rounded-lg text-[14px] text-cc-prim p-3"
                    type="text"
                    id="username-input"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="Enter text"
                />
                <SendButton />
            </div>
            }
        </div>
    )
}