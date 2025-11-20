// The file that saves/loads/restarts the game
// this is a very rudimentary and unorganized file

let gameSaved = false;

// Holds the info that needs to be saved
let saved = new Map ([  
    ['battleState',         battleState],
    ['battleSets',          battleSets],
    ['monsterList',         monsterList],

    ['dialogues',           dialogues],
    ['set',                 set],
    ['setLeft',             setLeft],
    ['currentSet',          currentSet],
    ['currentSubSet',       currentSubSet],

    ['volumeChosen',        volumeChosen],

    ['invItems',            invItems],
    ['weaponList',          weaponList], 
    ['foodList',            foodList],
    ['itemList',            itemList],

    ['splbkItems',          splbkItems],

    ['potionInitiated',     potionInitiated],
    ['itemSequence',        itemSequence],
    ['potionsList',         potionsList],
    ['pagesContent',        pagesContent],
    ['pagesList',           pagesList],

    ['char',                char],

    ['showedInstructions',  showedInstructions],

    ['gameSaved',        true]
])



function saveGame() {
    // save game to localStorage upon 'Save and Exit' (Settings)
    for (let [key, value] of saved) {
        localStorage.setItem(key, value);
    }
}


function restartGame() {
    // restarts game by erasing everything
    gameSaved = false;
    for (let [key, value] of saved) {
        localStorage.removeItem(key);
    }
    location.reload();
}

function loadGame() {
    // called by setup() and 'Start/contine' (Homescreen).
    // Pulls all info (if any) from localStorage
    for (let [key, value] of saved) {
        if (localStorage.getItem(key) !== null) {
            saved.set(key, localStorage.getItem(key));
        }
    }
    gameSaved = saved.get(gameSaved);
}