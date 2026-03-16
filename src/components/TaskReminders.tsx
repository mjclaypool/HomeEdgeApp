import { useContext } from "react"

import TaskReminderCard from "./TaskReminderCard"
import TaskSubHeading from "./TaskSubHeading"
import TaskContext from "../store/TaskContext"

// Add next date to JSON and task context type
// Add toggle button

export default function TaskReminders() {
    const taskCtx = useContext(TaskContext);

    return (
        <div className="flex flex-col gap-[6px]">
            <TaskSubHeading subHeading="Reminders" />
            <TaskReminderCard
                title={`${taskCtx?.task.name} - Early Reminder `}
                freq={`Every ${taskCtx?.task.frequency}`}
                next={`Next Reminder: `}
                on={`${taskCtx?.task.reminderEarly}`}
            />
            <TaskReminderCard
                title={`${taskCtx?.task.name}`}
                freq={`Every ${taskCtx?.task.frequency}`}
                next={`Next Reminder: `}
                on={`${taskCtx?.task.reminder}`}
            />
        </div>
    )
}