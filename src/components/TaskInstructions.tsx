import { useContext } from "react"

import OrderedList from "./OrderedList"
import TaskSubHeading from "./TaskSubHeading"
import TaskContext from "../store/TaskContext"

export default function TaskInstructions() {
    const taskCtx = useContext(TaskContext);

    return (
        <div>
            <TaskSubHeading subHeading="Step-by-Step Instructions" />
            <OrderedList steps={taskCtx?.task.instructions}/>
        </div>
    )
}