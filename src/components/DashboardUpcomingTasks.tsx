import DashboardHeading from "./DashboardHeading"
import NoTasksMessage from "./NoTasksMessage"

export default function DashboardUpcomingTasks() {
    return (
        <div>
            <DashboardHeading headingText="Upcoming Tasks" />
            <NoTasksMessage noTaskMsg="You're all set for now!" />
        </div>
    )
}