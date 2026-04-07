import { useContext } from "react"
import { IoLink } from "react-icons/io5";

import TaskContext from "../store/TaskContext"

export default function ReferenceLink() {
    const taskCtx = useContext(TaskContext)

    return (
        <div className="flex items-center self-start bg-cc-sec max-w-[230px] min-h-[40px] rounded-lg p-2">
            <p className="w-1/2 text-cc-offw text-[12px] whitespace-pre-wrap">AI Reference Links: </p>
            <div className="w-1/2 flex items-center flex-wrap">
                {!taskCtx?.task.references.includes("No references available") ? taskCtx?.task.references.map((reference, index) => (
                    <a
                        key={index}
                        href={reference}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center ml-1">
                        <button type="button">
                            <IoLink className="text-cc-offw h-[20px] w-[20px]" />
                        </button>
                    </a>
                ))
                :
                    <p className="text-cc-offw text-[12px] ml-1">Not available</p>
                }
            </div>
        </div>
    )
}