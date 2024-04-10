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
let healthE = 100;
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
        setTimeout(enemyGenerator, 500);
        setTimeout(roomGenerator, 1000);
    };
    function topTileGenerator(result, tile) {
        let i = 0;
        while(result > 0) {
            i++;
            result -= 24;
            tile = document.getElementById(result);
            if(result <= 0) {} else if(tile.innerHTML) {
                i++;
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
                i++;
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
                i++;
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
            setTimeout(genTiles, 500, result, stid);
        };
        function genTiles(result, stid) {
            let tile = document.getElementById(result);
            if(stid == parseInt(tile.id)){
                parseInt(tile.id) += 1; 
            }
            if(tile.innerHTML) {
                let childTile = tile.querySelector('div');
                childTile.remove()
                tile.insertAdjacentHTML("beforeend", `<div class="tileE" id=${result+2000}><div class='health' style="width:${healthE}%"></div></div>`);
            } else {
                tile.insertAdjacentHTML("beforeend", `<div class="tileE" id=${result+2000}><div class='health' style="width:${healthE}%"></div></div>`);
            }
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
            if(tile.innerHTML) {
                let childTile = tile.querySelector('div');
                childTile.remove()
                tile.insertAdjacentHTML("beforeend", `<div class="tileHP" id=${result+3000}></div>`);
            } else {
                tile.insertAdjacentHTML("beforeend", `<div class="tileHP" id=${result+3000}></div>`);
            }
            topTileGenerator(result, tile);
            bottomTileGenerator(result, tile);
            let tilegen = result;
            if(parseInt(tile) % 24 != 0) {
                tilegen = document.getElementById(result+1);
            } else {
                tilegen = document.getElementById(result-1);
            }
            tilegen.insertAdjacentHTML("beforeend", `<div class="tileSW" id=${result+5000}></div>`);
            if(result - 24 < 0) {
                tilegen = document.getElementById(result+23);
            } else {
                tilegen = document.getElementById(result-23);
            }
            tilegen.insertAdjacentHTML("beforeend", `<div class="tile" id=${result+5000}></div>`);
            if(result - 24 < 0) {
                tilegen = document.getElementById(result+25);
            } else {
                tilegen = document.getElementById(result-25);
            }
            tilegen.insertAdjacentHTML("beforeend", `<div class="tile" id=${result+5000}></div>`);
            if(result - 1 < 0 && result%24 == 0) {
                tilegen = document.getElementById(result+2);
            } else {
                tilegen = document.getElementById(result-1);
            }
            tilegen.insertAdjacentHTML("beforeend", `<div class="tile" id=${result+1000}></div>`);
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
    return wallMass;
};
window.addEventListener('keydown', function (event) {
    let key = event.key.toLowerCase();
    if(key == ' ') {
        key = 'attack';
    }
    if (key === 'w' || key === 'a' || key === 's' || key === 'd' || 
        key === 'ц' || key === 'ф' || key === 'ы' || key === 'в' || key === 'attack') {
        let player = document.getElementById(playerPoint);
        let hppoint = document.getElementById(playerPoint+3000);
        let plpoint = document.getElementById(playerPoint+4000);
        let toppoint = document.getElementById(playerPoint-24);
        let bottompoint = document.getElementById(playerPoint+24);
        let leftpoint = document.getElementById(playerPoint-1);
        let rightpoint = document.getElementById(playerPoint+1); 
        if(key === 'w' || key === 'ц') {
            if(playerPoint - 24 <= 0) {} else if(wallMass[playerPoint-25] == 'wall' || wallMass[playerPoint-25] == 'enemy') {} 
            else if(wallMass[playerPoint-25] == 'HP') {
                player = document.getElementById(playerPoint-24);
                hppoint = toppoint.querySelector('div');
                hppoint.remove();
                toppoint.insertAdjacentHTML('beforeend', `<div class='tile' id=${playerPoint}><div>`)
                playerPoint -= 24;
                plpoint.remove();
                player.insertAdjacentHTML("beforeend", `<div class="tileP" id=${playerPoint+4000}><div class='health' style="width:${health}%"></div></div>`);
                fieldScanner();
            } else if(wallMass[playerPoint-25] == 'sword') {
                player = document.getElementById(playerPoint-24);
                hppoint = toppoint.querySelector('div');
                hppoint.remove();
                toppoint.insertAdjacentHTML('beforeend', `<div class='tile' id=${playerPoint}><div>`)
                playerPoint -= 24;
                plpoint.remove();
                player.insertAdjacentHTML("beforeend", `<div class="tileP" id=${playerPoint+4000}><div class='health' style="width:${health}%"></div></div>`);
                fieldScanner();
            } else {
                player = document.getElementById(playerPoint-24);
                plpoint.remove();
                player.insertAdjacentHTML("beforeend", `<div class="tileP" id=${playerPoint-24+4000}><div class='health' style="width:${health}%"></div></div>`);
                playerPoint -= 24;
            }
        } else if (key === 'a' || key === 'ф') {
            if(playerPoint % 24 == 1) {} else if (wallMass[playerPoint-2] == 'wall' || wallMass[playerPoint-2] == 'enemy') {} 
            else if(wallMass[playerPoint-2] == 'HP') {
                player = document.getElementById(playerPoint-1);
                hppoint = leftpoint.querySelector('div');
                hppoint.remove();
                leftpoint.insertAdjacentHTML('beforeend', `<div class='tile' id=${playerPoint}><div>`)
                playerPoint -= 1;
                plpoint.remove();
                player.insertAdjacentHTML("beforeend", `<div class="tileP" id=${playerPoint+4000}><div class='health' style="width:${health}%"></div></div>`);
                fieldScanner();
            } else {
                player = document.getElementById(playerPoint-1);
                playerPoint -= 1;
                plpoint.remove();
                player.insertAdjacentHTML("beforeend", `<div class="tileP" id=${playerPoint+4000}><div class='health' style="width:${health}%"></div></div>`);
            }
        } else if (key === 's' || key === 'ы') {
            if(playerPoint + 24 > 312) {} else if(wallMass[playerPoint+23] == 'wall'|| wallMass[playerPoint+23] == 'enemy') {}
            else if(wallMass[playerPoint+23] == 'HP') {
                player = document.getElementById(playerPoint+24);
                hppoint = bottompoint.querySelector('div');
                hppoint.remove();
                bottompoint.insertAdjacentHTML('beforeend', `<div class='tile' id=${playerPoint}><div>`)
                playerPoint += 24;
                plpoint.remove();
                player.insertAdjacentHTML("beforeend", `<div class="tileP" id=${playerPoint+4000}><div class='health' style="width:${health}%"></div></div>`);
                fieldScanner();
            } else {
                player = document.getElementById(playerPoint+24);
                playerPoint += 24;
                plpoint.remove();
                player.insertAdjacentHTML("beforeend", `<div class="tileP" id=${playerPoint+4000}><div class='health' style="width:${health}%"></div></div>`);
            }
        } else if(key === 'd' || key === 'в') {
            if(playerPoint % 24 == 0) {} else if(wallMass[playerPoint] == 'wall' || wallMass[playerPoint] == 'enemy') {} 
            else if(wallMass[playerPoint] == 'HP') {
                player = document.getElementById(playerPoint+1);
                hppoint = rightpoint.querySelector('div');
                hppoint.remove();
                rightpoint.insertAdjacentHTML('beforeend', `<div class='tile' id=${playerPoint}><div>`)
                playerPoint += 1;
                plpoint.remove();
                player.insertAdjacentHTML("beforeend", `<div class="tileP" id=${playerPoint+4000}><div class='health' style="width:${health}%"></div></div>`);
                fieldScanner();
            } else {
                player = document.getElementById(playerPoint+1);
                playerPoint += 1;
                plpoint.remove();
                player.insertAdjacentHTML("beforeend", `<div class="tileP" id=${playerPoint+4000}><div class='health' style="width:${health}%"></div></div>`);
            }
        } else {
            if(wallMass[toppoint.id-1] == 'enemy') {
                kill(toppoint);
            } else if(wallMass[bottompoint.id-1] == 'enemy') {
                kill(bottompoint);
            } else if(wallMass[leftpoint.id-1] == 'enemy') {
                kill(leftpoint);
            } else if(wallMass[rightpoint.id-1] == 'enemy') {
                kill(rightpoint);
            } else if (wallMass[bottompoint.id-1] == null || wallMass[toppoint.id-1] == null) {
                kill(rightpoint);
                kill(leftpoint);
            }
            function kill(point) {
                let childPoint = point.querySelector('div');
                let hpe = childPoint.querySelector('div');
                let hpenemy = hpe.style.width;
                hpenemy = hpenemy.split('');
                hpenemy.pop();
                hpenemy = hpenemy.join('');
                console.log(hpenemy)
                hpenemy = parseInt(hpenemy);
                hpenemy -= 25;
                hpe.style.width = `${hpenemy}%`;
                if(hpenemy <= 0) {
                    childPoint.remove();
                    point.insertAdjacentHTML("beforeend", `<div class="tile" id=${point.id+1000}></div>`);
                }
            }   
        }
    }
    setTimeout(fieldScanner,1500);
});
setTimeout(() => {setInterval(() => {
    fieldScanner();
    let enemylist = [];
    for(let i = 0; i <= wallMass.length; i++) {
        if(wallMass[i] == 'enemy') {
            enemylist.push(i+1);
        }
    }
    console.log(enemylist);
    if(enemylist[0] % 24 == 1) {
        let enemypoint = document.getElementById(enemylist[0]+1);
        let doroga = document.getElementById(enemylist[0]);
        let childdoroga = doroga.querySelector('div');
        childdoroga.remove();
        let childenemypoint = enemypoint.querySelector('div');
        childenemypoint.remove();
        doroga.insertAdjacentHTML('beforeend', `<div class='tile' id=${enemylist[0]}></div>`)
        enemypoint.insertAdjacentHTML("beforeend", `<div class="tileE" id=${enemylist[0]+1+2000}><div class='health' style="width:${healthE}%"></div></div>`);
    } else if(enemylist[0] % 24 != 0) {
        let enemypoint = document.getElementById(enemylist[0]-1);
        let doroga = document.getElementById(enemylist[0]);
        let childdoroga = doroga.querySelector('div');
        childdoroga.remove();
        let childenemypoint = enemypoint.querySelector('div');
        childenemypoint.remove();
        doroga.insertAdjacentHTML('beforeend', `<div class='tile' id=${enemylist[0]}></div>`)
        enemypoint.insertAdjacentHTML("beforeend", `<div class="tileE" id=${enemylist[0]-1+2000}><div class='health' style="width:${healthE}%"></div></div>`);
    }
    if(enemylist[1] % 24 == 1) {
        let enemypoint = document.getElementById(enemylist[1]+1);
        let doroga = document.getElementById(enemylist[1]);
        let childdoroga = doroga.querySelector('div');
        childdoroga.remove();
        let childenemypoint = enemypoint.querySelector('div');
        childenemypoint.remove();
        doroga.insertAdjacentHTML('beforeend', `<div class='tile' id=${enemylist[1]}></div>`)
        enemypoint.insertAdjacentHTML("beforeend", `<div class="tileE" id=${enemylist[1]+1+2000}><div class='health' style="width:${healthE}%"></div></div>`);
    } else if(enemylist[0] % 24 != 0) {
        let enemypoint = document.getElementById(enemylist[1]-1);
        let doroga = document.getElementById(enemylist[1]);
        let childdoroga = doroga.querySelector('div');
        childdoroga.remove();
        let childenemypoint = enemypoint.querySelector('div');
        childenemypoint.remove();
        doroga.insertAdjacentHTML('beforeend', `<div class='tile' id=${enemylist[1]}></div>`)
        enemypoint.insertAdjacentHTML("beforeend", `<div class="tileE" id=${enemylist[1]-1+2000}><div class='health' style="width:${healthE}%"></div></div>`);
    }
    if(enemylist[2] % 24 == 1) {
        let enemypoint = document.getElementById(enemylist[2]+1);
        let doroga = document.getElementById(enemylist[2]);
        let childdoroga = doroga.querySelector('div');
        childdoroga.remove();
        let childenemypoint = enemypoint.querySelector('div');
        childenemypoint.remove();
        doroga.insertAdjacentHTML('beforeend', `<div class='tile' id=${enemylist[2]}></div>`)
        enemypoint.insertAdjacentHTML("beforeend", `<div class="tileE" id=${enemylist[2]+1+2000}><div class='health' style="width:${healthE}%"></div></div>`);
    } else if(enemylist[2] % 24 != 0) {
        let enemypoint = document.getElementById(enemylist[2]-1);
        let doroga = document.getElementById(enemylist[2]);
        let childdoroga = doroga.querySelector('div');
        childdoroga.remove();
        let childenemypoint = enemypoint.querySelector('div');
        childenemypoint.remove();
        doroga.insertAdjacentHTML('beforeend', `<div class='tile' id=${enemylist[2]}></div>`)
        enemypoint.insertAdjacentHTML("beforeend", `<div class="tileE" id=${enemylist[2]-1+2000}><div class='health' style="width:${healthE}%"></div></div>`);
    }
}, 1500)}, 3000);
game();