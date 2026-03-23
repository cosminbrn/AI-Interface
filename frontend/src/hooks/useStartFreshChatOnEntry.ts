import { useEffect, useRef } from "react";
import { type ChatSession } from "../types/chatTypes";

export function useStartFreshChatOnEntry(
    handleNewChat: () => void,
    currentSession?: ChatSession
) {
    const hasStartedFreshChat = useRef(false);

    useEffect(() => {
        if (hasStartedFreshChat.current) return;

        const isUntouchedNewChat =
            currentSession?.title === "New Chat" &&
            currentSession.messages.length <= 1 &&
            currentSession.messages.every((message) => message.sender === "ai");

        if (isUntouchedNewChat) {
            hasStartedFreshChat.current = true;
            return;
        }

        hasStartedFreshChat.current = true;
        handleNewChat();
    }, [handleNewChat, currentSession]);
}