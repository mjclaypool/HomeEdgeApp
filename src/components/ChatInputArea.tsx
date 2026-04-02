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

    const handleSelect = async (index: number) => {
        const options = taskCtx?.currentChatNode.options;
        const nodeId = taskCtx?.currentChatNode.id;
        if (options) {
            if (nodeId == 1 && index == 0 || nodeId == 11 && index == 0) {
                const optionsArray = Object.values(options);
                taskCtx?.updateChatProgression(optionsArray[index])
                taskCtx.updateThinking(true) // set thinking to true
                await taskCtx.getRecommendations()
                setTimeout(() => {
                    taskCtx.updateThinking(false) // set thinking to false
                    taskCtx?.updateChatNode(taskCtx.currentChatNode.next_node[index])
                }, 1000)
            } else {
                const optionsArray = Object.values(options);
                if (taskCtx.isListening) {
                    if (index == 0 || index == 1 || index == 2) {
                        taskCtx.getTaskDetails(optionsArray[index])
                        taskCtx.removeRecListOption(index)
                    } else if (index == 3) {
                        taskCtx.refreshRecListOptions(taskCtx.currentChatNode.next_node[index], optionsArray[index])
                    } else if (index == 4) {
                        taskCtx?.updateChatProgression(optionsArray[index])
                        setTimeout(() => {
                            taskCtx?.updateChatNode(taskCtx.currentChatNode.next_node[index])
                        }, 1000);
                    }
                } else if (nodeId) {
                    taskCtx?.updateChatProgression(optionsArray[index])
                    taskCtx?.checkForOverwrite(nodeId, index)
                    setTimeout(() => {
                        taskCtx?.updateChatNode(taskCtx.currentChatNode.next_node[index])
                    }, 1000);
                }
            }
        }
    }

    const handleUserInput = () => {
        if (taskCtx?.isListening) {
            taskCtx.getTaskDetails(inputText)
        } else {
            const nodeId = taskCtx?.currentChatNode.id;
            taskCtx?.updateChatProgression(inputText)
            if (nodeId) {
                taskCtx?.checkForOverwrite(nodeId, undefined, inputText)
            }
            setTimeout(() => {
                taskCtx?.updateChatNode(taskCtx.currentChatNode.next_node[0])
            }, 1000);
        }
    }

    return (
        <div className="flex justify-between gap-[8px] w-full bg-cc-sec rounded-lg p-2">
            {taskCtx?.currentChatNode.resp_type == "multi"
            ?
            <div className="flex flex-col w-full">
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