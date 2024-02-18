// for submit
var uname = document.getElementById('name');
var email = document.getElementById('email');
var addr = document.getElementById('addr');


function submitting(){
  if(uname.value !== '' && email.value !== '' && addr.value !== ''){
      alert('Our Team will Contact you..');
  }
}