import { useContext } from "react";

import ChatInputWrapper from "./ChatInputWrapper";
import ChatOutputWrapper from "./ChatOutputWrapper";

import TaskContext from "../store/TaskContext";

export default function ChatDialog() {
    const taskCtx = useContext(TaskContext);

    return (
        <div className="w-full flex flex-col gap-[18px]">
            {taskCtx?.chatDialog.map((msg, index) => (
                <div key={index} className="flex flex-col">
                    {index % 2 == 0 ? <ChatOutputWrapper chatOutput={msg} /> : <ChatInputWrapper userInput={msg} />}
                </div>
            ))}
        </div>
    )
}