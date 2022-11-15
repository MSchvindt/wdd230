


const options = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
document.getElementById('currentdate1').textContent = new Date().toLocaleDateString('en-US', options);
document.getElementById('currentdate2').textContent = new Date().toLocaleDateString('en-US', options);



function toggleMenu(){
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;

//agarro los elementos que necesito para sacar la clase "open" 
//cuando la resolucion es mayor a 760px
const hambutton = document.querySelector('#hamburgerBtn');
const mainnav = document.querySelector('#primaryNav');

// To solve the mid resizing issue with responsive class on
window.onresize = () => {
    if (window.innerWidth > 760) {
        hambutton.classList.remove('open');
        mainnav.classList.remove('open');
    }
};
window.onload = function () {
    data();
}

let currentDate = new Date();
let weekDay = '';
weekDay = currentDate.getDay();

const banner_tag = document.getElementById("banner");

function banner(weekDay){
    if (weekDay == 1 || weekDay == 2){
        banner_tag.style.display = "block";
    } else {
        banner_tag.style.display = "none";
}
}
banner(weekDay);
document.querySelector(".banner__close").addEventListener("click", function () {
    this.closest(".banner").style.display = "none";
});


//variable local storage

//variable fecha
const time = new Date();
const timeNumber = time.getTime();

const lsLastVisit = Number(window.localStorage.getItem("today_ls", timeNumber));

if (lsLastVisit == 0) {
    console.log('first time');
    document.getElementById("last_visit").textContent = "Welcome, this is your first visit.";
    
} else {
    var convertNumber1 = new Date(lsLastVisit);
    var convertNumber2 = new Date(timeNumber);

    let frmDate1 = (convertNumber1.getMonth() + 1) + "/" + convertNumber1.getDay() + "/" + convertNumber1.getFullYear();
    let frmDate2 = (convertNumber2.getMonth() + 1) + "/" + (convertNumber2.getDay()) + "/" + (convertNumber2.getFullYear());

    let day1 = new Date(frmDate1);
    let day2 = new Date(frmDate2);

    const diffTime = Math.abs(day2 - day1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays == 0) {
        document.getElementById("last_visit").textContent = "Days since last visit: Today";
    }
    else{
        document.getElementById("last_visit").textContent = "Days since last visit: " + diffDays;
}}

const ls_today = (window.localStorage.setItem("today_ls", timeNumber));

//fecha en campo oculto join
document.getElementById("hidden").textContent = currentDate;


//"Welcome back " + firstName + "! You last visited on <strong>" + lvdate + "</strong>."
//var firstName = Matias;
//var lvdate = yesterday;

`Welcome back ${firstName}! You last visited on <strong>${lvdate}</strong>.`;



//------------directory-----------------------

function hideImgs() {
    let imgs = document.getElementsByName('logo_business');

    imgs.forEach(img => {
        img.style.display = 'none';
    });
}

function showImgs() {
    let imgs = document.getElementsByName('logo_business');

    imgs.forEach(img => {
        img.style.display = 'block';
    });
}


function showGrid() {
    var gridbutton = document.getElementById('grid');
    var listbutton = document.getElementById('list');
    var display_article = document.getElementById('article');

    display_article.classList.add("grid");
    display_article.classList.remove("list");

    document.getElementById('currentListType').innerHTML = "Showing GRID formatting";
    showImgs();
    change_active(gridbutton);
}


function showList() {
    var gridbutton = document.getElementById('grid');
    var listbutton = document.getElementById('list');
    var display_article = document.getElementById('article');

    display_article.classList.add("list");
    display_article.classList.remove("grid");

    document.getElementById('currentListType').innerHTML = "Showing LIST formatting";
    hideImgs();

    change_active(listbutton);
}



function change_active(btn) {
    let buttons = document.getElementsByName('buttons_change_format');

    buttons.forEach(button => {
        button.classList.remove('active');
    });

    btn.classList.add('active');

    

}
getElementByTag

function data() {
    fetch('https://mschvindt.github.io/wdd230/chamber/data.json')
        .then((response) => response.json())
        .then((json) => {
            console.log(json);

            json.forEach(element => {
                displaybusiness(element);
            });
        });
}


function displaybusiness(business) {
    // Create elements to add to the document
    let card = document.createElement('section');
    let name = document.createElement('h2');
    let address = document.createElement("p");
    let phone = document.createElement("p")
    let web = document.createElement("p")
    let membership = document.createElement("p")
    let logo = document.createElement('img');
    logo.setAttribute('name', 'logo_business');
    
    


    name.textContent = `${business.name}`;
    //address.textContent = `Address: ${business.addresses}.`;
    //phone.textContent = `Phone Number: ${business.phone_numbers}.`;
    //web.textContent = `Web Page: ${business.website}.`;
    membership.textContent = `Membership: ${business.membership}.`;
    // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
    logo.setAttribute('src', business.img);
    logo.setAttribute('alt', `Logo of ${business.name}.`);
    logo.setAttribute('loading', 'lazy');

    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(web);
    card.appendChild(membership);
    card.appendChild(logo);

    document.querySelector('div.cards').appendChild(card);
}