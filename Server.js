// server.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Calculator class
class UpgradeCalculator {
  solve(x) {
    let ans = 0;
    if (x <= 1000) {
      x = x - 50;
      let curr = Math.floor(x / 25);
      ans = (curr * (curr + 1)) / 2;
    } else {
      x = x - 1000;
      let curr = Math.floor(x / 50) + 38;
      ans = (curr * (curr + 1)) / 2;
    }
    return ans;
  }

  calculate(initialCapacity, finalCapacity) {
    const tools = this.solve(finalCapacity) - this.solve(initialCapacity);
    const setsNeeded = (tools * 3 / 89).toFixed(2);
    return { tools, setsNeeded };
  }
}

// Routes
app.get('/', (req, res) => {
  res.render('index', { result: null, error: null });
});

app.post('/calculate', (req, res) => {
  const initialCapacity = parseInt(req.body.initialCapacity);
  const finalCapacity = parseInt(req.body.finalCapacity);
  
  if (isNaN(initialCapacity) || isNaN(finalCapacity)) {
    return res.render('index', { 
      result: null, 
      error: "Please provide valid numbers for initial and final capacity."
    });
  }

  if (finalCapacity > 25000) {
    return res.render('index', {
      result: null,
      error: "Final capacity cannot exceed 25000."
    });
  }

  if (initialCapacity >= finalCapacity) {
    return res.render('index', {
      result: null,
      error: "Initial capacity must be less than final capacity."
    });
  }

  const calculator = new UpgradeCalculator();
  const result = calculator.calculate(initialCapacity, finalCapacity);
  
  res.render('index', { result, error: null });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
