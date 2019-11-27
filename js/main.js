//main.js
//main.js
//let canvas, canvasContext;
let myGamePiece;
let myGamePiece2;
//Sumo Kart Variables
const FRICCION = 0.94;
const ACELERACION = 0.5;
let REVERSA = 0.2;
//Winner Variable
//const WINNER = (myGamePiece.speed>myGamePiece2.speed)
//const sumoAlpha = new sumoClass();
//const sumoBravo = new sumoClass();

//MUSIC

var battleMusic = new Audio("./sounds/3687-edm-detection-mode-by-kevin-macleod.mp3");
            battleMusic.preload = 'auto';
            battleMusic.loop = 'true';
            battleMusic.load();

var bgMusic = document.getElementById("introTheme");

bgMusic.play();


document.getElementById("boton-inicia-juego").onclick = function() {
    
    document.getElementById("boton-inicia-juego").style.display = "none";
    document.getElementById("pantallaInicio").style.display = "none";
    //document.getElementById("canvasJuego").style.display = "block";

    //playBackMusic(1);

    startGame();
    //loadCrono(); Aquí cargaré mi cronómetro.
    //canvas = document.getElementById('canvasJuego');
    //canvasContext = canvas.getContext('2d');
    playBattleMusic(1);
    //colorRect(0,0, canvas.width,canvas.height, 'black');
    //colorText("Montando el ring...", canvas.width/2, canvas.height/2, 'white');

    //loadImages();
}


Window.onload = function() {

}



const playBattleMusic = (volume) => {
    const click = battleMusic.cloneNode();
    click.volume = volume;
    click.play();
}

            function startGame() {
                myGamePiece = new component(40,40, "red",  200, 135);
                myGamePiece2 = new component(40,40, "blue",  240, 135);
                myGameArea.start();
            }
            
            var myGameArea = {
                canvas : document.createElement("canvas"),
                start : function() {
                    this.canvas.width = 800;
                    this.canvas.height = 600;
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
                                    playMusic : function playBackMusic(volume){
                            var click = sound3.cloneNode();
                            click.volume = volume;
                            click.play();
                }
                },
                stop : function() {
                    clearInterval(this.interval);
                },    
                clear : function() {
                    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                },


            }


            
            function component(width, height, color, x, y, type) {
            
                this.type = type;
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

                this.crashWith = (item) => {
                    return (this.x < item.x + item.width) &&
                    (this.x + this.width > item.x) &&
                    (this.y < item.y + item.height) &&
                    (this.y + this.height > item.y);
                }
            }
            //Funciones de movimiento de minisumos
            function updateGameArea() {
                //Jugador 1
                myGameArea.clear();
                myGamePiece.moveAngle = 0;
                myGamePiece.speed = 0;
                if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.moveAngle = -1; }
                if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.moveAngle = 1; }
                if (myGameArea.keys && myGameArea.keys[38]) {
                    myGamePiece.speed = 1.5 + myGamePiece.acelerador;
                    myGamePiece.acelerador += 0.1;
                    console.log(myGamePiece.speed);
                } else if (myGameArea.keys && myGameArea.keys[40]) {
                    myGamePiece.speed = -1.5 - myGamePiece.acelerador;
                    myGamePiece.acelerador += 0.1;
                } else {
                    myGamePiece.acelerador = 0;
                }
    
                //if (myGamePiece.speed>myGamePiece2.speed) {console.log("Red's faster.");}
                myGamePiece.newPos();
                myGamePiece.update();
                if (myGamePiece.crashWith(myGamePiece2) && (myGamePiece.speed>myGamePiece2.speed)) {console.log(`Red Gana!`);}

                //Jugador 2
                myGamePiece2.moveAngle = 0;
                myGamePiece2.speed = 0;
                if (myGameArea.keys && myGameArea.keys[65]) {myGamePiece2.moveAngle = -1; }
                if (myGameArea.keys && myGameArea.keys[68]) {myGamePiece2.moveAngle = 1; } 
                if (myGameArea.keys && myGameArea.keys[87]) {
                    myGamePiece2.speed = 1.5 + myGamePiece2.acelerador;
                    myGamePiece2.acelerador += 0.1;
                    console.log(myGamePiece2.speed);
                } else if (myGameArea.keys && myGameArea.keys[83]) {
                    myGamePiece2.speed = -1.5 - myGamePiece2.acelerador;
                    myGamePiece2.acelerador += 0.1;
                } else {
                    myGamePiece2.acelerador = 0
                }
                //if (myGamePiece2.speed>myGamePiece.speed) {console.log("Blue's faster.");}
                myGamePiece2.newPos();
                myGamePiece2.update();
                if (myGamePiece2.crashWith(myGamePiece) && (myGamePiece2.speed>myGamePiece.speed || -myGamePiece2.speed > -myGamePiece.speed)) {console.log(`Blue Gana! ${myGamePiece2.acelerador}`);} //Aquí es si ganó en reversa.
             //   if (gameOver()) {console.log(`¿Te gustaría comprar estas piezas?`)}

                //Para ganar. Revisar cómo hacer la aceleración en tutorial.
                //Cuando veamos cómo hacer la aceleración, revisar cómo hacer la colisión.
                //Cuando haga la colisión, revisar cuál llevaba mayor aceleración e
                //imprimir un window mensaje que muestre la diferencia de aceleraciones
                //y por lo tanto declare al ganador. Antes puede ser un console.log
                //también con base en la resta se puede ejecutar una función oncollision
                //que muestre una de varias posibles animaciones.
            }
/*
            const gameOver = (winner) => {

               winner =  myGamePiece.crashWith(myGamePiece2) || myGamePiece2.crashWith(myGamePiece) ? gameOver() : console.log(frames);
               return winner; 
            
            }
*/
            //CLASS LOAD IMAGES FOR MINISUMOS AND CARS
           /* function beginLoadingImage(imgVar, fileName) {
                imgVar.onload = countLoadedImagesAndLaunchIfReady;
                imgVar.src = "images/"+fileName;
            }

            function loadImageForTrackCode(trackCode, fileName) {
                trackPics[trackCode] = document.createElement("img");
                beginLoadingImage(trackPics[trackCode], fileName);
            }

            function loadImages() {
                var imageList = [

                    {varName: redPic, theFile: "red.png"},
                    {varName: bluePic, theFile: "blue.png"},
                    {varName: bluePic, theFile: "redUpGrade.png"},
                    {varName: bluePic, theFile: "blueUpGrade.png"},
            
                    {trackType: TRACK_ROAD, theFile: "track_road.png"},
                    {trackType: TRACK_WALL, theFile: "track_wall.png"},
                    {trackType: TRACK_GOAL, theFile: "track_goal.png"},
                    
                ];
            
                picsToLoad = imageList.length;
            
                for(var i=0;i<imageList.length;i++) {
                    if(imageList[i].varName != undefined) {
                        beginLoadingImage(imageList[i].varName, imageList[i].theFile);
                    } else {
                        loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
                    }
                }
            } 
            */

            