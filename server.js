const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Home route - GET request
app.get('/', (req, res) => {
    res.status(200).send("Hello world!");
});

// Function to check for overflow, underflow, and invalid data types
const validateInput = (num1, num2) => {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return { status: "error", message: "Invalid data types" };
    }
    if (num1 > 1e6 || num2 > 1e6) {
        return { status: "error", message: "Overflow" };
    }
    if (num1 < -1e6 || num2 < -1e6) {
        return { status: "error", message: "Underflow" };
    }
    return null;
};

// Addition route - POST request
app.post('/add', (req, res) => {
    const { num1, num2 } = req.body;

    const error = validateInput(num1, num2);
    if (error) return res.status(400).json(error);

    const sum = num1 + num2;
    if (sum > 1e6) return res.status(400).json({ status: "error", message: "Overflow" });
    if (sum < -1e6) return res.status(400).json({ status: "error", message: "Underflow" });

    res.status(200).json({
        status: "success",
        message: "the sum of given two numbers",
        sum: sum
    });
});

// Subtraction route - POST request
app.post('/sub', (req, res) => {
    const { num1, num2 } = req.body;

    const error = validateInput(num1, num2);
    if (error) return res.status(400).json(error);

    const difference = num1 - num2;
    if (difference > 1e6) return res.status(400).json({ status: "error", message: "Overflow" });
    if (difference < -1e6) return res.status(400).json({ status: "error", message: "Underflow" });

    res.status(200).json({
        status: "success",
        message: "the difference of given two numbers",
        difference: difference
    });
});

// Multiplication route - POST request
app.post('/multiply', (req, res) => {
    const { num1, num2 } = req.body;

    const error = validateInput(num1, num2);
    if (error) return res.status(400).json(error);

    const product = num1 * num2;
    if (product > 1e6) return res.status(400).json({ status: "error", message: "Overflow" });
    if (product < -1e6) return res.status(400).json({ status: "error", message: "Underflow" });

    res.status(200).json({
        status: "success",
        message: "The product of given numbers",
        result: product
    });
});

// Division route - POST request
app.post('/divide', (req, res) => {
    const { num1, num2 } = req.body;

    const error = validateInput(num1, num2);
    if (error) return res.status(400).json(error);

    if (num2 === 0) {
        return res.status(400).json({
            status: "error",
            message: "Cannot divide by zero"
        });
    }

    const result = num1 / num2;
    if (result > 1e6) return res.status(400).json({ status: "error", message: "Overflow" });
    if (result < -1e6) return res.status(400).json({ status: "error", message: "Underflow" });

    res.status(200).json({
        status: "success",
        message: "The division of given numbers",
        result: result
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Calculator API listening at http://localhost:${port}`);
});
