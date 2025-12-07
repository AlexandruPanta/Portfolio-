import Image from 'next/image'
import styles from '../styles/AboutMe.module.css';

function AboutMe(id) {
  const imageStyle = {
    borderRadius: '20%'
  }
  return (
    <div className={styles.AboutMe} id='section1'>
      <h1 className={styles.Title}>Welcome to My Portfolio</h1>

      <p className={styles.Info_pation}>
        Hey there! I'm <strong>Alexandru Panta</strong>, a passionate Full-Stack Developer who thrives on building exceptional digital experiences.
        <br /><br />
        My journey in tech is driven by curiosity and innovation. From crafting seamless web applications to developing intuitive mobile solutions, I love transforming ideas into reality through code.
        <br /><br />
        I specialize in creating modern, responsive, and user-centric applications using cutting-edge technologies. Whether it's React, Node.js, or React Native, I'm always exploring new tools to deliver the best solutions.
        <br /><br />
        Technology isn't just my profession—it's my passion. I believe in continuous learning, staying ahead of industry trends, and pushing the boundaries of what's possible.
        <br /><br />
        My goal? To create impactful solutions that make a difference. Each project is an opportunity to solve real-world problems with elegant, scalable code.
        <br /><br />
        I'd love to connect! Explore my work below and let's build something amazing together.
      </p>

    </div>
  );
};

export default AboutMe;