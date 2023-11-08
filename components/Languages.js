import Image from 'next/image'
import styles from '../styles/Languages.module.css'

function Languages(id) {

  const imageStyle = {
    borderRadius: '15px'
  };
  return (
    <div className={styles.Languages} id='section3'>
      <h1 className={styles.Title}>Languages & tools</h1>
              <div className={styles.image_lang}>
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
                <div className={styles.imageContainer}>
                  <Image
                    src="/javascript.png"
                    width={'100%'}
                    height={'100%'}
                    alt="javascript"
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
                    alt="next.js"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer_reactNative}>
                  <Image
                    src="/react-native.png"
                    width={100}
                    height={100}
                    alt="react-native"
                    style={imageStyle}
                  />
                </div>
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
                    src="/python.png"
                    width={'100%'}
                    height={'100%'}
                    alt="python"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/flask.png"
                    width={'100%'}
                    height={'100%'}
                    alt="flask"
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
                    src="/github.png"
                    width={'100%'}
                    height={'100%'}
                    alt="github"
                    style={imageStyle}
                  />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/git.png"
                    width={'100%'}
                    height={'100%'}
                    alt="git"
                    style={imageStyle}
                  />
                </div>
            </div>
          </div>
  );
}

export default Languages;
