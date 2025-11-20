// File for the Pages
// Just displays and adds to spellbook


let pagesContent = [
    ['Health', ['Rice', 'Mushroom', 'Clover', 'Gold', 'Hibiscus']],
    ['Shield', ['Wood', 'Mushroom', 'Clover', 'Gold', 'Hibiscus']],
    ['Sword', ['Shard', 'Iron', 'Wood', 'Bone', 'Echinacea']],
    ['Memory', ['Clover', 'Mushroom', 'Iron', 'Honey', 'Bat', 'Dust']],
    ['Speed', ['Dust', 'Eyeball', 'Gold', 'chemical', 'Blood', 'Clover']],
]
// Parameters:
// [ 'Heading', 'Sequence of Ingredients', [image] ]

let pagesList = [];
// Parameters:
// [ 'SpellName', [Content], [image], initX, initY, Set#, subSet_ifNotExist=0, offSet#_ifNotExist=0, found=boolean, throwInPot() ]
//                 ^ this content is the only thing being inserted into splbkItems (to take up less space)




function pagePreLoad() {
    //preload()
    if (!gameSaved) {
        pagesContent[0].push((loadImage('/assets/images/splbk/healthSpell.png')));
        pagesContent[1].push((loadImage('/assets/images/splbk/shieldSpell.png')));
        pagesContent[2].push((loadImage('/assets/images/splbk/swordSpell.png')));
        pagesContent[3].push((loadImage('/assets/images/splbk/memorySpell.png')));
        pagesContent[4].push((loadImage('/assets/images/splbk/speedSpell.png')));
    }
}

function pageSetup() {
    // setup()
    if (!gameSaved) {
        pagesList.push(new Pages('Page', loadImage('/assets/images/trinkets/pages/page.png'), 'HeatlhSpell', 40, height - 10, 1, 1, pagesContent[0]));
        pagesList.push(new Pages('Page', loadImage('/assets/images/trinkets/pages/page.png'), 'ShieldSpell', width - width / 6, height - height / 6 + 20, 2, 1, pagesContent[1]));
        pagesList.push(new Pages('Page', loadImage('/assets/images/trinkets/pages/page.png'), 'SwordSpell', width / 6, height - height / 6 + 10, 2, 2, pagesContent[2]));
        pagesList.push(new Pages('Page', loadImage('/assets/images/trinkets/pages/page.png'), 'MemorySpell', width - width / 3 + 5, height - height / 4.5 + 5, 3, 1, pagesContent[3]));
        pagesList.push(new Pages('Page', loadImage('/assets/images/trinkets/pages/page.png'), 'SpeedSpell', width / 3 + 20, 2 * (height / 3), 3, 1, pagesContent[4]));
    }
    else {
        // retrive info if game saved
        pagesContent = saved.get(pagesContent);
        pagesList = saved.get(pagesList);
    }
}

function pageCon() {
    // draw()
    if (potionInitiated) return;
    for (let i = 0; i < pagesList.length; i++) {
        pagesList[i].display(pagesList[i]);
    }
}

function pagePressed() {
    // mousePressed()
    if (potionInitiated) return;

    // finding a page
    for (let i = 0; i < pagesList.length; i++) {
        pagesList[i].click(i);
    }
}



class Pages extends Trinkets {
    constructor(name, img, tooltip, initX, initY, setNum, subSetNum, content) {
        super(name, img, tooltip, initX, initY, setNum, subSetNum, nothing());
        this.content = content;
    }

    use() {
        // I don't want Trinket's use here
    }

    foundItem(index) {
        //add to spellbook - remove from list
        this.found = true;
        splbk.add(pagesContent[index]);
        pagesContent.splice(index, 1);
        pagesList.splice(index, 1);
    }
}
