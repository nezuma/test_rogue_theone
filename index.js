"use strict"
const h = 24;
const w = 40;
let leftX = 0;
let topY = 0;
let leftCounter = 1;
let topCounter = 0;
let playerPoint = 0;
let wallMass = [];
let health = 100;
let healthE = 100
const game = () => {
    for (let i = 0; i < w * h/2/2+24+24+24; i++) {     
        if (leftX == 1150) {
            topCounter += 50
        }
        if (i % h === 0) {
            leftX = 'unset';
            leftCounter = 1;
        } else {
            leftX = leftCounter * 50;
            leftCounter++;
        }
        if (i >= h) {
            topY = topCounter;
        }
        if(topY == 0) {
            topY = 'unset';
        }
        createElements(topY, leftX, i);
    };
    startpoint();
    function createElements(top, left, i) {
        var fill = document.getElementById('field');
        fill.insertAdjacentHTML("beforeend", `<div class="tileW" id=${parseInt(i+1)} style="left:${left}px; top:${top}px"></div>`)
    };
    function startpoint() {
        let result = Math.ceil(Math.random() * 312);
        playerPoint = result;
        let start = document.getElementById(result); 
        let tile = document.getElementById(result);
        tile.insertAdjacentHTML("beforeend", `<div class="tileP" id=${result+4000}><div class='health' style="width:${health}%"></div></div>`);
        tile.insertAdjacentHTML("beforeend", `<div class="tile" id=${result+1000}></div>`);
        setTimeout(tileGenerator, 500, result, tile, start);
    };
    function tileGenerator(result, tile, start) {   
        const stid = start.id;
        if(parseInt(stid) - 24 < 0) {
            bottomTileGenerator(result, tile);
            leftTileGenerator(result, tile);  
            rightTileGenerator(result, tile);
        } else if (parseInt(stid) + 24 > 312) {
            topTileGenerator(result, tile);
            leftTileGenerator(result, tile);  
            rightTileGenerator(result, tile);
        } else {
            topTileGenerator(result, tile);
            bottomTileGenerator(result, tile);
            leftTileGenerator(result, tile);  
            rightTileGenerator(result, tile);
        }
        enemyGenerator();
        roomGenerator();
    };
    function topTileGenerator(result, tile) {
        let i = 0;
        while(result > 0) {
            i++;
            result -= 24;
            tile = document.getElementById(result);
            if(result <= 0) {
                
            } else if(tile.innerHTML) {

            } else {
                tile.insertAdjacentHTML("beforeend", `<div class="tile" id=${result+1000}></div>`);
            }
        }
    };
    function bottomTileGenerator(result,tile) {
        let i = 0;
        while(result <= 312) {
            i++;
            result += 24;
            tile = document.getElementById(result);
            if(result>312) {
                
            } else if(tile.innerHTML) {
                    
            } else {
                tile.insertAdjacentHTML("beforeend", `<div class="tile" id=${result+1000}></div>`);
           }
        }
    };
    function leftTileGenerator(result, tile) {
        let i = 0;
        while(result%24 != 1) {
            i++;
            result -= 1;
            tile = document.getElementById(result);
            if(result%24 == 1) {
                tile.insertAdjacentHTML("beforeend", `<div class="tile" id=${result+1000}></div>`);
            } else if(tile.innerHTML) {
                    
            } else {
                tile.insertAdjacentHTML("beforeend", `<div class="tile" id=${result+1000}></div>`);
            }
        }
    };
    function rightTileGenerator(result, tile) {
        let i = 0;
        while(result%24 != 0) {
            i++;
            result += 1;
            tile = document.getElementById(result);
            if(result%24 == 0) {
                tile.insertAdjacentHTML("beforeend", `<div class="tile" id=${result+1000}></div>`);
            } else if(tile.innerHTML) {
                    
            } else {
                tile.insertAdjacentHTML("beforeend", `<div class="tile" id=${result+1000}></div>`);
            }    
        }
    };
    function enemyGenerator(stid) {
        let i = 0;
        while(i < 3) {
            i++;
            let result = Math.ceil(Math.random() * 312);
            genTiles(result, stid);
        };
        function genTiles(result, stid) {
            let tile = document.getElementById(result);
            if(stid == parseInt(tile.id)){
                parseInt(tile.id) += 1;
            }
            tile.insertAdjacentHTML("beforeend", `<div class="tileE" id=${result+2000}><div class='health' style="width:${healthE}%"></div></div>`);
            let i = 0;
            topTileGenerator(result, tile);
            bottomTileGenerator(result, tile);
            leftTileGenerator(result, tile);
            rightTileGenerator(result, tile);
        };
    };
    function roomGenerator() {
        let i = 0;
        while(i < 3) {
            i++;
            let result = Math.ceil(Math.random() * 312);
            let tile = document.getElementById(result);
            tile.insertAdjacentHTML("beforeend", `<div class="tileHP" id=${result+3000}></div>`);
            topTileGenerator(result);
            bottomTileGenerator(result);
        }
    }
};
const fieldScanner = () => {
    wallMass = [];
    for(let i = 1; i <= 312; i++) {
        let wall = document.getElementById(i);
        let childElement = wall.querySelector('div')
        if(childElement && childElement.className == 'tile') {
            wallMass.push('tile');
        } else if (childElement && childElement.className == 'tileP') {
            wallMass.push('player');
        } else if (childElement && childElement.className == 'tileE') {
            wallMass.push('enemy');
        } else if (childElement && childElement.className == 'tileHP') {
            wallMass.push('HP');
        } else if (childElement && childElement.className == 'tileSW') {
            wallMass.push('sword');
        } else if (wall.innerHTML == '') {
            wallMass.push('wall');
        } else {
            wallMass.push(wall.innerHTML);
        }
    }
};
window.addEventListener('keydown', function (event) {
    let key = event.key.toLowerCase();
    if(key == ' ') {
        key = 'attack';
    }
    if (key === 'w' || key === 'a' || key === 's' || key === 'd' || 
        key === 'ц' || key === 'ф' || key === 'ы' || key === 'в' || key === 'attack') {
        let player = document.getElementById(playerPoint);
        let plpoint = document.getElementById(playerPoint+4000);
        if(key === 'w' || key === 'ц') {
            if(playerPoint - 24 <= 0) {} else if(wallMass[playerPoint-25] == 'wall' || wallMass[playerPoint-25] == 'enemy' || wallMass[playerPoint-25] == 'HP') {} 
            else {
                player = document.getElementById(playerPoint-24);
                plpoint.remove();
                player.insertAdjacentHTML("beforeend", `<div class="tileP" id=${playerPoint-24+4000}><div class='health' style="width:${health}%"></div></div>`);
                playerPoint -= 24;
            }
        } else if (key === 'a' || key === 'ф') {
            if(playerPoint % 24 == 1) {} else if (wallMass[playerPoint-2] == 'wall' || wallMass[playerPoint-2] == 'enemy' || wallMass[playerPoint-2] == 'HP') {} 
            else {
                player = document.getElementById(playerPoint-1);
                playerPoint -= 1;
                plpoint.remove();
                player.insertAdjacentHTML("beforeend", `<div class="tileP" id=${playerPoint+4000}><div class='health' style="width:${health}%"></div></div>`);
            }
        } else if (key === 's' || key === 'ы') {
            if(playerPoint + 24 > 312) {} else if(wallMass[playerPoint+23] == 'wall'|| wallMass[playerPoint+23] == 'enemy' || wallMass[playerPoint+23] == 'HP') {} 
            else {
                player = document.getElementById(playerPoint+24);
                playerPoint += 24;
                plpoint.remove();
                player.insertAdjacentHTML("beforeend", `<div class="tileP" id=${playerPoint+4000}><div class='health' style="width:${health}%"></div></div>`);
            }
        } else if(key === 'd' || key === 'в') {
            if(playerPoint % 24 == 0) {} else if(wallMass[playerPoint] == 'wall' || wallMass[playerPoint] == 'enemy' || wallMass[playerPoint] == 'HP') {} 
            else {
                player = document.getElementById(playerPoint+1);
                playerPoint += 1;
                plpoint.remove();
                player.insertAdjacentHTML("beforeend", `<div class="tileP" id=${playerPoint+4000}><div class='health' style="width:${health}%"></div></div>`);
            }
        } else {
            let toppoint = document.getElementById(playerPoint-25);
            let bottompoint = document.getElementById(playerPoint+23);
            let leftpoint = document.getElementById(playerPoint-2);
            let rightpoint = document.getElementById(playerPoint);
            console.log(wallMass[toppoint.id] + ' Верх');
            console.log(wallMass[leftpoint.id] + ' лево');
            console.log(wallMass[bottompoint.id] + ' низ');
            console.log(wallMass[rightpoint.id] + ' право');
        }
    }
    setTimeout(fieldScanner,1000)
});
game();