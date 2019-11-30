//main.js
//VARIABLES DEL RING
let ring;
let myBackground;
const SPINNER = document.getElementById("loader").style.display = "none";

//VARIABLES DE MINISUMOS
const FRICCION = 0.94;
const ACELERACION = 0.5;
const REVERSA = 0.2;
let playOnceMusic = 1;
let onceShow = 1;
let myGamePiece;
let myGamePiece2;
let yUpperRing = 242; //si es mayor ya salió
let yDownerRing = 62; // si es menor ya salió
let xLeftRing = 110; //si es menor ya salió
let xRightRing = 291; //si es mayor ya salió



//VARIABLES DE MÚSICA
const BGMUSIC = new Audio("./sounds/3918-inspired-by-kevin-macleod.mp3");
                BGMUSIC.preload = 'auto';
                BGMUSIC.loop = 'true';
                BGMUSIC.load();

let battleMusic = new Audio("./sounds/3687-edm-detection-mode-by-kevin-macleod.mp3");
                    battleMusic.preload = 'auto';
                    battleMusic.loop = 'true';
                    battleMusic.load();

//VARIABLES DE SONIDOS
const MSRUN = new Audio("./sounds/msrun.wma");
                    MSRUN.preload = 'auto';
                    MSRUN.loop = 'true';
                    MSRUN.load();

const MSTURN = new Audio("./sounds/msturn.mp3");
                    MSTURN.preload = 'auto';
                    MSRUN.loop = 'true';
                    MSRUN.load();

const FANFARE = new Audio("./sounds/fanfare.mp3");
                    FANFARE.preload = 'auto';
                    FANFARE.load();

//VARIABLES DE GANADOR
/*let winner = document.createElement(tagName, [options]);
let currentDiv = document.getElementById("div1"); 
document.body.insertBefore(newDiv, currentDiv);*/

                                    //INICIO DE JUEGO
//INSTRUCCIONES
const BACKGROUNDMUSIC = document.getElementById("sweetalert-a").onclick = () => {
    BGMUSIC.play();
}

//CARGA DEL JUEGO (BOTÓN ¡A JUGAR!)
document.getElementById("boton-inicia-juego").onclick = function() {
        document.getElementById("boton-inicia-juego").style.display = "none";
        document.getElementById("pantallaInicio").style.display = "none";
        document.getElementById("sweetalert-a").style.display = "none";
        document.getElementById("loader").style.display = "block";
        BGMUSIC.pause();
        playBattleMusic(1);
        startGame();
        //loadCrono(); Aquí cargaré mi cronómetro.
}

//FUNCIÓN EN CARGA DE VENTANA (Opcional)
Window.onload = function() {
}

                                    //FUNCIONES DE AUDIO
//MÚSICA DE INICIO (No funciona sin interacción. Política de Chrome)
const playBgMusic = (volume) => {
    const click = BGMUSIC.cloneNode();
    click.volume = volume;
    click.play();
}

//MÚSICA DE BATALLA
const playBattleMusic = (volume) => {
    const click = battleMusic.cloneNode();
    click.volume = volume;
    click.play();
}

//SONIDO AVANZAR
const playMSRUN = (volume) => {
    const AVANZANDO = MSRUN.cloneNode();
    AVANZANDO.volume = volume;
    AVANZANDO.play();
}

//SONIDO GIRAR
const playMSTURN = (volume) => {
    const GIRANDO = MSTURN.cloneNode();
    GIRANDO.volume = volume;
    GIRANDO.play();
}

//SONIDO VICTORIA
const playFanfare = (volume) => {
    const FINDUELO = FANFARE.cloneNode();
    FINDUELO.volume = volume;
    FINDUELO.play();
}

//VARIABLE QUE CONTIENE DIMENSIONES DEL CANVAS
            var myGameArea = {
                canvas : document.createElement("canvas"),
                start : function() {
                    this.canvas.width = 800;
                    this.canvas.height = 600;
                    this.canvas.id ="canvasSpace";
                    this.context = this.canvas.getContext("2d");
                    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
                    this.frameNo = 0;
                    this.interval = setInterval(updateGameArea, 20);
                    window.addEventListener('keydown', function (e) {
                        e.preventDefault();
                        myGameArea.keys = (myGameArea.keys || []); //Tal vez aquí puedes introducir la función del giro angular cuando están detenidos para que parezca que están buscando al rival.
                        myGameArea.keys[e.keyCode] = (e.type == "keydown");
                    })
                    window.addEventListener('keyup', function (e) {
                        myGameArea.keys[e.keyCode] = (e.type == "keydown");
                    })
                },
                stop : function() {
                    clearInterval(this.interval);
                },    
                clear : function() {
                    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                },
            }

