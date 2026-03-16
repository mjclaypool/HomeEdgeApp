import { useContext } from "react"

import OrderedList from "./OrderedList"
import TaskSubHeading from "./TaskSubHeading"
import TaskContext from "../store/TaskContext"

export default function TaskReferences() {
    const taskCtx = useContext(TaskContext);

    return (
        <div>
            <TaskSubHeading subHeading="References" />
            <OrderedList steps={taskCtx?.task.references}/>
        </div>
    )
}