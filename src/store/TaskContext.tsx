import { createContext, useEffect, useState } from "react";
import { add } from 'date-fns';
import type { PropsWithChildren } from "react";

// import chatNodes from "../data/chatNodes.json";
import chatNodes from "../../../HomeEdgeBackend/data/chatNodes.json";
import taskList from "../../../HomeEdgeBackend/data/taskDetails.json";

interface TaskData {
  id: string,
  name: string,
  description: string,
  frequency: string,
  reminder: boolean,
  reminderEarly: boolean,
  nextReminder: string,
  nextReminderEarly: string,
  notes: string[],
  instructions: string[],
  references: string[]
}

interface ChatNode {
    id: number,
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
    upcomingTaskList: TaskData[],
    currentChatNode: ChatNode,
    chatDialog: string[],
    isListening: boolean,
    modalState: boolean,
    updateModalState: () => void,
    showTaskDetails: (task: string) => void,
    deleteTaskDetails: (task: string) => void,
    updateTaskFrequency: (freq: string) => void,
    updateTaskReminder: () => void,
    updateTaskReminderEarly: () => void,
    updateTaskNotes: (note: string, noteIndex: number) => void,
    updateChatProgression: (res: string) => void,
    updateChatNode: (node: string) => void,
    refreshRecListOptions: (node: string, option: string) => void,
    removeRecListOption: (index: number) => void,
    getTaskDetails: (task: string) => void,
    getRecommendations: () => Promise<void>,
    checkForOverwrite: (nodeId: number, optionIndex?: number, userInput?: string) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

const defaultTask: TaskData = {
    id: "",
    name: "",
    description: "",
    frequency: "",
    reminder: true,
    reminderEarly: true,
    nextReminder: "",
    nextReminderEarly: "",
    notes: [""],
    instructions: [""],
    references: [""]
}


export function TaskContextProvider({children} : PropsWithChildren) {
    const [currentChatNode, setCurrentChatNode] = useState<ChatNode>(chatNodes[1])
    const [currentTask, setCurrentTask] = useState<TaskData>(defaultTask);
    const [currentTaskList, setCurrentTaskList] = useState<TaskData[]>(taskList)
    const [upcomingTaskList, setUpcomingTaskList] = useState<TaskData[]>(taskList)
    const [taskListUpdate, setTaskListUpdate] = useState(0)
    const [chatProgression, setChatProgression] = useState([chatNodes[1].chat_text])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [recTasksList, setRecTasksList] = useState<string[]>([])
    const isListening = currentChatNode.next_node[0] === "4"
    // let recTasks: string[] = []

    useEffect(() => {
        const today = new Date();
        const upcomingDate = add(today, { days: 30 })
        const options = {method: 'GET'}
        fetch('http://127.0.0.1:5000/task_list', options)
        .then(response => response.json())
        .then(data => {
            setCurrentTaskList(data)
            const upcomingTasks: TaskData[] = [];
            for (let i = 0; i < data.length; i++) {
                const [month, day, year] = data[i].nextReminder.split('/')
                const dateObj = new Date(+year, +month - 1, +day);
                if (dateObj < upcomingDate) {
                    upcomingTasks.push(data[i])
                }
            }
            setUpcomingTaskList(upcomingTasks)
        })
        .catch(e => {
            console.error(e)
        })
    }, [taskListUpdate])

    useEffect(() => {
        if (isListening) {
            console.log("Listening")
        }
    }, [isListening])

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
                setTaskListUpdate(taskListUpdate + 1)
            })
            .catch(e => {
                console.error(e)
            })
        }
    }

    // const updateTaskFrequency = (taskURL: string, newFrequencyValue: string) => {
    const updateTaskFrequency = (newFrequencyValue: string) => {
        const options = {method: 'POST'}
        // const selectedTask = currentTaskList.filter((task) => task.id == taskURL);
        const selectedTask = [currentTask];
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

    const updateTaskReminder = () => {
        const options = {method: 'POST'}
        // const selectedTask = currentTaskList.filter((task) => task.id == taskURL);
        const selectedTask = [currentTask];
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

    const updateTaskReminderEarly = () => {
        const options = {method: 'POST'}
        // const selectedTask = currentTaskList.filter((task) => task.id == taskURL);
        const selectedTask = [currentTask];
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

    const updateTaskNotes = (note: string, noteIndex?: number) => {
        const options = {method: 'POST'}
        // const selectedTask = currentTaskList.filter((task) => task.id == taskURL);
        const selectedTask = [currentTask];
        const index = noteIndex ?? 0
        if (selectedTask.length > 0 && selectedTask[0].id && selectedTask[0].id.length > 0) {
            fetch(`http://127.0.0.1:5000/update_task_notes?task_id=${selectedTask[0].id}&task_note=${note}&task_note_index=${index}`, options)
            .then(response => response.json())
            .then(data => {
                setCurrentTaskList(data)
                if (currentTask.id === selectedTask[0].id) {
                    // Create a new notes array with the updated note at noteIndex
                    const updatedNotes = [...currentTask.notes];
                    updatedNotes[index] = note;
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
        const nextChatNode = chatNodes[node as keyof typeof chatNodes]
        setChatProgression(prev => [...prev, nextChatNode.chat_text])
        setCurrentChatNode(nextChatNode)
    }

    const updateModifiedChatNode = ( node : string, freq : string ) => {
        const nextChatNode = chatNodes[node as keyof typeof chatNodes]
        const freqNum = freq[0]
        let freqUnit = freq[freq.length - 1]
        if (freqUnit == "y") {
            freqUnit = "years"
        } else if (freqUnit == "m") {
            freqUnit = "months"
        } else if (freqUnit == "d") {
            freqUnit = "days"
        }
        nextChatNode.chat_text = nextChatNode.chat_text.replaceAll("insert_freq_num", freqNum)
        nextChatNode.chat_text =nextChatNode.chat_text.replaceAll("insert_freq_unit", freqUnit)
        setChatProgression(prev => [...prev, nextChatNode.chat_text])
        setCurrentChatNode(nextChatNode)
    }

    const getTaskDetails = (task : string) => {
        updateChatProgression(task)
        const options = {method: "GET"}
        fetch(`http://127.0.0.1:5000/get_task_details?task_name=${task}`, options)
        .then(response => response.json())
        .then(data => {
            setCurrentTaskList(data)
            setCurrentTask(data[data.length - 1])
            updateModifiedChatNode(currentChatNode.next_node[0], data[data.length - 1].frequency)
            setTaskListUpdate(taskListUpdate + 1)
        })
    }

    const updateChatNodeOptions = ( optionsList : string[] ) => {
        setTimeout(() => {
            if (currentChatNode.id == 1) {
                const nextChatNode = chatNodes[currentChatNode.next_node[0] as keyof typeof chatNodes]
                if (nextChatNode.options) {
                    nextChatNode.options[0] = optionsList[0]
                    nextChatNode.options[1] = optionsList[1]
                    if ('2' in nextChatNode.options) {
                        nextChatNode.options[2] = optionsList[2]
                    }
                }
            } else if (currentChatNode.id == 2) {
                const nextChatNode = chatNodes[currentChatNode.next_node[3] as keyof typeof chatNodes]
                // console.log(nextChatNode.options)
                if (nextChatNode.options) {
                    nextChatNode.options[0] = optionsList[0]
                    nextChatNode.options[1] = optionsList[1]
                    if ('2' in nextChatNode.options) {
                        nextChatNode.options[2] = optionsList[2]
                    }
                }
            }
        }, 1000)
    }

    const refreshRecListOptions = (node: string, option : string) => {
        const nextChatNode = chatNodes[node as keyof typeof chatNodes]
        updateChatProgression(option)
        setRecTasksList(recTasksList.slice(3))
        updateChatNodeOptions(recTasksList.slice(3))
        setTimeout(() => {
            setChatProgression(prev => [...prev, nextChatNode.chat_text])
            setCurrentChatNode(nextChatNode)
        }, 1000)
    }

    const removeRecListOption = ( index : number ) => {
        recTasksList.splice(index, 1)
        setRecTasksList(recTasksList)
        updateChatNodeOptions(recTasksList)
    }

    const getRecommendations = async () => {
        if (recTasksList.length < 1) {
            const options = {method: "GET"}
            await fetch(`http://127.0.0.1:5000/get_recommendations`, options)
            .then(response => response.json())
            .then(data => {
                // const recRefs = data["tasks"]["references"]
                const recTasks = data["tasks"]["task_list"]
                setRecTasksList(recTasks)
                if (recTasks.length > 2) {
                    updateChatNodeOptions(recTasks.slice(0, 3))
                } else {
                    console.log("Not enough recs in list")
                }
            })
        }
        // setRecTasksList(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
        // updateChatNodeOptions(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
    }

    const checkForOverwrite = (nodeId : number, optionIndex?: number, userInput?: string) => {
        if (optionIndex || optionIndex == 0) {
            if (nodeId == 4) {
                if (optionIndex == 1) {
                    updateTaskReminder()
                    updateTaskReminderEarly()
                    console.log("=> update reminder and early reminder to false")
                }
            } else if (nodeId == 7) {
                if (optionIndex == 1) {
                    updateTaskReminderEarly()
                    console.log("=> update early reminder to false")
                }
            }
        } else if (userInput) {
            if (nodeId == 5) {
                updateTaskFrequency(userInput)
                console.log("=> update frequency")
            } else if (nodeId == 10) {
                updateTaskNotes(userInput)
                console.log("=> add custom note")
            }
        }
    }

    const taskContext = {
        task: currentTask,
        taskList: currentTaskList,
        upcomingTaskList: upcomingTaskList,
        currentChatNode: currentChatNode,
        chatDialog: chatProgression,
        isListening: isListening,
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
        refreshRecListOptions,
        removeRecListOption,
        getTaskDetails,
        getRecommendations,
        checkForOverwrite
    }

  return <TaskContext.Provider value={taskContext}>{children}</TaskContext.Provider>
}

export default TaskContext;