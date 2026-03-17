import { useContext } from "react";

import TaskContext from "../store/TaskContext";

import BackButton from "../UI/BackButton";

export default function TaskHeading() {
    const taskCtx = useContext(TaskContext);

    return (
        <div>
            <BackButton />
            <h1 className="text-[24px]">{taskCtx?.task.name}</h1>
            <p className="text-[12px]">{taskCtx?.task.description}</p>
        </div>
    )
}