function menuDisplay(){
    fetch("./data.json")
   .then((response) => response.json())
   .then((data) => { 
  
     let menu = '';
        data.forEach((food, index)=>{
            menu += `<div class="foodCard" id="${food.category}">
                    <img src="${food.image.desktop}"class="image"> <br>
                    <button class="cart" onclick="addItem(${index})" ><img src="./assets/images/icon-add-to-cart.svg" alt="">Add to Cart</button>

                    <div id="hidden">
                        <button id="minus"  onclick="reduce()">-</button>
                        <p id="number">1</p>
                        <button id="plus" onclick="increase()" >+</button>
                    </div>

                    <p>${food.category}</p>
                    <h6>${food.name}</h6>
                    <h5>$${food.price.toFixed(2)}</h5>
                </div>`
    
            document.querySelector(".card").innerHTML = menu
        })
                       
    })
               
};
menuDisplay()

const count = document.getElementById("number");
const qty = document.querySelector("#qty")

const emptyCart = document.querySelector(".emptyCart")
const order = document.querySelector(".order")

let cartNew =[]
let totalprice = 0

function addItem(productIndex) {
    fetch("./data.json")
    .then((response) => response.json())
    .then((data) => { 
      const product = data[productIndex];
      const existingProduct = cartNew.find(item => item.name === product.name);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
              cartNew.push({ ...product, quantity: 1 });
            }

            document.querySelector(".cart").style.display="none"
            document.querySelector("#hidden").style.display="flex"
            document.querySelector(".image").style.border="3px solid red"


      totalprice += product.price
      updatecart();
                         
    })
   
    emptyCart.style.display="none"
    order.style.display="block"
}

const cartCount = document.getElementById('qty');
  const cartItemsList = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');

function updatecart() {

  cartCount.textContent ++

  cartItemsList.innerHTML = '';

  cartNew.forEach((food, index)=>{
    const carttttttt = `<div class="orderCartJ">
                      <div class="order1">
                       <h6 class="category">${food.name}</h6>
                       

                      <div class="order2">
                       <p id="quantity"> <span class="quantity"> ${food.quantity} </span>X</p>
                        <p class="price">${food.price.toFixed(2)}</p>
                        <p class="totprice">${(food.price * food.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                      <img src="./assets/images/icon-remove-item.svg" alt="" id="remove">

                    </div>`;
                    cartItemsList.innerHTML += carttttttt

                    document.querySelector(".cart").style.display="none"
                    document.querySelector("#hidden").style.display="flex"
                    document.querySelector(".image").style.border="3px solid red"
  })
  totalPriceElement.textContent = totalprice.toFixed(2);

}

function reduce(){
    document.getElementById("number").textContent-- 
    document.querySelector(".quantity").textContent--
    cartCount.textContent--

    if (document.getElementById("number").textContent<1) {
        document.querySelector(".cart").style.display="block"
        document.querySelector("#hidden").style.display="none"
        document.querySelector(".image").style.border="none"
        emptyCart.style.display="block"
        order.style.display="none"
        }

}

function increase(){
    document.getElementById("number").textContent++
    document.querySelector(".quantity").textContent++
    cartCount.textContent ++

}
