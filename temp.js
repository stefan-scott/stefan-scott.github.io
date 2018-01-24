// ************************************************************************************
// ** This file has been created with the Rotating Content Tool by Amesbury Web.     **
// ** For more information, visit us on the web:                                     **
// **                                                                                **
// **     Rotating Content Tool   -- http://rotatecontent.com/                       **
// **     Company: Amesbury Web   -- http://amesburyweb.com/                         **
// **     Author:  Randy Hoyt     -- http://randyhoyt.com/                           **
// **                                                                                **
// ************************************************************************************

today = new Date()
month = today.getMonth() + 1
year = today.getFullYear()

selectedDate = new Date("01/01/1900")
selectedContent = ""

varLength = 16
var entryDate = new Array(varLength)
var entryContent = new Array(varLength)

entryDate[0] = "1"
entryContent[0] = ""

entryDate[1] = " 2"
entryContent[1] = ""

entryDate[2] = " 3"
entryContent[2] = ""

entryDate[3] = " 4"
entryContent[3] = ""

entryDate[4] = " 5"
entryContent[4] = ""

entryDate[5] = " 6"
entryContent[5] = ""

entryDate[6] = " 76"
entryContent[6] = ""

entryDate[7] = " 8"
entryContent[7] = ""

entryDate[8] = " 9"
entryContent[8] = ""

entryDate[9] = " 0"
entryContent[9] = ""

entryDate[10] = " random"
entryContent[10] = ""

entryDate[11] = " random"
entryContent[11] = ""

entryDate[12] = " random"
entryContent[12] = ""

entryDate[13] = " random"
entryContent[13] = ""

entryDate[14] = " random"
entryContent[14] = ""

entryDate[15] = " random"
entryContent[15] = ""

if (typeof display == "undefined") { var display = "date" }

if (display == "random")
{
  var randomNumber = Math.random()
  randomNumber *= varLength
  randomNumber = parseInt(randomNumber)
  if(isNaN(randomNumber)) randomNumber = 0
  else randomNumber %= varLength
  selectedContent = entryContent[randomNumber]
}
else
{
  for (x=0; x<(entryContent.length); x++)
  {
    tempDate = new Date(entryDate[x])
    tempContent = entryContent[x]
    if ((tempDate <= today) && (tempDate > selectedDate))
    {
      selectedContent = tempContent
      selectDate = tempDate
    }
  }
}

document.write (selectedContent)