import Image from 'next/image'
import styles from '../styles/AboutMe.module.css';

function AboutMe(id){
  const imageStyle = {
    borderRadius: '20%'
  }
  return (
    <div className={styles.AboutMe} id='section1'>
      <h1 className={styles.Title}>Welcome to My Portfolio</h1>
      <div className={styles.container_text_image}>
        <div className={styles.image}>
        <Image
          src="/profile.png"
          width={'150%'}
          height={'300%'}
          alt="Picture of the author"
          style={imageStyle}
          />
        </div>
        <p className={styles.Info_pation}> Hey there! 👋 I'm Panta Alexandru, a Full-Stack developer with a passion for staying on the cutting edge of technology.<br/><br/>
          My skills span web development and mobile app development, making me a versatile tech enthusiast.<br/><br/>
          I see the tech world as an ever-evolving landscape, teeming with exciting possibilities.<br/><br/>
          I'm dedicated to keeping up with the latest tech trends and constantly expanding my knowledge.<br/><br/>
          My primary focus is on harnessing the power of the most current technologies to create impactful solutions.<br/><br/>
          I welcome you to explore my portfolio to discover the projects I've had working on 🚀</p>
        </div>
    </div>
  );
};

export default AboutMe;