
const list = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");



button.addEventListener("click", function(){

if (input.value.length === 0){
 alert("Please tip a chapter.");
 } else {
 let favBook = input.value;
 const listBook = document.createElement("li");
 const listText = document.createElement("span");
 const listBtn = document.createElement("button");

 listBook.appendChild(listText);
 listText.textContent = favBook;
 listBook.appendChild(listBtn);
 listBtn.textContent = "❌";
 list.appendChild(listBook);
 input.value = "";
 
    listBtn.addEventListener("click", function (){
        list.removeChild(listBook);
});

 };
  input.focus();
});