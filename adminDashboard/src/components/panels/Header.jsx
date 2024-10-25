import React from 'react';
import titleIcon from '../../assets/titlelogo.png';

const Header = () => {
  return (
    <header className="header">
      <img
        src={titleIcon}
        alt="profile"
        height={180}
        width={500}
      />
    </header>
  );
};

export default Header;