import { Header } from "../../layouts/header/Header"
import Chat from "../../layouts/chat/Chat"
import styles from './Page.module.scss';
import Input from "../../components/Input/Input";

export default function Page() {
    return (
        <div className={styles.page}>
            <Header />
            <Chat />
            <Input />
        </div>
    )
}