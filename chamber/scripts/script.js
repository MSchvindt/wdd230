


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