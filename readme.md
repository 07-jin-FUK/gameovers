# バトル画面 実装機能一覧

## canvas を使用

- **ゲームスクリーンの描画**
  - 適切なゲーム画面サイズ、背景の設定
    > 素材 URL:https://www.spriters-resource.com/arcade/streetfighter2/
- **キャラクターの描画**
  - 背景の透過が必要 → 画像編集は**GraphicsGale**使用

* **キャラクターにアニメーションを追加(requestAnimationFrame 関数)**

  1. 横にスクロール移動
  2. 前後にスクロール移動(クラス、コンストラクタ作成)
  3. ２キャラ分作成
  4. 適宜座標を調整

- **キャラクターのフレーム毎の細かい移動(移動をよりリアルにする)**

  1. スプライトシートのプロパティを指定
  2. 前後それぞれ６フレームで表現
  3. フレーム速度調整
  4. 座標の調整
  5. クラス内容を修正
  6. ミラーリングし、２キャラが向かい合うように

- **コードを他の動きに応用できるよう修正（コードの一般化）**
  1. 前進、後退の実装
  2. キャラの状態(state)の関数を実装、update されるようにする
  3. 画面端で停止機能
  4. 手動で前進、交代を変更できるようにする(ボタンで変更)
  5. ジャンプの実装
  6. ジャンプ時アニメーションの細かい設定
  7. 前方、後方ジャンプの実装
  8. 二段以上のジャンプができないよう設定
  9. しゃがみ状態の実装

## ここまでの動きの実装はテスト、コードを修正してキャラクター操作を可能にする

- **InputHandler.js を作成。キー入力でキャラクターが動くようにする**

  1. 各種キーイベント関数を実装
  2. キャラクターにキーで操作できるようにする(2 体を区別せず)
  3. プレイヤー毎のキー操作を設定(前後移動)
  4. プレイヤー毎のキー操作を設定(前後ジャンプ、しゃがみ)

- **足元に影を追加する**

  1. 画像を保存し、shadow.js を作成
  2. キャラクターの画像の足元に影が描かれるよう設定。
  3. 影を半透明にし、ジャンプ時の影の大きさを変更

- **コントローラーで操作できるようにする**
  1. 使用ゲームパッドの配列内の値を確認
  2. ゲームパッドで制御するための関数を記入(InputHandler.js)

## 基本的なゲーム操作は完成

- **ジャンプに状態を追加(よりリアルなモーションのジャンプにする)**

- **敵との位置関係により向いている方向を変更(常にお互いが向かい合うようにする)**

  1. 位置関係で方向を変える関数を追加
  2. ジャンプ中の方向転換時の挙動を調整

- **お互いのキャラクターがぶつかった時、すり抜けないようにする(当たり判定付与)**
  1. 状態毎に当たり判定の範囲を追加
  2. 当たり判定を確認するために判定が見えるように設定
  3. 実際に当たり判定として働くよう関数を追加
  4. 衝突して敵プレイヤーを押している間、相手が動くように設定

## ゲーム画面設定(体力バー、カメラのキャラクター追跡など)

- **ステータスバー(体力バー、残り時間など)の実装**

  1. 体力バー、基本情報(使用キャラ名、残り時間)表示
  2. 残り時間が減るようにする

- **移動による画面スクロールの実装(難しそう)**

  1. カメラ変数を指定し、画面が動いているように設定
  2. カメラの位置によって、壁(画面端)の位置が変わるように設定
  3. キャラを追跡して画面が動くように変更

- **ステータスバーのまだ実装していない部分(score,1P,2P の表記)の実装**

- **背景のアニメーションを実装**

  1. ボートが動くように関数を設定
  2. stage クラスを作成し、ボートに乗っている人が動くように設定
  3. 旗が動くよう設定
  4. 遠近感を出す設定
  5. 背景のオブジェクト(ドラム缶など)の設定

- **攻撃の実装**

  1. 攻撃ボタンの設定
  2. ボタンが押された時だけ(押しっぱなしは一発しかでない)攻撃が出るように調整
  3. 中パンチ、強パンチの追加

- **ダメージボックス（攻撃をくらう判定）を実装**

  1. ダメージ判定の範囲を指定
  2. 判定が見えるように色をつけて確認
  3. 各種 state に対してダメージボックスを付与

- **アタックボックス(攻撃を与える判定)を実装**

1.  攻撃判定の範囲を指定
2.  攻撃毎に設定し、判定が見えるように色をつける
3.  アタックボックスがダメージボックスと重なった時、ログが出る設定にする

- **体力バーに機能実装**

1. BattleScene.js を作成しておく
2. game state を管理するファイルを作成
3. ダメージを受けた分体力が赤色になるように変更
4. 体力バーが段階的に減るように見た目を変更
5. 攻撃を当てると、減るように変更
6. 体力が 45%以下の時、KO アイコンが点滅するようにする

- **攻撃ヒット時の演出追加**

- **BGM 音声の実装**

  1. sounds フォルダにファイルを入れる
     > 素材 URL:https://downloads.khinsider.com/
  2. 音声ファイルを html に追加
  3. js ファイルに音声再生を実装

- **SE(攻撃時の音など)の実装**

  1. sounds フォルダにファイルを入れる
     > 素材 URL:https://www.sounds-resource.com/
  2. 音声ファイルを html に追加
  3. js ファイルに各動作に適した SE を設定する(各種攻撃、ジャンプ音)
  4. ヒット音の実装(一回ずつ再生時間のリセットが必要)

- **被ダメージ時の動作の実装**

  1. 頭、体、足元、技の弱中強でやられモーションを変える
  2. 反映されるよう関数の変更
  3. 被ダメ時、後ろにスライドして移動するようにする
  4. スライドの実装に合わせて、カメラクラスを微調整する

- **必殺技の実装(波動拳)**

  1. 弱攻撃を波動拳モーションに変える
  2. sounds フォルダにファイルを入れる
     > 素材 URL:https://www.sounds-resource.com/
  3. html に反映
  4. 影、音声の設定を行う
  5. 波動拳のアニメーションを設定
  6. x 方向に移動するように設定
  7. 波動拳に衝突判定をつける(弾きえる、敵よろめく)
  8. 衝突時、ダメージを与えるように設定
  9. 弾同士にも衝突判定をつける(弾同士が当たると相殺する)

- **コマンド入力の実装**

  1. コマンド履歴を記録、正しい順序で入力されたら成立
  2. 正しく履歴が表示される配列を作成
  3. コマンドの入力受け入れ時間を設定、コマンド成立時発動するように設定
  4. 斜めは配列要素で、2 つが true になっているようにする。

  **注意:**画面端で被ダメした際、攻撃した側が後ろにスライドする挙動になる

# 終わり
