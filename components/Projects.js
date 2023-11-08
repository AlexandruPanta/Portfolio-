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
            <Image
              src="/mymoviz.png"
              width={500}
              height={300}
              alt="Picture of the author"
              style={imageStyle}
            />
            <div className={styles.textInfo}>
              <p className={styles.textStyle}>
                MyMoviz is a user-friendly platform for movie lovers, featuring the latest releases with engaging posters and brief descriptions. It stands out with its interactive features, allowing users to like movies, score them, and dynamically update their preferences. Explore cinema with MyMoviz! 🎬
              </p>
              <div className={styles.image_lang}>
                <div className={styles.imageContainer}>
                  <Image
                    src="/node.png"
                    width={'100%'}
                    height={'100%'}
                    alt="Node.js"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/ex.png"
                    width={'100%'}
                    height={'100%'}
                    alt="Express.js"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/mongodb.png"
                    width={'100%'}
                    height={'100%'}
                    alt="MongoDB"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/react.png"
                    width={'100%'}
                    height={'100%'}
                    alt="React"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/next.png"
                    width={'100%'}
                    height={'100%'}
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
                    width={'20%'}
                    height={'20%'}
                    alt="internet"
                    style={imageStyle}
                  />
                </span>
              </Link>
              <Link href='https://github.com/AlexandruPanta/MyMoviz'>
                <span className={styles.link}>github
                <Image
                    src="/github.png"
                    width={'20%'}
                    height={'20%'}
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
              Morning News redefines how you consume the news. With top-tier security (bcrypt and uid2) 
              for registration and login, your data is safeguarded.
              Customize your news feed effortlessly - bookmark articles you love, hide unwanted ones with 
              the eye slash icon, and revisit them with a single click. Your bookmarked articles are neatly stored on your personal bookmarks page.
              Morning News: Secure. Personalized. Informative  📰</p>
              <div className={styles.image_lang}>
                <div className={styles.imageContainer}>
                  <Image
                    src="/node.png"
                    width={'100%'}
                    height={'100%'}
                    alt="Node.js"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/ex.png"
                    width={'100%'}
                    height={'100%'}
                    alt="Express.js"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/mongodb.png"
                    width={'100%'}
                    height={'100%'}
                    alt="MongoDB"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/react.png"
                    width={'100%'}
                    height={'100%'}
                    alt="React"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/next.png"
                    width={'100%'}
                    height={'100%'}
                    alt="Next.js"
                    style={imageStyle}
                  />
                </div>
              </div>
              <div className={styles.link_container}>
              <Link href='https://morning-news-frontend-3ydpgcqdq-alexandrupanta.vercel.app/'>
                <span className={styles.link}>Demo
                <Image
                    src="/internet.png"
                    width={'20%'}
                    height={'20%'}
                    alt="internet"
                    style={imageStyle}
                  />
                </span>
              </Link>
              <Link href='https://github.com/AlexandruPanta/MorningNews'>
                <span className={styles.link}>github
                <Image
                    src="/github.png"
                    width={'20%'}
                    height={'20%'}
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
              WeatherApp is your modern weather app, offering real-time updates. Find the essentials at a glance:
               city name, weather description, and temperature range.
                Use the top search bar to explore more cities and enjoy a personalized experience by logging in or registering.
                Customize your city list effortlessly with the delete feature. Stay informed, your way  🌦️🌍 </p>
              <div className={styles.image_lang}>
                <div className={styles.imageContainer}>
                  <Image
                    src="/javascript.png"
                    width={'100%'}
                    height={'100%'}
                    alt="javascipt"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/css.png"
                    width={'100%'}
                    height={'100%'}
                    alt="Css"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/html.png"
                    width={'100%'}
                    height={'100%'}
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
                    width={'20%'}
                    height={'20%'}
                    alt="internet"
                    style={imageStyle}
                  />
                </span>
              </Link>
              <Link href='https://github.com/AlexandruPanta/MyMoviz'>
                <span className={styles.link}>github
                <Image
                    src="/github.png"
                    width={'20%'}
                    height={'20%'}
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
              Welcome to the Movie Directory project! This is a comprehensive directory that provides detailed information about a
               wide range of movies. 
              It's designed with a user-friendly interface and robust functionality to enhance your movie exploration experience 🍿
              </p>
              <div className={styles.image_lang}>
                  <Image
                    src="/flask.png"
                    width={'56%'}
                    height={'56%'}
                    alt="flask"
                    style={imageStyle}
                  />
                <div className={styles.imageContainer}>
                  <Image
                    src="/mysql.png"
                    width={'100%'}
                    height={'100%'}
                    alt="mysql"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/html.png"
                    width={'100%'}
                    height={'100%'}
                    alt="html"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/css.png"
                    width={'100%'}
                    height={'100%'}
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
                  width={'20%'}
                  height={'20%'}
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
                  <source src='/Ecna.mp4' />
                </video>
            <div className={styles.textInfo}>
              <p className={styles.textStyle}>
              ECNA is a mobile application related to the medical transportation sector, primarily intended for private ambulance companies. 
              Its main purpose is to provide real-time internal tracking of activities, including past, ongoing, and future assignments. 
              Additionally, it aims to offer significant time savings and a comfortable support experience for all platform users 🚑
              </p>
              <div className={styles.image_lang}>
                <div className={styles.imageContainer}>
                  <Image
                    src="/node.png"
                    width={'100%'}
                    height={'100%'}
                    alt="node.js"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/ex.png"
                    width={'100%'}
                    height={'100%'}
                    alt="express.js"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/mongodb.png"
                    width={'100%'}
                    height={'100%'}
                    alt="mongoDB"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer_reactNative}>
                  <Image
                    src="/react-native.png"
                    width={'135%'}
                    height={'150%'}
                    alt="react-native"
        
                  />
                </div>
              </div>
            <div className={styles.link_container}>
            <Link href='https://github.com/AlexandruPanta/Ecna.git'>
              <span className={styles.link}>github
                <Image
                  src="/github.png"
                  width={'20%'}
                  height={'20%'}
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
