/**
 * Add ingredient to list when user selects from the sidebar
 * @item argument is the ingredient to be added
 */
function addSelection(item) {
  // Calculate the number of elements already selected and check if the item is already selected
  const number = document.querySelectorAll("#main .options-card").length;
  if (number >= 10 || !!document.getElementById(item)) {
    if (number >= 10) {
      alert("Maximum of 10 ingredients allowed");
    } else {
      alert("Cannot select same ingredient twice");
    }
  } else {
    // Create the element
    const card = document.createElement("div");
    card.className = "options-card";
    card.textContent = item;
    card.setAttribute("id", item);

    var container = document.getElementById("selection-container");
    container.appendChild(card);
  }
}

function getRecipes() {
  var ingredients = document.getElementsByClassName("options-card");
  if (ingredients.length < 1 || ingredients.length > 10) {
    throw new Error("wrong amount of ingredients selected");
  }

  var requestBody = {};
  for (var i = 0; i < ingredients.length; i++) {
    var key = "ingredient" + (i + 1);
    requestBody[key] = ingredients[i].textContent;
  }

  var token = getCookie("token");

  fetch("https://wdas-api.vercel.app/api/recipe/favourites", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  })
    .then((response) => {
      response.json().then((data) => {
        sessionStorage.setItem("favourites", JSON.stringify(data));
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  fetch("https://wdas-api.vercel.app/api/recipe/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      response.json().then((data) => {
        sessionStorage.setItem("recipes", JSON.stringify(data));
        window.location.href = "recipes.html";
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getCookie(cookieName) {
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split("; ");

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    var cookieParts = splitByFirstEqualSign(cookie);

    if (cookieParts[0] === cookieName) {
      return cookieParts[1];
    }
  }

  return null;
}

function splitByFirstEqualSign(inputString) {
  var index = inputString.indexOf("=");

  if (index !== -1) {
    var key = inputString.substring(0, index);
    var value = inputString.substring(index + 1);

    return [key, value];
  }

  return null;
}

/**
 * Clear all the currently selected items from the list
 */
function clearSelections() {
  document.querySelectorAll(".options-card").forEach((e) => e.remove());
}