//FUNCIÓN INICIO DEL JUEGO
function startGame() {
    myGameArea.start();      
    ring = new ringDimensions(400,400, "gray", 400,300);
    //Con Figura myGamePiece = new component(40,40, "red",  360, 300);
    myGamePiece = new component(40,40, "./images/redFingerTech.png",  360, 300, "imagen");
    //Con Figura myGamePiece2 = new component(40,40, "blue",  440, 300);
    myGamePiece2 = new component(40,40, "./images/blueRdTeam.png",  440, 300, "imagen");
    myBackground = new component(600,600, "./images/canvasBackground.png", 400,300, "imagen");  
}            

//FUNCIÓN QUE DIBUJA EL MINISUMO
function component(width, height, color, x, y, type) {            
                this.type = type;
                if (type == "imagen") {
                    this.image = new Image();
                    this.image.src = color;
                }
                this.width = width;
                this.height = height;
                this.speed = 0;
                this.angle = 0;
                this.moveAngle = 0;
                this.acelerador = 0;
                this.x = x;
                this.y = y;    
                this.update = function() {
                    ctx = myGameArea.context;
                    ctx.save();
                    ctx.translate(this.x, this.y)
                    ctx.rotate(this.angle);
                    if (type == "imagen") {
                        ctx.drawImage(this.image,
                            0 - this.width/2,
                            0 - this.height/2,
                            this.width,
                            this.height);
                    } else {
                        ctx.fillStyle = color;
                        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
                    }
                    ctx.restore();    
                }
                this.newPos = function() {
                    this.angle += this.moveAngle * Math.PI / 180; //Aquí le decimos gira un grado, pero se sigue ejecutando si no sueltas la tecla. Porque 2 Math.Pi = 360. Math.Pi = 180  Math.Pi/180 = 1 grado.
                    this.x += this.speed * Math.sin(this.angle);
                    this.y -= this.speed * Math.cos(this.angle);
                }
                this.crashWith = (item) => {
                    return (this.x < item.x + item.width) &&
                    (this.x + this.width > item.x) &&
                    (this.y < item.y + item.height) &&
                    (this.y + this.height > item.y);
                }
                this.touchingRing = (item) => {
                    return (this.x < item.x + item.width) &&
                    (this.x + this.width > item.x) &&
                    (this.y < item.y + item.height) &&
                    (this.y + this.height > item.y);
                }
}

//VARIABLE QUE CONTIENE DIMENSIONES DEL RING Y LO DIBUJA
            function ringDimensions(width, height, color, x, y, type) {
                this.type = type;
                if (type == "imagen") {
                    this.image = new Image();
                    this.image.src = color;
                }
                this.width = width;
                this.height = height;
                this.x = x;
                this.y = y;    
                this.update = function() {
                    ctx = myGameArea.context;
                    ctx.save();
                    ctx.translate(this.x, this.y)
                    if (type == "imagen") {
                        ctx.drawImage(this.image,
                            0 - this.width/5,
                            0 - this.height/5,
                            this.width,
                            this.height);
                    } else {
                        ctx.fillStyle = color;
                        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
                    }
                    ctx.restore();    
                }
            }

