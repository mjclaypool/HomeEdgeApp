import { useContext } from "react"

import TaskSubHeading from "./TaskSubHeading"
import UnorderedList from "./UnorderedList"
import TaskContext from "../store/TaskContext"

export default function TaskNotes() {
    const taskCtx = useContext(TaskContext);

    return (
        <div>
            <TaskSubHeading subHeading="Custom Notes" />
            <UnorderedList items={taskCtx?.task.notes}/>
        </div>
    )
}