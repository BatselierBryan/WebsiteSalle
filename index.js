/* Make image big (click two times at element) */
function resizeImage(img) {
    img.style.width = "500px";
    img.style.height = "500px";
}
/* Reset imageOne */
function resetImgOne(img){
    var myImg = document.getElementById("imgOne");
    var currWidth = myImg.clientWidth;
    if(currWidth == 50){
        alert("Maximum zoom-out level reached.");
    } else{
        myImg.style.width = (currWidth - 50) + "px";
    }
}

/* Reset imageTwo */
function resetImgTwo(img){
    var myImg = document.getElementById("imgTwo");
    var currWidth = myImg.clientWidth;
    if(currWidth == 50){
        alert("Maximum zoom-out level reached.");
    } else{
        myImg.style.width = (currWidth - 50) + "px";
    }
}

/* Reset imageThree */
function resetImgThree(img){
    var myImg = document.getElementById("imgThree");
    var currWidth = myImg.clientWidth;
    if(currWidth == 50){
        alert("Maximum zoom-out level reached.");
    } else{
        myImg.style.width = (currWidth - 50) + "px";
    }
}

/* Reset imageFour */
function resetImgFour(img){
    var myImg = document.getElementById("imgFour");
    var currWidth = myImg.clientWidth;
    if(currWidth == 50){
        alert("Maximum zoom-out level reached.");
    } else{
        myImg.style.width = (currWidth - 50) + "px";
    }
}

/*Picture clicked aline*/
img = document.getElementById("imgCloth");
// Function to set image dimensions
function enlargeImg() {
    img.style.width = "60%";
    img.style.height = "auto";
    img.style.transition = "width 0.5s ease";
}
// Function to reset image dimensions
function resetImg() {
    img.style.width = "40%";
    img.style.height = "auto";
    img.style.transition = "width 0.5s ease";
}
/* Click window events */
function myFunctionClick(){
    alert("Gegevens werden opgeslagen!");
};

/*Form validation */

