// sidenavbar
var sidenavbar=document.querySelector('.side-navbar')
function openavbar(){
    sidenavbar.style.left='0'

}
function closenavbar(){
    sidenavbar.style.left="-60%";
}

// miniicons scroll  horizontally
  const container = document.querySelector('.minicons-container');
  const icons = document.querySelectorAll('.minicons');

  let mousepressed = false;
  let mouseX = 0;
  let scrollleft = 0;

  container.addEventListener('mousedown', (e) => {
    mousepressed=true;
    mouseX=e.pageX-container.offsetLeft;
    console.log("mouseX",mouseX);
  })
  container.addEventListener('mouseleave', (e) => {
    mousepressed=true;
  })
  container.addEventListener('mouseup', (e) => {
    mousepressed=false;
    
  })
  container.addEventListener('mousemove', (e) => {
  if(!mousepressed)// mouse is pressed
  {
    const x=e.pageX-container.offsetLeft;
    const walk=x-mouseX
    container.scrollLeft=scrollleft-walk
  }
  })
  container.addEventListener('wheel',(e)=>{
    e.preventDefault()
    container.scrollLeft+=e.deltaY
    
  })




// carousal
var  carousalcontainer = document.getElementsByClassName("carousal-container")[0]; // Accessing the first element in the collection
var slides = document.querySelectorAll('.carousal-box');
var right = document.querySelector("#right");
var left = document.querySelector("#left");
var indicators = document.querySelectorAll('.indicator');
var currentslide=0

function showslide(index){
  slides.forEach((slide,i)=>{
    slide.classList.toggle("hidden",i !== index)
  })
 
  indicators.forEach((indicator,i)=>{
    indicator.classList.toggle('active',i === index)
  })
 

 
}
function nextslide(){
  currentslide=(currentslide+1)% slides.length//currentslide =1%3=>1
  showslide(currentslide)
}
right.addEventListener('click',()=>{
nextslide()
})

left.addEventListener('click',()=>{
  currentslide=(currentslide-1 +slides.length)%slides.length
// 1=1-1=>0+3=>3%3=>0
  console.log("clicked left");
  showslide(currentslide)
})
setInterval(nextslide,1000);
   

        
           
        




    