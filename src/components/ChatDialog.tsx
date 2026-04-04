import { useContext, useEffect, useRef } from "react";

import ChatInputWrapper from "./ChatInputWrapper";
import ChatOutputWrapper from "./ChatOutputWrapper";

import TaskContext from "../store/TaskContext";
import ReferenceLink from "../UI/ReferenceLink";

export default function ChatDialog() {
    const taskCtx = useContext(TaskContext);
    const bottomRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'instant' });
    }, [taskCtx?.chatDialog])

    return (
        <div className="w-full flex flex-col gap-[18px] overflow-y-auto">
            {/* Can index in task list be used to render the corrent referenceLinks? */}
            {taskCtx?.chatDialog.map((msg, index) => (
                <div key={index} className="flex flex-col gap-4">
                    {index % 2 == 0 ? <ChatOutputWrapper chatOutput={msg} /> : <ChatInputWrapper userInput={msg} />}
                    {msg.includes("Typically this activity occurs every") && <ReferenceLink />}
                </div>
            ))}
            {taskCtx?.isThinking && <ChatOutputWrapper chatOutput="..." />}
            <div ref={bottomRef}></div>
        </div>
    )
}