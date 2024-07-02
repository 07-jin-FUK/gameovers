<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Why Fight?｜プレイヤー登録</title>
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
            cursor: pointer;
        }

        .logo {
            width: 720px;
            margin-bottom: 30px;
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
            margin-bottom: 10px;
        }

        .input-field {
            margin: 5px 0;
            padding: 8px;
            width: 300px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }

        .submit-button {
            display: flex;
            align-items: center;
            margin: 15px 0;
            background: none;
            border: none;
            cursor: pointer;
            position: relative;
            margin-right: 30px;
        }

        .label-img {
            height: 38px;
            margin-bottom: 5px;
        }

        .password-img,
        .playername-img {
            height: 36px;
        }

        .input-field,
        .password-img,
        .playername-img {
            margin-top: 10px;
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
        }
    </style>
</head>

<body>
    <img src="{{ asset('images/logo.png') }}" alt="ロゴ" class="logo">

    <form action="{{ route('register.submit') }}" method="post">
        @csrf
        <div class="form-group">
            <img src="{{ asset('images/text-emailAddress.png') }}" alt="Eメールアドレス" class="label-img">
            <input type="email" name="email" placeholder="user@example.com" class="input-field" required>
        </div>
        <div class="form-group">
            <img src="{{ asset('images/text-playername.png') }}" alt="プレイヤー名" class="playername-img">
            <input type="text" name="playername" placeholder="プレイヤー名" class="input-field" required>
        </div>
        <div class="form-group">
            <img src="{{ asset('images/text-password.png') }}" alt="パスワード" class="password-img">
            <input type="password" name="password" placeholder="パスワード" class="input-field" required>
        </div>
        <div class="form-group">
            <img src="{{ asset('images/text-password.png') }}" alt="パスワード確認" class="password-img">
            <input type="password" name="password_confirmation" placeholder="パスワード確認" class="input-field" required>
        </div>
        <button type="submit" class="submit-button" id="signup-button">
            <img src="{{ asset('images/text-cursor.png') }}" alt="カーソル" class="cursor">
            <img src="{{ asset('images/text-signup-button.png') }}" alt="サインアップする">
        </button>
    </form>

    <img src="{{ asset('images/text-back-button.png') }}" alt="戻る" class="back-button" id="back-button">

    <audio id="hover-sound" src="{{ asset('sounds/hover.mp3') }}" preload="auto"></audio>
    <audio id="click-sound" src="{{ asset('sounds/click.mp3') }}" preload="auto"></audio>
    <audio id="bgm" src="{{ asset('sounds/login-signup-bgm.mp3') }}" preload="auto" loop></audio>

    <script>
        const signupButton = document.getElementById('signup-button');
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

        signupButton.addEventListener('mouseover', function () {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });

        signupButton.addEventListener('click', function () {
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
