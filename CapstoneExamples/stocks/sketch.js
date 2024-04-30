let score = 0;
let balance = 10000;
let stockPrice = 100;
let stocksOwned = 0;
let buyButton, sellButton;
let currentPage = 'Home'; // Initial page


class Stock {
  constructor(name, initialPrice, volatility) {
    this.name = name;
    this.price = initialPrice;
    this.history = [];
    this.volatility = volatility;
    this.dividendRate = Math.random(0.005, 0.03); // Random dividend rate between 0.5% and 3.0%
    this.dividendCounter = 0; // Counter to track when to pay dividends
  }


  updatePrice() {
    // Simulate a random walk model
    let randomChange = randomGaussian(0, this.volatility);
    /*
    The randomGaussian() function generates random numbers with a normal distribution.
    In statistics, a Gaussian distribution is also known as a bell curve.
    The randomGaussian() function takes two parameters: the mean (average) and the standard deviation.
    */
    this.price += randomChange;


    // Ensure the price doesn't go negative
    this.price = max(this.price, 0);


    // Store the current stock price in the history array
    this.history.push(this.price);


    // Trim the history array to keep only the last 30 values
    if (this.history.length > 30) {
      this.history.shift();
    }
    // Check if it's time to pay dividends
    if (this.dividendCounter >= 30) {
      // Calculate and pay dividends
      let totalValue = user.calculatePortfolioValue();
      let dividendAmount = totalValue * this.dividendRate;
      user.incrementBalance(dividendAmount);


      // Reset dividend counter and generate a new dividend rate
      this.dividendCounter = 0;
      this.dividendRate = random(0.005, 0.03);
    } else {
      this.dividendCounter++;
    }
  }


      drawGraph(x, y, width, height) {
    // Draw the stock price graph
    noFill();
    stroke(0, 0, 255);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let graphX = map(i, 0, this.history.length - 1, x, x + width);
      let graphY = map(this.history[i], min(this.history), max(this.history), y + height, y);
      vertex(graphX, graphY);
    }
    endShape();


    // Draw graph border
    noFill();
    stroke(200);
    strokeWeight(1);
    rect(x, y, width, height);


    // Display the latest change in stock value
    let latestChange = this.calculateLatestChange();
    let changeColor = latestChange >= 0 ? color(0, 200, 0) : color(255, 0, 0); // Darker green
    // The ternary operator is used here as a concise way to write an if-else statement in a single line.
    fill(changeColor);
    noStroke();
    textSize(12);
    textAlign(CENTER);
    text(`$${latestChange.toFixed(2)}`, x + width / 2, y - 5);
    // ${latestChange.toFixed(2)} is a placeholder for the formatted value of latestChange rounded to two decimal places
  }


  calculateLatestChange() {
    // Calculate the latest change in stock value
    if (this.history.length >= 2) {
      return this.history[this.history.length - 1] - this.history[this.history.length - 2];
    } else {
      return 0;
    }
  }
}




class Button {
  constructor(label, x, y, width, height, onClick) {
    this.label = label;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.onClick = onClick;
  }


    display() {
    fill(150);
    rect(this.x, this.y, this.width, this.height);
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(this.label, this.x + this.width / 2, this.y + this.height / 2);
  }


  isClicked(mouseX, mouseY) {
    return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
  }
}


class ClickerButton {
  constructor(label, x, y, width, height, onClick) {
    this.label = label;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.onClick = onClick;
  }


  display() {
    fill(150);
    rect(this.x, this.y, this.width, this.height);
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(this.label, this.x + this.width / 2, this.y + this.height / 2);
  }


  isClicked(mouseX, mouseY) {
    return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
  }
}




class User {
  constructor() {
    this.balance = 1000;
    this.holdings = [];
  }


  buyStock(stock, quantity) {
    let totalCost = stock.price * quantity;
    if (this.balance >= totalCost) {
      this.balance -= totalCost;
      if (!this.holdings.includes(stock)) {
        stock.quantity = 0;
        this.holdings.push(stock);
      }
      stock.quantity += quantity;
      return true; // Buy successful
    } else {
      return false; // Insufficient funds
    }
  }


  sellStock(stock, quantity) {
    if (stock.quantity >= quantity) {
      this.balance += stock.price * quantity;
      stock.quantity -= quantity;
      if (stock.quantity === 0) {
        this.holdings = this.holdings.filter((s) => s !== stock);
        /* Arrow function is used here since this function has only one statement,
        this allows me to omit the curly braces {} and the return keyword.
        The expression after the arrow (=>) is implicitly returned.
        */
      }
      return true; // Sell successful
    } else {
      return false; // Insufficient stocks to sell
    }
  }


  incrementBalance(amount) {
    this.balance += amount;
  }
 
  calculatePortfolioValue() {
    return this.holdings.reduce((total, stock) => total + stock.price * stock.quantity, 0);
  }
}




let marcedesBenc = new Stock("Marcedes-Benc", 100, 2);
let dmw = new Stock("DMW", 80, 3);
let mykrosofft = new Stock("Mykrosofft", 120, 2.5);
let tassla = new Stock("Tassla", 150, 4);
let amason = new Stock("Amason", 180, 5);
let bojieng = new Stock("Bojieng", 90, 2.2);


let stocks = [marcedesBenc, dmw, mykrosofft, tassla, amason, bojieng];
let user;


let buyButtons = [];
let sellButtons = [];
let portfolioButton;
let backButton;
let clickerButton;


let showPortfolioPage = false;


