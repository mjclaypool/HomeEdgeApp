import { useNavigate } from "react-router-dom";

type deleteProps = {
    onClick: () => void
}

export default function DeleteButton( props : deleteProps ) {
    const navigate = useNavigate();

    const handleClick = () => {
        props.onClick()
        navigate('/dashboard')
    }

    return (
        <button className="w-full h-[40px] text-[16px] text-cc-red border-2 border-cc-red rounded-lg"
            type="button"
            onClick={handleClick}>
            Delete Task
        </button>
    )
}