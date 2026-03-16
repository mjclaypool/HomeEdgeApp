import { useContext, useEffect } from "react";

import TaskContext from "../store/TaskContext";

type inputProps = {
    userInput: string
}

export default function ChatInputWrapper( props: inputProps ) {
    const { updateChatProgress } = useContext(TaskContext) ?? {};

    useEffect(() => {
        const timer = setTimeout(() => {
            updateChatProgress?.();
        }, 1000);

        return () => clearTimeout(timer);
    }, [updateChatProgress]);

    return (
        <div className="flex items-center self-end bg-cc-tert max-w-[230px] min-h-[40px] rounded-lg p-2">
            <p className="text-cc-offw text-[12px]">{props.userInput}</p>
        </div>
    )
}