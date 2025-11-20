// oh, the class i write for few day
// no enumeration, pure algorithms(hopefully)
// class about the dungeon
// the meaning of code are as same as the name is short for ASAN;

let direction = [
    [-1, 0], // y x, north
    [0, -1], // west
    [1, 0], // south
    [0, 1] // east
]


class Dungeon {

    constructor() {
        //ASAN
        this.map = [];
        this.size = 5;
        this.origin = (this.size - 1) / 2;
        this.cell = [];
        this.oneWay = [];

        this.index = [this.origin, this.origin];
        this.bossCell = [];
    }

    setup() {
        //ASAN
        this.grid_ini();
        this.dfs(this.origin, this.origin, 12);
        this.bfs(this.origin, this.origin);
        this.generate_boss();
    }

    dfs(y, x, step) {
        // depth first search
        // generate the map
        // random_walk need more to explain than dfs
        if (step === 0) return;
        else {
            this.map[y][x].visited = true;
        }
        this.random_walk(y, x, step);
    }

    grid_ini() {
        // ASAN
        this.map.length = 0;
        for (let y = 0; y < this.size; ++y) {
            let temp = [];
            for (let x = 0; x < this.size; ++x) {
                temp.push(new Room());
            }
            this.map.push(temp);
        }
    }

    mini_map() {
        // ASAN
        // draw for the small map in the right corner
        push();
        translate(40 * 16, 0);
        rectMode(CORNER);
        // reference grid
        stroke(0);
        for (let y = 0; y < 5; ++y) {
            for (let x = 0; x < 5; ++x) {
                fill(0);
                square(y * 16, x * 16, 16);
            }
        }

        for (let y = 0; y < this.map.length; ++y) {
            for (let x = 0; x < this.map[y].length; ++x) {
                if (this.map[y][x].visited) {
                    // fill for different type,
                    // player blue, spawn green, boss red,
                    // played white and unplayed black
                    if(y === this.index[0] && x === this.index[1])fill(0,0,255);
                    else if (y === this.origin && x === this.origin)fill(0, 255, 0);
                    else if (y === this.bossCell[0][0] && x === this.bossCell[0][1])fill(255, 0, 0)
                    else if(!this.map[y][x].played) fill(0);
                    else fill(220)

                    stroke(0);// 0 is black
                    square(x * 16, y * 16, 16);
                    // textSize(10);
                    // text(this.map[y][x].step, x * 16 + 8, y * 16 + 8);
                    // noWall
                    stroke(255);
                    if (this.map[y][x].noWall[0]) {//n
                        line((x) * 16, (y) * 16, (x + 1) * 16, (y) * 16);
                    }
                    if (this.map[y][x].noWall[1]) {//w
                        line((x) * 16, (y) * 16, (x) * 16, (y + 1) * 16);
                    }
                    if (this.map[y][x].noWall[2]) {//s
                        line((x) * 16, (y + 1) * 16, (x + 1) * 16, (y + 1) * 16);
                    }
                    if (this.map[y][x].noWall[3]) {//e
                        line((x + 1) * 16, (y) * 16, (x + 1) * 16, (y + 1) * 16);
                    }

                }
            }
        }

        pop();
    }

    random_walk(y, x, step) {
        // random Walk, just walk randomly and generate a Maze by the walk
        let neighborList = [];

        // push all available step into neighborlist
        for (let i = 0; i < direction.length; ++i) {
            let next_y = y + direction[i][0], next_x = x + direction[i][1];
            if (this.Valid(next_y, next_x)) neighborList.push([next_y, next_x]);
        }


        // special case
        if (neighborList.length === 0 && y === this.origin && y === x) return;

        if (neighborList.length === 0) this.dfs(this.origin, this.origin, step);
        // instead of stack for backtrap, i used origin to backtrap since the step will always be 12

        else {
            // random choose one for next recursion
            let temp = int(random(neighborList.length))

            let next_y = neighborList[temp][0], next_x = neighborList[temp][1];
            //print(next_y,next_x);

            // next dfs
            this.dfs(next_y, next_x, step - 1)
        }

    }

    in_range(y, x) {
        // check bound
        if (y < this.map.length && y >= 0 && x < this.map[y].length && x >= 0) return true;
        return false;
    }


    Valid(y, x) {
        // test valid for dfs
        if (!this.in_range(y, x)) return false;
        if (!this.map[y][x].visited) return true;
        return false;
    }

