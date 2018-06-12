// ************************************************************************************
// ** This file has been created with the Rotating Content Tool by Amesbury Web.     **
// ** For more information, visit us on the web:                                     **
// **                                                                                **
// **     Rotating Content Tool   -- http://rotatecontent.com/                       **
// **     Company: Amesbury Web   -- http://amesburyweb.com/                         **
// **     Author:  Randy Hoyt     -- http://randyhoyt.com/                           **
// **                                                                                **
// ************************************************************************************


selectedContent = ""



entryDate[0] = "1"
entryContent[0] = "aaaaa"

entryDate[1] = " 2"
entryContent[1] = "bbbbbbbbbb"

entryDate[2] = " 3"
entryContent[2] = "cccccccccc"

entryDate[3] = " 4"
entryContent[3] = "ddddddddd"

entryDate[4] = " 5"
entryContent[4] = "eeeeeeeee"

entryDate[5] = " 6"
entryContent[5] = "ffffffffff"

entryDate[6] = " 76"
entryContent[6] = "ggggggg"

entryDate[7] = " 8"
entryContent[7] = "hhhhhhhh"

entryDate[8] = " 9"
entryContent[8] = "iiiiiiii"

entryDate[9] = " 0"
entryContent[9] = "jjjjjjjjjj"

entryDate[10] = " random"
entryContent[10] = "kkkkkkkkkkk"

entryDate[11] = " random"
entryContent[11] = "lllllll"

entryDate[12] = " random"
entryContent[12] = "mmmmmmmm"

entryDate[13] = " random"
entryContent[13] = "nnnnnnnn"

entryDate[14] = " random"
entryContent[14] = "oooooooo"

entryDate[15] = " random"
entryContent[15] = "ppppppppp"




  var randomNumber = Math.random()
  randomNumber *= varLength
  randomNumber = parseInt(randomNumber)
  if(isNaN(randomNumber)) randomNumber = 0
  else randomNumber %= varLength
  selectedContent = entryContent[randomNumber]

document.write ("hello")
document.write (selectedContent)