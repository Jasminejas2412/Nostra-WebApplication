// search
var productcontainer=document.querySelector('.collection')
var productlist=document.querySelectorAll('.collection-box')

function search(event){
    var enteredvalue=event.target.value.toUpperCase()
        productlist.forEach((product) => {
            var productname = product.querySelector('p').textContent.toUpperCase();
            product.style.display = productname.includes(enteredvalue) ? 'block' : 'none';
    
  
})}

// for liking


var likebuttons = document.querySelectorAll(".btnliked");
var hearts = document.querySelectorAll(".likes");
var whislist = document.querySelector(".whislist");
var countliked = document.getElementById('likes-count');
var boxes = document.querySelectorAll(".collection-box");
var count = 0;
var likedState = false;



likebuttons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        var heartindex = hearts[index];
       

        if (heartindex) {
            if (heartindex.src.includes("images/icons/heart-removebg-preview.png")) {
                heartindex.src = "images/icons/heart-removebg-preview (1).png";
                var storedvalue = JSON.parse(localStorage.getItem("collection-box")) || []; //for retrieve
                var clickedProductInfo = {
                    imageSrc: boxes[index].querySelector('img').src,
                };
                var removedItemIndex = storedvalue.findIndex(item => item.imageSrc === clickedProductInfo.imageSrc);//finding
                if (removedItemIndex !== -1)  { //-1 means not found // it has value 
                    storedvalue.splice(removedItemIndex, 1); //removing
                    count -= 1;
                }
                likedState = !likedState;
                updatelocalstorage(storedvalue)
                update(storedvalue, count);
            } else {
                var toggled = "images/icons/heart-removebg-preview.png";
                heartindex.src = toggled;

                var storedvalue = JSON.parse(localStorage.getItem("collection-box")) || [];
                var clickedProductInfo = {
                    imageSrc: boxes[index].querySelector('img').src,
                    toggled: toggled,
                    cost: boxes[index].querySelector('span').textContent,
                    buttonColor: toggled ? getComputedStyle(button).backgroundColor : null,
                    productName: boxes[index].querySelector('p').textContent,
                    typing: boxes[index].querySelector('input').value,

                };

                var alreadystored = storedvalue.some(item => item.imageSrc === clickedProductInfo.imageSrc);//return true or false

                if (toggled && alreadystored) {// clicked and stored
                    storedvalue = storedvalue.map(item => (item.imageSrc === clickedProductInfo.imageSrc) ? clickedProductInfo : item);//replace the existing img
                } else if (toggled && !alreadystored) {// clicked and not stored
                    storedvalue.push(clickedProductInfo);
                    count += 1;
                } else if (!toggled && alreadystored) { //not clicked and stored
                    storedvalue = storedvalue.filter(item => item.imageSrc !== clickedProductInfo.imageSrc);
                    count -= 1;//removing the
                }
                likedState = !likedState;
                updatelocalstorage(storedvalue)
                update(storedvalue, count);
            }
        }
    });
});


var empty=document.querySelector('.empty');
function update(storedvalue, count) {
    countliked.textContent = `You have liked ${count} product${count !== 1 ? 's' : ''}`;
    if (count ===0) {
        empty.style.display = "flex";
    } else {
        empty.style.display = "none";
    }
    

    whislist.innerHTML = '';
   

    storedvalue.forEach(item => {
        var collectionbox = document.createElement('div');
        collectionbox.className = 'collection-box';
        collectionbox.innerHTML = `<img src="${item.imageSrc}" width="200px" height="200px">
            <button class="btnliked"><img class="likes" src="${item.toggled}"></button>
            <p>${item.productName}</p>`;

        var collectiondetails = document.createElement('div');
        collectiondetails.className = 'collection-details';
        collectiondetails.innerHTML = ` <img src="images/icons/rupee.png" style="width: 16px; height: 16px;" id="cost">
        <span>${item.cost}</span>
            <button id="plus">+</button>
            <input type="text" value="${item.typing}"> 
            <button id="minus">-</button>
            <button id="buynow">Buy Now</button>`;

            

        collectionbox.appendChild(collectiondetails);
        whislist.appendChild(collectionbox);

        var btnliked = collectionbox.querySelector('.btnliked');

        btnliked.addEventListener('click', () => {
            if (item.toggled) {
                item.toggled = false;
                hearts.src = "images/icons/heart-removebg-preview (1).png";
                storedvalue = storedvalue.filter(filteredItem => filteredItem.imageSrc !== item.imageSrc);
                count -= 1;
                
                updatelocalstorage(storedvalue);
                update(storedvalue, count);
                
            }
        });
    });
}

function updatelocalstorage(storedvalue) {
    localStorage.setItem("collection-box", JSON.stringify(storedvalue));
}

// for quantity
var details = document.querySelectorAll(".collection-details");
var quantities = document.querySelectorAll(".collection-details input");
var plus = document.querySelectorAll("#plus");
var minus = document.querySelectorAll("#minus");
var price=document.querySelectorAll('.collection-details span ');
var totalquantity =0;
var costof;
var item;
plus.forEach(function (plusbtn, index) {
  plusbtn.addEventListener("click", function(){
    totalquantity++;
     costof = totalquantity * parseInt(price[index].textContent);
    console.log(costof);
    
  quantities[index].value=`Q:${totalquantity} `
   item={
    costof:costof,
  }
  
  })
  

})
minus.forEach(function (minusbtn, index) {
    minusbtn.addEventListener("click", function(){
    
      totalquantity--;
      
       costof = totalquantity * parseInt(price[index].textContent);
      
     quantities[index].value=` ${totalquantity<0 ? 'Q:0' : `Q:${totalquantity}`} `
    if(totalquantity<0){
        costof=0;
    }
    
     console.log(costof);
    })
     item={
        costof:costof
      }
      
  
  })
  


//   cart values
var cart=document.querySelector('.cart')

var cartcountvalues=document.getElementById('cart-count')
var notification=document.querySelector(".notification")
var cartcount=0;
if(totalquantity<0){
    console.log("greater");
}

  var buynow=document.querySelectorAll("#buynow")
  buynow.forEach((btn,index)=>{
    
        
    btn.addEventListener("click",()=>{
        if(totalquantity>0){
        var parentelement=btn.parentElement.parentElement
        var clone=parentelement.cloneNode(true)
        var productinfo={
            imageSrc: clone.querySelector('img').src,
            toggled:likedState,
            cost: clone.querySelector('span').textContent,
            buttonColor: likedState? getComputedStyle(button).backgroundColor : null,
            productName: clone.querySelector('p').textContent,
            typing: clone.querySelector('input').value,
          costof:item.costof
                  
        }
     
       var cartitems=JSON.parse(localStorage.getItem('cart'))||[]
    var alreadystoredcartitems=cartitems.some(item=> item.imageSrc===productinfo.imageSrc)
    if(alreadystoredcartitems){
       cartitems=cartitems.map(item=>( item.imageSrc===productinfo.imageSrc) ?productinfo:item)
    }
    else{
        cartitems.push(productinfo)
            }

       
       
        localStorage.setItem('cart', JSON.stringify(cartitems))
        window.location.href="cart.html"
        
        displayCart(cartitems, cartcount);
  
    }else{
        notification.classList.add('notification-fade-in');
            }
            setTimeout(() => {
                notification.classList.remove('notification-fade-in');
                notification.classList.add('notification-fade-out');


                setTimeout(() => {
                    notification.classList.remove('notification-fade-out');
                  }, 2000); 
                }, 1000);
    
})
      
    
})



  
