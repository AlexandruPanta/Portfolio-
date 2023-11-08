function Contact() {
    const contactStyle = {
      textAlign: 'center',
      color: '#0A2472',
      fontFamily: 'Agbalumo-Regular',
      margin: 'auto',
    };
  
    const linkStyle = {
      color: '#001C55',
      textDecoration: 'none',
      marginLeft: '4px',
    };
  
    return (
      <footer id="section4">
        <h1 style={contactStyle}>Contact</h1>
        <div>
          <h3 style={contactStyle}>
            Feel free to get in touch, and I'll get back to you as soon as possible.
          </h3>
        </div>
        <p style={{ ...contactStyle, marginBottom: '10px' }}>
          By phone at{' '}
          <a style={linkStyle} href="tel:+33763077798">
            07 63 07 77 98
          </a>
        </p>
        <p style={{ ...contactStyle, marginBottom: '10px' }}>
          Via{' '}
          <a
            style={linkStyle}
            href="mailto:alexandru.panta2003@gmail.com?subject=Contact from Alexandru Panta Portfolio"
          >
            email
          </a>
        </p>
        <p style={{ ...contactStyle, marginBottom: '10px' }}>
          Connect on{' '}
          <a
            style={linkStyle}
            href="https://www.linkedin.com/in/alexandru-panta-4bb0a2261/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </p>
        <p style={{ ...contactStyle, marginBottom: '10px' }}>
          Check out my work on{' '}
          <a
            style={linkStyle}
            href="https://github.com/AlexandruPanta"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    );
  }
  
  export default Contact;
  