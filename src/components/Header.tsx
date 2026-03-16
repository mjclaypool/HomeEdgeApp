import { IoPerson } from "react-icons/io5";

export default function Header() {
    return (
        <div className="flex justify-between items-center">
            <div className="flex justify-center items-center h-[32px] w-[104px] bg-cc-acc rounded-lg">
                <p className="text-[12px] text-cc-prim italic font-medium">Home Edge</p>
            </div>
            <div className="flex items-center justify-center h-[40px] w-[40px] rounded-full bg-cc-offw">
                <IoPerson className="w-[20px] h-[20px] text-cc-prim" />
            </div>
        </div>
    )
}