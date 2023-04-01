
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