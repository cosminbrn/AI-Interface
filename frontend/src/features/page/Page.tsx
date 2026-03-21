import { Header } from "../../layouts/header/Header"
import Chat from "../../layouts/chat/Chat"
import styles from './Page.module.scss';
import Input from "../../layouts/Input/Input";
import Sidebar from "../../layouts/sidebar/Sidebar";
import { useState, useEffect } from "react";

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

export interface ChatSession {
    id: string;
    title: string;
    messages: Message[];
}

const initialMessage: Message = {
    id: '1',
    text: 'Hello! How can I assist you today?',
    sender: 'ai',
    timestamp: new Date(),
};

export default function Page() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [isTyping, setIsTyping] = useState(false);

    const [sessions, setSessions] = useState<ChatSession[]>(() => {
        const savedSessions = localStorage.getItem("chat_sessions");
        if (savedSessions) {
            return JSON.parse(savedSessions);
        }
        return [{ id: Date.now().toString(), title: "New Chat", messages: [initialMessage] }];
    });

    const [currentSessionId, setCurrentSessionId] = useState<string>(sessions[0]?.id);

    useEffect(() => {
        localStorage.setItem("chat_sessions", JSON.stringify(sessions));
    }, [sessions]);

    const currentSession = sessions.find(session => session.id === currentSessionId);
    const messages = currentSession ? currentSession.messages : [];
    
    const handleNewChat = () => {
        const newSession: ChatSession = {
            id: Date.now().toString(),
            title: "New Chat",
            messages: [initialMessage]
        };
        setSessions([newSession, ...sessions]);
        setCurrentSessionId(newSession.id);
        setIsSidebarOpen(false);
    };

    const handleSendMessage = (text: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date(),
        };
        
        setSessions(prevSessions => prevSessions.map(session => {
            if (session.id === currentSessionId) {
                const newTitle = session.messages.length === 1 ? text.slice(0, 20) : session.title;
                return { ...session, title: newTitle, messages: [...session.messages, newMessage] };
            }
            return session;
        }));

        setIsTyping(true);

        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now()).toString(),
                text: `Here is a mock response from yours truly\n\nI can format text to be **bold**, *italic*, or include [links](https://google.com). \n\nHere is a code block:\n\`\`\`javascript\nconsole.log("Hello NexGen!");\n\`\`\``,
                sender: 'ai',
                timestamp: new Date(),
            };

            setSessions(prevSessions => prevSessions.map(session => 
                session.id === currentSessionId 
                    ? { ...session, messages: [...session.messages, aiResponse] }
                    : session
            ));
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className={styles.page}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}
                sessions={sessions}
                currentSessionId={currentSessionId}
                onSessionSelect={setCurrentSessionId}
                onNewChat={handleNewChat}
            />
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Chat messages={messages} isTyping={isTyping} />
            <Input onSendMessage={handleSendMessage} isTyping={isTyping} />
        </div>
    )
}