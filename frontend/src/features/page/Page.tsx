import { Header } from "../../layouts/header/Header"
import Chat from "../../layouts/chat/Chat"
import styles from './Page.module.scss';
import Input from "../../layouts/Input/Input";
import Sidebar from "../../layouts/sidebar/Sidebar";
import { useState } from "react";

export default function Page() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className={styles.page}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Chat />
            <Input />
        </div>
    )
}