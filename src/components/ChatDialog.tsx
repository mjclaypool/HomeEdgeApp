import { useContext } from "react";

import ChatInputWrapper from "./ChatInputWrapper";
import ChatOutputWrapper from "./ChatOutputWrapper";

import TaskContext from "../store/TaskContext";

export default function ChatDialog() {
    const taskCtx = useContext(TaskContext);

    return (
        <div className="w-full flex flex-col gap-[18px]">
            {taskCtx?.chatProgress.map(diag => (
                <div key={diag.id + diag.type} className="flex flex-col">
                    {diag.type == "q" ? <ChatOutputWrapper chatOutput={diag.text[0]} /> : <ChatInputWrapper userInput={diag.text[0]} />}
                </div>
            ))}
        </div>
    )
}