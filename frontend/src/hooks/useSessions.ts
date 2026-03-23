import { useState, useEffect } from "react";
import { type ChatSession, type Message } from "../types/chatTypes";;

const initialMessage: Message = {
    id: '1',
    text: 'Hello! How can I assist you today?',
    sender: 'ai',
    timestamp: new Date(),
};

export function useSessions() {
    const [sessions, setSessions] = useState<ChatSession[]>(() => {
        const saved = localStorage.getItem("chat_sessions");
        return saved
            ? JSON.parse(saved)
            : [{ id: Date.now().toString(), title: "New Chat", messages: [initialMessage] }];
    });

    const [currentSessionId, setCurrentSessionId] = useState<string>(sessions[0]?.id);

    useEffect(() => {
        localStorage.setItem("chat_sessions", JSON.stringify(sessions));
    }, [sessions]);

    const currentSession = sessions.find(s => s.id === currentSessionId);
    const messages = currentSession?.messages ?? [];

    const handleNewChat = (onDone?: () => void) => {
        const newSession: ChatSession = {
            id: Date.now().toString(),
            title: "New Chat",
            messages: [initialMessage],
        };
        setSessions(prev => [newSession, ...prev]);
        setCurrentSessionId(newSession.id);
        onDone?.();
    };

    const handleRenameChat = (sessionId: string, newTitle: string) => {
        setSessions(prev => prev.map(s =>
            s.id === sessionId ? { ...s, title: newTitle } : s
        ));
    };

    return {
        sessions,
        setSessions,
        currentSession,
        currentSessionId,
        setCurrentSessionId,
        messages,
        handleNewChat,
        handleRenameChat,
    };
}