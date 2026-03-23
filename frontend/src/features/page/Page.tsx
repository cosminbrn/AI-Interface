import { Header } from "../../layouts/header/Header"
import Chat from "../../layouts/chat/Chat"
import styles from './Page.module.scss';
import Input from "../../layouts/input/Input";
import Sidebar from "../../layouts/sidebar/Sidebar";
import { useChatSessions } from "../../hooks/useChatSessions";

export default function Page() {
    const {
        sessions,
        currentSession,
        currentSessionId,
        messages,
        isTyping,
        isSidebarOpen,
        setIsSidebarOpen,
        setCurrentSessionId,
        handleNewChat,
        handleSendMessage,
        handleRenameChat,
    } = useChatSessions();

    return (
        <div className={styles.page}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}
                sessions={sessions}
                currentSessionId={currentSessionId}
                onSessionSelect={setCurrentSessionId}
                onNewChat={handleNewChat}
                onRenameChat={handleRenameChat}
            />
            <Header onMenuClick={() => setIsSidebarOpen(true)} currentSession={currentSession?.title || 'Unnamed Chat'} />
            <Chat messages={messages} isTyping={isTyping} />
            <Input onSendMessage={handleSendMessage} isTyping={isTyping} />
        </div>
    )
}