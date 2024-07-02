<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Why Fight?｜ホーム</title>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <style>
        body {
            background-color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 100vh;
            margin: 0;
            overflow: hidden;
            font-family: 'Press Start 2P', cursive;
        }

        .logo {
            width: 720px;
            margin-bottom: 60px;
        }

        .menu {
            margin-top: 20px;
            text-align: left;
            border: 2px solid white;
            border-radius: 15px;
            padding: 20px;
            width: 200px;
        }

        .title-cursor {
            display: flex;
            align-items: center;
            margin: 10px 0;
            cursor: pointer;
            width: 40px;
        }

        .title-cursor img {
            height: 36px;
            width: auto;
        }

        .cursor {
            visibility: hidden;
            height: 36px;
            width: auto;
            margin-right: 10px;
        }

        .title-cursor:hover .cursor {
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

        .copyright {
            display: block;
            width: 240px;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <img src="{{ asset('images/logo.png') }}" alt="ロゴ" class="logo">

    <div id="menu" class="menu">
        <a href="{{ route('login') }}" class="title-cursor" data-sound-hover="{{ asset('sounds/hover.mp3') }}"
            data-sound-click="{{ asset('sounds/click.mp3') }}">
            <img src="{{ asset('images/text-cursor.png') }}" alt="カーソル" class="cursor">
            <img src="{{ asset('images/text-login.png') }}" alt="ログインする">
        </a>
        <a href="{{ route('register') }}" class="title-cursor" data-sound-hover="{{ asset('sounds/hover.mp3') }}"
            data-sound-click="{{ asset('sounds/click.mp3') }}">
            <img src="{{ asset('images/text-cursor.png') }}" alt="カーソル" class="cursor">
            <img src="{{ asset('images/text-signup.png') }}" alt="とうろくする">
        </a>
    </div>

    <img src="{{ asset('images/copyright.png') }}" alt="著作権" class="copyright">

    <audio id="hover-sound" src="{{ asset('sounds/hover.mp3') }}" preload="auto"></audio>
    <audio id="click-sound" src="{{ asset('sounds/click.mp3') }}" preload="auto"></audio>
    <audio id="bgm" src="{{ asset('sounds/title-bgm.mp3') }}" preload="auto" loop></audio>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const bgm = document.getElementById('bgm');
            bgm.volume = 0.8;
            bgm.play().catch(function (error) {
                console.log('BGM auto-play failed:', error);
            });
        });

        document.querySelectorAll('.title-cursor').forEach(item => {
            const hoverSound = document.getElementById('hover-sound');
            const clickSound = document.getElementById('click-sound');

            item.addEventListener('mouseover', function () {
                hoverSound.currentTime = 0;
                hoverSound.play();
            });

            item.addEventListener('click', async function (event) {
                event.preventDefault();
                clickSound.currentTime = 0;
                clickSound.play();

                setTimeout(() => {
                    window.location.href = this.getAttribute('href');
                }, 200); // サウンド再生後に遅延させて遷移
            });
        });
    </script>
</body>

</html>
        