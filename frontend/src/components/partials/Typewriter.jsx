import React, { useState, useEffect } from "react";

const Typewriter = ({ text, delay, infinite }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else {
      setIsTyping(false);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, text]);

  useEffect(() => {
    if (!infinite && !isTyping) {
      // Stop typing and clear the text after it's done if not infinite
      setTimeout(() => {
        setCurrentText("");
        setCurrentIndex(0);
      }, delay);
    }
  }, [isTyping, delay, infinite]);

  return <span>{currentText}</span>;
};

export default Typewriter;
