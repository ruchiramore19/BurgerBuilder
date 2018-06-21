import React, {Component} from 'react';
import Aux from '../../hocs/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad : 0.5,
    bacon : 0.5,
    cheese : 1.3,
    meat : 0.7
}

class BurgerBuilder extends Component{

    state = {
        ingredients : {
            salad : 1,
            bacon : 1,
            cheese : 1,
            meat : 1
        },
        totalPrice : 3,
        purchasable : false
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
                <BuildControls 
                    ingredientsAdded = {this.addIngredient} 
                    ingredientsRemoved = {this.removeIngredient}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice}
                    purchasable = {this.state.purchasable}/>
                <div></div>
            </Aux>    
        );
    }
}

export default BurgerBuilder;