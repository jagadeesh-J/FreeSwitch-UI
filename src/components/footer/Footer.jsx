import React from 'react';

const footerStyle = {
  backgroundColor: '#515151',
  color: '#fff',
  padding: '0 1rem',
  position: 'fixed',
  bottom: '0',
  left: '0',
  width: '100%',
};

const Footer = props => {
  const { footer } = { ...props };
  return (
    <div style={footerStyle}>
      <p align="center">{footer.title}</p>
    </div>
  );
};

export default Footer;
