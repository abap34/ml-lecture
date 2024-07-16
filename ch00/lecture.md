---
marp: true
theme: honwaka
paginate: true
math: mathjax
---


<!-- _class: lead-->


# 機械学習講習会 2024
## 2024/06/24 - 2024/7/17

**traP Kaggle班**
@abap34


----

<!-- _header: この資料について -->

<br>
<br>


この資料は [東京工業大学デジタル創作同好会 traP Kaggle班](https://trap.jp/kaggle/) で 2024年に実施した 「機械学習講習会」の資料です.

機械学習に初めて触れる学部一年生のメンバーが

<div class="proof">


1. **基本的な機械学習のアイデアを理解** して,  
2. **最終的にニューラルネットを実際の問題解決に使えるようになること**
  

</div>

  
を目指しています.

(講習会自体については https://abap34.github.io/ml-lecture/supplement/preface.html をみてください)


---

<!-- style -->

<style scoped>
{
 font-size: 1.0em;
 line-height: 1.2em;
}

/* columns は 3つのカラムに分割 */
.columns {
  display: flex;
  justify-content: space-between;
}

/* リストは　▶︎　で始まる */
ul {
  list-style: none;
  padding-left: 0;
}

ul li::before {
  content: "▶︎";
  margin-right: 0.5em;
}

.box {
  padding: 0em;
  padding-left: 1.8em !important;
  padding-right: 1.8em !important;
  padding-bottom: 1em !important;
  margin-bottom: 1em !important;
  margin: 0em;
  border: 1px solid #ccc;
  border-radius: 20px;
  /* 超薄い水色 */
    background-color: #f0f8ff
}

</style>


<br>


# 目次

<hr>

<div class="columns">
<div>

<div class="box">

#### [1] [学習](#ch01)
- この講習会について
- 学習とは?
- 損失関数
- トピック: なぜ"二乗"なのか

</div>

<div class="box">

#### [2] [勾配降下法](#ch02)
- 関数の最小化
- 勾配降下法

</div>


<div class="box">

#### [3] [PyTorch と自動微分](#ch03)
- PyTorch の紹介
- Tensor型と自動微分
- トピック: 自動微分のアルゴリズムと実装


</div>


</div>

<div>

<div class="box">


#### [4] [ニューラルネットワークの構造](#ch04)
- 複雑さを生むには？
- 「基になる」関数を獲得する
- ニューラルネットワークの基本概念
- トピック: 万能近似性と「深さ」


</div>

<div class="box">

#### [5] [ニューラルネットワークの学習と評価](#ch05)
- DNN の学習の歴史
- 初期化 ?
- 確率的勾配降下法
- さまざまなオプティマイザ
- バリデーションと過学習

</div>


</div>


<div>


<div class="box">

#### [6] [PyTorch による実装](#ch06)
- データの前処理
- モデルの構築
- モデルの学習
- モデルの評価

</div>

<div class="box">


#### [7] [機械学習の応用, データ分析コンペ](#ch07)
- データ分析コンペの立ち回り
- EDA
- CV と shake
- ハイパーパラメータのチューニング

</div>




</div>
</div>



<hr>

---

<!-- _header: 各種リンク,注意など -->

<style scoped>
{
 font-size: 1.5em;
}
</style>

- この資料を管理しているレポジトリは https://github.com/abap34/ml-lecture　です。
  - 誤りのご指摘などはこちらの Issue または https://twitter.com/abap34 までご連絡ください.
- 補足資料なども含めてまとめたものを https://abap34.com/trap_ml_lecture.html から確認できます.
- この資料のリンクにはサークルメンバー以外がアクセスできないものが含まれています. (oj.abap34.com, dacq.abap34.com など)
  - オンラインジャッジは https://github.com/abap34/ml-lecture-judge
  - コンペプラットフォームは https://github.com/abap34/DacQ-v2 を動かしています.
  - どちらもかなり未成熟ですが, 基本的なオンラインジャッジの機能と, データ分析コンペプラットフォームの機能を提供しています.これらをホストすることで同等の環境を構築することができます.
- そのほか何かあれば https://twitter.com/abap34 までご連絡ください.


---

<!-- _header: 謝辞 -->


<style scoped>
{
 font-size: 2em;
}
</style>

資料の公開にあたって, 東京工業大学情報理工学院情報工学系博士後期課程の
@YumizSui さん (大上研究室) と 前田航希さん (@Silviase, 岡崎研究室)に 
内容について多くの助言をいただきました.

この場を借りてお礼申し上げます.

---

