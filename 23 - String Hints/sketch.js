let words = ["cat", "cat", "cat", "chicken", "dog", "elephant", "fox"];
let seed = "ccfed";

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  let s = "here is a string";
  print(s.indexOf("e"));
  print(s.indexOf("yyy"));

  //loop through the characters in the string:
  let poem = "";
  let lastWord = "";
  for (let i = 0; i < seed.length; i++ ){
    let curChar = seed.charAt(i); 
    //look through all the words to find a match!
    //loop through elements in an array
    for (let i = 0; i< words.length; i++){
      let curWord = words[i];
      if(curChar === curWord.charAt(0) ){
        if (lastWord !== curWord){
          poem += curWord + " ";  //add the current matched word to the poem
          words.splice(i,1);
          lastWord = curWord;
          break;
        }

      } 
    }
  }
  print(poem); 

  

  //remove elements from array
  

}
