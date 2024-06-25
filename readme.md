# バトル画面 実装機能一覧

## canvas を使用

- ゲームスクリーンの描画
  - 適切なゲーム画面サイズ、背景の設定
    > 素材 URL:https://www.spriters-resource.com/arcade/streetfighter2/
- キャラクターの描画
  → 背景の透過が必要 → 画像編集は GraphicsGale 使用
  素材画像にアニメーションを追加
  →requestAnimationFrame 関数
  都度、見た目上違和感がないように座標を微調整
