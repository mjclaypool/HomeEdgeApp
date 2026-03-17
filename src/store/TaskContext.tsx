import { createContext, useState} from "react";
import type { PropsWithChildren } from "react";

import chatNodes from "../data/chatNodes.json";
import taskList from "../data/taskDetails.json";

interface TaskData {
  id: string,
  name: string,
  description: string,
  frequency: string,
  reminder: string,
  reminderEarly: string,
  notes: string[],
  instructions: string[],
  references: string[]
}

interface ChatNode {
    resp_type: string,
    next_node: string[]
    chat_text: string,
    options?: {
        0?: string,
        1?: string,
        2?: string,
        3?: string,
        4?: string
    } | null
}

interface TaskContextType {
    task: TaskData,
    taskList: TaskData[],
    currentChatNode: ChatNode,
    chatDialog: string[],
    modalState: boolean,
    updateModalState: () => void,
    showTaskDetails: (task: string) => void,
    updateChatProgression: (res: string) => void,
    updateChatNode: (node: string) => void,
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

const defaultTask: TaskData = {
    id: "",
    name: "",
    description: "",
    frequency: "",
    reminder: "",
    reminderEarly: "",
    notes: [""],
    instructions: [""],
    references: [""]
}


export function TaskContextProvider({children} : PropsWithChildren) {
    const [currentChatNode, setCurrentChatNode] = useState<ChatNode>(chatNodes[1])
    const [currentTask, setCurrentTask] = useState<TaskData>(defaultTask);
    const [chatProgression, setChatProgression] = useState([chatNodes[1].chat_text])
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const showTaskDetails = (taskURL: string) => {
        const selectedTask = taskList.filter((task) => task.id == taskURL);
        if (selectedTask.length > 0 && selectedTask[0].id && selectedTask[0].id.length > 0) {
            setCurrentTask(selectedTask[0]);
        }
    }

    const updateModalState = () => {
        if (modalIsOpen) {
            setModalIsOpen(false)
        } else {
            setModalIsOpen(true)
        }
    }

    const updateChatProgression = ( res : string ) => {
        setChatProgression(prev => [...prev, res])
    }

    const updateChatNode = ( node : string ) => {
        setChatProgression(prev => [...prev, chatNodes[node as keyof typeof chatNodes].chat_text])
        setCurrentChatNode(chatNodes[node as keyof typeof chatNodes])
    }

    const taskContext = {
        task: currentTask,
        taskList: taskList,
        currentChatNode: currentChatNode,
        chatDialog: chatProgression,
        modalState: modalIsOpen,
        updateModalState,
        showTaskDetails,
        updateChatProgression,
        updateChatNode,
    }

  return <TaskContext.Provider value={taskContext}>{children}</TaskContext.Provider>
}

export default TaskContext;