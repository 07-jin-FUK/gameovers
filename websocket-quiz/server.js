const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const wsPort = 8081;
const httpPort = 8080;

const wss = new WebSocket.Server({ port: wsPort });

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/reset') {
        resetGame();
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Game reset');
    } else {
        let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
        let extname = String(path.extname(filePath)).toLowerCase();
        let mimeTypes = {
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf',
            '.svg': 'application/image/svg+xml'
        };

        let contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    fs.readFile('./404.html', (error, content) => {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    });
                } else {
                    res.writeHead(500);
                    res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                    res.end();
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

server.listen(httpPort, () => {
    console.log(`HTTP server is listening on port ${httpPort}`);
});

let clients = [];
let connectedUsers = new Map();
let userHP = new Map();
let readyForNextQuestion = new Set();
const questions = [
    { question: "What's the capital of France?", answer: "Paris" },
    { question: "What's 2 + 2?", answer: "4" },
    { question: "What's the capital of Japan?", answer: "Tokyo" },
    { question: "What's 3 x 3?", answer: "9" },
    { question: "What's the color of the sky?", answer: "Blue" },
    { question: "What's the capital of Germany?", answer: "Berlin" },
    { question: "What's 5 + 7?", answer: "12" },
    { question: "What's the capital of Italy?", answer: "Rome" },
    { question: "What's 6 x 6?", answer: "36" }
];
const maxHP = 5;
let quizActive = false;
let currentQuestionIndex = 0;
let askedQuestions = new Set();

wss.on('connection', ws => {
    clients.push(ws);
    console.log('New client connected');

    ws.on('message', message => {
        const parsedMessage = JSON.parse(message);
        console.log('Received message:', parsedMessage);

        if (parsedMessage.type === 'register') {
            let user = parsedMessage.user;
            let tabId = parsedMessage.tabId;

            if (!connectedUsers.has(user)) {
                connectedUsers.set(user, {});
            }

            connectedUsers.get(user)[tabId] = ws;
            userHP.set(user, maxHP);
            console.log(`User registered: ${user} (tab: ${tabId})`);
            console.log('Connected users:', Array.from(connectedUsers.entries()));

            if (Array.from(connectedUsers.values()).flatMap(userTabs => Object.values(userTabs)).length >= 2 && !quizActive) {
                console.log('Notifying clients to start quiz');
                quizActive = true;
                clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'readyToStart', scores: Array.from(connectedUsers.entries()), hp: Array.from(userHP.entries()) }));
                    }
                });

                setTimeout(() => {
                    sendQuestion();
                }, 5000);
            }
        } else if (parsedMessage.type === 'answer' && quizActive) {
            console.log(`Received answer from ${parsedMessage.user}: ${parsedMessage.answer}`);

            let result = {
                user: parsedMessage.user,
                answer: parsedMessage.answer,
                correct: false,
            };

            if (parsedMessage.answer.toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
                result.correct = true;
                let currentScore = connectedUsers.get(parsedMessage.user);
                connectedUsers.set(parsedMessage.user, currentScore + 1);
                console.log(`${parsedMessage.user} scored! Current score: ${currentScore + 1}`);

                for (let [user, hp] of userHP.entries()) {
                    if (user !== parsedMessage.user) {
                        userHP.set(user, hp - 1);
                        console.log(`${user}'s HP decreased to ${hp - 1}`);
                        if (hp - 1 <= 0) {
                            quizActive = false;
                            console.log(`${parsedMessage.user} has won the game!`);
                            result.winner = true;

                            clients.forEach(client => {
                                if (client.readyState === WebSocket.OPEN) {
                                    client.send(JSON.stringify({ type: 'endGame', winner: `${parsedMessage.user} WIN!!`, hp: Array.from(userHP.entries()) }));
                                }
                            });

                            resetGame();
                            break;
                        }
                    }
                }

                result.scores = Array.from(connectedUsers.entries());
                result.hp = Array.from(userHP.entries());

                clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'updateScores', scores: result.scores, hp: result.hp }));
                    }
                });
            }

            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'answer', ...result }));
                }
            });

            if (result.correct && quizActive) {
                clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'showNextButton' }));
                    }
                });
            }
        } else if (parsedMessage.type === 'readyForNextQuestion' && quizActive) {
            readyForNextQuestion.add(parsedMessage.user);
            if (readyForNextQuestion.size === connectedUsers.size) {
                readyForNextQuestion.clear();
                clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'startNextQuiz' }));
                    }
                });
                setTimeout(() => {
                    sendQuestion();
                }, 5000);
            }
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'waitingForNext', usersReady: Array.from(readyForNextQuestion) }));
                }
            });
        }
    });

    ws.on('close', () => {
        let disconnectedUser;
        let disconnectedTabId;

        for (let [user, tabs] of connectedUsers.entries()) {
            for (let [tabId, client] of Object.entries(tabs)) {
                if (client === ws) {
                    disconnectedUser = user;
                    disconnectedTabId = tabId;
                    delete connectedUsers.get(user)[tabId];
                    if (Object.keys(connectedUsers.get(user)).length === 0) {
                        connectedUsers.delete(user);
                        userHP.delete(user);
                    }
                    break;
                }
            }
        }
        readyForNextQuestion.delete(disconnectedUser);
        clients = clients.filter(client => client !== ws);
        console.log(`Client disconnected: ${disconnectedUser} (tab: ${disconnectedTabId})`);

        if (disconnectedUser && !quizActive) {
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'userDisconnected', user: disconnectedUser }));
                }
            });
        }
    });
});

function sendQuestion() {
    let availableQuestions = questions.filter((_, index) => !askedQuestions.has(index));
    if (availableQuestions.length === 0) {
        console.log('All questions have been asked.');
        resetGame();
        return;
    }
    let newQuestionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestionIndex = questions.indexOf(availableQuestions[newQuestionIndex]);
    askedQuestions.add(currentQuestionIndex);

    const question = questions[currentQuestionIndex];
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'startQuiz', question: question.question }));
        }
    });
}

function resetGame() {
    connectedUsers.clear();
    userHP.clear();
    readyForNextQuestion.clear();
    askedQuestions.clear();
    currentQuestionIndex = 0;
    quizActive = false;
}

console.log(`WebSocket server is running on ws://localhost:${wsPort}`);
console.log(`HTTP server is listening on port ${httpPort}`);
