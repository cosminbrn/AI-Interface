import { useState } from "react";
import { type ChatSession, type Message } from "../types/chatTypes";

export function useMessaging(
    currentSessionId: string,
    setSessions: React.Dispatch<React.SetStateAction<ChatSession[]>>
) {
    const [isTyping, setIsTyping] = useState(false);

    const appendWord = (messageId: string, word: string) => {
        setSessions(prev => prev.map(session => {
            if (session.id !== currentSessionId) return session;
            return {
                ...session,
                messages: session.messages.map(msg =>
                    msg.id !== messageId ? msg
                    : { ...msg, text: msg.text ? `${msg.text} ${word}` : word }
                ),
            };
        }));
    };

    const handleSendMessage = (text: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date(),
        };

        setSessions(prev => prev.map(session => {
            if (session.id !== currentSessionId) return session;
            const newTitle = session.messages.length === 1 ? text.slice(0, 20) : session.title;
            return { ...session, title: newTitle, messages: [...session.messages, userMessage] };
        }));

        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const id = Date.now().toString();

            if (Math.random() < 0.25) {
                const error: Message = {
                    id,
                    text: '**Connection Error:** Sorry, I encountered a network issue. Please try again.',
                    sender: 'ai',
                    timestamp: new Date(),
                };
                setSessions(prev => prev.map(s =>
                    s.id === currentSessionId ? { ...s, messages: [...s.messages, error] } : s
                ));
                return;
            }

            const fullResponse = `Here is a mock response from yours truly\n\nI can format text to be **bold**, *italic*, or include [links](https://google.com). \n\nHere is a code block:\n\`\`\`javascript\nconsole.log("Hello NexGen!");\n\`\`\``;
            const words = fullResponse.split(' ');

            setSessions(prev => prev.map(s =>
                s.id === currentSessionId
                    ? { ...s, messages: [...s.messages, { id, text: '', sender: 'ai', timestamp: new Date() }] }
                    : s
            ));

            let i = 0;
            const interval = setInterval(() => {
                if (i >= words.length) { clearInterval(interval); return; }
                appendWord(id, words[i]);
                i++;
            }, 79);
        }, 1500);
    };

    return { isTyping, handleSendMessage };
}