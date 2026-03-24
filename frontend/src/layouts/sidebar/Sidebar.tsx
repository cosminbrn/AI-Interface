import styles from './Sidebar.module.scss';
import messageIcon from '../../assets/icons/clockIcon.svg'; 
import userAvatar from '../../assets/icons/userIcon.svg'; 
import closeIcon from '../../assets/icons/burgerIcon.svg';
import gearIcon from '../../assets/icons/gearIcon.svg';
import type { ChatSession } from '../../types/chatTypes';
import React, { useState, useRef } from 'react';
import Button from '../../components/button/Button';
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    sessions: ChatSession[];
    currentSessionId: string;
    onSessionSelect: (sessionId: string) => void;
    onNewChat: () => void;
    onRenameChat: (sessionId: string, newTitle: string) => void;
}

export default function Sidebar({ isOpen, onClose, sessions, currentSessionId, onSessionSelect, onNewChat, onRenameChat }: SidebarProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');

    const startEditing = (session: ChatSession, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingId(session.id);
        setEditTitle(session.title);

        gsap.to(e.currentTarget, {
            rotate: 180,
            duration: 0.25,
            ease: 'power3.inOut',
            yoyo: true,
            repeat: 1,
            y: 0,
            x: 0,
        })
    };

    const sidebarRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        gsap.to(sidebarRef.current, {
            x: isOpen ? '0%' : '-100%',
            duration: 0.5,
            ease: 'power3.inOut'
        })

        gsap.to(overlayRef.current, {
            autoAlpha: isOpen ? 1 : 0,
            duration: 0.4,
            ease: 'power2.inOut'
        })
    }, [isOpen])

    const handleRenameSubmit = (id: string) => {
        if (editingId === id) {
            onRenameChat(id, editTitle);
            setEditingId(null);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
        if (e.key === 'Enter') {
            handleRenameSubmit(id);
        } else if (e.key === 'Escape') {
            setEditingId(null);
        }
    }
    return (
        <>
            <div ref={overlayRef} className={styles.overlay} onClick={onClose} aria-hidden="true"></div>

            <aside ref={sidebarRef} className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.topSection}>
                    <Button onNewChat={onNewChat}></Button>
                    <div className={styles.closeBtn} onClick={onClose}
                        role="button"
                        tabIndex={0}
                        aria-label="Close sidebar"
                    >
                        <img src={closeIcon} alt="Close Menu" />
                    </div>
                </div>

                <div className={styles.historyList}>
                    <div className={styles.historyGroup}>
                        <div className={styles.historyTitle}>Today</div>
                        {sessions.map((session) => (
                            <div key={session.id} className={`${styles.historyItem} ${session.id === currentSessionId ? styles.active : ''}`} onClick={() => { onSessionSelect(session.id); setEditingId(null); }}
                                role="button"
                                tabIndex={0}
                                aria-label={`Open chat ${session.title}`}
                            >
                                <img src={messageIcon} alt="" />
                                {editingId === session.id ? (
                                    <input
                                        type="text"
                                        className={styles.editInput}
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        onBlur={() => handleRenameSubmit(session.id)}
                                        onKeyDown={(e) => handleKeyDown(e, session.id)}
                                        autoFocus
                                        onClick={(e) => e.stopPropagation()} 
                                    />
                                ) : (
                                    <div className={styles.itemText}>{session.title}</div>
                                )}

                                <div className={styles.editIcon} onClick={(e) => startEditing(session, e)} title="Rename chat">
                                    <img src={gearIcon} alt="Edit" />
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <div className={styles.userProfile}>
                        <img src={userAvatar} alt="User" className={styles.avatar} />
                        <div className={styles.userName}>Cosmin-George Baroana</div>
                        <img src={gearIcon} alt="Settings" className={styles.optionsIcon} />
                    </div>
                </div>
            </aside>
        </>
    );
}