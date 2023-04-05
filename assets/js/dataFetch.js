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