function setup() {
  createCanvas(windowWidth, windowHeight);
  user = new User();


  // Set interval for stock price updates (every day)
  setInterval(updateStockPrices, 1000); // 1000 milliseconds = 1 second


  // Initialize buttons
  for (let i = 0; i < stocks.length; i++) {
    let rowNum = floor(i / 2);
    let colNum = i % 2;


    let buyButtonX = 20 + colNum * (width / 2 + 20) + 150;
    let sellButtonX = 20 + colNum * (width / 2 + 20) + 60 + 5 + 150;
    let buttonY = 30 + rowNum * (height / 3) + (height / 3) - 20 - rowNum * 10;


    let buyButton = new Button("Buy", buyButtonX, buttonY, 60, 20, () => buyStockPrompt(stocks[i]));
    let sellButton = new Button("Sell", sellButtonX, buttonY, 60, 20, () => sellStockPrompt(stocks[i]));


    buyButtons.push(buyButton);
    sellButtons.push(sellButton);
  }


  // Initialize Portfolio button
  portfolioButton = new Button("Portfolio", width - 200, 20, 80, 30, () => showPortfolioPage = true);


  // Initialize Back button
  backButton = new Button("Back", width - 80 - 50, 20, 60, 30, () => showPortfolioPage = false);


  // Initialize Clicker button
  clickerButton = new ClickerButton("Click Me", width - 330, 120, 80, 30, () => user.incrementBalance(1));
}


function draw() {
  background(240); // Lighter background


  if (showPortfolioPage) {
    // Draw Portfolio page
    drawPortfolioPage();
  } else {
    // Draw stocks page
    drawStocksPage();
  }
}


function drawStocksPage() {
  // Display stock information and draw graphs with 2 stocks on each row
  let numRows = 3;
  let numCols = 2;
  let xOffset = 20 + 150; // Adjusted x-coordinate
  let yOffset = 30;


  let cellWidth = (width - (numCols + 1) * xOffset) / numCols;
  let cellHeight = (height - yOffset) / numRows;


  // Display user balance (moved outside the loop)
  textSize(14);
  fill(50);
  text(`User Balance: $${user.balance.toFixed(2)}`, xOffset, yOffset - 10);


  for (let i = 0; i < stocks.length; i++) {
    let rowNum = floor(i / numCols);
    let colNum = i % numCols;


    let stock = stocks[i];
   
    // Display stock information
    textSize(14); // Smaller text size
    fill(50); // Darker text color
    text(`${stock.name} Price: $${stock.price.toFixed(2)}`, xOffset + colNum * (cellWidth + xOffset), yOffset + rowNum * cellHeight + 15);


    // Draw stock price graph
    stock.drawGraph(
      xOffset + colNum * (cellWidth + xOffset),
      yOffset + 20 + rowNum * cellHeight,
      cellWidth,
      cellHeight - 20
    );


    // Draw Buy and Sell buttons
    buyButtons[i].display();
    sellButtons[i].display();
  }


  // Draw Portfolio button
  portfolioButton.display();
}


function drawPortfolioPage() {
  // Draw Portfolio information
  textSize(16);
  fill(50); // Darker text color
  text("Portfolio:", 20 + 150, 30); // Adjusted x-coordinate


  // Display user balance in Portfolio page
  textSize(14);
  fill(50);
  text(`User Balance: $${user.balance.toFixed(2)}`, width - 330, 80);


  // Use forEach to iterate over user holdings
  user.holdings.forEach((holding, i) => {
    // Display stock information and estimate dividend yield
    text(`${holding.name}: ${holding.quantity} stocks - Value: $${(holding.price * holding.quantity).toFixed(2)}`, 20 + 150, 90 + i * 30); // Adjusted x-coordinate


    // Calculate and display estimated dividend yield
    let stock = stocks.find(stock => stock.name === holding.name);
    let estimatedDividendYield = stock ? (stock.dividendRate * 100).toFixed(2) + "%" : "N/A";
    text(`Dividend Yield: ${estimatedDividendYield}`, 400, 90 + i * 30); // Adjusted x-coordinate
  });


  text(`Total Portfolio Value: $${user.calculatePortfolioValue().toFixed(2)}`, 20 + 150, height - 10); // Adjusted x-coordinate


  // Add a button to go back to the stocks page
  backButton.display();


 
  // Display clicker button
  clickerButton.display();
}


function mouseClicked() {
  // Check if Buy or Sell button is clicked
  for (let i = 0; i < stocks.length; i++) {
    if (buyButtons[i].isClicked(mouseX, mouseY)) {
      buyButtons[i].onClick();
    }


    if (sellButtons[i].isClicked(mouseX, mouseY)) {
      sellButtons[i].onClick();
    }
  }
 
  // Check if Clicker button is clicked
  if (clickerButton.isClicked(mouseX, mouseY)) {
    clickerButton.onClick();
  }


  // Check if Portfolio button is clicked
  if (portfolioButton.isClicked(mouseX, mouseY)) {
    showPortfolioPage = true;
  }


  // Check if Back button is clicked on the Portfolio page
  if (showPortfolioPage && backButton.isClicked(mouseX, mouseY)) {
    showPortfolioPage = false;
  }
}


function updateStockPrices() {
  // Update prices for all stocks
  for (let stock of stocks) {
    stock.updatePrice();
  }
}


function buyStockPrompt(stock) {
  let quantity = prompt(`Enter the quantity of ${stock.name} stocks you want to buy:`);
  quantity = parseInt(quantity);
  if (!isNaN(quantity) && quantity > 0) {
    //!isNaN checks if a value is not a NaN (Not-a-Number).
    user.buyStock(stock, quantity);
  }
}


function sellStockPrompt(stock) {
  let quantity = prompt(`Enter the quantity of ${stock.name} stocks you want to sell:`);
  quantity = parseInt(quantity);
  if (!isNaN(quantity) && quantity > 0) {
    user.sellStock(stock, quantity);
  }
}




