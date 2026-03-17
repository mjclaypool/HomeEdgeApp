import { IoSend } from "react-icons/io5";

type buttonProps = {
    onSelect: () => void
}

export default function SendButton( props : buttonProps ) {
    const handleSendClick = () => {
        props.onSelect()
    }

    return (
        <button className="flex items-center justify-center w-[40px] h-[40px] bg-cc-tert rounded-full"
            type="button"
            onClick={handleSendClick}>
            <IoSend className="text-cc-offw"/>
        </button>
    )
}