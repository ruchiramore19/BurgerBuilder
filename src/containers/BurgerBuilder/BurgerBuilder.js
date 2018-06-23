import React, {Component} from 'react';
import Aux from '../../hocs/Aux01';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad : 0.5,
    bacon : 0.5,
    cheese : 1.3,
    meat : 0.7
}

class BurgerBuilder extends Component{

    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0
        },
        totalPrice : 0,
        purchasable : false,
        purchasing : false
    }

    //for disabling the order now button 
    updatePurchaseState(ingredients){

        const sum = Object.keys(ingredients).map(ingKey =>{return ingredients[ingKey]}).reduce((sum, ele) => {return sum+ele}, 0);

        this.setState({
            purchasable : sum > 0  //set to true if sum greater than 0
        })
    }

    addIngredient=(type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        //updating the state.ingredients with creating new copy and not modifying the original
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        
        this.setState({
            ingredients : updatedIngredients,
            totalPrice : newPrice
        })

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredient=(type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return      //to avoid removing element when we dont have any
        }
        const updatedCount = oldCount - 1;
        //updating the state.ingredients with creating new copy and not modifying the original
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceReduction = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceReduction;
        
        this.setState({
            ingredients : updatedIngredients,
            totalPrice : newPrice
        })

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () =>{
        this.setState({
            purchasing : true
        })
    } 

    purchaseCancelHandler = () =>{
        this.setState({
            purchasing : false
        })
    } 

    purchaseContinueHandler = () =>{
        alert('You can continue !!')
    }

    render(){

        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = true ? disabledInfo[key] <= 0 : false
        }  //{cheese:true, meat:false, salad: true, bacon:false}

        return(
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <Modal show={this.state.purchasing} modalClick={this.purchaseCancelHandler}>
                    <OrderSummary ingredients= {this.state.ingredients}
                                    purchaseCancel = {this.purchaseCancelHandler}
                                    purchaseContinue = {this.purchaseContinueHandler}
                                    totalPrice = {this.state.totalPrice}/>
                </Modal>   
                <BuildControls 
                    ingredientsAdded = {this.addIngredient} 
                    ingredientsRemoved = {this.removeIngredient}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}/>
                <div></div>
            </Aux>    
        );
    }
}

export default BurgerBuilder;