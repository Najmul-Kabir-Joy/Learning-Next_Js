import Link from 'next/link';
import React from 'react';
import styles from './main-header.module.css';
const MainHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>NEXT EVENTS</Link>
            </div>
            <nav className={styles.navigation}>
                <ul>
                    <li>
                        <Link href='/events'>ALL EVENTS</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainHeader;