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
entryContent[0] = "<a href = \"https://drive.google.com/file/d/1kYolMF_V8bmpzqDl66Gws2Q1eQhIlCV3/view?usp=sharing\"> Space </a>"

entryDate[1] = " 2"
entryContent[1] = "<a href = \"https://drive.google.com/file/d/1kYolMF_V8bmpzqDl66Gws2Q1eQhIlCV3/view?usp=sharing\"> Space </a>"

entryDate[2] = " 3"
entryContent[2] = "<a href = \"https://drive.google.com/file/d/1kYolMF_V8bmpzqDl66Gws2Q1eQhIlCV3/view?usp=sharing\"> Space </a>"

entryDate[3] = " 4"
entryContent[3] = "<a href = \"https://drive.google.com/file/d/1kYolMF_V8bmpzqDl66Gws2Q1eQhIlCV3/view?usp=sharing\"> Space </a>"

entryDate[4] = " 5"
entryContent[4] = "<a href = \"https://drive.google.com/file/d/1kYolMF_V8bmpzqDl66Gws2Q1eQhIlCV3/view?usp=sharing\"> Space </a>"

entryDate[5] = " 6"
entryContent[5] = "<a href = \"https://drive.google.com/file/d/1kYolMF_V8bmpzqDl66Gws2Q1eQhIlCV3/view?usp=sharing\"> Space </a>"

entryDate[6] = " 76"
entryContent[6] = "<a href = \"https://drive.google.com/file/d/1kYolMF_V8bmpzqDl66Gws2Q1eQhIlCV3/view?usp=sharing\"> Space </a>"

entryDate[7] = " 8"
entryContent[7] = "<a href = \"https://drive.google.com/file/d/1kYolMF_V8bmpzqDl66Gws2Q1eQhIlCV3/view?usp=sharing\"> Space </a>"

entryDate[8] = " 9"
entryContent[8] = "<a href = \"https://drive.google.com/file/d/1kYolMF_V8bmpzqDl66Gws2Q1eQhIlCV3/view?usp=sharing\"> Space </a>"

entryDate[9] = " 0"
entryContent[9] = "<a href = \"https://drive.google.com/file/d/1kYolMF_V8bmpzqDl66Gws2Q1eQhIlCV3/view?usp=sharing\"> Space </a>"

entryDate[10] = " random"
entryContent[10] = "<a href = \"https://drive.google.com/file/d/1kYolMF_V8bmpzqDl66Gws2Q1eQhIlCV3/view?usp=sharing\"> Space </a>"

entryDate[11] = " random"
entryContent[11] = "<a href = \"https://drive.google.com/file/d/1kYolMF_V8bmpzqDl66Gws2Q1eQhIlCV3/view?usp=sharing\"> Space </a>"

entryDate[12] = " random"
entryContent[12] = "<a href = \"https://drive.google.com/file/d/1kYolMF_V8bmpzqDl66Gws2Q1eQhIlCV3/view?usp=sharing\"> Space </a>"

entryDate[13] = " random"
entryContent[13] = "<a href = \"https://drive.google.com/file/d/1kYolMF_V8bmpzqDl66Gws2Q1eQhIlCV3/view?usp=sharing\"> Space </a>"

entryDate[14] = " random"
entryContent[14] = "<a href = \"https://drive.google.com/file/d/1kYolMF_V8bmpzqDl66Gws2Q1eQhIlCV3/view?usp=sharing\"> Space </a>"

entryDate[15] = " random"
entryContent[15] = "<a href = \"https://drive.google.com/file/d/1kYolMF_V8bmpzqDl66Gws2Q1eQhIlCV3/view?usp=sharing\"> Space </a>"




  var randomNumber = Math.random()
  randomNumber *= varLength
  randomNumber = parseInt(randomNumber)
  if(isNaN(randomNumber)) randomNumber = 0
  else randomNumber %= varLength
  selectedContent = entryContent[randomNumber]


document.write (selectedContent)