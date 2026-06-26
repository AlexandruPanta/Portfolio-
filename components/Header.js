import styles from '../styles/Header.module.css';
import { Link } from "react-scroll";

function Header() {
	return (
		<header className={styles.header}>
			<Link to="section1" smooth={true} duration={900} className={styles.brand}>
				<span className={styles.brandMark}>◆</span>
				<span className={styles.brandText}>A. PANTA</span>
			</Link>
			<nav className={styles.linkContainer}>
				<Link to="section1" spy={true} smooth={true} offset={-5} duration={900} activeClass={styles.active}>
					<span className={styles.link}>About</span>
				</Link>
				<Link to="section2" spy={true} smooth={true} offset={-5} duration={900} activeClass={styles.active}>
					<span className={styles.link}>Projects</span>
				</Link>
				<Link to="section3" spy={true} smooth={true} offset={-5} duration={900} activeClass={styles.active}>
					<span className={styles.link}>Stack</span>
				</Link>
				<Link to="section4" spy={true} smooth={true} offset={-5} duration={900} activeClass={styles.active}>
					<span className={styles.link}>Contact</span>
				</Link>
			</nav>
		</header>
	);
}

export default Header;
