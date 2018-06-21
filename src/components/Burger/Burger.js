import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {

    //convert first object to array of keys [salad, meat, cheese]
    //[1 ],[ , ], [ , ] only length od array is what matters us, use '_' to indicate value to take as blank
    //ingkey+ indicates unique key
    //if cheese:2 then -> [ , ] -> 2 times the cheese is added 
    //flatten the inner array as single array with reduce
    let transformedIngredients = Object.keys(props.ingredients).map(ingKey =>{
        return [...Array(props.ingredients[ingKey])].map((_,i)=>{
            return <BurgerIngredients key={ingKey+i} type={ingKey}/>
            })
        }).reduce((Ele, nextEle)=>{
            return Ele.concat(nextEle)
            }, []);  

    if(transformedIngredients.length === 0){
        transformedIngredients = <p> Please start entering ingredients </p>
    }
    return(
        <div className= {classes.Burger}>
            <BurgerIngredients type = 'bread-top'/>
            {transformedIngredients}
            <BurgerIngredients type = 'bread-bottom'/>
        </div>    
    );
}

export default burger;