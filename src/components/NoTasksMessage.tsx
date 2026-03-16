type messageProps = {
    noTaskMsg: string
}

export default function NoTasksMessage( props : messageProps ) {
    return (
        <div className="flex justify-center items-center py-[46px]">
            <p className="text-cc-offw text-[12px]">{props.noTaskMsg}</p>
        </div>
    )
}