/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

/*
    YOUR CODE HERE
*/
class Kitchen{

    // for the order we could use min-heap, as it is more efficient when we need to add,delete, and access min element
    constructor(){
        this.orderedDishes = []; 
        this.fridge = []; 
    }
     
    addToFridge(ingridientList){
        for(const ingridient of ingridientList){
            let ingridientAdded= false;
            for(const storedIngrident of this.fridge){                
                if(ingridient.name === storedIngrident.name){
                    storedIngridient.addAmount(ingridient.amount);
                    ingridientAdded= true;
                    break;
                }
            }
            if (!ingridientAdded){
                this.fridge.push(ingridient);
            }
        }
    }
    order(dish){
        for(const ingridient of dish.neededIngredients){
            for(const storedIngridient of this.fridge){
                if(storedIngridient.name === ingridient.name){
                    storedIngridient.use(ingridient.amount);
                }
            }
        }

        this.orderedDishes.push(dish);
    }

    cookFastestOrder(){
        if (!this.orderedDishes) console.log("No dishes to cook.")
        let fastestDish = this.orderedDishes[0];
        for(const dish of this.orderedDishes){
            if (dish.cookingTime<fastestDish.cookingTime){
                fastestDish = dish;

            }
        }
        

        fastestDish.cook();
        this.orderedDishes = this.orderedDishes.filter(dish => dish !== fastestDish);
    }
    cookAllOrders(){
        if (!this.orderedDishes) console.log("No dishes to cook.")
        for(let dish of this.orderedDishes){
            dish.cook();
        }
        this.orderedDishes=[];
        
    }
}

class Bolognese extends Dish{
     neededIngredients=[new Ingridient('spaghetti', 1),
    new Ingridient('tomato', 1)];

    constructor(){
        super(10);
    }
}

class Steak extends Dish{
    neededIngredients=[new Ingridient('meat', 1)];
    constructor(){
        super(7);
    }
}

class MashedPotatoes extends Dish{
    neededIngredients=[new Ingridient('potato', 1)];
    
    constructor(){
        super(8);
    }
}
class SteakAndFries extends Dish{
    neededIngredients=[new Ingridient('potato', 1),
    new Ingridient('meat',1)];
    
    constructor(){
        super(9);
    }
}

class Ingridient{
    constructor(name,amount){
        this.name= name;
        this.amount= amount;
    }
    use(amount){
        if(amount>this.amount){
            throw new Error("Not enough ingridients in fridge");
        }
        this.amount-=amount;
    }
    addAmount(amount){
        this.amount+=amount;
    }
}
async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingridients

    await kitchen.cookAllOrders(); // Returns two dishes in array

    kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge

}

test();