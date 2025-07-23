
async function getData () {
    let data = await fetch("https://dummyjson.com/products");
    let jsonData = await data.json();
    let { products } = jsonData;

    let allCards = document.getElementById("card_1");

    let cardsHTML = products.map(product => {
        let { title, description, price, images } = product;
        return `
        <div class="col">
            <div class="card h-100">
                <img src="${images[0]}" class="card-img-top" alt="${title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description.slice(0, 100)}...</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-success fs-5">$${price}</span>
                        <a href="#" class="btn btn-sm btn-outline-primary">Buy Now</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join("");

    // Wrap all cards in one Bootstrap row
    allCards.innerHTML = `
        <div class="row row-cols-1 row-cols-md-4 g-4">
            ${cardsHTML}
        </div>
    `;

    console.log(jsonData);
}

getData();
