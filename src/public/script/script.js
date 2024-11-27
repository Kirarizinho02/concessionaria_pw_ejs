function filtrar() {
    const input = document.getElementById('inputBusca').value.toLowerCase();
    const items = document.querySelectorAll('#ordems .divordem');
    let matchingItems = [];

    if (input === "") {
        window.location.reload();
        return; 
    }

    items.forEach(item => {
        const itemName = item.querySelector('#numero').textContent.toLowerCase();
        
        if (itemName.includes(input)) {
            item.style.display = 'inline-block';
            matchingItems.push(item);
        } else {
            item.style.display = 'none';
        }
    });

    const listaProdutos = document.getElementById('listaProdutos');
    matchingItems.forEach(item => {
        listaProdutos.appendChild(item);
    });
}