// // class for gamemap

// this is my test class, i choose to not use this in the end;



// let mymap;
// let myplayer;



// class Gamemap{

//   constructor(){
//     this.arr = [];
//     this.img;
//   }

//   setup(){
//     this.generateMap_arr();
//     // array first, the img
//     // array for index search, img for display idea
//     this.generateMap_img();
//   }

//   display(){
//     image(this.img.get(myplayer.x - width/2, myplayer.y - height/2,width,height),0,0);
//   }

//   generateMap_img(){
//     let temp_w = 0,temp_h = 0;
    
//     // get data
//     for(let y = 0; y < this.arr.length; ++y){
//       for(let x = 0; x< this.arr[y].length; ++x){
//         temp_h += this.arr[y][x].width;
//         temp_w += this.arr[y][x].width;
//       }
//     }

//     // set up image size
//     this.img = createImage(temp_w,temp_w);
//     this.img.loadPixels();


//     // make a big image
//     for(let y = 0; y < this.arr.length * 16; ++y){
//       for(let x = 0; x< this.arr[int(y/16)].length * 16; ++x){
//         let c;
//         let temp_x = int(x/16); let temp_y =int(y/16);
//         c = this.arr[temp_y][temp_x].get(x%16,y%16); 
//         this.img.set(x,y,c);
//       }
//     }
//     this.img.updatePixels();
//   }
  
//   generateMap_arr(){
//     for(let y = 0; y < 30; ++y){
//       let temp = [];
//       for(let x =0; x < 30; ++x){
//         if(y <= 2)temp.push(wallset[int(random(wallset.length))]);
//         else temp.push(floorset[int(random(floorset.length))]);
//       }
//       this.arr.push(temp);
//     }
//   }

// }





// class Player{
//   constructor(){
//     this.x = 0;
//     this.y = 0;
//   }
// }