import Image from 'next/image'
import styles from '../styles/AboutMe.module.css';

function AboutMe(id) {
  const imageStyle = {
    borderRadius: '20%'
  }
  return (
    <div className={styles.AboutMe} id='section1'>
      <h1 className={styles.Title}>About Me</h1>

      <p className={styles.Info_pation}>
        Hey! I'm <strong>Alexandru Panta</strong>, a <strong>full-stack developer focused on IoT, systems and security</strong>.
        <br /><br />
        I design, deploy and secure connected systems <strong>end-to-end</strong> — from the embedded sensor (ESP32, Raspberry Pi) to production infrastructure (OVH, Docker, VPN), data pipelines, cloud backend and mobile apps.
        <br /><br />
        I'm currently a full-stack engineer (apprenticeship) at <strong>Zoe Care — SATT Paris-Saclay</strong>, where the IoT fall-detection system I work on is <strong>deployed in real nursing homes (EHPAD)</strong>, with strong reliability and security requirements. In parallel, I'm earning an <strong>MSc in Computer Science (AI specialization) at EPITECH</strong>.
        <br /><br />
        What drives me is building things that actually ship and hold up in production — secure OTA updates, reliable infrastructure, clean data pipelines and interfaces people depend on every day.
        <br /><br />
        I'm looking for a full-time role in <strong>systems / IoT</strong>, ideally in <strong>e-health</strong>. Explore my work below — let's build something meaningful together.
      </p>

    </div>
  );
};

export default AboutMe;