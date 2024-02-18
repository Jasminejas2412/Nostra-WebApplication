
document.addEventListener("DOMContentLoaded", function () {
    var storedvalue = JSON.parse(localStorage.getItem("collection-box")) || [];
    count = storedvalue.length;
    update(storedvalue, count)

});


