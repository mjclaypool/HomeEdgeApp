import { useContext } from "react"

import DashboardHeading from "./DashboardHeading"
import NoTasksMessage from "./NoTasksMessage"
import TaskCards from "./TaskCards"
import TaskContext from "../store/TaskContext"

export default function DashboardAllTasks() {
    const taskCtx = useContext(TaskContext);

    return (
        <div>
            <DashboardHeading headingText="All Tasks" />
            {taskCtx?.taskList.length == 0 && <NoTasksMessage noTaskMsg="No task currently being tracked." />}
            <TaskCards cardList={taskCtx?.taskList} />
        </div>
    )
}