import styles from './Dropdown.module.scss';
import arrow from '../../assets/icons/arrowIcon.svg';
import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Dropdown() {
    const [isOpen, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setOpen(!isOpen);
    }

    const handleOptionClick = () => {
        setOpen(false);
    }

    const arrowRef = useRef<HTMLImageElement>(null);
    useGSAP(() => {
        gsap.to(arrowRef.current, {
            rotation: isOpen ? 180 : 0,
            duration: 0.3,
            ease: 'power3.inOut'
        })
    }, [isOpen]);

    useEffect(() => {

        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
                <img ref={arrowRef} src={arrow} alt="Dropdown Arrow" className={styles.arrow} onClick={toggleDropdown} />
            {isOpen && (
                <div className={styles.menu}>
                    <div className={styles.menuItem} onClick={() => handleOptionClick()}>NexGen AI 4.0</div>
                    <div className={styles.menuItem} onClick={() => handleOptionClick()}>NexGen AI 3.5</div>
                </div>
            )}
        </div>
    )
}