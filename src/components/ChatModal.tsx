import { useContext } from "react";
import { createPortal } from "react-dom";

import ChatButton from "../UI/ChatButton"
import TaskContext from "../store/TaskContext";
import ChatDialog from "./ChatDialog";
import ChatInputArea from "./ChatInputArea";

export default function ChatModal() {
    const taskCtx = useContext(TaskContext);

    return createPortal(
        <div className="fixed flex items-center justify-center top-0 left-0 h-[100vh] w-[100vw]">
            <div className="w-[402px] h-[874px] rounded-[48px] bg-black opacity-90 z-1"/>
            <div className="absolute w-[402px] h-[874px] font-roboto font-medium p-[24px]">
                <dialog className="relative w-full h-full bg-transparent"
                    onClose={taskCtx?.updateModalState}
                    open>
                        <div className="flex flex-col items-end gap-4">
                            <ChatButton />
                            <div className="relative flex flex-col items-center justify-end gap-[18px] w-full h-[724px] bg-cc-prim rounded-lg p-[10px] overflow-hidden">
                                {/* <h2 className="text-cc-offw">Chat</h2> */}
                                <ChatDialog />
                                <ChatInputArea />
                            </div>
                        </div>
                </dialog>
            </div>
        </div>,
        document.getElementById('chatModal')!
    )
}