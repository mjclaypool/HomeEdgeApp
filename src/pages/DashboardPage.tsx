import { useContext } from "react"

import ChatButton from "../UI/ChatButton"
import DashboardAllTasks from "../components/DashboardAllTasks"
import DashboardUpcomingTasks from "../components/DashboardUpcomingTasks"
import Header from "../components/Header"
import ChatModal from "../components/ChatModal"
import TaskContext from "../store/TaskContext"

export default function DashboardPage() {
    const taskCtx = useContext(TaskContext);

    return (
        <div className="flex flex-col gap-[32px]">
            <Header />
            <DashboardUpcomingTasks />
            <DashboardAllTasks />
            {!taskCtx?.modalState && <ChatButton />}
            {taskCtx?.modalState && <ChatModal />}
        </div>
    )
}