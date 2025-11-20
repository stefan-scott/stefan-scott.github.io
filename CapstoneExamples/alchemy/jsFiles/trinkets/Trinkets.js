// manages initial weapons, foods, items
// has an over-archin TRINKETS class
// Inventory items managament is separate

let weaponList = [];
let foodList = [];
let itemList = [];
// Parameters:
// [ 'WeaponName', [image], 'ToolTip', initX, initY, Set#, subSet_ifNotExist=0, offSet#_ifNotExist=0, found=boolean, useBattle() ]
// [ 'FoodName', [image], 'ToolTip', initX, initY, Set#, subSet_ifNotExist=0, offSet#_ifNotExist=0, found=boolean, useEat() ]
// [ 'Items', [image], 'ToolTip', initX, initY, Set#, subSet_ifNotExist=0, offSet#_ifNotExist=0, found=boolean, [if food = useEat() || useMake()] ]




function trnkSetup() {
  if (!gameSaved) {
    // setup()
    // the weapons
    weaponList.push(new Weapon('Sword', loadImage('/assets/images/trinkets/weapons/sword.png'), 'You can stab', width - width / 12, height - height / 12, 1, 1, 5));
    weaponList.push(new Weapon('Shield', loadImage('/assets/images/trinkets/weapons/shield.png'), 'You can shield', width / 7, height - height / 12, 2, 1, 5));

    // the food
    foodList.push(new Food('Food', loadImage('/assets/images/trinkets/food/mushroom.png'), 'Mushroom', width - width / 2.5, height - height / 4.5, 1, 1));
    foodList.push(new Food('Food', loadImage('/assets/images/trinkets/food/blueberry.png'), 'Blueberry', width - width / 6, height - height / 3, 2, 0));
    foodList.push(new Food('Food', loadImage('/assets/images/trinkets/food/watermelon.png'), 'Watermelon', width / 6, height / 6, 2, 0));

    // the items (needed for potions) --- can be food too
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/eyeball.png'), 'Eyeball', width / 3, height - height / 6, 1, 0));
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/honey.png'), 'Honey', width - width / 6, height / 6, 1, 0));
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/bat.png'), 'Bat', width / 3, height / 6, 1, 1));
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/bone.png'), 'Bone', width / 2.25, height - height / 4.5, 1, 1));
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/dust.png'), 'Dust', width / 4, height - height / 4.5, 1, 1));
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/hibiscus.png'), 'Hibiscus', width / 6, height - height / 3, 2, 0));
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/echinacea.png'), 'Echinacea', width / 6, height / 3 - 20, 2, 0));
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/clover.png'), 'Clover', width / 3, height / 3, 2, 0));
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/mushroom.png'), 'Mushroom', width / 3 + 20, height - height / 3, 2, 1));
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/shard.png'), 'Shard', width / 2 - 20, height / 2 + 20, 2, 1));
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/Rice.png'), 'Rice', width / 3, height - height / 4, 2, 2));
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/newt.png'), 'Newt', width - width / 2.5, height / 2 - 20, 2, 2));
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/iron.png'), 'Iron', width / 2, height - height / 6, 3, 0));
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/blood.png'), 'Blood', width / 3, height - height / 3, 3, 0));
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/gold.png'), 'Gold', width - width / 5, height - height / 3 - 25, 3, 1));
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/wood.png'), 'Wood', width / 9, height - height / 6, 3, 1));
    itemList.push(new Item('Item', loadImage('/assets/images/trinkets/items/gold.png'), 'Gold', width - width / 5, height - height / 3 - 25, 3, 1));
  }
  else {
    // if game was saved
    weaponList = saved.get(weaponList);
    foodList = saved.get(foodList);
    itemList = saved.get(itemList);
  }
}

function trinketsCon() {
  // draw()
  if (potionInitiated) return;
  for (let i = 0; i < weaponList.length; i++) {
    weaponList[i].display(weaponList[i]);
  }
  for (let i = 0; i < foodList.length; i++) {
    foodList[i].display(foodList[i]);
  }
  for (let i = 0; i < itemList.length; i++) {
    itemList[i].manage(itemList[i]);
  }
}

function trnkPressed() {
  // mousePressed()
  // manages clicking on things
  if (potionInitiated) return;
  for (let i = 0; i < weaponList.length; i++) {
    weaponList[i].click(weaponList, i);
  }
  for (let i = 0; i < foodList.length; i++) {
    foodList[i].click(foodList, i);
  }
  for (let i = 0; i < itemList.length; i++) {
    itemList[i].click(itemList, i);
  }
}



class Trinkets {
  constructor(name, img, tooltip, initX, initY, setNum, subSetNum, effect) {
    this.name = name;
    this.img = img;
    this.tooltip = tooltip;
    this.initX = initX;
    this.initY = initY;
    this.setNum = setNum;
    this.subSetNum = subSetNum;
    this.found = false;
    this.effect = effect;
  }

  display() {
    // display only if it matched set and subset
    imageMode(CENTER);
    tint('grey')
    if (!this.found && currentSet === this.setNum && currentSubSet === this.subSetNum) {
      if (this.subSetNum === 0 && battleState && monsterList[currentSet - 1].defeated) {
        image(this.img, this.initX, this.initY, 40, 40);
      }
      else if (this.subSetNum !== 0) {
        image(this.img, this.initX, this.initY, 40, 40);
      }
    }
    noTint();

  }

  foundItem(arrayName, index) {
    //adds to inv and removes from list
    this.found = true;
    inv.add(arrayName[index]);
    arrayName.splice(index, 1);
  }

  click(arrayName, index) {
    // helps check for clicking based on set, subset, and mousePosition
    if (this.found === false) {
      if (this.setNum === currentSet && this.subSetNum === currentSubSet) {
        if (set[currentSet][currentSubSet][1] === false) return;
        if (mouseX < this.initX + 20 && mouseX > this.initX - 20) {
          if (mouseY < this.initY + 20 && mouseY > this.initY - 20) {
            this.foundItem(arrayName, index);
          }
        }
      }
    }
  }

  used() {
    this.effect();
  }
}


//+++++++++++++++++++++++++++++++++++++++++++
//  The self-explanatory child classes
// ++++++++++++++++++++++++++++++++++++++++++

class Weapon extends Trinkets {
  constructor(name, img, tooltip, initX, initY, setNum, subSetNum, value) {
    super(name, img, tooltip, initX, initY, setNum, subSetNum, strike)
    this.value = value;
  }
}


class Food extends Trinkets {
  constructor(name, img, tooltip, initX, initY, setNum, subSetNum) {
    super(name, img, tooltip, initX, initY, setNum, subSetNum, eat);
  }
  used() {
    effectTimer = 120;
    this.effect(this.tooltip); //sending tooltip for visual aid
  }
}


class Item extends Trinkets {
  constructor(name, img, tooltip, initX, initY, setNum, subSetNum) {
    super(name, img, tooltip, initX, initY, setNum, subSetNum, eat);
    effectTimer = 120;
    this.effectPotion = throwInPotTEXTONLY;
  }

  used() {
    //eat or use in potion
    effectTimer = 120;
    if (potionInitiated) {
      this.effectPotion(this.tooltip);
      craftScreen.updateList(this.tooltip);
    } else {
      this.effect(this.tooltip);  //sending tooltip for visual aid
    }
  }

  manage() {
    this.display();
  }
}