import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"

import Header from "../components/Header"
import TaskHeading from "../components/TaskHeading"
import TaskInstructions from "../components/TaskInstructions"
import TaskNotes from "../components/TaskNotes"
import TaskReferences from "../components/TaskReferences"
import TaskReminders from "../components/TaskReminders"
import DeleteButton from "../UI/DeleteButton"
import TaskContext from "../store/TaskContext"

export default function TaskPage() {
    const params = useParams();
    const taskCtx = useContext(TaskContext);

    useEffect(() => {
        if (params.task) {
            taskCtx?.showTaskDetails(params.task)
        }
    }, [params.task, taskCtx])

    const handleDelete = () => {
        console.log("Deleting")
        if (params.task) {
            taskCtx?.deleteTaskDetails(params.task)
        }
    }

    return (
        <div className="flex flex-col gap-[28px] text-cc-offw font-medium">
            <Header />
            <TaskHeading />
            <TaskReminders />
            <TaskNotes />
            <TaskInstructions />
            <TaskReferences />
            <DeleteButton onClick={() => handleDelete()}/>
        </div>
    )
}