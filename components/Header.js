import styles from '../styles/Header.module.css';
import {Link} from "react-scroll";

function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.linkContainer}>
                <Link
                    to="section1"
                    spy={true}
                    smooth={true}
                    offset={-5}
                    duration={2000}>
                <span className={styles.link}>About me</span></Link>
				<Link
                    to="section2"
                    spy={true}
                    smooth={true}
                    offset={-5}
                    duration={2000}>
                <span className={styles.link}>Projects</span></Link>
                <Link
                    to="section3"
                    spy={true}
                    smooth={true}
                    offset={-5}
                    duration={2000}>
                <span className={styles.link}>Languages & tools</span></Link>
                <Link
                    to="section4"
                    spy={true}
                    smooth={true}
                    offset={-5}
                    duration={2000}>
                <span className={styles.link}>Contact</span></Link>
			</div>
		</header >
	);
}

export default Header;
