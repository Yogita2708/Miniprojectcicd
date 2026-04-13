const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const questions = [
    "Do you prefer one-on-one conversations over group activities?",
    "Do you often prefer to express yourself in writing?",
    "Do you feel drained after being out and about?",
    "Do you enjoy solitude?"
];

app.get('/', (req, res) => {
    res.send(`
        <body style="font-family:sans-serif; text-align:center; padding-top:50px;">
            <h1>Personality Quiz</h1>
            <form action="/quiz" method="POST">
                <input type="text" name="userName" placeholder="Enter your name" required style="padding:10px;">
                <button type="submit" style="padding:10px; cursor:pointer;">Start Quiz</button>
            </form>
        </body>
    `);
});

app.post('/quiz', (req, res) => {
    const name = req.body.userName;
    let quizHtml = `<body style="font-family:sans-serif; text-align:center;"><h1>Hi ${name}, answer these:</h1><form action="/result" method="POST">`;
    questions.forEach((q, index) => {
        quizHtml += `<p>${q}</p>
                     <input type="radio" name="q${index}" value="yes" required> Yes
                     <input type="radio" name="q${index}" value="no"> No<br>`;
    });
    quizHtml += `<br><button type="submit" style="padding:10px;">Get Result</button></form></body>`;
    res.send(quizHtml);
});

app.post('/result', (req, res) => {
    const answers = Object.values(req.body);
    const yesCount = answers.filter(a => a === 'yes').length;
    const result = yesCount >= 3 ? "Introvert" : "Extrovert";
    res.send(`
        <body style="font-family:sans-serif; text-align:center; padding-top:50px;">
            <h1>Your Result</h1>
            <p style="font-size:24px;">You are an: <strong>${result}</strong></p>
            <a href="/">Try Again</a>
        </body>
    `);
});

app.listen(2700, () => console.log('Quiz app live on http://localhost:2700'));