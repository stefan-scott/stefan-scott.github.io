//selection sort

let values = [];
const ARRAY_SIZE = 1000;

function setup() {
  noCanvas();
  noLoop();
  populateArray();
}

function populateArray(){
  //fill our array with 1000 random numbers from 1-1000
  for (let i = 0; i< ARRAY_SIZE; i++){
    values.push(int(random(1000)));
  }
}

function binarySearch(n){
  while (values.length > 1){
    let index = int(values.length/2);
    if (values[index]===n){
      return true;
    }
    else{
      if (values[index]>n){
        //get rid of the larger numbers
        values.splice(n);
      }
      else{
        //get rid of the smaller numbers
        values.splice(0,int(values.length/2));
      }
    }
  }
  return false;
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
  print(binarySearch(52));
  print(binarySearch(9999));
}
