import { useEffect } from 'react';
import styles from '../styles/ParticlesBackground.module.css';

function ParticlesBackground() {
    useEffect(() => {
        const particlesContainer = document.querySelector(`.${styles.particles}`);
        if (!particlesContainer) return;

        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = styles.particle;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;

            const size = 2 + Math.random() * 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            particlesContainer.appendChild(particle);
        }

        return () => {
            if (particlesContainer) {
                particlesContainer.innerHTML = '';
            }
        };
    }, []);

    return <div className={styles.particles}></div>;
}

export default ParticlesBackground;