    bfs(y, x) {
        // bfs to setup room 
        this.cell.length = 0;
        this.oneWay.length = 0;

        this.map[y][x].step = 0;
        let queue = [[y, x, this.map[y][x].step]];
        while (queue.length !== 0) {
            let curr = queue.shift();
            this.cell.push([curr[0], curr[1]]);// record all the room in the cell arr

            for (let i = 0; i < direction.length; ++i) {
                let next_y = curr[0] + direction[i][0];
                let next_x = curr[1] + direction[i][1];


                // set up the wallNum and the existence of wall
                if (this.check(next_y, next_x)) {
                    this.map[curr[0]][curr[1]].neighborNum++;
                    this.map[curr[0]][curr[1]].noWall[i] = true;
                }

                // if next cell is valid and has not been visited, add to the queue
                if (this.in_range(next_y, next_x) && this.map[next_y][next_x].visited && this.map[next_y][next_x].step === -1) {
                    this.map[next_y][next_x].step = this.map[curr[0]][curr[1]].step + 1;
                    queue.push([next_y, next_x, this.map[next_y][next_x].step]);
                }
            }

        }

        // find the One way room except spawn room
        for (let i = 0; i < this.cell.length; ++i) {
            let y1 = this.cell[i][0], x1 = this.cell[i][1];
            if (this.map[y1][x1].neighborNum === 1 && !(y1 === this.origin && x1 === this.origin)) this.oneWay.push([y1, x1]);
        }

    }

    check(y, x) {
        // check for bfs
        if (this.in_range(y, x) && this.map[y][x].visited) return true;
        return false;
    }

    generate_boss() {
        this.index = [this.origin, this.origin];
        this.map[this.origin][this.origin].played = true;
        this.bossCell.length = 0;

        if (this.oneWay.length > 0) {
            let temp = this.oneWay[this.oneWay.length - 1];
            this.bossCell.push(temp);
            this.map[temp[0]][temp[1]].type = `boss`;
        }
        else {
            let temp = this.cell[this.cell.length - 1];
            this.bossCell.push(temp);
            this.map[temp[0]][temp[1]].type = `boss`;
        }
        // print(this.cell.length)
        // print('oneway is',this.oneWay, '\ncell is',this.cell)
    }


    display(x,y,shiftX, shiftY,drawdoor){
        // display map[y + shiftY][x + shiftX] image
        // also include shift, this is useful for translate animation

        // ASAN
        imageMode(CORNER);
        image(this.map[this.index[0] + shiftY][this.index[1] + shiftX].wall,x,y);
        image(this.map[this.index[0]+ shiftY][this.index[1] + shiftX].floor,x + 16,y + 32);
      
        for(let i = 0; i < direction.length; ++i){
          imageMode(CENTER);
          if(this.map[this.index[0] + shiftY][this.index[1] + shiftX].noWall[i]){
            // ori is 20 , 10; 19.5 and 9 is shift
            if(this.map[this.index[0] + shiftY][this.index[1] + shiftX].played || i === drawdoor)image(OpenDoorset[i], x + (20 + 19.5 * direction[i][1]) * 16, y + (10 + 9 * direction[i][0]) * 16);
            else image(ClosedDoorset[i], x + (20 + 19.5 * direction[i][1]) * 16, y + (10 + 9 * direction[i][0]) * 16);  
          }
        }
    }

}




class Room {
    constructor() {
        // ASAN
        this.wall = wallset[0];
        this.floor = floorset[0];
        // room condition , n,w,s,e north,west,south,east
        this.noWall = [false, false, false, false];
        this.visited = false;
        this.neighborNum = 0;
        this.step = -1;
        this.type = null;
        this.played = false;

        this.has_generate = false;
    }

    // bad version
    // init() {
    //     switch (this.neighborNum) {
    //         case 1: if (this.noWall[0]) {//n

    //         }
    //         else if (this.noWall[1]) {//w

    //         }
    //         else if (this.noWall[2]) {//s

    //         }
    //         else if (this.noWall[3]) {//e

    //         }
    //             break;

    //         case 2: if (this.noWall[0] && this.noWall[1]) {// n w 

    //         }
    //         else if (this.noWall[0] && this.noWall[2]) { // n s

    //         }
    //         else if (this.noWall[0] && this.noWall[3]) {// n e

    //         }
    //         else if (this.noWall[1] && this.noWall[2]) {// w s

    //         }
    //         else if (this.noWall[1] && this.noWall[3]) {// w e

    //         }
    //         else if (this.noWall[2] && this.noWall[3]) {// s e

    //         }
    //             break;



    //         case 3: if (!this.noWall[0]) {//s w e

    //         }
    //         else if (!this.noWall[1]) {// n w e

    //         }
    //         else if (!this.noWall[2]) {// n s e

    //         }
    //         else if (!this.noWall[3]) { // n w s

    //         }
    //             break;

    //         case 4: // n w s e
    //     }
    // }


}



