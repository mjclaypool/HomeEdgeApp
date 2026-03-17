type inputProps = {
    userInput: string
}

export default function ChatInputWrapper( props: inputProps ) {
    return (
        <div className="flex items-center self-end bg-cc-tert max-w-[230px] min-h-[40px] rounded-lg p-2">
            <p className="text-cc-offw text-[12px]">{props.userInput}</p>
        </div>
    )
}