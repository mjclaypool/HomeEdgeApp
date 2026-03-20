import { useContext, useEffect, useRef } from "react";

import ChatInputWrapper from "./ChatInputWrapper";
import ChatOutputWrapper from "./ChatOutputWrapper";

import TaskContext from "../store/TaskContext";

export default function ChatDialog() {
    const taskCtx = useContext(TaskContext);
    const bottomRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'instant' });
    }, [taskCtx?.chatDialog])

    return (
        <div className="w-full flex flex-col gap-[18px] overflow-y-auto">
            {taskCtx?.chatDialog.map((msg, index) => (
                <div key={index} className="flex flex-col">
                    {index % 2 == 0 ? <ChatOutputWrapper chatOutput={msg} /> : <ChatInputWrapper userInput={msg} />}
                </div>
            ))}
            <div ref={bottomRef}></div>
        </div>
    )
}