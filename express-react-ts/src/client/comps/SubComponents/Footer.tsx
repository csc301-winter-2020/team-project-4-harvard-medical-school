import React from "react";
import "../../scss/footer";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="footer">
      Chris Marcok, Lance Oribello, David Choi, Chris Koehler, Robert Tan,
      Qingyuan Qie, and Steven Kang for CSC301 @ UofT
    </footer>
  );
};
