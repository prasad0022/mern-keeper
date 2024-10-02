import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright &copy; {currentYear} | Prasad </p>
    </footer>
  );
};

export default Footer;
