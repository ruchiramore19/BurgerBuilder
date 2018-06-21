import React from 'react'; //for JSX

import Aux from '../../hocs/Aux';
import classes from './Layout.css';

const layout = (props) => (
    <Aux>
        <div>Toolbar SideDrawer Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>    
    </Aux>
);


export default layout;