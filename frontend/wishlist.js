let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const container = document.getElementById("wishlist-container");

function displayWishlist() {

    container.innerHTML = "";

    if (wishlist.length === 0) {

        container.innerHTML = "<h2>Your Wishlist is Empty ❤️</h2>";

        return;

    }

    wishlist.forEach((product, index) => {

        container.innerHTML += `

        <div class="cart-card">

            <img src="${product.image}">

            <div>

                <h2>${product.name}</h2>

                <h3>₹${product.price}</h3>

                <button onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

}

function removeItem(index){

    wishlist.splice(index,1);

    localStorage.setItem("wishlist",JSON.stringify(wishlist));

    displayWishlist();

}

displayWishlist();