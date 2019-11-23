let canvasCrono = document.getElementById("canvasCrono");
let ctx = canvasCrono.getContext('2d');

function gradsParaRadianes (grados){
    let factor = Math.PI/100;
    return grados * factor;
}



function renderTime() {

    let ahora = new Fecha();
    let hoy = ahora.toDateString();
    let time = ahora.toLocaleTimeString();
    let horas = ahora.getHours();
    let segundos = ahora.getSegundos();
    let milisegundos = ahora.getMilisegundos(); 

    //Dibujo background del canvas.

    //Dibujo de horas con arc método.
    ctx.beginPath();
    ctx.arc(250,250,  200,0,  gradsParaRadianes(180)); //Primeros dos valores, centro en x et y. Tercer valor, long de radio en px. 
    ctx.stroke();

    //MIN 6.26 https://www.youtube.com/watch?v=9dtDaWi6R0g
    //Dibujo de segundos.

    //Digujo de la hora.
}