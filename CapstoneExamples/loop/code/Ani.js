// the meaning of code are as same as the name is short for ASAN;



class FourWayAni {
  // ASAN
  constructor() {
    this.down = [];
    this.left = [];
    this.right = [];
    this.up = [];
  }
}





class SpecialAni {
  constructor() {
    // ASAN
    this.index = 0;
    this.frame = 0;
    this.aniarr = {
      hurt: new FourWayAni(),
      immune: new FourWayAni(),
      idle: [],
      run: new FourWayAni(),
      die: [],
      atk: new FourWayAni(),
      def: new FourWayAni(),
      shoot: new FourWayAni(),
      magic: new FourWayAni(),
    };
  }

  loadAni(condition, direction, location, size) {
    // the way to load organized file
    const animation = this.aniarr[condition][direction];
        for (let i = 0; i < size; ++i) {
            animation.push(loadImage(location + i + '.png'));
    }

  }

  SavetimeLoad(condition, direction, location, size, special_condition){
    // the way to load unorganized file, especially for monster  
    const animation = this.aniarr[condition][direction];
          for (let i = 0; i < size; ++i) {
              animation.push(loadImage(location + `${direction}` + '_' + `${special_condition}` + '_' + i + '.png'));
      }
  
    }

  deathLoad(condition, direction, location, size){
     // the way to load unorganized file about die, especially for monster
     // die has no direction, it is array instead of class
    const animation = this.aniarr[condition];
    for(let i = 0; i < size; ++i){
      animation.push(loadImage(location + `${direction}` + '_' + `${condition}` + '_' + i + '.png'));
    }
  } 
  


}



















// bad version 
    // this.aniarr = {
    //   idle: {
    //     down: [],
    //     left: [],
    //     right: [],
    //     up: [],
    //   },
    //   run: {
    //     down: [],
    //     left: [],
    //     right: [],
    //     up: [],
    //   },
    //   die: {
    //     down: [],
    //     left: [],
    //     right: [],
    //     up: [],
    //   },
    //   atk: {
    //     down: [],
    //     left: [],
    //     right: [],
    //     up: [],
    //   },
    //   def: {
    //     down: [],
    //     left: [],
    //     right: [],
    //     up: [],
    //   },

    //   shoot: {
    //     down: [],
    //     left: [],
    //     right: [],
    //     up: [],
    //   },

    //   magic: {
    //     down: [],
    //     left: [],
    //     right: [],
    //     up: [],
    //   }
    // };