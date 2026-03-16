import { useContext } from "react"
import { Link } from "react-router-dom"
import TaskContext from "../store/TaskContext";

export default function TaskCards() {
    const taskCtx = useContext(TaskContext);

    return (
        <div className="py-[12px]">
            {taskCtx?.taskList.map(card => (
                <div key={card.id} className="w-[165px] h-[85px] bg-cc-offw rounded-lg text-cc-prim font-medium">
                    <Link to={card.id} className="flex flex-col justify-between w-full h-full p-[6px]">
                        <h3 className="text-[14px]">{card.name}</h3>
                        <div className="flex justify-between">
                            <h4 className="text-[12px]">{card.frequency}</h4>
                            <h4 className="text-[12px]">Every {card.frequency}</h4>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}