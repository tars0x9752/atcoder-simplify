# AtCoder Simplify

![Status-WIP](https://img.shields.io/badge/Status-WIP-orange)

**この拡張機能は現在開発途中で、このリリースはアルファ版です。**

AtCoder で問題を解くときの作業を簡略化するための拡張機能です。

ブラウザと連動し、ブラウザで AtCoder の問題を開くだけで自動的に VSCode にサンプルケースを取り込んだりします。

そのためこの拡張機能だけでは動きません。別途、AtCoder Simplify のブラウザ拡張機能(または UserScript)を導入することで動作します。

[GitHub](https://github.com/tars0x9752/atcoder-simplify)

## ユーザーガイド

[ユーザーガイド](https://github.com/tars0x9752/atcoder-simplify/wiki/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%AC%E3%82%A4%E3%83%89)

## ブラウザ拡張機能

アルファ版の現在はブラウザ拡張機能のかわりに、UserScriptでのリリースとなります。

[UserScript](https://greasyfork.org/ja/scripts/403319-atcoder-simplify)

## Features

- サンプルケースの自動取得
- 問題用のディレクトリとファイルの生成
  - とりあえず最初は cpp のみ対応予定
- テストの実行・結果の表示
  - ユーザーが自作したテストケースへの対応もしたい
- テスト結果の Diff 表示(未実装)

## Requirements

- VSCode
- AtCoder Simplify のブラウザ拡張機能(または UserScript)を導入した Web ブラウザ

## Extension Settings

n/a

## Known Issues

n/a

## Release Notes

### 0.1.1

一部の環境でコードテスト結果が辞書順にならない問題を修正

### 0.1.0

アルファ版リリース

## License

[MIT](LICENSE)
