<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Why Fight?｜ログアウトしました</title>
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
            color: white;
        }

        .message {
            font-size: 24px;
        }
    </style>
</head>

<body>
    <div class="message">ログアウトが完了しました。</div>
    <script>
        setTimeout(function () {
            window.location.href = '{{ route("title") }}';
        }, 2000);
    </script>
</body>

</html>
