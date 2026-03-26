// import ToggleButton from "../UI/ToggleButton"

type reminderProps = {
    title: string,
    freq: string,
    next: string,
    children?: React.ReactNode
}

export default function TaskReminderCard( props : reminderProps ) {
    return (
        <div className="flex justify-between items-center w-full h-[76px] bg-cc-sec rounded-lg px-[12px]">
            <div className="flex flex-col truncate">
                <h3 className="text-[16px] pb-[4px]">{props.title}</h3>
                <h4 className="text-[12px]">{props.freq}</h4>
                <h4 className="text-[12px]">{props.next}</h4>
            </div>
            {props.children}
        </div>
    )
}