
function addSelection(item){
    const number = document.querySelectorAll('#main .options-card').length;
    if (number>=10 || !!document.getElementById(item)){
        if(number>=10){
            alert("Maximum of 10 ingredients allowed")
        } else {
            alert("Cannot select same ingredient twice")
        }
        
    } else {
        const card = document.createElement("div");
        card.className = "options-card"
        card.textContent = item
        card.setAttribute("id", item)
    
        var container = document.getElementById('selection-container')
        container.appendChild(card);
    }
}