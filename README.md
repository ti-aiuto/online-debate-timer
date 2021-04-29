# online-debate-timer

[![Node CI](https://github.com/ti-aiuto/online-debate-timer/actions/workflows/nodejs.yml/badge.svg)](https://github.com/ti-aiuto/online-debate-timer/actions/workflows/nodejs.yml)

オンラインディベート向けの簡易タイマー

<img src="https://user-images.githubusercontent.com/13868411/116104104-26002080-a6eb-11eb-9424-318ef7e809a6.png" width="350">

## 構成

### タイマーアプリケーション

* `src/app` に格納
* タイマーキットの実装を使ったタイマーアプリケーションの実装例
* 今は一種類だけどバリエーションがあってもよさそう

### タイマーキット

* `src/lib` に格納
* 特定のUI実装に依存しないロジックを実装
* ファイル構成
    * `TkClock` 一秒をできるだかけ正確に測ることを責務とするクラス
    * `TkTimerState` タイマーの状態遷移ロジックを切り出したクラス
    * `TkAudio` ブラウザの `Audio` をラップしたクラス
    * `TkTimer` 他のクラスを組み合わせてタイマーの機能を実現

### テスト

* `spec` に格納

## ビルド

1. `npm run build`
1. `public/index.html` を開く

## 開発

### 方針

* "online" のタイマーだけど一応オフラインでも最低限は動くように作っておく
* 当分はIE11でも動くように作りたい
* ロジックはできるだけテストを書いておく

### テスト

* `npm run test`

## 将来の開発について

### 機能

* [ ] 一時停止中に秒数を加算できるようにしたらどうかという要望あり

### 素材

* 効果音は https://jfxr.frozenfractal.com/ とSoundEngineで頑張ってつくったけど、もっとそれっぽいのがあれば
* デザインもスキン的な感じで他のパターンもあると良さそう
