import { IoCheckmark, IoClose } from "react-icons/io5";

interface toggleProps {
    active?: boolean,
    onToggle: () => void
}

export default function ToggleButton( props : toggleProps ) {
    const handleClick = () => {
        props.onToggle()
    }

    return (
        <div>
            {props.active ?
                <div className="flex justify-end items-center w-[54px] h-[30px] bg-cc-acc rounded-full px-[6px]" onClick={handleClick}>
                    <div className="flex items-center justify-center w-[20px] h-[20px] bg-cc-sec rounded-full">
                        <IoCheckmark className="text-cc-acc" />
                    </div>
                </div>
            :
                <div className="flex items-center w-[54px] h-[30px] bg-cc-prim rounded-full px-[6px]" onClick={handleClick}>
                    <div className="flex items-center justify-center w-[20px] h-[20px] bg-cc-sec rounded-full">
                        <IoClose className="text-cc-prim" />
                    </div>
                </div>
            }
        </div>
    )
}