import { createContext, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";

import chatNodes from "../data/chatNodes.json";
import taskList from "../../../HomeEdgeBackend/data/taskDetails.json";

interface TaskData {
  id: string,
  name: string,
  description: string,
  frequency: string,
  reminder: boolean,
  reminderEarly: boolean,
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
    deleteTaskDetails: (task: string) => void,
    updateTaskFrequency: (task: string, freq: string) => void,
    updateTaskReminder: (task: string) => void,
    updateTaskReminderEarly: (task: string) => void,
    updateTaskNotes: (task: string, note: string, noteIndex: number) => void,
    updateChatProgression: (res: string) => void,
    updateChatNode: (node: string) => void,
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

const defaultTask: TaskData = {
    id: "",
    name: "",
    description: "",
    frequency: "",
    reminder: true,
    reminderEarly: true,
    notes: [""],
    instructions: [""],
    references: [""]
}


export function TaskContextProvider({children} : PropsWithChildren) {
    const [currentChatNode, setCurrentChatNode] = useState<ChatNode>(chatNodes[1])
    const [currentTask, setCurrentTask] = useState<TaskData>(defaultTask);
    const [currentTaskList, setCurrentTaskList] = useState<TaskData[]>(taskList)
    const [chatProgression, setChatProgression] = useState([chatNodes[1].chat_text])
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const options = {method: 'GET'}
        fetch('http://127.0.0.1:5000/task_list', options)
        .then(response => response.json())
        .then(data => {
            setCurrentTaskList(data)
        })
        .catch(e => {
            console.error(e)
        })
    }, [])

    const showTaskDetails = (taskURL: string) => {
        const selectedTask = currentTaskList.filter((task) => task.id == taskURL);
        if (selectedTask.length > 0 && selectedTask[0].id && selectedTask[0].id.length > 0) {
            setCurrentTask(selectedTask[0]);
        }
    }

    const deleteTaskDetails = (taskURL: string) => {
        const options = {method: 'DELETE'}
        const selectedTask = currentTaskList.filter((task) => task.id == taskURL);
        if (selectedTask.length > 0 && selectedTask[0].id && selectedTask[0].id.length > 0) {
            fetch(`http://127.0.0.1:5000/delete_task?task_id=${selectedTask[0].id}`, options)
            .then(response => response.json())
            .then(data => {
                setCurrentTaskList(data)
            })
            .catch(e => {
                console.error(e)
            })
        }
    }

    const updateTaskFrequency = (taskURL: string, newFrequencyValue: string) => {
        const options = {method: 'POST'}
        const selectedTask = currentTaskList.filter((task) => task.id == taskURL);
        if (selectedTask.length > 0 && selectedTask[0].id && selectedTask[0].id.length > 0) {
            fetch(`http://127.0.0.1:5000/update_task_freq?task_id=${selectedTask[0].id}&task_freq=${newFrequencyValue}`, options)
            .then(response => response.json())
            .then(data => {
                setCurrentTaskList(data)
                if (currentTask.id === selectedTask[0].id) {
                    setCurrentTask({...currentTask, frequency: newFrequencyValue})
                }
            })
            .catch(e => {
                console.error(e)
            })
        }
    }

    const updateTaskReminder = (taskURL: string) => {
        const options = {method: 'POST'}
        const selectedTask = currentTaskList.filter((task) => task.id == taskURL);
        if (selectedTask.length > 0 && selectedTask[0].id && selectedTask[0].id.length > 0) {
            const newReminderValue = !selectedTask[0].reminder;
            fetch(`http://127.0.0.1:5000/update_task_reminder?task_id=${selectedTask[0].id}&task_reminder=${newReminderValue}`, options)
            .then(response => response.json())
            .then(data => {
                setCurrentTaskList(data)
                if (currentTask.id === selectedTask[0].id) {
                    setCurrentTask({...currentTask, reminder: newReminderValue})
                }
            })
            .catch(e => {
                console.error(e)
            })
        }
    }

    const updateTaskReminderEarly = (taskURL: string) => {
        const options = {method: 'POST'}
        const selectedTask = currentTaskList.filter((task) => task.id == taskURL);
        if (selectedTask.length > 0 && selectedTask[0].id && selectedTask[0].id.length > 0) {
            const newReminderEarlyValue = !selectedTask[0].reminderEarly;
            fetch(`http://127.0.0.1:5000/update_task_reminder_early?task_id=${selectedTask[0].id}&task_reminder_early=${newReminderEarlyValue}`, options)
            .then(response => response.json())
            .then(data => {
                setCurrentTaskList(data)
                if (currentTask.id === selectedTask[0].id) {
                    setCurrentTask({...currentTask, reminderEarly: newReminderEarlyValue})
                }
            })
            .catch(e => {
                console.error(e)
            })
        }
    }

    const updateTaskNotes = (taskURL: string, note: string, noteIndex: number) => {
        const options = {method: 'POST'}
        const selectedTask = currentTaskList.filter((task) => task.id == taskURL);
        if (selectedTask.length > 0 && selectedTask[0].id && selectedTask[0].id.length > 0) {
            fetch(`http://127.0.0.1:5000/update_task_notes?task_id=${selectedTask[0].id}&task_note=${note}&task_note_index=${noteIndex}`, options)
            .then(response => response.json())
            .then(data => {
                setCurrentTaskList(data)
                if (currentTask.id === selectedTask[0].id) {
                    // Create a new notes array with the updated note at noteIndex
                    const updatedNotes = [...currentTask.notes];
                    updatedNotes[noteIndex] = note;
                    setCurrentTask({...currentTask, notes: updatedNotes})
                }
            })
            .catch(e => {
                console.error(e)
            })
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
        taskList: currentTaskList,
        currentChatNode: currentChatNode,
        chatDialog: chatProgression,
        modalState: modalIsOpen,
        updateModalState,
        showTaskDetails,
        deleteTaskDetails,
        updateTaskFrequency,
        updateTaskReminder,
        updateTaskReminderEarly,
        updateTaskNotes,
        updateChatProgression,
        updateChatNode,
    }

  return <TaskContext.Provider value={taskContext}>{children}</TaskContext.Provider>
}

export default TaskContext;