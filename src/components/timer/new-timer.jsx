import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './timer.css';

const padTime = (time) => {
  return String(time).length === 1 ? `0${time}` : `${time}`;
};

const format = (time) => {
  const minutes = Math.floor(time / 60);

  const seconds = time % 60;

  return `${minutes}:${padTime(seconds)}`;
};

const App = ({ minutes, seconds, setEditCounter }) => {
  const fullSeconds = Number(minutes) * 60 + Number(seconds);
  const [counter, setCounter] = useState(fullSeconds);
  const [label, setLabel] = useState(false);
  const classLabel = label ? 'icon-play' : 'icon-pause';

  useEffect(() => {
    if (!label) {
      const timer = setInterval(() => {
        setCounter((counter) => counter - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    return undefined;
  }, [label]);

  setEditCounter(counter);

  return (
    <div className="timer">
      <button className={classLabel} aria-label={classLabel} type="button" onClick={() => setLabel(!label)} />
      {counter === 0 ? 'Time over' : <div>{format(counter)}</div>}
    </div>
  );
};

App.defaultProps = {
  minutes: '0',
  seconds: '0',
  setEditCounter: () => {},
};

App.propTypes = {
  minutes: PropTypes.string,
  seconds: PropTypes.string,
  setEditCounter: PropTypes.func,
};

export default App;
