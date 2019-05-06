//selection sort

let values = [30, 20, 0, 6, 29];

function setup() {
  noCanvas();
  noLoop();
}

function selectionSort(){
  //one character at a time, find the minimum value and swap
  for (let index = 0; index < values.length-1; index++){
    let minimum = values[index];
    let minimumLoc = index;
    for (let checkIndex = index+1; checkIndex < values.length; checkIndex++){
      let cur = values[checkIndex];
      if (cur < minimum){
        minimum = cur;
        minimumLoc = checkIndex;
      }
    }
    //swap the item at index with the item at minimumLoc
    let temp = values[index];
    values[index] = values[minimumLoc];
    values[minimumLoc] = temp;
  }

}

function draw() {
  print(values);
  selectionSort();
  print(values);
}
