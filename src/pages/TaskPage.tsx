import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate, Navigate } from "react-router-dom"

import Header from "../components/Header"
import TaskHeading from "../components/TaskHeading"
import TaskInstructions from "../components/TaskInstructions"
import TaskNotes from "../components/TaskNotes"
import TaskReferences from "../components/TaskReferences"
import TaskReminders from "../components/TaskReminders"
import DeleteButton from "../UI/DeleteButton"
import TaskContext from "../store/TaskContext"
import VerifyDeleteWindow from "../components/VerifyDeleteWindow"

export default function TaskPage() {
    const params = useParams();
    const navigate = useNavigate();
    const taskCtx = useContext(TaskContext);
    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        if (params.task) {
            taskCtx?.showTaskDetails(params.task)
        }
    }, [params.task, taskCtx])

    const handleClick = () => {
        setDialogOpen(true)
    }

    const handleDelete = () => {
        if (params.task) {
            taskCtx?.deleteTaskDetails(params.task)
            navigate('/dashboard')
        }
    }

    const handleCloseWindow = () => {
        setDialogOpen(false)
    }

    if (!taskCtx?.isAuth) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <div className="flex flex-col gap-[28px] text-cc-offw font-medium pb-[24px]">
            <Header />
            <TaskHeading />
            <TaskReminders />
            <TaskNotes />
            <TaskInstructions />
            <TaskReferences />
            <DeleteButton onClick={() => handleClick()}/>
            {dialogOpen && <VerifyDeleteWindow onConfirm={() => handleDelete()} onCancel={() => handleCloseWindow()} />}
        </div>
    )
}