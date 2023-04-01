
function getRecipeCategory(number) {
    try {
        fetch("assets/data/recipe_options.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("category").innerHTML=data[number].category
        })
    } catch(Error) {
        console.log(Error)
    }
}

function getRecipeName(number) {
    try {
        fetch("assets/data/recipe_options.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("name").innerHTML=data[number].name
        })
    } catch(Error) {
        console.log(Error)
    }
}

function getIsFavourite(number) {
    try {
        fetch("assets/data/recipe_options.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("favourite").innerHTML=data[number].favourite
        })
    } catch(Error) {
        console.log(Error)
    }
}