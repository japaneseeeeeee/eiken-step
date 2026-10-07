# EIKEN STEP（英検2級 語彙トレーニング）

HTML・CSS・JavaScriptだけで動く、英検2級向けの静的学習サイトです。単語・熟語カード、4択問題、リスニング、ライティングを収録しています。

## 収録数

- 単語 1,200語
- 熟語 300個
- 4択問題 400問（毎回ランダムに10問出題）
- リスニング 3問
- ライティング 3題

## 使い方

`index.html` をブラウザで開くだけで利用できます。サーバーやインストール作業は不要です。

## ファイル構成

- `index.html` — 学習メニュー
- `vocabulary.html` / `vocabulary.js` — 単語・熟語カード
- `quiz.html` / `script.js` — 4択問題
- `listening.html` / `listening.js` — 音声つきリスニング
- `writing.html` / `writing.js` — ライティング練習
- `style.css` — デザインとスマホ対応
- `script.js` — 問題データとクイズの動作

## 問題を追加・編集する

`script.js` の先頭にある `questions` 配列を編集します。各問題は次の形式です。

```js
{
  sentence: "問題文（空所は (　　　) と記述）",
  choices: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
  answer: 0, // 正解の番号。A=0、B=1、C=2、D=3
  explanation: "解説",
  translation: "問題文の日本語訳"
}
```

## GitHub Pagesで公開する

1. GitHubで新しいリポジトリを作成します。
2. このフォルダ内の3ファイル（READMEを含める場合は4ファイル）をリポジトリ直下へアップロードします。
3. リポジトリの `Settings` → `Pages` を開きます。
4. `Build and deployment` の `Source` で `Deploy from a branch` を選びます。
5. ブランチを `main`、フォルダを `/ (root)` にして `Save` を押します。

しばらくすると、表示されたURLでサイトを利用できます。
