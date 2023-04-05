/**
 * Add ingredient to list when user selects from the sidebar
 * @item argument is the ingredient to be added
 */
function addSelection(item){
    // Calculate the number of elements already selected and check if the item is already selected
    const number = document.querySelectorAll('#main .options-card').length;
    if (number>=10 || !!document.getElementById(item)){
        if(number>=10){
            alert("Maximum of 10 ingredients allowed")
        } else {
            alert("Cannot select same ingredient twice")
        }
        
    } else {
        // Create the element
        const card = document.createElement("div");
        card.className = "options-card"
        card.textContent = item
        card.setAttribute("id", item)
    
        var container = document.getElementById('selection-container')
        container.appendChild(card);
    }
}

/**
 * Clear all the currently selected items from the list
 */
function clearSelections(){
    document.querySelectorAll('.options-card').forEach(e => e.remove());
}