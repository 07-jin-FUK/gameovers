<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Why Fight?｜選択画面</title>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <style>
        body {
            background-color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            overflow: hidden;
            font-family: 'Press Start 2P', cursive;
            position: relative;
        }

        .selection-container {
            border: 2px solid white;
            border-radius: 15px;
            padding: 12px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .selection {
            display: flex;
            align-items: center;
            margin: 10px 0;
            cursor: pointer;
        }

        .selection img {
            height: 36px;
            width: auto;
        }

        .cursor {
            visibility: hidden;
            height: 36px;
            width: auto;
        }

        .selection:hover .cursor {
            visibility: visible;
            animation: cursorBlink 1s infinite;
        }

        @keyframes cursorBlink {
            0% {
                opacity: 1;
            }

            50% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }

        .logout {
            position: absolute;
            top: 20px;
            right: 20px;
            cursor: pointer;
            background-color: black; /* 背景を黒にして白い部分を隠す */
        }

        .logout img {
            width: 100px;
            /* 適宜調整してください */
        }

        .logout form {
            margin: 0;
            padding: 0;
        }

        .logout-button {
            border: none;
            background: none;
            padding: 0;
        }
    </style>
</head>

<body>
    <div class="logout">
        <form action="{{ route('logout') }}" method="POST">
            @csrf
            <button type="submit" class="logout-button" data-sound-hover="{{ asset('sounds/hover.mp3') }}"
                data-sound-click="{{ asset('sounds/click.mp3') }}">
                <img src="{{ asset('images/text-logout.png') }}" alt="ログアウト">
            </button>
        </form>
    </div>

    <div class="selection-container">
        <div class="selection" data-sound-hover="{{ asset('sounds/hover.mp3') }}" data-sound-click="{{ asset('sounds/click.mp3') }}">
            <img src="{{ asset('images/text-cursor.png') }}" alt="カーソル" class="cursor">
            <img src="{{ asset('images/head-select.png') }}" alt="head">
        </div>
        <div class="selection" data-sound-hover="{{ asset('sounds/hover.mp3') }}" data-sound-click="{{ asset('sounds/click.mp3') }}">
            <img src="{{ asset('images/text-cursor.png') }}" alt="カーソル" class="cursor">
            <img src="{{ asset('images/body-select.png') }}" alt="body">
        </div>
    </div>

    <audio id="hover-sound" src="{{ asset('sounds/hover.mp3') }}" preload="auto"></audio>
    <audio id="click-sound" src="{{ asset('sounds/click.mp3') }}" preload="auto"></audio>

    <script>
        document.querySelectorAll('.selection').forEach(item => {
            const hoverSound = document.getElementById('hover-sound');
            const clickSound = document.getElementById('click-sound');

            item.addEventListener('mouseover', function () {
                hoverSound.currentTime = 0;
                hoverSound.play();
            });

            item.addEventListener('click', function () {
                clickSound.currentTime = 0;
                clickSound.play();
            });
        });

        document.querySelectorAll('.logout-button').forEach(item => {
            const hoverSound = document.getElementById('hover-sound');
            const clickSound = document.getElementById('click-sound');

            item.addEventListener('mouseover', function () {
                hoverSound.currentTime = 0;
                hoverSound.play();
            });

            item.addEventListener('click', function () {
                clickSound.currentTime = 0;
                clickSound.play();
            });
        });
    </script>

</body>

</html>
