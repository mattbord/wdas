/**
 * Display the category of a recipe option
 * @number is the item to be fetched from the JSON file
 */
function getRecipeCategory(number) {
    try {
        fetch("assets/data/recipe_options.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("category"+number).innerHTML=data[number].category
        })
    } catch(Error) {
        console.log(Error)
    }
}
/**
 * Display the name of a recipe option
 * @number is the item to be fetched from the JSON file
 */
function getRecipeName(number) {
    try {
        fetch("assets/data/recipe_options.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("name"+number).innerHTML=data[number].name
        })
    } catch(Error) {
        console.log(Error)
    }
}

/**
 * Display the status of if a recipe is favourited
 * @number is the item to be fetched from the JSON file
 */
function getIsFavourite(number) {
    try {
        fetch("assets/data/recipe_options.json")
        .then(response => response.json())
        .then(data => {
            if (data[number].favourite==true){
                document.getElementById("star"+number).className = "favourite";
            }
        })
    } catch(Error) {
        console.log(Error)
    }
}

/**
 * Change the displayed status of a favourited recipe item
 * @number is the item to be fetched from the JSON file
 */
function changeIsFavourite(number) {
    if ( document.getElementById("star"+number).className.match(/(?:^|\s)favourite(?!\S)/) ){
        try {
            document.getElementById("star"+number).className = "favourite-grey";
        } catch(Error) {
            console.log(Error)
        }
    } else {
        try {
            document.getElementById("star"+number).className = "favourite";
        } catch(Error) {
            console.log(Error)
        }
    }

}

function instantiateRecipeCard(number) {
    const container = document.getElementById('container');

    const card = document.createElement('div');
    card.className = 'card';
  
    const dataFetchScript = document.createElement('script');
    dataFetchScript.src = 'assets/js/dataFetch.js';
  
    const recipeCategoryScript = document.createElement('script');
    recipeCategoryScript.textContent = `getRecipeCategory(${number})`;
  
    const recipeNameScript = document.createElement('script');
    recipeNameScript.textContent = `getRecipeName(${number})`;
  
    const isFavouriteScript = document.createElement('script');
    isFavouriteScript.textContent = `getIsFavourite(${number})`;
  
    const categoryHeading = document.createElement('h2');
    categoryHeading.id = `category${number}`;
  
    const foodImage = document.createElement('img');
    foodImage.src = `assets/images/food/${number}.jpg`;
    foodImage.id = `food${number}`;
    foodImage.className = 'food';
  
    const nameHeading = document.createElement('h4');
    nameHeading.id = `name${number}`;
  
    const favouriteStar = document.createElement('img');
    favouriteStar.src = 'assets/images/star.svg';
    favouriteStar.className = 'favourite-grey';
    favouriteStar.id = `star${number}`;
    favouriteStar.setAttribute('onclick', `changeIsFavourite(${number})`);
  
    card.appendChild(dataFetchScript);
    card.appendChild(recipeCategoryScript);
    card.appendChild(recipeNameScript);
    card.appendChild(isFavouriteScript);
    card.appendChild(categoryHeading);
    card.appendChild(foodImage);
    card.appendChild(nameHeading);
    card.appendChild(favouriteStar);
  
    container.appendChild(card);
}
  


function loadRecipes() {
    recipes = JSON.parse(sessionStorage.getItem('recipes'))
    keys = Object.keys(recipes);

    console.log(recipes)
    console.log(keys)
    for (let i = 0; i < keys.length; i++) {
        key = keys[i];
        value = recipes[key];
      
        console.log(key + " name : " + value['name']);
        console.log(key + " category : " + value['category']);
        console.log(key + " image_url : " + value['image_url']);
      }

    for (let i = 0; i <= 7; i++) {
        instantiateRecipeCard(i);
    }
}