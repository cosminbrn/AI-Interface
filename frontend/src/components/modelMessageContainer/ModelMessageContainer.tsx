import styles from './ModelMessageContainer.module.scss';
import chatIcon from '../../assets/icons/chatIcon.svg';
import ModelTextArea from './ModelTextArea/ModelTextArea';
import copyIcon from '../../assets/icons/copyIcon.svg';
import refreshIcon from '../../assets/icons/refreshIcon.svg';
import thumbsUpIcon from '../../assets/icons/thumbsUpIcon.svg';
import thumbsDownIcon from '../../assets/icons/thumbsDownIcon.svg';
import { useRef, useState } from 'react';
import gsap from 'gsap';

interface ModelMessageContainerProps {
    text: string;
    timestamp: Date | string;
}

export default function ModelMessageContainer({ text, timestamp  }: ModelMessageContainerProps) {

    const copyRef = useRef<HTMLDivElement>(null);
    const refreshRef = useRef<HTMLDivElement>(null);
    const thumbsUpRef = useRef<HTMLDivElement>(null);
    const thumbsDownRef = useRef<HTMLDivElement>(null);

    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 500);
        gsap.fromTo(copyRef.current, {
            y: 0,
        }, {
            y: -5,
            duration: 0.3,
            ease: 'power3.inOut',
            yoyo: true,
            repeat: 1,
        })
    }

    const handleRefresh = () => {
        gsap.fromTo(refreshRef.current, {
            rotation: 0,
        }, {
            rotation: 360,
            duration: 0.6,
            ease: 'power3.inOut',
        })

        gsap.to(refreshRef.current, {
            scale: 1.5,
            ease: 'power3.inOut',
            yoyo: true,
            repeat: 1,
            duration: 0.3,
        })
    }

    const handleThumbsUp = () => {
        gsap.fromTo(thumbsUpRef.current, {
            y: 0,
        }, {
            y: -5,
            duration: 0.3,
            ease: 'power3.inOut',
            yoyo: true,
            repeat: 1,
        })

        gsap.fromTo(thumbsUpRef.current, {
            rotation: 0,
        }, {
            rotation: -20,
            duration: 0.3,
            ease: 'power3.inOut',
            yoyo: true,
            repeat: 1,
        })
    }

    const handleThumbsDown = () => {
        gsap.fromTo(thumbsDownRef.current, {
            y: 0,
        }, {
            y: 5,
            duration: 0.3,
            ease: 'power3.inOut',
            yoyo: true,
            repeat: 1,
        })
    }

    const timeString = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
        <div className={styles.modelMessageContainer}>
            <div className={styles.icon}>
                <img src={chatIcon} alt="chat icon" />
            </div>
            <div className={styles.content}>
                <div className={styles.timestamp}>{timeString}</div>
                <ModelTextArea text={text} />
                <div className={styles.footer}>
                    <div className={styles.actions}>
                        <div className={styles.copyActionButtonWrapper}>
                            <div className={styles.actionButton} onClick={handleCopy} title="Copy text" ref={copyRef} role="button" tabIndex={0} aria-label="Copy model response">
                                <img src={copyIcon} alt="Copy" />
                            </div>
                            {isCopied && <div className={styles.tooltip} role="status" aria-live="polite">Copied!</div>}
                        </div>
                        <div className={styles.actionButton} title="Regenerate response" ref={refreshRef} onClick={handleRefresh} role="button" tabIndex={0} aria-label="Regenerate response">
                            <img src={refreshIcon} alt="Regenerate" />
                        </div>
                        <div className={styles.actionButton} title="Good response" ref={thumbsUpRef} onClick={handleThumbsUp} role="button" tabIndex={0} aria-label="Mark response as good">
                            <img src={thumbsUpIcon} alt="Like" />
                        </div>
                        <div className={styles.actionButton} title="Bad response" ref={thumbsDownRef} onClick={handleThumbsDown} role="button" tabIndex={0} aria-label="Mark response as bad">
                            <img src={thumbsDownIcon} alt="Dislike" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}