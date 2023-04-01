
function addSelection(item){
    const number = document.querySelectorAll('#main .options-card').length;
    if (number>=10){
        alert("Max items exceeded")
    } else {
        const card = document.createElement("div");
        card.className = "options-card"
        card.textContent = item
    
        var container = document.getElementById('selection-container')
        container.appendChild(card);
    }
}