//FUNCIONES DE MOVIMIENTO DE LOS MINISUMOS
function updateGameArea() {
    //Jugador 1 RED
                myGameArea.clear();
                myBackground.newPos();//puede ser con ésta o con la función ring que se toquen?
                myBackground.update();
                ring.update();


                myGamePiece.moveAngle = 0;
                myGamePiece.speed = 0;
                if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.moveAngle = -1; }
                if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.moveAngle = 1; }
                if (myGameArea.keys && myGameArea.keys[38]) {
                    myGamePiece.speed = 1.5 + myGamePiece.acelerador;
                    myGamePiece.acelerador += 0.1;
                    //console.log(myGamePiece.speed);
                } else if (myGameArea.keys && myGameArea.keys[40]) {
                    myGamePiece.speed = -1.5 - myGamePiece.acelerador;
                    myGamePiece.acelerador += 0.1;
                } else {
                    myGamePiece.acelerador = 0;
                }
                //if (myGamePiece.speed>myGamePiece2.speed) {console.log("Red's faster.");}
                
                //Choque Gana Red por aceleración.
                
                //Fuera del Ring

                //console.log("Posición X de red: "+myGamePiece2.x);
                
                //LA DIVISIÓN ENTRE 2 ES PARA QUE NO SEA UN NÚMERO TAN GRANDE
                if (myGamePiece.y /2 > yUpperRing) {
                    if(onceShow != 2){
                        endGame("Blue","Sacó a Red del ring: ABAJO.");
                        onceShow++;
                    }
                    
                } else if (myGamePiece.y / 2 < yDownerRing){
                    if(onceShow != 2){
                        endGame("Blue","Sacó a Red del ring: ARRIBA.");
                        onceShow++;
                    }
                }


                if (myGamePiece.x /2 < xLeftRing) {
                    if(onceShow != 2){
                        endGame("Blue","Sacó a Red del ring: IZQUIERDA.");
                        onceShow++;
                    }
                } else if (myGamePiece.x /2 > xRightRing){
                    if(onceShow != 2){
                        endGame("Blue","Sacó a Red del ring: DERECHA.");
                        onceShow++;
                    }
                }

                if (myGamePiece2.y /2 > yUpperRing) {
                    if(onceShow != 2){
                        endGame("Red","Sacó a Blue del ring: ABAJO.");
                        onceShow++;
                    }
                } else if (myGamePiece2.y / 2 < yDownerRing){
                    if(onceShow != 2){
                        endGame("Red","Sacó a Blue del ring: ARRIBA.");
                        onceShow++;
                    }
                }


                if (myGamePiece2.x /2 < xLeftRing) {
                    if(onceShow != 2){
                        endGame("Red","Sacó a Blue del ring: IZQUIERDA.");
                        onceShow++;
                    }
                } else if (myGamePiece2.x /2 > xRightRing){
                    if(onceShow != 2){
                        endGame("Red","Sacó a Blue del ring: DERECHA.");
                        onceShow++;
                    }
                }

    //Jugador 2  BLUE
                myGamePiece2.moveAngle = 0;
                myGamePiece2.speed = 0;
                if (myGameArea.keys && myGameArea.keys[65]) {myGamePiece2.moveAngle = -1; }
                if (myGameArea.keys && myGameArea.keys[68]) {myGamePiece2.moveAngle = 1; } 
                if (myGameArea.keys && myGameArea.keys[87]) {
                    myGamePiece2.speed = 1.5 + myGamePiece2.acelerador;
                    myGamePiece2.acelerador += 0.1;
                    //console.log(myGamePiece2.speed);
                } else if (myGameArea.keys && myGameArea.keys[83]) {
                    myGamePiece2.speed = -1.5 - myGamePiece2.acelerador;
                    myGamePiece2.acelerador += 0.1;
                } else {
                    myGamePiece2.acelerador = 0
                }
                //if (myGamePiece2.speed>myGamePiece.speed) {console.log("Blue's faster.");}
                myGamePiece2.newPos();
                myGamePiece2.update();
                myGamePiece.newPos();
                myGamePiece.update();

                

                if (myGamePiece2.crashWith(myGamePiece) && myGamePiece2.speed>myGamePiece.speed) {
                    //console.log("Velocidad del primer carro: "+myGamePiece.speed);
                    //console.log("Velocidad del segundo carro: "+myGamePiece2.speed);
                    myGamePiece.x -= myGamePiece2.speed;
                    myGamePiece.y -= myGamePiece2.speed;

                    myGamePiece.speed *= -0.5;
                    
                } else if (myGamePiece.crashWith(myGamePiece2) && myGamePiece.speed>myGamePiece2.speed) {
                    myGamePiece2.x -= myGamePiece.speed;
                    myGamePiece2.y -= myGamePiece.speed;

                    myGamePiece2.speed *= -0.5;
                    
                    //playFanfare(1);
                }//Aquí es si ganó en reversa.
            }

let timerInterval

function endGame(winner,message){

    playFanfare(1);

    Swal.fire({
  title: '¡GANADOR: '+winner+'!',
  html: message,
  timer: 3000,
  timerProgressBar: true,
  onBeforeOpen: () => {
    Swal.showLoading()
    timerInterval = setInterval(() => {
      Swal.getContent().querySelector('b')
        .textContent = Swal.getTimerLeft()
    }, 100)
  },
  onClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.timer
  ) {
    //console.log('I was closed by the timer') // eslint-disable-line
    location.reload();
  }
})

}    