console.log("Glow & Glam loaded successfully");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Load products when page loads
window.onload = function () {
    updateCartCount();

    if (document.getElementById("product-grid")) {
        loadProducts();
    }
};

// Fetch products from backend
let allProducts = [];

async function loadProducts() {

    try {

        const response = await fetch("http://localhost:5000/api/products");

        allProducts = await response.json();

        displayProducts(allProducts);

    } catch (error) {

        console.log(error);

    }

}

function displayProducts(products) {

    const productGrid = document.getElementById("product-grid");

    productGrid.innerHTML = "";

    products.forEach(product => {

        productGrid.innerHTML += `

        <div class="product-card">

            <div class="badge">
                20% OFF
            </div>

            <div class="wishlist-icon"
                onclick="addToWishlist(
                    '${product._id}',
                    '${product.name}',
                    ${product.price},
                    '${product.image}'
                )">
                ❤️
            </div>

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <div class="rating">
                ⭐⭐⭐⭐⭐ <span>(4.9)</span>
            </div>

            <p class="price">
                ₹${product.price}
                <span class="old-price">
                    ₹${Math.round(product.price * 1.3)}
                </span>
            </p>

            <p class="delivery">
                🚚 Free Delivery
            </p>

            <button onclick="viewProduct('${product._id}')">
                View Details
            </button>

            <button onclick="addToCart(
                '${product._id}',
                '${product.name}',
                ${product.price},
                '${product.image}'
            )">
                Add to Cart
            </button>

        </div>

        `;

    });

}

// Redirect to product page
function viewProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

// Add to cart
function addToCart(id, name, price, image) {

    cart.push({
        id,
        name,
        price,
        image
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    showToast(name + " added to Cart 🛒");
}


// Update cart count
function updateCartCount() {

    const count = document.getElementById("cart-count");

    if (count) {
        count.innerText = cart.length;
    }

}

//Search products
function searchProducts() {

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filteredProducts = allProducts.filter(product =>

        product.name.toLowerCase().includes(keyword) ||

        product.category.toLowerCase().includes(keyword)

    );

    displayProducts(filteredProducts);

}

//filter products
function filterProducts(category){

    if(category==="All"){

        displayProducts(allProducts);

        return;

    }

    const filtered = allProducts.filter(product=>product.category===category);

    displayProducts(filtered);

}

//add to wish list
function addToWishlist(id,name,price,image){

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(item => item.id === id);

    if(exists){

        alert("Already in Wishlist ❤️");

        return;

    }

    wishlist.push({

        id,

        name,

        price,

        image

    });

    localStorage.setItem("wishlist",JSON.stringify(wishlist));

    showToast("Added to Wishlist ❤️");

}

//show toast
function showToast(message){

const toast=document.getElementById("toast");

toast.innerHTML=message;

toast.style.opacity=1;

setTimeout(()=>{

toast.style.opacity=0;

},2500);

}