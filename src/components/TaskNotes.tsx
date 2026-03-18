import { useState, useContext } from "react"
import { IoBrush } from "react-icons/io5";

import TaskSubHeading from "./TaskSubHeading"
import UnorderedList from "./UnorderedList"
import TaskContext from "../store/TaskContext"

export default function TaskNotes() {
    const [isEditing, setIsEditing] = useState(false)
    const taskCtx = useContext(TaskContext);

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleDone = () => {
        setIsEditing(false)
    }

    return (
        <div className="relative">
            <div className="flex justify-between items-center">
                <TaskSubHeading subHeading="Custom Notes" />
                <button type="button" onClick={handleEdit}>
                    <IoBrush />
                </button>
            </div>
            <UnorderedList items={taskCtx?.task.notes} editing={isEditing} onDone={handleDone}/>
        </div>
    )
}