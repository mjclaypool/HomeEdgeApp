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

    const handleSelect = (index: number) => {
        const options = taskCtx?.currentChatNode.options;
        if (options) {
            const optionsArray = Object.values(options);
            taskCtx?.updateChatProgression(optionsArray[index])
            setTimeout(() => {
                taskCtx?.updateChatNode(taskCtx.currentChatNode.next_node[index])
            }, 1000);
        }
    }

    const handleUserInput = () => {
        taskCtx?.updateChatProgression(inputText)
        setTimeout(() => {
            taskCtx?.updateChatNode(taskCtx.currentChatNode.next_node[0])
        }, 1000);
    }

    return (
        <div className="flex justify-between gap-[8px] w-full bg-cc-sec rounded-lg p-2">
            {taskCtx?.currentChatNode.resp_type == "multi"
            ?
            <div className="flex flex-col gap-[8px] w-full">
                {Object.values(taskCtx.currentChatNode.options || {}).map((option, index) => (
                    <div key={index}>
                        <ChatOptionWrapper chatOption={option} onSelect={() => handleSelect(index)}/>
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
                <SendButton onSelect={() => handleUserInput()} />
            </div>
            }
        </div>
    )
}