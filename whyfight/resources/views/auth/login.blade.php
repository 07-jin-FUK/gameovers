<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Why Fight?｜ログイン</title>
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
            margin-bottom: 80px;
        }

        form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 20px;
        }

        .label-img {
            height: 38px;
            margin-bottom: 10px;
        }

        .password-img {
            height: 36px;
            margin-bottom: 10px;
        }

        .input-field {
            margin: 10px 0;
            padding: 10px;
            width: 300px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }

        .submit-button {
            display: flex;
            align-items: center;
            margin: 20px 0;
            background: none;
            border: none;
            cursor: pointer;
            position: relative;
            margin-right: 30px; /* 右側の余白を追加 */
        }

        .submit-button img {
            width: 160px;
        }

        .cursor {
            visibility: hidden;
            height: 36px;
            width: auto !important;
        }

        .submit-button:hover .cursor {
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

        .back-button {
            margin-top: 20px;
            width: 66px;
            cursor: pointer;
            align-self: center;
        }
    </style>
</head>

<body>
    <img src="{{ asset('images/logo.png') }}" alt="ロゴ" class="logo">

    <form method="POST" action="{{ route('login.submit') }}">
        @csrf
        <div class="form-group">
            <img src="{{ asset('images/text-emailAddress.png') }}" alt="Eメールアドレス" class="label-img">
            <input type="email" name="email" placeholder="user@example.com" class="input-field" required>
        </div>
        <div class="form-group">
            <img src="{{ asset('images/text-password.png') }}" alt="パスワード" class="password-img">
            <input type="password" name="password" placeholder="パスワード" class="input-field" required>
        </div>
        <button type="submit" class="submit-button" id="login-button">
            <img src="{{ asset('images/text-cursor.png') }}" alt="カーソル" class="cursor">
            <img src="{{ asset('images/text-login-button.png') }}" alt="ログインする">
        </button>
        <img src="{{ asset('images/text-back-button.png') }}" alt="戻る" class="back-button" id="back-button">
    </form>

    <audio id="hover-sound" src="{{ asset('sounds/hover.mp3') }}" preload="auto"></audio>
    <audio id="click-sound" src="{{ asset('sounds/click.mp3') }}" preload="auto"></audio>
    <audio id="bgm" src="{{ asset('sounds/login-signup-bgm.mp3') }}" preload="auto" loop></audio>

    <script>
        const loginButton = document.getElementById('login-button');
        const backButton = document.getElementById('back-button');
        const hoverSound = document.getElementById('hover-sound');
        const clickSound = document.getElementById('click-sound');
        const bgm = document.getElementById('bgm');

        document.addEventListener('click', function () {
            if (bgm.paused) {
                bgm.volume = 0.4;
                bgm.play();
            }
        }, { once: true });

        loginButton.addEventListener('mouseover', function () {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });

        loginButton.addEventListener('click', function () {
            clickSound.currentTime = 0;
            clickSound.play();
        });

        backButton.addEventListener('mouseover', function () {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });

        backButton.addEventListener('click', function () {
            clickSound.currentTime = 0;
            clickSound.play();
            setTimeout(function () {
                window.location.href = '{{ url('/title') }}';
            }, 200);
        });
    </script>
</body>

</html>
