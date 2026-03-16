import { useContext } from "react"

import TaskContext from "../store/TaskContext"

export default function ChatButton() {
    const taskCtx = useContext(TaskContext);

    const handleClick = () => {
        taskCtx?.updateModalState();
    }

    return (
        <>
            {!taskCtx?.modalState ?
                <div className="absolute bottom-[20px] right-[20px] w-[80px] h-[80px] flex justify-center items-center bg-cc-tert rounded-full">
                    <button className="w-full h-full text-[48px] text-cc-offw font-medium"
                        type="button"
                        onClick={handleClick}
                    >
                        +
                    </button>
                </div>
            :
                <div className="rotate-45 w-[80px] h-[80px] flex justify-center items-center bg-cc-tert rounded-full">
                    <button className="w-full h-full text-[48px] text-cc-offw font-medium"
                        type="button"
                        onClick={handleClick}
                    >
                        +
                    </button>
                </div>
            }
        </>
    )
}