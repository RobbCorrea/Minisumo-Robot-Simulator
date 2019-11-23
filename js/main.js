//main.js
let canvas, canvasContext;
let myGamePiece;
let myGamePiece2;

const FRICCION = 0.94;
const ACELERADOR = 0.5;
const REVERSA = 0.2;
//const sumoAlpha = new sumoClass();
//const sumoBravo = new sumoClass();

document.getElementById("boton-inicia-juego").onclick = function() {
    
    document.getElementById("boton-inicia-juego").style.display = "none";
    document.getElementById("pantallaInicio").style.display = "none";
    //document.getElementById("canvasJuego").style.display = "block";

    //playBackMusic(1);

    startGame();
    
    canvas = document.getElementById('canvasJuego');
    canvasContext = canvas.getContext('2d');

    //colorRect(0,0, canvas.width,canvas.height, 'black');
    //colorText("Montando el ring...", canvas.width/2, canvas.height/2, 'white');

    //loadImages();
}


            
            function startGame() {
                myGamePiece = new component(30,30, "red",  200, 135);
                myGamePiece2 = new component(30,30, "blue",  240, 135);
                myGameArea.start();
            }
            
            var myGameArea = {
                canvas : document.createElement("canvas"),
                start : function() {
                    this.canvas.width = 480;
                    this.canvas.height = 270;
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
                }
            }
            
            function component(width, height, color, x, y, type) {
            
                this.type = type;
                this.width = width;
                this.height = height;
                this.speed = 0;
                this.angle = 0;
                this.moveAngle = 0;
                this.x = x;
                this.y = y;    
                this.update = function() {
                    ctx = myGameArea.context;
                    ctx.save();
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.angle);
                    ctx.fillStyle = color;
                    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
                    ctx.restore();    
                }
                this.newPos = function() {
                    this.angle += this.moveAngle * Math.PI / 180; //Aquí le decimos gira un grado, pero se sigue ejecutando si no sueltas la tecla. Porque 2 Math.Pi = 360. Math.Pi = 180  Math.Pi/180 = 1 grado.
                    this.x += this.speed * Math.sin(this.angle);
                    this.y -= this.speed * Math.cos(this.angle);
                }
  //codigo de JP para la colision              this.checkCollition = function(enemy) {

            //    }
            }
            //Funciones de movimiento de minisumos
            function updateGameArea() {
                //Jugador 1
                myGameArea.clear();
                myGamePiece.moveAngle = 0;
                myGamePiece.speed = 0;
                if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.moveAngle = -1; }
                if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.moveAngle = 1; }
                if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speed= 1.5 + ACELERADOR; }
                if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speed= -1.5 + REVERSA; }
                if (myGamePiece.speed>myGamePiece2.speed) {console.log("Red's faster.");}
                myGamePiece.newPos();
                myGamePiece.update();

                //Jugador 2
                myGamePiece2.moveAngle = 0;
                myGamePiece2.speed = 0;
                if (myGameArea.keys && myGameArea.keys[65]) {myGamePiece2.moveAngle = -1; }
                if (myGameArea.keys && myGameArea.keys[68]) {myGamePiece2.moveAngle = 1; }
                if (myGameArea.keys && myGameArea.keys[87]) {myGamePiece2.speed= 1.5 + ACELERADOR; }
                if (myGameArea.keys && myGameArea.keys[83]) {myGamePiece2.speed= -1.5 + REVERSA; }
                if (myGamePiece2.speed>myGamePiece.speed) {console.log("Blue's faster.");}
                myGamePiece2.newPos();
                myGamePiece2.update();


               

                //Para ganar. Revisar cómo hacer la aceleración en tutorial.
                //Cuando veamos cómo hacer la aceleración, revisar cómo hacer la colisión.
                //Cuando haga la colisión, revisar cuál llevaba mayor aceleración e
                //imprimir un window mensaje que muestre la diferencia de aceleraciones
                //y por lo tanto declare al ganador. Antes puede ser un console.log
                //también con base en la resta se puede ejecutar una función oncollision
                //que muestre una de varias posibles animaciones.
            }