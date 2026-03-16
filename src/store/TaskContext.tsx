import { createContext, useCallback, useState} from "react";
import type { PropsWithChildren } from "react";

import chatDiag from "../data/chatDialog.json";
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

interface ChatData {
    id: number,
    type: string,
    text: string[]
}

interface TaskContextType {
    task: TaskData,
    taskList: TaskData[],
    chatProgress: ChatData[],
    chatNext: ChatData,
    modalState: boolean,
    updateModalState: () => void,
    showTaskDetails: (task: string) => void;
    updateChatProgress: () => void;
    updateChatInputs: (choice: number) => void;
    updateReminder: () => void;
    updateReminderEarly: () => void;
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

const defaultChat: ChatData[] = [chatDiag[0]]
const resetChat: ChatData[] = [chatDiag[0], chatDiag[1]]
const defaultNext: ChatData = chatDiag[1]

export function TaskContextProvider({children} : PropsWithChildren) {
    const [currentTask, setCurrentTask] = useState<TaskData>(defaultTask);
    const [chatProgress, setChatProgress] = useState<ChatData[]>(defaultChat);
    const [chatNext, setChatNext] = useState<ChatData>(defaultNext)
    const [chatInputs, setChatInputs] = useState<string[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const showTaskDetails = (taskURL: string) => {
        const selectedTask = taskList.filter((task) => task.id == taskURL);
        if (selectedTask.length > 0 && selectedTask[0].id && selectedTask[0].id.length > 0) {
            setCurrentTask(selectedTask[0]);
        }
    }

    const updateReminder = () => {}

    const updateReminderEarly = () => {}

    const updateModalState = () => {
        if (modalIsOpen) {
            setModalIsOpen(false)
        } else {
            setModalIsOpen(true)
        }
    }

    const updateChatProgress = useCallback(() => {
        setChatProgress(prev => {
            const lastChat = prev[prev.length - 1];
            const chatPos = lastChat ? lastChat.id + 1 : 0;

            const currentChat = chatDiag[chatPos] ?? resetChat[0];
            const nextChat = chatDiag[chatPos + 1] ?? resetChat[1]; //bug when it resets, initial option is off by 1
            setChatNext(nextChat);

            if (chatPos > chatDiag.length - 1) {
                return defaultChat;
            }
            return [...prev, currentChat];
        });
    }, []);

    const updateChatInputs = ( choice : number ) => {
        const lastChat = chatProgress[chatProgress.length - 1];
        const chatPos = lastChat ? lastChat.id + 1 : 0;
        setChatInputs([...chatInputs, chatDiag[chatPos].text[choice]])
    }

    const taskContext = {
        task: currentTask,
        taskList: taskList,
        chatProgress: chatProgress,
        chatNext: chatNext,
        modalState: modalIsOpen,
        updateModalState,
        showTaskDetails,
        updateChatProgress,
        updateChatInputs,
        updateReminder,
        updateReminderEarly
    }

  return <TaskContext.Provider value={taskContext}>{children}</TaskContext.Provider>
}

export default TaskContext;