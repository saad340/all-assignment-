let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");

if (!id) {
  Swal.fire({
    icon: 'error',
    title: 'Invalid Product ID',
    text: 'No product found!'
  });
} else {
  getProductData();
}

async function getProductData() {
  try {
    let response = await fetch(`https://dummyjson.com/products/${id}`);
    let product = await response.json();
    showProductData(product);
    Swal.fire({
      title: "Product Loaded!",
      icon: "success"
    });
  } catch (error) {
    Swal.fire({
      title: "Failed to load product",
      icon: "error"
    });
  }
}

function showProductData(product) {
  let container = document.getElementById("container");

  let carouselId = "productCarousel";

  let indicators = product.images.map((_, i) => `
    <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${i}" ${i === 0 ? 'class="active"' : ''}></button>
  `).join("");

  let items = product.images.map((img, i) => `
    <div class="carousel-item ${i === 0 ? 'active' : ''}">
      <img src="${img}" class="d-block w-100 img-fluid" style="max-height: 400px; object-fit: contain;" alt="Image ${i + 1}">
    </div>
  `).join("");

  let html = `
    <div id="${carouselId}" class="carousel slide mb-4" data-bs-ride="carousel">
      <div class="carousel-indicators">
        ${indicators}
      </div>
      <div class="carousel-inner">
        ${items}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>

    <h2>${product.title}</h2>
    <p>${product.description}</p>
    <h4 class="text-success">Price: $${product.price}</h4>
  `;

  container.innerHTML = html;
}
