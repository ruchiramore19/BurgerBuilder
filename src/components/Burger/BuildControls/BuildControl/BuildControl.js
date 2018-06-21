import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => {
    return(
            <div className={classes.BuildControl}>
                <p className={classes.Label}>{props.label}</p>
                <button className={classes.More} onClick={props.added}>More</button>
                <button className={classes.Less} onClick={props.removed} disabled = {props.disabled}>Less</button>
            </div>    
    );

}

export default buildControl;