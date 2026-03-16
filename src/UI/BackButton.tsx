import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export default function BackButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard')
    }

    return (
        <button className="w-[36px] h-[36px]"
            type="button"
            onClick={handleClick}
        >
            <IoArrowBack className="text-cc-offw h-[20px] w-[20px]" />
        </button>
    )
}