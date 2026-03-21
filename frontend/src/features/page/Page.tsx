import { Header } from "../../layouts/header/Header"
import Chat from "../../layouts/chat/Chat"
import styles from './Page.module.scss';
import Input from "../../layouts/Input/Input";
import Sidebar from "../../layouts/sidebar/Sidebar";
import { useState } from "react";

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

export default function Page() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [isTyping, setIsTyping] = useState(false);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! How can I assist you today?',
            sender: 'ai',
            timestamp: new Date(),
        }
    ]);

    const handleSendMessage = (text: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, newMessage]);
        // setMessages([...messages, newMessage]);

        setIsTyping(true);

        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now()).toString(),
                text: `Here is a mock response from yours truly\n\nI can format text to be **bold**, *italic*, or include [links](https://google.com). \n\nHere is a code block:\n\`\`\`javascript\nconsole.log("Hello NexGen!");\n\`\`\``,
                sender: 'ai',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className={styles.page}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Chat messages={messages} isTyping={isTyping} />
            <Input onSendMessage={handleSendMessage} isTyping={isTyping} />
        </div>
    )
}