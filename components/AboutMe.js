import styles from '../styles/AboutMe.module.css';

function AboutMe() {
  return (
    <section className={styles.AboutMe} id='section1'>
      <div className={styles.heroInner}>
        <span className={styles.badge}>
          <span className={styles.dot}></span> Available for systems / IoT roles
        </span>

        <h1 className={styles.name}>ALEXANDRU&nbsp;PANTA</h1>

        <p className={styles.role}>
          Full-Stack Developer <span className={styles.sep}>·</span>{' '}
          <span className={styles.gradientText}>IoT, Systems &amp; Security</span>
        </p>

        <p className={styles.tagline}>
          I design, deploy and secure connected systems <strong>end-to-end</strong> — from the
          embedded sensor (ESP32, Raspberry Pi) to production infrastructure, data pipelines and
          mobile apps. My IoT fall-detection system runs in production in real nursing homes.
        </p>

        <div className={styles.ctaRow}>
          <a href="#section2" className={styles.ctaPrimary}>View my work</a>
          <a href="#section4" className={styles.ctaGhost}>Get in touch</a>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>2</span>
            <span className={styles.statLabel}>EHPAD in production</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNum}>Sensor→Cloud</span>
            <span className={styles.statLabel}>full stack ownership</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNum}>MSc AI</span>
            <span className={styles.statLabel}>@ EPITECH</span>
          </div>
        </div>

        <div className={`${styles.aboutPanel} revealOnScroll`}>
          <p>
            Currently a full-stack engineer (apprenticeship) at <strong>Zoe Care — SATT
            Paris-Saclay</strong>, where I build and operate an IoT fall-detection system deployed
            in two nursing homes with strong reliability and security requirements. In parallel I'm
            earning an <strong>MSc in Computer Science (AI specialization) at EPITECH</strong>.
            <br /><br />
            What drives me is building things that actually ship and hold up in production — secure
            OTA updates, reliable infrastructure, clean data pipelines and interfaces people depend
            on every day. I'm looking for a full-time role in <strong>systems / IoT</strong>,
            ideally in <strong>e-health</strong>.
          </p>
        </div>
      </div>

      <a href="#section2" className={styles.scrollCue} aria-label="Scroll to projects">
        <span>SCROLL</span>
        <span className={styles.cueArrow}>↓</span>
      </a>
    </section>
  );
}

export default AboutMe;
