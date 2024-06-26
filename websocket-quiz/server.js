const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

let clients = [];
let connectedUsers = new Map(); // ユーザーとスコアを管理するMap
let userHP = new Map(); // ユーザーとHPを管理するMap
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
const maxHP = 5; // 最大HP
let quizActive = false;
let currentQuestionIndex = 0;
let askedQuestions = new Set(); // 出題済みの問題をトラッキング

wss.on('connection', ws => {
    clients.push(ws);
    console.log('New client connected');

    ws.on('message', message => {
        const parsedMessage = JSON.parse(message);
        console.log('Received message:', parsedMessage);

        if (parsedMessage.type === 'register') {
            // ユーザーが既に登録されている場合はスコアとHPをリセット
            if (connectedUsers.has(parsedMessage.user)) {
                connectedUsers.delete(parsedMessage.user);
                userHP.delete(parsedMessage.user);
            }

            connectedUsers.set(parsedMessage.user, 0); // 新しいユーザーをスコア0で登録
            userHP.set(parsedMessage.user, maxHP); // 新しいユーザーをHP5で登録
            console.log(`User registered: ${parsedMessage.user}`);
            console.log('Connected users:', Array.from(connectedUsers.keys()));

            if (connectedUsers.size >= 2 && !quizActive) {
                console.log('Notifying clients to start quiz');
                quizActive = true;
                const initialScores = Array.from(connectedUsers.entries());
                const initialHP = Array.from(userHP.entries());
                clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'readyToStart', initialScores, initialHP }));
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
                connectedUsers.set(parsedMessage.user, currentScore + 1); // スコアを更新
                console.log(`${parsedMessage.user} scored! Current score: ${currentScore + 1}`);

                // 相手のHPを減らす
                for (let [user, hp] of userHP.entries()) {
                    if (user !== parsedMessage.user) {
                        userHP.set(user, hp - 1);
                        console.log(`${user}'s HP decreased to ${hp - 1}`);
                        if (hp - 1 <= 0) {
                            quizActive = false;
                            console.log(`${parsedMessage.user} has won the game!`);
                            result.winner = true; // 勝者を示すフラグを追加

                            // 勝者を通知し、ゲームを終了
                            clients.forEach(client => {
                                if (client.readyState === WebSocket.OPEN) {
                                    client.send(JSON.stringify({ type: 'endGame', winner: `${parsedMessage.user} WIN!!`, hp: Array.from(userHP.entries()) }));
                                }
                            });

                            // ゲーム終了後にリセット
                            resetGame();
                            break;
                        }
                    }
                }

                result.scores = Array.from(connectedUsers.entries()); // スコア更新後に送信
                result.hp = Array.from(userHP.entries()); // HP更新後に送信

                // スコア更新をクライアントに送信
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

            // 問題が終了した場合、次の問題を始めるボタンを表示
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
                        client.send(JSON.stringify({ type: 'startNextQuiz' })); // 次のクイズ開始のカウントダウンを指示
                    }
                });
                setTimeout(() => {
                    sendQuestion();
                }, 5000); // 5秒後に次の問題を開始
            }
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'waitingForNext', usersReady: Array.from(readyForNextQuestion) }));
                }
            });
        }
    });

    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
        console.log('Client disconnected');
    });
});

function sendQuestion() {
    // 新しい質問を見つける
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
    // ゲームのリセット、ユーザーのスコアもクリアする
    connectedUsers.clear();
    userHP.clear();
    readyForNextQuestion.clear();
    askedQuestions.clear(); // 出題済みの問題リストをクリア
    currentQuestionIndex = 0;
    quizActive = false;
}

console.log('WebSocket server is running on ws://localhost:8081');