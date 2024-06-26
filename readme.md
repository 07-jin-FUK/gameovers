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
