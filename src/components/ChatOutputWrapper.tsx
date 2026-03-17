type outputProps = {
    chatOutput: string
}

export default function ChatOutputWrapper( props : outputProps ) {
    return (
        <div className="flex items-center self-start bg-cc-sec max-w-[230px] min-h-[40px] rounded-lg p-2">
            <p className="text-cc-offw text-[12px] whitespace-pre-wrap">{props.chatOutput}</p>
        </div>
    )
}