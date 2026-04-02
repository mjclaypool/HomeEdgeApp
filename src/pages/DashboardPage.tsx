import { useContext } from "react"
import { Navigate } from "react-router-dom"

import ChatButton from "../UI/ChatButton"
import DashboardAllTasks from "../components/DashboardAllTasks"
import DashboardUpcomingTasks from "../components/DashboardUpcomingTasks"
import Header from "../components/Header"
import ChatModal from "../components/ChatModal"
import TaskContext from "../store/TaskContext"

export default function DashboardPage() {
    const taskCtx = useContext(TaskContext);

    if (!taskCtx?.isAuth) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <div className="flex flex-col gap-[32px] pb-[24px]">
            <Header />
            <DashboardUpcomingTasks />
            <DashboardAllTasks />
            {!taskCtx?.modalState && <ChatButton />}
            {taskCtx?.modalState && <ChatModal />}
        </div>
    )
}