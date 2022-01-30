import React, {useEffect, useState} from "react";
import './Clock.scss';

function Clock() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const [fullTime, setFullTime] = useState(new Date().toLocaleTimeString());
  const date = new Date().toLocaleDateString();
  const fullDate = `${monthNames[new Date().getMonth()]} ${ordinalSuffixOf(new Date().getDay() + 1)} ${new Date().getFullYear()}`;
  const time = `${new Date().getHours()}:${new Date().getMinutes()} ${(new Date()).getHours() < 12 ? 'AM' : 'PM'}`;
  const [next, setNext] = useState(0);
  const [bgColor, setBgColor] = useState(652413);

  let arrayFormats = [`${fullTime} ${(new Date()).getHours() < 12 ? 'AM' : 'PM'}`, date.replace(/[.]/g,"/"), fullDate, time];

  const tick = () => {
    setFullTime(new Date().toLocaleTimeString());
  }

  useEffect(() => {
    const intervalID = setInterval(
        () => tick(),
        1000
    );
    return function cleanup() {
      clearInterval(intervalID);
    };
  }, [])

  function ordinalSuffixOf(i) {
    let j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  }

  const clickAnywhere = () => {
    setBgColor(Math.floor(100000 + Math.random() * 900000));
    setNext(next + 1 === arrayFormats.length ? 0 : next + 1);
  }

  return (
      <div className="clock" onClick={() => clickAnywhere()} style={{background : `#${bgColor}`}}>
        <h1>Click anywhere to change formats</h1>
        <span>{arrayFormats[next]}</span>
      </div>
  );
}

export default Clock;