function dungeonDisplay(){
    // ASAN
    // to display dungeon by diff condition
    // for understanding of translate animation,
    // one is original one is next, they both move and player move opposite
    // draw two together, once freeze time run out,
    // move the player index and change dungeonX and dungeonY to 0
    // paning is null then
    if(paning === 0)dungeon.display(dungeonX,dungeonY,0,0,-1);
    else if(paning === 1 && freezetime > 0){
      paningstate = 'up';
    }
    else if(paning === 2 && freezetime > 0){
      paningstate = 'left';
    }
    else if(paning === 3 && freezetime > 0){
      paningstate = 'down';
    }
    else if(paning === 4 && freezetime > 0){
      paningstate = 'right';
    }
  
    if(paningstate === 'up'){
      dungeon.display(dungeonX,-20 * 16 + dungeonY,0,-1,2);// next
      dungeon.display(dungeonX,dungeonY,0,0,-1); // original display(x,y,shiftX, shiftY,drawdoor)
      dungeonY += 5;
      hero.y += 4;
      hero.condition = 'run';
      freezetime --;
      if(freezetime === 0){
        paningstate = 'null';
        paning = 0 ;
        dungeonY = 0;
        dungeon.index[0] --;
        hero.y = EDGE.yend;
        Monsternum = int(random(8,17));
        generateFreeze = 60;
        hero.immuneFreeze += 120;;
      }
    }
    else if(paningstate === 'left'){
      dungeon.display( -40 * 16 + dungeonX,dungeonY,-1,0,3);// next
      dungeon.display(dungeonX,dungeonY,0,0,-1); // original display(x,y,shiftX, shiftY,drawdoor)
      dungeonX += 10;
      hero.x += 9;
      hero.condition = 'run';
      freezetime --;
  
      if(freezetime === 0){
        paningstate = 'null';
        paning = 0 ;
        dungeonX = 0;
        hero.x = EDGE.xend;
        dungeon.index[1]--;
        Monsternum = int(random(8,17));
        generateFreeze = 60;
        hero.immuneFreeze += 120;
      }
    }
    else if(paningstate === 'down'){
      dungeon.display(dungeonX,20 * 16 + dungeonY,0,1,0);// next
      dungeon.display(dungeonX,dungeonY,0,0,-1); // original display(x,y,shiftX, shiftY,drawdoor)
      dungeonY -= 5;
      hero.y -= 4;
      hero.condition = 'run';
      freezetime --;
      if(freezetime === 0){
        paningstate = 'null';
        paning = 0 ;
        dungeonY = 0;
        dungeon.index[0] ++;
        hero.y = EDGE.ystart;
        Monsternum = int(random(8,17));
        generateFreeze = 60;
        hero.immuneFreeze += 120;
      }
    }
    else if(paningstate === 'right'){
      dungeon.display( 40 * 16 + dungeonX,dungeonY,1,0,1);// next
      dungeon.display(dungeonX,dungeonY,0,0,-1); // original display(x,y,shiftX, shiftY,drawdoor)
      dungeonX -= 10;
      hero.x -= 9;
      hero.condition = 'run';
      freezetime --;
  
      if(freezetime === 0){
        paningstate = 'null';
        paning = 0 ;
        dungeonX = 0;
        hero.x = EDGE.xstart;
        dungeon.index[1]++;
        Monsternum = int(random(8,17));
        generateFreeze = 60;
        hero.immuneFreeze += 120;
  
      }
    }
  }
  





// enum  bfs
// if(this.check(curr[0]-1,curr[1])){//n
//     this.map[curr[0]][curr[1]].neighborNum ++;
//     this.map[curr[0]][curr[1]].noWall[0] = true;
// }
// if(this.check(curr[0],curr[1]-1)){//w
//     this.map[curr[0]][curr[1]].neighborNum ++;
//     this.map[curr[0]][curr[1]].noWall[1] = true;
// }
// if(this.check(curr[0]+1,curr[1])){//s
//     this.map[curr[0]][curr[1]].neighborNum ++;
//     this.map[curr[0]][curr[1]].noWall[2] = true;
// }
// if(this.check(curr[0],curr[1]+1)){//e
//     this.map[curr[0]][curr[1]].neighborNum ++;
//     this.map[curr[0]][curr[1]].noWall[3] = true;
// }


// enum dfs
// if(this.Valid(y-1,x)){//n
//     neighborList.push([y-1,x]);
// }
// if(this.Valid(y,x-1)){//w
//     neighborList.push([y,x-1]);
// }
// if(this.Valid(y+1,x)){// s
//     neighborList.push([y+1,x]);
// }
// if(this.Valid(y,x+1)){//e
//     neighborList.push([y,x+1]);
// }