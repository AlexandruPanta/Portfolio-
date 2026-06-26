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
            width={70}
            height={70}
            alt="html"
            style={imageStyle}
          />
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/css.png"
            width={70}
            height={70}
            alt="css"
            style={imageStyle}
          />
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/javascript.png"
            width={70}
            height={70}
            alt="javascript"
            style={imageStyle}
          />
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/react.png"
            width={70}
            height={70}
            alt="React"
            style={imageStyle}
          />
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/next.png"
            width={70}
            height={70}
            alt="next.js"
            style={imageStyle}
          />
        </div>
        <div className={styles.imageContainer_reactNative}>
          <Image
            src="/react-native.png"
            width={80}
            height={80}
            alt="react-native"
            style={imageStyle}
          />
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/node.png"
            width={70}
            height={70}
            alt="node.js"
            style={imageStyle}
          />
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/ex.png"
            width={70}
            height={70}
            alt="express.js"
            style={imageStyle}
          />
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/python.png"
            width={70}
            height={70}
            alt="python"
            style={imageStyle}
          />
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/flask.png"
            width={70}
            height={70}
            alt="flask"
            style={imageStyle}
          />
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/mongodb.png"
            width={70}
            height={70}
            alt="mongoDB"
            style={imageStyle}
          />
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/mysql.png"
            width={70}
            height={70}
            alt="mysql"
            style={imageStyle}
          />
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/github.png"
            width={70}
            height={70}
            alt="github"
            style={imageStyle}
          />
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/git.png"
            width={70}
            height={70}
            alt="git"
            style={imageStyle}
          />
        </div>
      </div>

      <div className={styles.toolbox}>
        <div className={styles.toolGroup}>
          <span className={styles.toolLabel}>Systems &amp; Infra</span>
          <span className={styles.toolItems}>Docker · Linux · Nginx · systemd · CI/CD · OVH</span>
        </div>
        <div className={styles.toolGroup}>
          <span className={styles.toolLabel}>IoT &amp; Embedded</span>
          <span className={styles.toolItems}>ESP32 · Raspberry Pi · TCP/UDP · OTA updates · ThingsBoard</span>
        </div>
        <div className={styles.toolGroup}>
          <span className={styles.toolLabel}>Security</span>
          <span className={styles.toolItems}>SHA-256 signing · OTA rollback · Row-Level Security · WireGuard VPN · SSL/TLS</span>
        </div>
        <div className={styles.toolGroup}>
          <span className={styles.toolLabel}>Backend</span>
          <span className={styles.toolItems}>Node.js · Express · Python · Supabase Edge Functions</span>
        </div>
        <div className={styles.toolGroup}>
          <span className={styles.toolLabel}>Frontend &amp; Mobile</span>
          <span className={styles.toolItems}>TypeScript · React · Next.js · Flutter</span>
        </div>
        <div className={styles.toolGroup}>
          <span className={styles.toolLabel}>Data</span>
          <span className={styles.toolItems}>PostgreSQL · Supabase · Cassandra · BigQuery · Metabase</span>
        </div>
      </div>
    </div>
  );
}

export default Languages;
