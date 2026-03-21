import styles from './Sidebar.module.scss'

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <>
            {isOpen && (
                <div className={styles.overlay} onClick={onClose}></div>
            )}

            <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.sidebarContent}>
                    <h2>Menu</h2>
                    <button onClick={onClose}>Close</button>
                </div>
            </aside>
        </>
    )
}