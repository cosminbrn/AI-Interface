import { useSidebar } from "./useSidebar";
import { useSessions } from "./useSessions";
import { useMessaging } from "./useMessaging";

export function useChatSessions() {
    const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

    const {
        sessions, setSessions,
        currentSession, currentSessionId, setCurrentSessionId,
        messages, handleNewChat, handleRenameChat,
    } = useSessions();

    const { isTyping, handleSendMessage } = useMessaging(currentSessionId, setSessions);

    return {
        sessions,
        currentSession,
        currentSessionId,
        messages,
        isTyping,
        isSidebarOpen,
        setIsSidebarOpen,
        setCurrentSessionId,
        handleNewChat: () => handleNewChat(() => setIsSidebarOpen(false)),
        handleSendMessage,
        handleRenameChat,
    };
}