import { useState, type ChangeEvent, useContext } from "react"

import TaskContext from "../store/TaskContext"

type editProps = {
    index: number,
    item: string,
    onDone: () => void
}

export default function EditNoteWindow( props : editProps ) {
    const taskCtx = useContext(TaskContext);
    const [inputValue, setInputValue] = useState<string>(props.item)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleBlur = () => {
        taskCtx?.updateTaskNotes(taskCtx.task.id, inputValue, props.index)
        props.onDone()
    }

    return (
        <div>
            <input
                className="bg-transparent border-2 border-cc-offw rounded-lg p-1"
                type="text"
                id={props.index.toString()}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
            />
        </div>
    )
}