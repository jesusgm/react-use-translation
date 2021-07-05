import { useEffect, useState } from "react";

const useTranslation = (config) => {
  const [messages, setMessages] = useState(null);
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    if (config.lang) {
      setCurrentLang(config.lang);
    } else {
      let userLang = navigator.language || navigator.userLanguage;
      userLang = userLang.split("-")[0];

      const urlParams = new URLSearchParams(window.location.search);
      const queryLang = urlParams.get("lang");

      const lang = queryLang || userLang || config.defaultLang;
      setCurrentLang(lang);
    }

    if (config.url) {
      fetch(config.url)
        .then((res) => res.json())
        .then((data) => setMessages(data))
        .catch(() => {
          console.error("Error fetching messages from config url");
        });
    } else if (config.messages) {
      setMessages(messages);
    } else {
      console.error(
        "Configuration error: A translation api url or messages object must be configured"
      );
    }
  }, []);

  const t = (key) => {
    if (messages && messages[currentLang] && messages[currentLang][key]) {
      return messages[currentLang][key];
    } else {
      return key;
    }
  };

  return t;
};

export default useTranslation;
