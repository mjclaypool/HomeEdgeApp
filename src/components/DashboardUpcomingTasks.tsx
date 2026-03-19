import { useContext } from "react"

import DashboardHeading from "./DashboardHeading"
import NoTasksMessage from "./NoTasksMessage"
import TaskCards from "./TaskCards"
import TaskContext from "../store/TaskContext"

export default function DashboardUpcomingTasks() {
    const taskCtx = useContext(TaskContext);

    return (
        <div>
            <DashboardHeading headingText="Upcoming Tasks" />
            {taskCtx?.upcomingTaskList.length == 0 && <NoTasksMessage noTaskMsg="You're all set for now!" />}
            <TaskCards cardList={taskCtx?.upcomingTaskList} />
        </div>
    )
}