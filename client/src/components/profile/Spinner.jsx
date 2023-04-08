import React from 'react';
import classes from '../styles/spinner.module.css';

const Spinner = () => {
  return (
        <div className={classes.SpinnerContainer}>
            <div className={classes.Spinner}></div>
        </div>
    )
};

export default Spinner;
