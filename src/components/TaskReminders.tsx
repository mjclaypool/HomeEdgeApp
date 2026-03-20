import { useContext } from "react"

import TaskReminderCard from "./TaskReminderCard"
import TaskSubHeading from "./TaskSubHeading"
import TaskContext from "../store/TaskContext"
import ToggleButton from "../UI/ToggleButton"


export default function TaskReminders() {
    const taskCtx = useContext(TaskContext);

    const handleToggle = (reminderType : string) => {
        if (reminderType == "reminder") {
            taskCtx?.updateTaskReminder()
        } else if (reminderType == "early") {
            taskCtx?.updateTaskReminderEarly()
        }
    }

    return (
        <div className="flex flex-col gap-[6px]">
            <TaskSubHeading subHeading="Reminders" />
            <TaskReminderCard
                title={`${taskCtx?.task.name} - Early Reminder `}
                freq={`Every ${taskCtx?.task.frequency}`}
                next={`Next Early Reminder: ${taskCtx?.task.nextReminderEarly}`}
            >
                <ToggleButton active={taskCtx?.task.reminderEarly} onToggle={() => handleToggle("early")} />
            </TaskReminderCard>
            <TaskReminderCard
                title={`${taskCtx?.task.name}`}
                freq={`Every ${taskCtx?.task.frequency}`}
                next={`Next Reminder: ${taskCtx?.task.nextReminder}`}
            >
                <ToggleButton active={taskCtx?.task.reminder} onToggle={() => handleToggle("reminder")}/>
            </TaskReminderCard>
        </div>
    )
}