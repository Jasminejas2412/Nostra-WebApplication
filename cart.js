document.addEventListener("DOMContentLoaded", function () {
    var cartitems = JSON.parse(localStorage.getItem("cart")) || [];
    var cartcountvalues = document.getElementById('cart-count');
    var cartcount = 0;
    var bagvalue=document.querySelector('.bagvalue')
    var cartempty=document.querySelector('.cartempty');

    displayCart(cartitems, cartcount);

    function displayCart(cartitems, cartcount) {
        cart.innerHTML = '';
        var costofarray = [];

        cartitems.forEach((item) => {
            var collectionbox = document.createElement('div');
            collectionbox.className = 'collection-box';
            collectionbox.innerHTML = `<img src="${item.imageSrc}" width="200px" height="200px">
                <button class="btnliked"><img class="likes" src="${item.toggled ? 'images/icons/heart-removebg-preview.png' : 'images/icons/heart-removebg-preview (1).png'}"></button>
                <p>${item.productName}</p>`;

            var collectiondetails = document.createElement('div');
            collectiondetails.className = 'collection-details';
            collectiondetails.innerHTML = ` <img src="images/icons/rupee.png" style="width: 16px; height: 16px;" id="cost">${item.costof}
                
                <input type="text" value="${item.typing}">
               
                <button id="buynow">Delete</button>`;

            collectionbox.appendChild(collectiondetails);
            cart.appendChild(collectionbox);
            cartcount += 1;

            var buynowbuttons = collectiondetails.querySelectorAll('#buynow');
            buynowbuttons.forEach((button) => {
                button.addEventListener('click', () => {
                    var removedItemIndex = cartitems.findIndex(cartItem => cartItem.imageSrc === item.imageSrc);
                    if (removedItemIndex !== -1) {
                        cartitems.splice(removedItemIndex, 1);
                        localStorage.setItem('cart', JSON.stringify(cartitems));
                        displayCart(cartitems, cartcount);
                    }
                });
            });
            costofarray.push(parseInt(item.costof, 10));
        });

    
        cartcount = cartitems.length;
        cartcountvalues.textContent = `You have ${cartcount} product${cartcount !== 1 ? 's' : ''} in cart`;;
        if (cartcount ===0) {
            cartempty.style.display = "flex";
            
        } else {
            cartempty.style.display = "none";
           
        }
            
        var totalcost = costofarray.reduce((total, cost) => total + cost, 0);
        bagvalue.textContent =`Cart value is 🤑 ${totalcost}  `

      
       
    }

});


