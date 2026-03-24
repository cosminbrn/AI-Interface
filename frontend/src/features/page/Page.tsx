import { Header } from "../../layouts/header/Header"
import Chat from "../../layouts/chat/Chat"
import styles from './Page.module.scss';
import Input from "../../layouts/input/Input";
import Sidebar from "../../layouts/sidebar/Sidebar";
import { useState, useEffect, useRef } from "react";
import { type ChatSession, type Message } from "../../types/chatTypes";

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
        const latestSession = sessions[0];

        const isUntouchedNewChat =
            latestSession?.title === "New Chat" &&
            latestSession.messages.length <= 1 &&
            latestSession.messages.every((message) => message.sender === "ai");

        if (isUntouchedNewChat) {
            setCurrentSessionId(latestSession.id);
            setIsSidebarOpen(false);
            return;
        }

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

        const appendWordToMessage = (sessionId: string, messageId: string, word: string) => {
            setSessions(prevSessions => prevSessions.map(session => {
                if (session.id !== sessionId) return session; 

                return {...session, messages: session.messages.map(msg => {
                        if (msg.id !== messageId) return msg; 
                        return { ...msg, text: msg.text ? `${msg.text} ${word}` : word };
                    })
                };
            }));
        };

        setTimeout(() => {
            setIsTyping(false);
            const id = Date.now().toString();
            const fullResponse = `Here is a mock response from yours truly\n\nI can format text to be **bold**, *italic*, or include [links](https://google.com). \n\nHere is a code block:\n\`\`\`javascript\nconsole.log("Hello NexGen!");\n\`\`\``;
            const words = fullResponse.split(' ');

            const isOops = Math.random() < 0.25;

            if (isOops) {
                const error: Message = {
                    id: id,
                    text: '**Connection Error:** Sorry, I encountered a network issue while processing your request. Please try sending your message again.',
                    sender: 'ai',
                    timestamp: new Date(),
                };

                setSessions(prevSessions => prevSessions.map(session =>
                    session.id === currentSessionId ? { ...session, messages: [...session.messages, error] } : session
                ));
                return;
            }

            const empty: Message = {
                id: id,
                text: '',
                sender: 'ai',
                timestamp: new Date(),
            };

            setSessions(prevSessions => prevSessions.map(session =>
                session.id === currentSessionId ? { ...session, messages: [...session.messages, empty] } : session
            ));

            let currentIndex = 0;
            const streamInterval = setInterval(() => {
                if (currentIndex >= words.length) {
                    clearInterval(streamInterval); 
                    return;
                }

                appendWordToMessage(currentSessionId, id, words[currentIndex]);
                currentIndex++;
            }, 79);
        }, 1500);
    };

    const handleRenameChat = (sessionId: string, newTitle: string) => {
        setSessions(prevSessions => prevSessions.map(session => {
            if (session.id === sessionId) {
                return { ...session, title: newTitle };
            }
            return session;
        }));
    };

    const hasInitialized = useRef(false);

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const latestSession = sessions[0];
        
        if (!latestSession) {
            handleNewChat();
            return;
        }

        const isUntouchedNewChat =
            latestSession.title === "New Chat" &&
            latestSession.messages.length <= 1 &&
            latestSession.messages.every((message) => message.sender === "ai");

        if (!isUntouchedNewChat) {
            handleNewChat();
        } else {
            setCurrentSessionId(latestSession.id);
        }
    }, []);

    return (
        <div className={styles.page}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}
                sessions={sessions}
                currentSessionId={currentSessionId}
                onSessionSelect={setCurrentSessionId}
                onNewChat={handleNewChat}
                onRenameChat={handleRenameChat}
            />
            <Header onLogoClick={() => handleNewChat()} onMenuClick={() => setIsSidebarOpen(true)} currentSession={currentSession?.title || 'Unnamed Chat'} />
            <Chat messages={messages} isTyping={isTyping} />
            <Input onSendMessage={handleSendMessage} isTyping={isTyping} />
        </div>
    )
}