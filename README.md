現在開発中です。まだ完成していません。

# AtCoder Simplify

![Status-WIP](https://img.shields.io/badge/Status-WIP-orange)

AtCoder で問題を解くときの一連の流れを簡略化する、VSCode の拡張機能と Chrome の拡張機能 のセットです。（現在はC++ユーザーが対象です。）

> アルファ版の現時点では Chrome 拡張機能のかわりに UserScript でリリースとなります。

cli でコマンドを打ち込んだりしなくても、ブラウザで AtCoder の問題を開くだけで自動的に VSCode にサンプルケースを取り込んだりします。

導入の際は拡張機能を入れるだけで、その他の環境構築作業は不要です。

## インストール

[VSCode 拡張機能](https://marketplace.visualstudio.com/items?itemName=tars0x9752.atcoder-simplify)

[UserScript](https://greasyfork.org/ja/scripts/403319-atcoder-simplify)

## ユーザーガイド

ユーザーガイドについてはこちらの [Wiki](https://github.com/tars0x9752/atcoder-simplify/wiki/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%AC%E3%82%A4%E3%83%89) を参照してください。

## やること

- サンプルケースの自動取得
- 問題用のディレクトリとファイルの生成
  - とりあえず最初は cpp のみ対応予定
- テストの実行・結果の表示
  - ユーザーが自作したテストケースへの対応もしたい
- テスト結果のDiff表示

## やらないこと

- 解答の提出
- ランダムなテストケースの自動生成
- その他コードの自動生成
- i18n

> 高機能は目指していません

## プロジェクトの思想

- AtCoder の **ID** や **パスワード** など、認証情報を入力をさせたりは**しないこと**
- 導入が簡単にできて、覚えることの少ないシンプルな使い勝手を目指す
- keep it simple, stupid

## ターゲット

下記条件に当てはまる人、もしくはその他の物好きな人にちょっと触ってもらえればヨシ！くらいのレベル感で作っています。

- cli 操作が苦手な人
- 環境構築が苦手な人
- IDやパスワードの入力が不要なツールを探している人
- VSCode メインの人

> より高機能な物を探している方は online-judge-tools という素晴らしいツールがあるのでそちらを確認してみることをオススメします。

## Requirements

- VSCode
- Google Chrome
  - Chrome に限らず標準の Web Extension の規格に対応したブラウザであればたぶん動くと思うけどとりあえずは Chrome のみ
  - **追記**: Chrome の拡張機能は審査がいつ終わるかわからなかったりでいつリリースできるか不明なため現時点では UserScript での配布とします。

## License

[MIT](LICENSE)
