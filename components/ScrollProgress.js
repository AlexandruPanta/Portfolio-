import { useEffect, useState } from 'react';
import styles from '../styles/ScrollProgress.module.css';

function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={styles.progressContainer}>
            <div
                className={styles.progressBar}
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    );
}

export default ScrollProgress;
