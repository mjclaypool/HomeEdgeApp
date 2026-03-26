type optionProps = {
    chatOption: string,
    onSelect: () => void
}

export default function ChatOptionWrapper( props : optionProps ) {
    const handleOptionClick = () => {
        props.onSelect();
    }

    return (
        <>
            {props.chatOption &&
                <button className="flex items-center justify-center bg-cc-offw w-full min-h-[40px] rounded-lg p-2 my-1"
                    type="button"
                    onClick={handleOptionClick}>
                    <p className="text-cc-prim text-[12px]">{props.chatOption}</p>
                </button>
            }
        </>
    )
}