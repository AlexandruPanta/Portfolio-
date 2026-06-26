import { useEffect } from 'react';
import styles from '../styles/ParticlesBackground.module.css';

function ParticlesBackground() {
    useEffect(() => {
        const container = document.querySelector(`.${styles.particles}`);
        if (!container) return;

        // Twinkling starfield
        const starCount = 150;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = styles.star;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            const size = Math.random() * 2 + 0.4;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.opacity = `${0.25 + Math.random() * 0.7}`;
            star.style.animationDelay = `${Math.random() * 4}s`;
            star.style.animationDuration = `${2 + Math.random() * 4}s`;
            container.appendChild(star);
        }

        // Occasional shooting stars
        const shootingCount = 3;
        for (let i = 0; i < shootingCount; i++) {
            const shoot = document.createElement('div');
            shoot.className = styles.shooting;
            shoot.style.top = `${Math.random() * 45}%`;
            shoot.style.left = `${Math.random() * 55}%`;
            shoot.style.animationDelay = `${i * 5 + Math.random() * 7}s`;
            container.appendChild(shoot);
        }

        return () => {
            if (container) container.innerHTML = '';
        };
    }, []);

    return <div className={styles.particles}></div>;
}

export default ParticlesBackground;
