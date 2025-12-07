import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Projects.module.css';

function Projects(id) {

  const imageStyle = {
    borderRadius: '15px'
  };

  return (
    <div className={styles.Projects} id='section2'>
      <h1 className={styles.Title}>Projects</h1>
      <div className={styles.container_text_image}>
        <div className={styles.container_project}>
          <div className={styles.textLink}>
            <video className={styles.video} controls>
              <source src='/Ecna.mp4' />
            </video>
            <div className={styles.textInfo}>
              <p className={styles.textStyle}>
                <strong>ECNA</strong> is a cutting-edge mobile solution revolutionizing medical transportation management.
                Built for private ambulance companies, this comprehensive platform delivers real-time tracking and seamless coordination.
                <br /><br />
                <strong>Key Features:</strong>
                <br />• Real-time assignment tracking (past, ongoing, future)
                <br />• Intuitive dashboard for fleet management
                <br />• Significant time savings through automated workflows
                <br />• Enhanced user experience for all stakeholders
                <br /><br />
                Developed with a modern tech stack including React Native for cross-platform mobile excellence, Node.js and Express for robust backend services, and MongoDB for scalable data management.
              </p>
              <div className={styles.image_lang}>
                <div className={styles.imageContainer}>
                  <Image
                    src="/node.png"
                    width={50}
                    height={50}
                    alt="node.js"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/ex.png"
                    width={50}
                    height={50}
                    alt="express.js"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/mongodb.png"
                    width={45}
                    height={45}
                    alt="mongoDB"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer_reactNative}>
                  <Image
                    src="/react-native.png"
                    width={60}
                    height={60}
                    alt="react-native"
                  />
                </div>
              </div>
              <div className={styles.link_container}>
                <Link href='https://github.com/AlexandruPanta/Ecna.git'>
                  <span className={styles.link}>github
                    <Image
                      src="/github.png"
                      width={20}
                      height={20}
                      alt="github"
                      style={imageStyle}
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container_text_image}>
        <div className={styles.container_project}>
          <div className={styles.textLink}>
            <Image
              src="/morningnews.png"
              width={500}
              height={300}
              alt="Picture of the author"
              style={imageStyle}
            />
            <div className={styles.textInfo}>
              <p className={styles.textStyle}>
                <strong>Morning News</strong> - Your personalized news experience redefined. Stay informed with the latest headlines while maintaining complete control over your feed.
                <br /><br />
                <strong>Standout Features:</strong>
                <br />• Enterprise-grade security with bcrypt & uid2 encryption
                <br />• Smart bookmarking system for favorite articles
                <br />• Intelligent content filtering with hide/show functionality
                <br />• Personalized feed management
                <br />• Dedicated bookmarks page for quick access
                <br /><br />
                Built with the powerful MERN stack (MongoDB, Express, React, Next.js) ensuring fast performance and seamless user experience.
              </p>
              <div className={styles.image_lang}>
                <div className={styles.imageContainer}>
                  <Image
                    src="/node.png"
                    width={50}
                    height={50}
                    alt="Node.js"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/ex.png"
                    width={50}
                    height={50}
                    alt="Express.js"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/mongodb.png"
                    width={45}
                    height={45}
                    alt="MongoDB"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/react.png"
                    width={45}
                    height={45}
                    alt="React"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/next.png"
                    width={45}
                    height={45}
                    alt="Next.js"
                    style={imageStyle}
                  />
                </div>
              </div>
              <div className={styles.link_container}>
                <Link href='https://morning-news-frontend-two.vercel.app/'>
                  <span className={styles.link}>Demo
                    <Image
                      src="/internet.png"
                      width={20}
                      height={20}
                      alt="internet"
                      style={imageStyle}
                    />
                  </span>
                </Link>
                <Link href='https://github.com/AlexandruPanta/MorningNews'>
                  <span className={styles.link}>github
                    <Image
                      src="/github.png"
                      width={20}
                      height={20}
                      alt="github"
                      style={imageStyle}
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container_text_image}>
        <div className={styles.container_project}>
          <div className={styles.textLink}>
            <Image
              src="/mymoviz.png"
              width={500}
              height={300}
              alt="Picture of the author"
              style={imageStyle}
            />
            <div className={styles.textInfo}>
              <p className={styles.textStyle}>
                <strong>MyMoviz</strong> - An interactive cinema discovery platform that brings the magic of movies to your fingertips.
                <br /><br />
                <strong>Features That Shine:</strong>
                <br />• Latest movie releases with stunning visuals
                <br />• Dynamic like and rating system
                <br />• Real-time preference updates
                <br />• Comprehensive movie information
                <br />• Engaging user interface
                <br /><br />
                Powered by Next.js and React for lightning-fast performance, with a robust Node.js/Express backend and MongoDB database ensuring smooth data flow and instant updates.
              </p>
              <div className={styles.image_lang}>
                <div className={styles.imageContainer}>
                  <Image
                    src="/node.png"
                    width={50}
                    height={50}
                    alt="Node.js"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/ex.png"
                    width={50}
                    height={50}
                    alt="Express.js"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/mongodb.png"
                    width={45}
                    height={45}
                    alt="MongoDB"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/react.png"
                    width={45}
                    height={45}
                    alt="React"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/next.png"
                    width={45}
                    height={45}
                    alt="Next.js"
                    style={imageStyle}
                  />
                </div>
              </div>
              <div className={styles.link_container}>
                <Link href='https://mymoviz-frontend-jb221w3qs-alexandrupanta.vercel.app/'>
                  <span className={styles.link}>Demo
                    <Image
                      src="/internet.png"
                      width={20}
                      height={20}
                      alt="internet"
                      style={imageStyle}
                    />
                  </span>
                </Link>
                <Link href='https://github.com/AlexandruPanta/MyMoviz'>
                  <span className={styles.link}>github
                    <Image
                      src="/github.png"
                      width={20}
                      height={20}
                      alt="github"
                      style={imageStyle}
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container_text_image}>
        <div className={styles.container_project}>
          <div className={styles.textLink}>
            <video className={styles.video} controls>
              <source src='/Movie-directory.mp4' />
            </video>
            <div className={styles.textInfo}>
              <p className={styles.textStyle}>
                <strong>Movie Directory</strong> - A comprehensive film database that puts the world of cinema at your fingertips.
                <br /><br />
                <strong>Highlights:</strong>
                <br />• Extensive movie database with detailed information
                <br />• User-friendly search and browse functionality
                <br />• Clean, intuitive interface design
                <br />• Fast and efficient data retrieval
                <br /><br />
                Built with Flask (Python) for powerful backend operations, MySQL for reliable data storage, and classic HTML/CSS for a responsive, accessible interface.
              </p>
              <div className={styles.image_lang}>
                <Image
                  src="/flask.png"
                  width={50}
                  height={50}
                  alt="flask"
                  style={imageStyle}
                />
                <div className={styles.imageContainer}>
                  <Image
                    src="/mysql.png"
                    width={50}
                    height={50}
                    alt="mysql"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/html.png"
                    width={50}
                    height={50}
                    alt="html"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/css.png"
                    width={50}
                    height={50}
                    alt="css"
                    style={imageStyle}
                  />
                </div>
              </div>
              <div className={styles.link_container}>
                <Link href='https://github.com/AlexandruPanta/Movie-Directory'>
                  <span className={styles.link}>github
                    <Image
                      src="/github.png"
                      width={20}
                      height={20}
                      alt="github"
                      style={imageStyle}
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container_text_image}>
        <div className={styles.container_project}>
          <div className={styles.textLink}>
            <Image
              src="/weatherapp.png"
              width={500}
              height={300}
              alt="Picture of the author"
              style={imageStyle}
            />
            <div className={styles.textInfo}>
              <p className={styles.textStyle}>
                <strong>WeatherApp</strong> - Your personal weather companion delivering accurate forecasts with style.
                <br /><br />
                <strong>Core Features:</strong>
                <br />• Real-time weather updates for any city
                <br />• Detailed temperature ranges and conditions
                <br />• Smart city management system
                <br />• User authentication for personalized experience
                <br />• Custom city lists with quick delete functionality
                <br />• Intuitive search interface
                <br /><br />
                Crafted with vanilla JavaScript for optimal performance, styled with modern CSS, and built on a solid HTML foundation for maximum compatibility.
              </p>
              <div className={styles.image_lang}>
                <div className={styles.imageContainer}>
                  <Image
                    src="/javascript.png"
                    width={50}
                    height={50}
                    alt="javascipt"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/css.png"
                    width={50}
                    height={50}
                    alt="Css"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/html.png"
                    width={50}
                    height={50}
                    alt="html"
                    style={imageStyle}
                  />
                </div>
              </div>
              <div className={styles.link_container}>
                <Link href='https://weather-app-frontend-coral.vercel.app/'>
                  <span className={styles.link}>Demo
                    <Image
                      src="/internet.png"
                      width={20}
                      height={20}
                      alt="internet"
                      style={imageStyle}
                    />
                  </span>
                </Link>
                <Link href='https://github.com/AlexandruPanta/WeatherApp'>
                  <span className={styles.link}>github
                    <Image
                      src="/github.png"
                      width={20}
                      height={20}
                      alt="github"
                      style={imageStyle}
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
