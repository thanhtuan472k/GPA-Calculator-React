import React from "react";
import style from "./index.module.css";

const Switch = ({ theme, switchTheme }) => {
  const icon =
    theme === "light" ? (
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        className="img-fluid"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 0C6 0 0 5 0 13C0 21 6 27 14 27C22 27 27 21 27 16C16 23 4 11 11 0Z"
          fill="#454242"
        />
      </svg>
    ) : (
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        className="img-fluid"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.74325 13.5C6.74325 17.2274 9.77535 20.2595 13.5027 20.2595C17.23 20.2595 20.2622 17.2274 20.2622 13.5C20.2622 9.77265 17.23 6.74055 13.5027 6.74055C9.77535 6.74055 6.74325 9.77265 6.74325 13.5ZM12.15 22.95H14.85V27H12.15V22.95ZM12.15 0H14.85V4.05H12.15V0ZM0 12.15H4.05V14.85H0V12.15ZM22.95 12.15H27V14.85H22.95V12.15ZM4.90995 24.0003L3.00105 22.0914L5.8644 19.2281L7.7733 21.1369L4.90995 24.0003ZM19.2267 5.8644L22.0914 2.9997L24.0003 4.9086L21.1356 7.7733L19.2267 5.8644ZM5.8644 7.77465L3.00105 4.90995L4.9113 3.00105L7.7733 5.86575L5.8644 7.77465ZM24.0003 22.0914L22.0914 24.0003L19.2267 21.1356L21.1356 19.2267L24.0003 22.0914Z"
          fill="white"
        />
      </svg>
    );

  return (
    <button onClick={switchTheme} className={style.switch}>
      {icon}
    </button>
  );
};

export default Switch;
