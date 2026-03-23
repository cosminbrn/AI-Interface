import styles from './Dropdown.module.scss';
import arrow from '../../assets/arrow.svg'
import { useState, useRef, useEffect } from 'react';

export default function Dropdown() {
    const [isOpen, setOpen] = useState(false);
    //const [selectedOption, setSelectedOption] = useState('NewGen AI 4.0');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setOpen(!isOpen);
    }

    const handleOptionClick = (option: string) => {
        //setSelectedOption(option);
        setOpen(false);
    }

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
                <img src={arrow} alt="Dropdown Arrow" className={styles.arrow} onClick={toggleDropdown} />
            {isOpen && (
                <div className={styles.menu}>
                    <div className={styles.menuItem} onClick={() => handleOptionClick('NewGen AI 4.0')}>NexGen AI 4.0</div>
                    <div className={styles.menuItem} onClick={() => handleOptionClick('NewGen AI 3.5')}>NexGen AI 3.5</div>
                </div>
            )}
        </div>
    )
}