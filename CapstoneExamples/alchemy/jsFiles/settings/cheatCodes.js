// Last minute cheat-codes
// I decided not to put a password in after all
// It was going to be RICKASTLEY
// Yes, Mr Scott. I know...
// I lost my last chance to rickroll you

function cheatsTried() {
    //Get Everything    A
    if (keyCode === 65) {
        for (let i of weaponList) {
            invItems.push(i);
        }
        for (let i of foodList) {
            invItems.push(i);
        }
        for (let i of itemList) {
            invItems.push(i);
        }
        for (let i of potionsList) {
            invItems.push(i);
        }
        for (let i of pagesContent) {
            splbkItems.push(i);
        }
        weaponList = [];
        foodList = [];
        itemList = [];
        pagesContent = [];
        pagesList = [];
        potionsList = [];
    }

    // Spells   S
    if (keyCode === 83) {
        for (let i of pagesContent) {
            splbkItems.push(i);
        }
        pagesContent = [];
        pagesList = [];
    }

    // Items    I
    if (keyCode === 73) {
        for (let i of weaponList) {
            invItems.push(i);
        }
        for (let i of foodList) {
            invItems.push(i);
        }
        for (let i of itemList) {
            invItems.push(i);
        }
        weaponList = [];
        foodList = [];
        itemList = [];
    }

    // Potions  P
    if (keyCode === 80) {
        for (let i of potionsList) {
            invItems.push(i);
        }
        pagesContent = [];
        potionsList = [];
    }

    // Subsets
    if (keyCode === 81) {   //Q
        currentSet = 1;
        currentSubSet = 1;
    }
    else if (keyCode === 87) {  //87
        currentSet = 2;
        currentSubSet = 1;
    }
    else if (keyCode === 82) {  //R
        currentSet = 2;
        currentSubSet = 2;
    }
    else if (keyCode === 84) {  //T
        currentSet = 3;
        currentSubSet = 1;
    }
    else if (keyCode === 89) {  //Y
        currentSet = 3;
        currentSubSet = 2;
    }
    else if (keyCode === 85) {  //U
        currentSet = 3;
        currentSubSet = 3;
    }


    // Endings
    if (keyCode === 90) {   //Z
        currentSet = 1;
        monsterList[currentSet - 1].defeated = false;
        endingInProgress = true;
        ending = 1;
    }
    else if (keyCode === 88) {  //X
        currentSet = 2;
        monsterList[currentSet - 1].defeated = false;
        endingInProgress = true;
        ending = 2;
    }
    else if (keyCode === 67) {  //C
        currentSet = 3;
        monsterList[currentSet - 1].defeated = false;
        endingInProgress = true;
        ending = 3;
    }
    else if (keyCode === 86) {  //V
        char.health = 0;
        starved = true;
        endingInProgress = true;
        ending = 4;
    }
    else if (keyCode === 66) {  //B
        currentSet = 3;
        currentSubSet = 3;
        endingInProgress = true;
        ending = 5;
    }
    else if (keyCode === 78) {  //N
        drankMemorySpell = true;
        endingInProgress = true;
        ending = 6;
    }


}

