import React from 'react';
import Button from '../../UI/Button/Button'
 
const orderSummary = (props) =>{

    const ingredientList = Object.keys(props.ingredients).map(ingKey => {
        return <li key = {ingKey}><span>{ingKey}</span> : {props.ingredients[ingKey]}</li>
    })

    return (
        <div>
            <h3>Your Order !</h3>
            <h4>Here is your delicious Burger Ingredient List </h4>
            <ul>
                {ingredientList}
            </ul>
            <h3>Total Price : {props.totalPrice.toFixed(2)}</h3>
            <i>Continue to Checkout ?</i><br/>
            <Button btnType="Danger" clicked = {props.purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" clicked = {props.purchaseContinue}>CONTINUE</Button>
        </div>    
    );
}

export default orderSummary;