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
        setMessages([...messages, newMessage]);
    };

    return (
        <div className={styles.page}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Chat messages={messages} />
            <Input onSendMessage={handleSendMessage}/>
        </div>
    )
}