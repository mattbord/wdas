/**
 * Display the category of a recipe option
 * @number is the element to be inserted on
 */
function getRecipeCategory(number, category) {
    try {
        document.getElementById("category"+number).innerHTML=category
    } catch(Error) {
        console.log(Error)
    }
}

/**
 * Display the name of a recipe option
 * @number is the element to be inserted on
 */
function getRecipeName(number, name) {
    try {
        document.getElementById("name"+number).innerHTML=name
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

            var token = getCookie("token");

            fetch("http://127.0.0.1:8000/api/recipe/favourites/"+number, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                "token": token
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
        } catch(Error) {
            console.log(Error)
        }
    } else {
        try {
            document.getElementById("star"+number).className = "favourite";
            var token = getCookie("token");
            fetch("http://127.0.0.1:8000/api/recipe/favourites/"+number, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "token": token
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
        } catch(Error) {
            console.log(Error)
        }
    }

}

function getCookie(cookieName) {
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split("; ");

    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        var cookieParts = splitByFirstEqualSign(cookie)

        if (cookieParts[0] === cookieName) {
            return cookieParts[1];
        }
    }

    return null;
}

function splitByFirstEqualSign(inputString) {
    var index = inputString.indexOf('=');
  
    if (index !== -1) {
        var key = inputString.substring(0, index);
        var value = inputString.substring(index + 1);

        return [key, value];
    }
  
    return null;
}

function instantiateRecipeCard(number, name, category, favourite, image) {
    const container = document.getElementById('container');

    const card = document.createElement('div');
    card.className = 'card';
  
    const dataFetchScript = document.createElement('script');
    dataFetchScript.src = 'assets/js/dataFetch.js';
  
    const recipeCategoryScript = document.createElement('script');
    recipeCategoryScript.textContent = `getRecipeCategory(${number}, '${category}')`;


    const recipeNameScript = document.createElement('script');
    recipeNameScript.textContent = `getRecipeName(${number}, '${name}')`;
  
    const categoryHeading = document.createElement('h2');
    categoryHeading.id = `category${number}`;
  
    const foodImage = document.createElement('img');
    foodImage.src = `data:image/jpeg;base64,${image}`;
    foodImage.id = `food${number}`;
    foodImage.className = 'food';
  
    const nameHeading = document.createElement('h4');
    nameHeading.id = `name${number}`;
    const favouriteStar = document.createElement('img');
    favouriteStar.src = 'assets/images/star.svg';

    if (favourite){
        favouriteStar.className = 'favourite';
    } else {
        favouriteStar.className = 'favourite-grey';
    }

    favouriteStar.id = `star${number}`;
    favouriteStar.setAttribute('onclick', `changeIsFavourite(${number})`);
  
    card.appendChild(dataFetchScript);
    card.appendChild(recipeCategoryScript);
    card.appendChild(recipeNameScript);
    card.appendChild(categoryHeading);
    card.appendChild(foodImage);
    card.appendChild(nameHeading);
    card.appendChild(favouriteStar);

    container.appendChild(card);
}

async function loadRecipes() {
    try {
        favourites = JSON.parse(sessionStorage.getItem('favourites'))
    } catch {
        favourites = []
    }

    recipes = JSON.parse(sessionStorage.getItem('recipes'))
    keys = Object.keys(recipes);
    let images;

    await fetch("http://127.0.0.1:8000/api/recipe/images", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(keys.map((str) => (parseInt(str, 10) + 1).toString())),
    })
    .then(response => response.json())
    .then(data => {
        images = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });

    for (let i = 0; i < keys.length; i++) {
        key = keys[i]
        value = recipes[key];

        if(favourites.includes(value['recipe_id'])){
            instantiateRecipeCard(value['recipe_id'],value['recipe_name'],value['recipe_category'], true, images['images'][i])
        } else {
            instantiateRecipeCard(value['recipe_id'],value['recipe_name'],value['recipe_category'], false, images['images'][i])
        }
        
    }
}

async function loadSavedRecipes() {
    var token = getCookie("token");

    //get the actual recipes
    await fetch("http://127.0.0.1:8000/api/recipe/favourites/recipes", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "token": token
        }
    })
    .then(async (response) => {
        await response.json().then((data) => {
            sessionStorage.setItem('recipes', JSON.stringify(data));
        })
    })
    .catch(error => {
        console.error("Error:", error);
    });

    let images;

    try{
        recipes = JSON.parse(sessionStorage.getItem('recipes'))
        keys = Object.keys(recipes);
        recipe_ids = recipes.map(recipe => recipe.recipe_id.toString());

        await fetch("http://127.0.0.1:8000/api/recipe/images", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe_ids),
        })
        .then(response => response.json())
        .then(data => {
            images = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });

        for (let i = 0; i < keys.length; i++) {
            key = keys[i]
            value = recipes[key];
            instantiateRecipeCard(value['recipe_id'],value['recipe_name'],value['recipe_category'], true, images['images'][i])
        }
    }catch(error){
        console.log(error)
        console.log("no recipes to display")
    } 
}