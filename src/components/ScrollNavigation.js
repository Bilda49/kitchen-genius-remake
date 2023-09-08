import React, { useEffect, useState } from "react";
import "../App.css";

const ScrollNavigation = ({ children }) => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`scroll-navigation ${scrolling ? "scrolling" : ""}`}>
      {children}
    </div>
  );
};

export default ScrollNavigation;
