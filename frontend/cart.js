let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");

const totalPrice = document.getElementById("total-price");

function loadCart(){

    cartItems.innerHTML = "";

    let total = 0;

    if(cart.length===0){

        cartItems.innerHTML="<h2>Your cart is empty.</h2>";

        totalPrice.innerHTML="";

        return;

    }

    cart.forEach((item,index)=>{

        total += item.price;

        cartItems.innerHTML += `

        <div class="cart-card">

            <img src="${item.image}">

            <div>

                <h2>${item.name}</h2>

                <h3>₹${item.price}</h3>

                <button onclick="removeItem(${index})">

                Remove

                </button>

            </div>

        </div>

        `;

    });

    totalPrice.innerHTML="Total : ₹"+total;

}

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    loadCart();

}

loadCart();