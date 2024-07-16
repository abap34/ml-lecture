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



<!-- PAGE BREAK -->



<!-- SLIDE: ch01/lecture.md -->

---

<div id="ch01"></div>

<!-- _class: lead -->

# **機械学習講習会**
## **[1] 「学習」**

**2024/06/24** 
**traP Kaggle班**

---

# **はじめに**

---
 


<!-- _header: この講習会のゴール　-->

## ✅ 機械学習の基本的なアイデアを理解して
## 問題解決の手段として使えるようになる.



---

<!-- _header: おしながき　-->

<div class="def">

第1回 │ 学習
第2回 │ 勾配降下法
第3回 │ 自動微分
第4回 │ ニューラルネットワークの構造
第5回 │ ニューラルネットワークの学習と評価
第6回 │ PyTorch による実装
第7回 │ 機械学習の応用, データ分析コンペ

</div>




---

<!-- _header: この講習会で扱うこと・扱わないこと　-->

<br>

機械学習は非常に広大な分野 ⇨ 全7回ではちょっと限界がある

今回の講習会ではとくに**ディープラーニング**についてメインに扱います

- ツールを触るだけで原理は全然やらない
- 原理をやるだけで全然使えない

にならないようにどちらもバランス良くやります




---

<!-- _header: 最終的には...-->




<br>


<div class="thm">

✅ 機械学習の基本的なアイデアを説明できるようになる
✅ ライブラリに頼らず基本的なアルゴリズム, モデルを実装できるようになる
✅ PyTorch を使った基本的なニューラルネットの実装ができるようになる


</div>


---

<!-- _header: 使うプログラミング言語 -->




## ![h:60](img/ch01_image.png) Python を使います　

</div>


**慣れている人へ**
→ Jupyter Notebook と numpy, matplotlib, scipy, PyTorch  あたりのライブラリを使えるようにしておいてください


**慣れていない人へ**
→ https://abap34.github.io/ml-lecture/supplement/colab.html をみて Google Colaboratory の使い方を覚えておいてください

<br>



---

<!-- _header: 使うプログラミング言語や前提知識など -->
<br>

### 1.Pythonを使った初歩的なプログラミング
- if文, for文, 関数 など
- 外部パッケージの利用
  
  (そこまで高度なことは求めません <span class="lined">**ググり力とかの方が大事**</span>)

### 2.数学の初歩的な知識
- 基本的な行列の演算や操作 (積,転置など)
- 基本的な微分積分の知識 (偏微分など)
  
(1年前期の (線形代数)　+ (微分積分のさわり) くらい)

---
<!-- _header: がんばりましょう -->

(ここだけの話機械学習はめちゃくちゃおもしろい)


<br>


# 全7回,がんばりましょう！！




---

<!-- _class: lead-->

# **第一回: 学習**

---

<!-- _header: おしながき -->
   
### 今日の目標

機械学習の基本的な用語を整理して
「学習」ということばをきちんと説明できるようになる.


---



<!-- _header: 機械学習 or AI？　-->

- AI(人工知能)
「人間っぽい知能」を実現しようとする分野・あるいは知能そのもの
- 機械学習(Machine Learning, ML)　
様々な情報から「学習」をして動作するアルゴリズム
人工知能の一つのかたちと見られることが多い 

<div style="text-align: center;">

⬇︎ つまり？


</div>



---

<!-- _header: 機械学習 or AI？　-->


<div class="def">


## **機械学習** で **人工知能** を実現

### ($\leftrightarrow$  **スーパーカー** で,**爆速移動** を実現)


</div>

<div class="cite">

ここでは一つの定義を紹介しましたが, 実際この二つの言葉に明確に定義や合意があるわけではないです.
手法を厳密に分類してもあまり嬉しいことはないと思いますが, とりあえずこの講習会ではこういう形で整理してみることにします.

</div>


---

<!-- _header: 学習ってなに？　-->


- 機械学習(Machine Learning, ML)　
様々な情報から「**学習**」をして動作するアルゴリズム

<br> 
<br>



<div style="text-align: center;">

↑ **学習**って何？ 


</div>

---


### 今日のテーマ:

## ✅ 「学習」を説明できるようになる




---

<!-- _header: 「気温」と「アイス」 　-->

<br>
<br>

- 気温↑　→　売れそう
- 気温↓　→　売れなさそう

「アイスの売り上げ」は
「気温」からある程度わかりそう？

<br>

![height:30](img/ch01_icon.png)  < ...来月の売り上げが予想できたらどのくらい牛乳仕入れたらいいかわかって嬉しいな.


![bg right height:500](img/ch01_icecream_scatter.png)

<div class="cite">
データは https://okumuralab.org/~okumura/stat/160118.html　から引用
</div>

---


<!-- _header: アイスの売り上げを予測するAIをつくる.　-->


<br>


![height:30](img/ch01_icon.png) < なんか来月の予想平均気温30度って気象庁が言ってたな.

![height:440](img/ch01_icecream_scatter.png)  ![height:30](img/ch01_icon.png) < !!!!!



---

<!-- _header: アイスの売り上げを予測するAIをつくる.　-->

![height:480](img/ch01_icecream_scatter_annotation.png) ![height:30](img/ch01_icon.png) < 過去に30℃のときは...


---

<!-- _header: 過去を参照すると...　-->

一番簡単な方法: 過去の全く同じ状況を参照する

![height:30](img/ch01_icon.png) < これでアイスの売り上げを予測するAIの完成や！



<br>



<br>


![height:60](img/ch01_kisyoucyou.jpg) **<そのまた来月の予想平均気温は40℃です.**

![height:30](img/ch01_icon.png) **< !?**


<div class="cite">

気象庁ロゴは https://www.jma.go.jp/jma/kishou/info/logo.html より

</div>


---


<!-- _header: 詰んだ -->

![height:550](img/ch01_icecream_scatter.png)   ![height:30](img/ch01_icon.png) < 40℃ないやんけ

---


<!-- _header: 「予測」を考える -->

<div style="text-align: center;">


「予測」ってなんだっけ？
→ 入力を受け取ってそれっぽい出力をすること


⇩


今回は 「入力: 気温」 → 「出力: アイスの売り上げ」

そして ✅ <span class="lined"> **入力は知ってるものだけとは限らない**</span>


</div>

---

<!-- _header: 予測できるようになる ↔︎  ?　-->

![height:50](img/ch01_icon.png) ← こいつが本当にやらなくてはいけなかったことは...

## 売り上げ = $f$(気温) となる関数 $f$ の推定

このような入力データを受け取り結果を返す $f$ を**モデル**と呼ぶ


---


<!-- _header: 線形回帰 -->



売り上げ = $f$(気温) となる関数 $f$ を作りたい.



⇨ 一旦話を簡単にするために
<div class="def">


<div style="text-align: center;">

「**$f$(気温) = $a \times$気温 + $b$**」

</div>


</div>


のかたちであることにしてみる.



---


<!-- _header: ためしてみる -->


$a = 20, \ b=100$ のとき...

![bg right height:500](img/ch01_icecream_scatter_regression_20_100.png)


![height:30](img/ch01_icon.png) < わるくない


---

<!-- _header: ためしてみる -->


$a = -20, \ b=1000$ のとき...

![height:30](img/ch01_icon.png) < おわてます

![bg right height:500](img/ch01_icecream_scatter_regression_-20_1000.png)

---

<!-- _header: パラメータ -->



$a, b$ を変えることでモデル $f$ の具体的な形が変わった！

このように各モデルが固有に持ってモデル自身の性質を定める
数を 「<span class="dot-text">パラメータ</span>」という. ( $f$ は $a, b$ をパラメータとして持つ )


<div style="text-align: center;">

⬇︎

<div class="thm">


$f$ の構造を決めておけば...


### 「$f$ の推定 $\leftrightarrow$ $f$ のパラメータの推定」

</div>


</div>

<div class="cite">

関数 $f$ がパラメータ $\boldsymbol{\theta}$ を持つことを陽に示すために,$f(x; \boldsymbol{\theta})$ と書くことがあります. 今回の場合は $f(x; a, b)$ となります. 


</div>



---


<!-- _header: ちょっとまとめ　-->

- アイスの売り上げを予測するには, 気温から売り上げを予測する
  「関数」を構築するのが必要であった.
- いったん, 今回は関数の形として $f(x) = ax + b$ (一次関数) に限って,関数を決めることにした.
- この関数は, パラメータとして $(a, b)$ をもち, $(a, b)$ を変えることで
  性質が変わるのがわかった
- これからやる仕事は, 
  「$(a, b)$ をいい感じのものにする」ことで「いい感じの $f$ を作る」こと

---


<!-- _header: さっきの例 -->

<br>

$a = 20, \ b=100$ のとき...

![bg right vertical height:350](img/ch01_icecream_scatter_regression_20_100.png)


![height:30](img/ch01_icon.png) < わるくない



$a = -20, \ b=1000$ のとき...

![height:30](img/ch01_icon.png) < おわてます

![bg right height:350](img/ch01_icecream_scatter_regression_-20_1000.png)

<div style="text-align: center;">

⇩ なぜ？


## ![height:30](img/ch01_icon.png)  < グラフを見ればわかる.


</div>

---

<!-- _header: いい勝負? -->

![bg right vertical height:350](img/ch01_icecream_scatter_regression_20_100.png)

![bg right height:350](img/ch01_icecream_scatter_regression_50_-300.png)



上: $a = 20, \ b=100$
下: $a = 50, \ b=-300$


---

<!-- _header: 破綻 -->

![bg right height:600](img/ch01_icecream_scatter_3d.png)



🤔💭 湿度や人口、子供の割合なんかも売り上げとは関係しそうだからこれらも入力に入れたいな。


<div class="box">

<div style="text-align: center;">

$y = f$(気温, 湿度, 人口, $\cdots$)

<div style="text-align: center;">

⇩ <span style="color:red;">**グラフが書けない！**</span>
</div>

案1. 高次元の存在になる
案2. 定量的な指標を考える


</div>

</div>



---



<!-- _header: 定量的な指標を考える: 損失関数の導入 -->

<div style="text-align: center;">

良さとは？

⇩

悪くなさ

⇩

悪くなさとは何か？

⇩

データと予測の遠さ

</div>

---

<!-- _header: 平均二乗誤差(Mean Squared Error)  -->


<div class="def">


## 平均二乗誤差(Mean Squared Error)



$$
\dfrac{1}{n}\sum_{i=0}^{n-1} \ (y_i - f(x_i))^2
$$

<br>

$y_i$ : 実際の値　(確定値) ... 過去のアイスの売り上げ
$f$ : モデル
$x_i$ : 入力データ　(確定値) ... 過去の気温


</div>

<div class="cite">

なぜ差を二乗するのか疑問に思った人もいるかもしれません.　
全てをここで話すと情報量過多なので一旦置いといてあとで軽く議論します.(末尾の付録)

</div>

---

<!-- _header: 計算例  -->

<br>

$\boldsymbol{x} = (50, 80)^T$, $\boldsymbol{y} = (140, 200)^T$, $f(x) = 2x + 50$ のとき,

$$
\begin{aligned}
\dfrac{1}{n}\sum_{i=0}^{n-1} \ (y_i - f(x_i))^2 &= \dfrac{1}{2} \left( (140 - (2 \times 50 + 50))^2 + (200 - (2 \times 80 + 50))^2 \right) \\
&= \dfrac{1}{2} \left( (140 - 150)^2 + (200 - 210)^2 \right) \\
&= \dfrac{1}{2} \left( (-10)^2 + (-10)^2 \right) \\
&= \dfrac{1}{2} \times 200 \\
&= 100
\end{aligned}
$$





---

<!-- _header: 損失関数  -->

このモデルの悪くなさを定義する関数を「損失関数」と呼ぶ.

<br>

<div class="def">



 学習とは？ 
## ⇨ ✅ 「損失関数を最小にする $f$ のパラメータを探す過程」


</div>



---


<!-- _header: 何を動かして損失を小さくする？ -->

Q. 損失は何の関数？ (何を動かして損失を小さくする？)

✅  各 $x_i, y_i$ は変数みたいな見た目だけど <span class="dot-text">「もう観測された確定値」 </span>


<div class="proof">

$$
\mathcal{L}(a, b) = \dfrac{1}{n}\sum_{i=0}^{n-1} \ (y_i - f(x_i; a, b))^2
$$

</div>


<div class="cite">

ものすごく進んだ話: たまに「入力データ」っぽいものに当たるものについても変数とみることもあります.
自分の知っている話だと DeepSDF という三次元形状を表現する NN では latent code と呼ばれる物体固有の表現を表すベクトルも変化させて損失関数を最小化していました. 

</div>


---

<!-- _header: いい勝負だったやつの計算例 -->

![bg right vertical height:350](img/ch01_icecream_scatter_regression_20_100.png)

![bg right height:350](img/ch01_icecream_scatter_regression_50_-300.png)



上: $a = 20, \ b=100$
下: $a = 50, \ b=-300$

頑張って計算すると,

$$
\begin{aligned}
\mathcal{L}(20, 100) &= 40268.55 \\
\mathcal{L}(50, -300) &= 39310.45
\end{aligned}
$$

<div style="text-align: center;">

⇩

$a = 50, \ b=-300$ $\ \large{win}$

</div>

---


<!-- _header: 実は今回は -->

$a \approx 36.00780537461501$
$b \approx 126.12821494344632$ 

で $\mathcal{L}(a, b)$ が最小

![bg right height:450](img/ch01_icecream_scatter_regression.png)


---

<!-- _header: 当然の疑問 -->

# いや
# それ
# どう
# やったの


---

<!-- _class: lead -->

## 次回予告
## $\Large{第二回: 勾配降下法}$


---

<!-- _header: まとめ -->


- アイスの売り上げを予測するには, 気温から売り上げを予測する
  「関数」を構築するのが必要であった.
- いったん, 今回は関数の形として $f(x) = ax + b$ (一次関数) に限って,関数を決めることにした.
- この関数は, パラメータとして $(a, b)$ をもち, $(a, b)$ を変えることで
  性質が変わるのがわかった
- モデルの「よさ」のめやすとして 「損失関数」を導入した
- パラメータを変えることで損失関数を最小化する過程のことを「学習」と呼ぶ


---

<!-- _header: 付録: なぜ二乗するのか？ -->

### レベル1の説明

⇨ 性質がいいから

- 微分可能で導関数も簡単　(絶対値関数は微分不可能な点がある)
- 計算もそんなに大変ではない (百乗誤差などと比べて)


<div class="cite">
理論的なことを考えると微分可能でないと大変なことが多いです.

一方で現実の最適化だと微分不可能な点が有限個(何なら可算無限個) あっても何とかなることが多いです.
</div>


---


<!-- _header: 付録: なぜ二乗するのか？ -->

### レベル2の(ちゃんとした)説明

⇨ 誤差が正規分布 $\mathcal{N}(0, \sigma^2)$ にしたがうと仮定したとき,
二乗誤差の最小化は尤度の最大化に対応する


---

<!-- _header: 付録: なぜ二乗するのか？ -->

<br>
<div class="proof">

### [証明]

$y_i = f(x_i) + \epsilon_i$, $\epsilon_i \overset{\text{i.i.d.}}{\sim} \mathcal{N}(0, \sigma^2)$ とする.

このとき $y_i \overset{\text{i.i.d.}}{\sim} \mathcal{N}(f(x_i), \sigma^2)$　より
尤度は

$$
\prod_{i=0}^{n-1} \dfrac{1}{\sqrt{2\pi\sigma^2}} \ \exp \left( -\dfrac{(y_i - f(x_i))^2}{2\sigma^2} \right)
$$


$\sigma^2$ が固定されていることに注意すると,
これの最大化は結局 $\sum_{i=0}^{n-1} (y_i - f(x_i))^2$ の最小化に帰着する. $\square$


</div>

<!-- PAGE BREAK -->



<!-- SLIDE: ch02/lecture.md -->

---

<div id="ch02"></div>


<!-- _class: lead -->

# **機械学習講習会**
## **[2] 「勾配降下法」**

**2024/06/25** 
**traP Kaggle班**

---


<!-- _header: まとめ -->



- アイスの売り上げを予測するには, 気温から売り上げを予測する
  「関数」を構築するのが必要であった.
- いったん, 今回は関数の形として $f(x) = ax + b$ (一次関数) に限って,関数を決めることにした.
- この関数は, パラメータとして $(a, b)$ をもち, $(a, b)$ を変えることで
  性質が変わるのがわかった
- モデルの「よさ」のめやすとして, 「損失関数」を導入した
- パラメータを変えることで損失関数を最小化する過程のことを「学習」と呼ぶ



---


<!-- _header: 前回到達したところ... -->



$a, \ b$ を動かすことで....

$\displaystyle \mathcal{L}(a, b) = \dfrac{1}{n}\sum_{i=0}^{n-1} \ (y_i - f(x_i; a, b))^2$ を小さくしたい 🥺





---



<!-- _header: 「関数の最小化」を考える -->

## 問題 

<div class="def">

最小化してください.

$$
f(x) = x^2 + 4x + 6
$$ 


</div>

---

<!-- _header: 「関数の最小化」を考える -->

<br>

## 問題 

<div class="def">

最小化してください.

$$
f(x) = x^2 + 4x + 6
$$ 


</div>

## 解答

<div class="proof">

<div style="text-align: center;">

$f(x) = x^2 + 4x + 6 = (x + 2)^2 + 2$ 


$\therefore \ x = -2$ のとき最小値

</div>


</div>


---

<!-- _header: どう「解けた」？？ -->


- 簡単な数式の操作で解けた！
- 機械的に書くなら
 「 $ax^2 + bx + c$ を最小にする $x$ は $x = -\dfrac{b}{2a}$ 」 という公式を使った


プログラムに起こすと...

```python
# ax^2 + bx + c を最小にする x を返す関数.
def solve(a, b, c):
    return -b / (2 * a)
```

---


<!-- _header: 第二問 -->


<div class="def">

最小化してください.

$$
f(x) = x^2 + e^{-x}
$$


</div>


---


<!-- _header: 第二問 -->

$f'(x) = 2x - e^{-x}$ なので, 最小値であることの必要条件 $f'(x) = 0$ を調べると...

$$
2x - e^{-x} = 0
$$ 

を満たす $x$ を考えると.......


<div style="text-align: center;">

### ❓

</div>



---

<!-- _header: ❓ -->

![](img/ch02_google.jpg)


---

<!-- _header: ❓ -->

![](img/ch02_wolfram.jpg)

---


<!-- _header: ❓ -->

![](img/ch02_image.png)


---

<!-- _header: ❓ -->

![](img/ch02_image-1.png)


---

![](img/ch02_lambert3.jpg)

---


# ？

---


<!-- _header: 一般の関数の最小化 -->


いいたかったこと

✅ **このレベルの単純な形の関数でも解をよく知っている形で書き表すことは難しい**

---


<!-- _header: もう一度目的を整理する -->


われわれの目標...

## 誤差 $\mathcal{L}(a, b)$ を最小化したかった. 
　

---


<!-- _header: 効いてくる条件① -->

<br>

<div style="text-align: center;">

## Q. 厳密な最小値を得る必要があるか？

</div>

---

<!-- _header: 効いてくる条件① -->


## A. No. <span class="lined">厳密に最小値を得る必要はない</span>

数学の答案で最小値 1 になるところを 1.001と答えたら当然 🙅


### 一方 <span class="lined">「誤差 1」 が 「誤差1.001」 になってもほとんど変わらない</span>

---

<!-- _header: 効いてくる条件② -->

<br>

## $\mathcal{L}$ は非常に複雑になりうる

第一回では <span style="color:red;">**話を簡単にするために**</span> $f(x) = ax + b$ の形を考えたが...

<br>

(特にニューラルネットワーク以降は) **非常に複雑になりうる** 

$$
\mathcal{L}(\mathbf{W^{(1)}}, \mathbf{W^{(2)}}, \cdots, \mathbf{W^{(n)}}, \mathbf{b^{(1)}}, \mathbf{b^{(2)}}, \cdots, \mathbf{b^{(n)}}) = \dfrac{1}{n} \sum_{i=0}^{n-1} \left( y_i - {W^{(n)}}^T \sigma \left( \cdots \sigma \left( {W^{(1)}}^T x_i + b^{(1)} \right) \cdots + b^{(n-1)} \right) \right)^2, \ \sigma(x) = \dfrac{1}{1 + e^{-x}}
$$

$$
\mathcal{L} (\boldsymbol{\theta}) = \dfrac{\sum_{p \in S} |f(p; \boldsymbol{\theta}) - \mathcal{F}(p)|^2 \cdot \omega_p}{\sum_{p \in S} \omega_p}
$$

$$
\vdots
$$

<div class="cite">

複雑そうな式を気分で乗せただけなのであまり意図はありません

</div>








---

<!-- _header: われわれに必要な道具 -->

## ✅　 非常に広い範囲の関数に対して
## そこそこ小さい値を探せる方法


---

<!-- _header: われわれに必要な道具 -->

# 勾配降下法




---

<!-- _header: 微分のおさらい -->

<div class="def">

## 微分係数

関数 $f$ の $x$ における微分係数

<br>

$$
\large \lim_{h \to 0} \dfrac{f(x + h) - f(x)}{h}
$$

<br>

</div>

---

<!-- _header: 微分は「傾き」 -->

### 微分係数

![bg right h:700](img/ch02_fx2_tangent.png)

<div style="text-align: center;">

  $f'(x)$ は $x$ における接線の傾き


</div>

---

<!-- _header: 微分は「傾き」 -->

### 微分係数

![bg right h:700](img/ch02_fx2_tangent.png)

<div style="text-align: center;">

  $f'(x)$ は, $x$ における接線の傾き

  ⬇︎

  <div class="proof">
  
  
  $-f'(x)$ **方向に関数を
  すこし動かすと関数の値はすこし小さくなる**

  
  </div>

</div>

---

<!-- _header: 「傾き」で値を更新してみる -->


例) $f(x) = x^2$  

$x = 3$ で $f(3) = 9, \ f'(3) = 6$

$\therefore -f'(x)$ は負の方向

<div style="text-align: center;">

⬇︎

</div>

すこし負の方向に $x$ を動かしてみる

$f(2.9) = 8.41<9$


✅　小さくなった

![bg right h:700](img/ch02_fx2_tangent_x2.9.png)


---

<!-- _header: 「傾き」で値を更新してみる -->

例) $f(x) = x^2$  

$x = 2.9$ で $f(2.9) = 8.41, \ f'(2.9) = 5.8$

$\therefore -f'(x)$ は負の方向

<div style="text-align: center;">

⬇︎

</div>


すこし負の方向に $x$ を動かしてみる

$f(2.8) = 7.84 <8.41$


✅　小さくなった

![bg right h:700](img/ch02_fx2_tangent_x2.9.png)



---


<!-- _header: 「傾き」で値を更新してみる -->

## これを繰り返すことで小さい値まで到達できそう！

---

<!-- _header: 勾配降下法 -->


<div class="def">


## 勾配降下法


関数 $f(x)$ と初期値 $x_0$ が与えられたとき,
次の式で $\{x_k\}$ を更新するアルゴリズム

$$
x_{k+1} = x_k - \eta f'(x_k)
$$

($\eta$ は**学習率**と呼ばれる定数)

</div>


<div class="cite">


正確にはこれは最急降下法と呼ばれるアルゴリズムで, 「勾配降下法」は勾配を使った最適化手法の総称として用いられることが多いと思います.
(そこまで目くじらを立てる人はいないと思いますし, 勾配降下法あるいは勾配法と言われたらたいていの人がこれを思い浮かべると思います.)


</div>

---

<!-- _header:  勾配降下法  -->

マイナーチェンジが大量！
(実際に使われるやつは第五回で予定)

$$
x_{n+1} = x_n - \eta f'(x_n)
$$

<br>

#### 抑えてほしいこと 👀

1. 値が $-f'(x)$ の方向に更新される
2. 学習率によって更新幅を制御する

</div>


---


<!-- _header:  勾配降下法のお気持ち  -->


<div style="text-align: center;">

**値が $-f'(x)$ の方向に更新される**
  
(さっきの説明の通り)

</div>

![bg right h:700](img/ch02_fx2_tangent_x3.png)



---


<!-- _header: 学習率による更新幅の制御 -->

<br>

✅ 微分はあくまで「<span class="dot-text">その点</span>の情報」

<div style="text-align: center;">

傾向が成り立つのはその周辺だけ

⬇︎

少しずつ更新していく必要がある

⬇︎

小さな値 **学習率** $\eta$ をかけることで
少しずつ更新する

</div>


![bg right h:650](img/ch02_fx2_tangent_x3.png)


---

<!-- _header: 実際にやってみる  -->

$f(x) = x^2$

初期値として $x_0 = 3$ 
学習率として $\eta = 0.1$ を設定.(この二つは自分で決める！)

$x_1 = x_0 - \eta f'(x_0) = 3 - 0.1 \times 6 = 2.4$
$x_2 = x_1 - \eta f'(x_1) = 2.4 - 0.1 \times 4.8 = 1.92$
$x_3 = x_2 - \eta f'(x_2) = 1.92 - 0.1 \times 3.84 = 1.536$
$\cdots$
$x_{100} = 0.0000000006111107929$

#### ✅ 最小値を与える $x = 0$ に非常に近い値が得られた！

---
 
<!-- _header: 勾配降下法のココがすごい！  -->


**✅ その式を (解析的に) 解いた結果が何であるか知らなくても,**
**導関数さえ求められれば解を<span class="lined">探しにいける</span>**


---

<!-- _header: 実際にやってみる2  -->


## 第二問

<div class="def">

最小化してください.

$$
f(x) = x^2 + e^{-x}
$$


</div>



---

<!-- _header: 実際にやってみる2  -->

$f'(x) = 2x - e^{-x}$. 

初期値として $x = 3$, 学習率として $\eta = 0.01$ を設定.

$x_0 = 3$
$x_1 = 2.9404978706836786$
$\vdots$
$x_{1000} =  0.35173371125366865$

![bg right h:150](img/ch02_lambert_ans.jpg)


### ヨシ！😺



---

<!-- _header: Pythonによる実装 -->

```python
from math import exp

x = 3
# （注意: $\eta$ は 学習率 (learning rate) の略である lr としています.）
lr = 0.0005

# 最小化したい関数
def f(x):
  return x ** 2 + exp(-x)

# f の x での微分係数
def grad(x):
    return 2 * x - exp(-x)
```

---


<!-- _header: Pythonによる実装 -->


$x_{n+1} = x_n - \eta f'(x_n)$ をコードに起こす


```python
for i in range(10001):
    # 更新式
    x = x - lr * grad(x)
    if i % 1000 == 0:
        print('x_', i, '=', x , ', f(x) =', f(x))
```

```
x_ 0 = 2.997024893534184 , f(x) = 9.032093623218246
x_ 1000 = 1.1617489280037716 , f(x) = 1.6625989669983947
x_ 2000 = 0.5760466279295902 , f(x) = 0.8939459518186053
x_ 3000 = 0.4109554481889124 , f(x) = 0.8319008499233866
...
x_ 9000 = 0.3517515401706734 , f(x) = 0.8271840265571999
x_ 10000 = 0.3517383210080008 , f(x) = 0.8271840261562484
```

---

<!-- _header: 常に上手くいく？  -->


✅ 勾配降下法があまりうまくいかない関数もある


例) $f(x) = \dfrac{x^2}{10} + 10 \sin \left(\dfrac{x^2}{4} \right)$

![bg right width:600](img/ch02_f_sin.png)


---

<!-- _header: うまくいかない例　 -->

<br>
<br>


<div style="text-align: center;">

$x = 1.5$ あたりから勾配降下法をすると、$x = 0$ に収束する！

</div>

![center h:450](img/ch02_fx2_tangent_sin.png)



---

<!-- _header: 局所最適解への収束 -->

<br>

**局所最適解** ... 付近では最小値 ($x = -6, -4, 0, 4, 6$ あたりのもの全て)
**大域最適解** ... 全体で最小値 ($x = -4, 4$ あたりのもの)

![center h:380](img/ch02_f_sin.png)

---


<!-- _header: マイナーチェンジ -->

<br>
<br>

⇨ なるべく局所最適解に <span class="dot-text">ハマりまくらない</span> ように色々と工夫 (詳しくは第5回)

- Momentum
$$
v_{n+1} = \alpha v_n - \eta f'(x_n) \\
$$
$$
x_{n+1} = x_n + v_{n+1}
$$
- AdaGrad
$$
h_{n+1} = h_n + f'(x_n)^2 \\
$$
$$
x_{n+1} = x_n - \dfrac{\eta}{\sqrt{h_{n+1}}} f'(x_n)
$$
$$
\vdots
$$


---

<!-- _header: 多変数関数への応用 -->


多変数関数の場合は,微分係数→勾配ベクトル　に置き換えればOK

$$
\boldsymbol{x_{n+1}} = \boldsymbol{x_n} - \eta  \nabla f(\boldsymbol{x_n})
$$


<div class="cite">

勾配ベクトルは各変数の偏微分係数を並べたものです. 例えば $f(x, y) = x^2 + y^2$ の $(x, y)$ における勾配ベクトルは $(2x, 2y)$ です.
これを$\nabla f(x, y) = (2x, 2y)$ とかきます. 一年生はちょうど微分積分学第一でやるころかと思うので大きくは扱いませんでしたが, 一変数の場合できちんと理解できていれば大丈夫です.

</div>



---

<!-- _header: 再掲: 一般の関数の最小化 -->

## 第三問

<div class="def">


最小化してください.

$$
- \dfrac{1}{(x^2 + 1)}\log\left(\dfrac{1}{1 + e^{-x}} + 1\right)
$$


</div>

<div class="cite">

嫌です.

</div>



---

<!-- _class: lead -->
<!-- _header: 次回予告 -->

# 第三回　自動微分




<!-- PAGE BREAK -->



<!-- SLIDE: ch03/lecture.md -->

---


<div id="ch03"></div>


<!-- _class: lead-->

# 機械学習講習会 第三回
## - 「自動微分」


**traP Kaggle班**
2024/06/28


---

<!-- _header: 前回のまとめ　-->

- 損失関数の最小化を考える上で, 一般の関数の最小化を考えることにした
- 損失関数の厳密な最小値を求める必要はなく, また損失関数は非常に複雑になりうるので, 広い範囲の関数に対してそこそこ上手くいく方法を考えることにした
- たいていの関数に対して, 導関数を求めることさえできればそれなりに小さい値を探しに行けるようになった
- 逆に, <span class="lined">**「導関数」は自分で求める必要がある**</span>

---

<!-- _header: 実は -->

# いまはね


---

<!-- _header: 思い出すシリーズ: 一般の関数の最小化 -->

## 第三問


<div class="def">


最小化してください.

$$
- \dfrac{1}{(x^2 + 1)}\log\left(\dfrac{1}{1 + e^{-x}} + 1\right)
$$


</div>

---

<!-- _class: lead -->
# 😅

---

<!-- _header: 思い出すシリーズ-->

<br>

## $\mathcal{L}$ は非常に複雑になりうる

第一回では **話を簡単にするために** $f(x) = ax + b$ の形を考えたが...

<br>

(特にニューラルネットワーク以降は) **非常に複雑になりうる** 

$$
\mathcal{L}(\mathbf{W^{(1)}}, \mathbf{W^{(2)}}, \cdots, \mathbf{W^{(n)}}, \mathbf{b^{(1)}}, \mathbf{b^{(2)}}, \cdots, \mathbf{b^{(n)}}) = \dfrac{1}{n} \sum_{i=0}^{n-1} \left( y_i - {W^{(n)}}^T \sigma \left( \cdots \sigma \left( {W^{(1)}}^T x_i + b^{(1)} \right) \cdots + b^{(n-1)} \right) \right)^2, \ \sigma(x) = \dfrac{1}{1 + e^{-x}}
$$

$$
\mathcal{L} (\boldsymbol{\theta}) = \dfrac{\sum_{p \in S} |f(p; \boldsymbol{\theta}) - \mathcal{F}(p)|^2 \cdot \omega_p}{\sum_{p \in S} \omega_p}
$$

$$
\vdots
$$


---

<!-- _header: 自動微分 -->

✅ 人間が微分を行うのは限界がある
⇨ 計算機にやらせよう！



<div style="text-align: center;">

<div class="def">

<br>

# 自動微分
### (Automatic Differentiation)

</div>

</div>

<div class="cite">

正確には「自動微分」は, コンピュータに自動で微分を行わせる手法のうち, とくに関数を単純な関数の合成と見て連鎖律を利用して, 陽に導関数を求めることなく微分を行う手法を指します. (より狭義に, back propagationを用いるもののみを指すこともあるようです).　

</div>


---

<!-- _header: おしながき -->



- PyTorchの導入
- PyTorchを使った自動微分
- 自動微分を使った勾配降下法の実装
- 自動微分の理論とアルゴリズム


---

<!-- _header: PyTorch -->


![center w:1000](img/ch03_pytorch.png)




---

<!-- _header: 自動微分 -->

結論から言うと... **PyTorchを使うと微分ができる.**

```python
>>> x = torch.tensor(2.0, requires_grad=True)
>>> def f(x):
...     return x ** 2 + 4 * x + 3
... 
>>> y = f(x)
>>> y.backward()
>>> x.grad
tensor(8.)
```


( $f(x) = x^2 + 4x + 3$ の $x = 2$ における微分係数 $8$ が計算されている)

---

<!-- _header: そもそもPyTorchとは？　〜深層学習フレームワーク〜 -->

事実: 

<div class="def">

ニューラルネットワークのさまざまな派生系の



- 基本的な部品
- 部品に対してやる作業


は大体同じ！


</div>


---


<!-- _header: そもそもPyTorchとは？　〜深層学習フレームワーク〜 -->


例) 新しい車を開発するときも,部品は大体同じ,組み立ても大体同じ

<div style="text-align: center;">

⇩
 毎回同じことをみんながそれぞれやるのは面倒
⇩
<span class="dot-text">共通基盤</span> を提供するソフトウェアの需要がある

</div>


---

<!-- _header: どの組み立て機を使う？ 有名なフレームワークたち -->

<br>

- TensorFlow
    - (主に) Googleが開発したフレームワーク
    - 産業界で人気 (が, 最近はPyTorchに押され気味)
- PyTorch
    - (主に) Facebookが開発したフレームワーク
    - 研究界で人気 (最近はみんなこれ？)
- Keras
    - いろんなフレームワークを使いやすくしたラッパー (おもに TensorFLow)
    - とにかくサッと実装できる
- JAX/Flax, Chainer, MXNet, Caffe, Theano, ...

---

<!-- _header: そもそもPyTorchとは？　〜深層学習フレームワーク〜 -->

<br>

<div style="text-align: center;">

どれがいいの？
⇨ PyTorchを使っておけば間違いない (と, 思います)


</div>

![center h:300](img/ch03_tf_torch.jpg)

<div style="text-align: center;">
(赤: PyTorch, 青: TensorFlow)
</div>

---

<!-- _header: なので -->

### 今回は **PyTorch** を使います！

![bg right](img/ch03_torch.png)

- 高速な実行
- 非常に柔軟な記述
- 大きなコミュニティ
- 超充実した周辺ライブラリ
- サンプル実装の充実 (**← 重要!!**)

<div class="cite">

大体の有名フレームワークにそこまで致命的な速度差はなく, 記述に関しては好みによるところも多いです.PyTorchの差別化ポイントは, 有名モデルの実装サンプルが大体存在するという点です.
実際に論文を読んで実装するのは骨の折れる作業なので, サンプルが充実していのはとても大きな利点です.

</div>

---

<!-- _header: 今日のお話 -->

<div style="text-align: center;">


✅ 自動微分ライブラリとしての PyTorch の使い方を習得して,


## 手で微分するのをやめる

</div>


---

<!-- _header: `Tensor` 型 -->

数学の 「数」 に対応するオブジェクトとして,PyTorchでは

<div style="text-align: center;">

#  `Tensor` 型

</div>


を使う

---

<!-- _header: Tensor とは？ -->

<div class="def">

### Tensor (テンソル) 

スカラー ▶︎ ベクトル　▶︎ 行列 ... を一般化したもの。

添字 $D$ 個によって表現される量を $D$ 階のテンソルという

</div>


---

<!-- _header: Tensor とは？ -->

- スカラー: 添字 $0$ 個で値が決まる $\rightarrow$ $0$ 階のテンソル
- ベクトル: 添字 $1$ 個で値が決まる $\rightarrow$ $1$ 階のテンソル (`v = [1, 2, 3], v[0] = 1`) 
- 行列: 添字 2 個で値が決まる $\rightarrow$ $2$ 階のテンソル 
(`M = [[1, 2], [3, 4]], M[0][0] = 1`)

<div style="text-align: center;">

⇩ 例えば

</div>

`T = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]` は $3$ 階のテンソル (`T[0][0][0] = 1`)

---

<!-- _header: テンソルの例 -->

例) RGB 画像は $3$ 階のテンソル！

**$I_{i,j,k} = (i, j)$ 画素の $k$ 番目の色の強さ**

<div style="text-align: center;">
⇩　

</div>

$n$ 枚の画像をまとめたものは $4$ 階のテンソル.

**$I_{l,i,j,k} = l$ 番目の画像の $(i, j)$ 画素の $k$ 番目の色の強さ**

![bg right h:400](img/ch03_image-3.png)


<div class="cite">

画像は Quantifying Blur in Color Images using Higher Order Singular Values - Scientific Figure on ResearchGate. Available from: https://www.researchgate.net/figure/3rd-order-Tensor-representation-of-a-color-image_fig2_307091456 より

</div>

---




<!-- _header: `Tensor` 型のつくりかた -->


<div class="box" style="border-width: 3px;">

## `torch.tensor(data, requires_grad=False)`

- `data`: 保持するデータ(配列**っぽい**ものならなんでも)
  - リスト, タプル, NumPy配列, スカラ, ...
- `requires_grad`: 勾配 (gradient)を保持するかどうかのフラグ
  - デフォルトは `False`
  - 勾配の計算(自動微分)を行う場合は `True` にする 
  - このあとこいつを微分の計算に使いますよ〜という表明



</div>


---

<!-- _header: `Tensor` 型 -->

```python
>>> x = torch.tensor(2.0, requires_grad=True)
```
$2.0$ というスカラを保持する `Tensor` 型のオブジェクトを作成

```python
>>> x = torch.tensor([1.0, 2.0, 3.0], requires_grad=True)
```
$(1.0, 2.0, 3.0)$ というベクトルを保持する `Tensor` 型のオブジェクトを作成

<div class="cite">

かつては自動微分には `Variable` という名前の型が使われていて, (現在は `Tensor` 型に統合)　`Tensor` と数学の変数の概念にある程度の対応があることがわかります.


</div>

---


<!-- _header: `Tensor` 型 -->

```python
>>> x = torch.tensor([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]], requires_grad=True)
```
$\begin{pmatrix} 1.0 & 2.0 & 3.0 \\ 4.0 & 5.0 & 6.0 \end{pmatrix}$ という行列を保持する`Tensor` 型のオブジェクトを作成


(`requires_grad=True`とすれば, 勾配計算が可能な `Tensor` 型を作成できる)

---

<!-- _header: 演習1 -->

これらを勾配計算が可能な`Tensor` 型として表現してください.

1. $x = 3.0$
2. $\vec{x} = (3.0, 4.0, 5.0)$
3. $X = \begin{pmatrix} 3.0 & 4.0 & 5.0 \\ 6.0 & 7.0 & 8.0 \end{pmatrix}$

(このページの内容は, 実際にやらなくてもやり方がわかればOKです)

↓ 問題の続き次のページへ


---

<!-- _header: 演習1 -->

(実際にやってください)

4. **整数** $x = 3$ を勾配計算が可能な`Tensor` 型として表現することを試みてください.また,その結果を確認して説明できるようにしてください.

<div style="text-align: center;">

※ 次のページにヒントあり
</div>

---

<!-- _header: 演習1 ヒント -->

**1, 2, 3**: 講義資料を遡って, `torch.tensor`の第一引数と作成される`Tensor` 型の対応を見比べてみましょう.

**4**: Pythonのエラーは, 
```
~~たくさん書いてある~
~~Error: {ここにエラーの端的な内容が書いてある}
```
という形式です."~~Error"というところのすぐ後に書いてある内容を読んでみましょう.


---

<!-- _header: 演習1 解答 -->


1~3.

```python
# 1
x = torch.tensor(3.0, requires_grad=True)
# 2
x = torch.tensor([3.0, 4.0, 5.0], requires_grad=True)
# 3
x = torch.tensor([[3.0, 4.0, 5.0], [6.0, 7.0, 8.0]], requires_grad=True)
```


次のページへ

---

<!-- _header: 演習1: 解答 -->

4.  
```python
x = torch.tensor(3, requires_grad=True)
```

としてみると

>RuntimeError: Only Tensors of floating point and complex dtype can require gradients

と出力されます. これは「勾配が計算可能なのは浮動小数点数型と複素数型を格納する `Tensor`のみである」 という PyTorch の仕様によるエラーです.

---

<!-- _header: `Tensor` 型に対する演算 -->

`Tensor` 型は 「数」なので当然各種演算が可能

```python
x = torch.tensor(2.0, requires_grad=True)
```

例) 四則演算

```python
x + 2 
# -> tensor(4., grad_fn=<AddBackward0>)
```
```python
x * 2
# -> tensor(4., grad_fn=<MulBackward0>)
```

---

<!-- _header: `Tensor`型に対する演算 -->

平方根を取ったり $\sin$ や $\exp$ を計算することも可能

```python
torch.sqrt(x)
# -> tensor(1.4142, grad_fn=<SqrtBackward0>)
```

```python   
torch.sin(x)    
# -> tensor(0.9093, grad_fn=<SinBackward0>)
```

```python   
torch.exp(x)
# -> tensor(7.3891, grad_fn=<ExpBackward0>)
```

---

<!-- _header: PyTorch と 自動微分 -->

ここまでの内容は別にPyTorchを使わなくてもできること
PyTorchは **計算と共に勾配の計算ができる！**

抑えてほしいポイント:

<div class="def">

##  `requires_grad=True` である `Tensor` 型に対して計算を行うと 行われた演算が記録された `Tensor` ができる.

</div>


---


<!-- _header: PyTorch と 自動微分 -->


```python
x = torch.tensor(2.0, requires_grad=True)
```

足し算をする.
```python
y = x + 2
```



---


<!-- _header: PyTorch と 自動微分 -->


```python
print(y)
```

これの出力は,

<div class="thm">

<div style="text-align: center;">

## `tensor(4., grad_fn=<AddBackward0>)`

⇩

### 「**`Add`** という演算によって作られた」という情報を `y` が持っている！


</div>

</div>

---


<!-- _header: PyTorch と 自動微分 -->


普通の Pythonの数値では,
```python
x = 2
y = x + 2
print(y) # -> 4
```

`y`がどこから来たのかはわからない (値として $4$ を持っている **だけで、他にはない**)

---

<!-- _header: PyTorch と 自動微分 -->

## PyTorch のしている仕事

<div class="proof" style="border-radius: 100px;">

#### 1. 演算を記録してくれる
</div>


<div style="text-align: center">
⇩
</div>




![bg right h:200](img/ch03_image.png)


---

<!-- _header: PyTorch と 自動微分 -->


<div class="thm">

## ✅ PyTorchは `backward` 関数をつかって
## 記録された演算を **辿る** ことで 勾配を計算できる


</div>

---

<!-- _header: `backward` による勾配計算 -->

<br>
<br>


## 1. `Tensor` 型のオブジェクトをつくる

```python
x = torch.tensor(2.0, requires_grad=True)
```

## 2. 計算を行う

```python
y = x + 2
```

## 3. `backward` メソッドを呼ぶ

```python
y.backward()
```

すると...



---

<!-- _header: `backward` による勾配計算 -->

<div style="text-align: center;">


## ✅ `x.grad` に計算された勾配が格納される！！


</div>

```python
print(x.grad) # -> tensor(1.)
```

<div style="text-align: center;">


( $y = x + 2$ の $\dfrac{dy}{dx} \bigg|_{x=2} = 1$ が計算されている )


</div>



---



<!-- _header: PyTorch と 自動微分 -->

## PyTorch のしている仕事

<div class="proof" style="border-radius: 100px;">

#### <span style="color: gray;"> 1. 演算を記録してくれる　</span>
</div>


<div style="text-align: center">
⇩
</div>


<div class="proof" style="border-radius: 100px;">

<!-- gray -->
#### 2. 記録された演算を辿って勾配を計算する 

</div>


![bg right h:200](img/ch03_image-1.png)


---

<!-- _header: 自動微分の流れ -->

1. 変数 (`Tensor` 型)の定義
2. 計算
3. backward()
   
```python
# 1. 変数(`Tensor` 型)の定義
x = torch.tensor(2.0, requires_grad=True)
# 2. 計算
y = x + 2
# 3. backward()
y.backward()
```

すると `x.grad`に計算された勾配が格納される.


---

<!-- _header: 演習2: 100回唱えよう！ -->


定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義

---

<!-- _header: ありとあらゆる演算が自動微分可能 -->

例1) $f(x) = \sin((x + 2) + (1 + e^{x^2}))$　の微分
```python 
x = torch.tensor(2.0, requires_grad=True)
y = y = torch.sin((x + 2) + (1 + torch.exp(x ** 2))) 
y.backward()
print(x.grad()) # -> tensor(-218.4625)
```
例2) $y = x^2, z = 2y + 3$ の微分($\frac{dz}{dx}$)
```python
x = torch.tensor(2.0, requires_grad=True)
y = x ** 2
z = 2 * y + 3
z.backward()
print(x.grad) # -> tensor(8.)  ... backward()した変数に対する勾配！(この場合はz)
```

---

<!-- _header: ベクトル, 行列演算の勾配 -->

```python
x = torch.tensor([1.0, 2.0, 3.0], requires_grad=True)
y = 2 * x[0] + 3 * x[1] + 4 * x[2]
y.backward()
print(x.grad) # -> tensor([2., 3., 4.])
```

$$
\vec{x} = (x_1, x_2, x_3)^\mathsf{T} \\
$$

$$
y = 2x_1 + 3x_2 + 4x_3 
$$

$$
\frac{dy}{d\vec{x}} = \left(\frac{dy}{dx_1}, \frac{dy}{dx_2}, \frac{dy}{dx_3}\right)^\mathsf{T} = (2, 3, 4)^\mathsf{T}
$$

と対応

---

<!-- _header: ベクトル, 行列演算の勾配 -->

```python
A = torch.tensor([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]], requires_grad=True)
y = torch.sum(A)
y.backward()
print(A.grad) # -> tensor([[1., 1., 1.],
              #          [1., 1., 1.]])
```

$$
A = \begin{pmatrix}
1 & 2 & 3 \\
4 & 5 & 6
\end{pmatrix}, \ y = \sum_{i=1}^2 \sum_{j=1}^3 a_{ij} = 21
$$


$$
\frac{dy}{dA} = \begin{pmatrix}
\frac{dy}{da_{11}} & \frac{dy}{da_{12}} & \frac{dy}{da_{13}} \\
\frac{dy}{da_{21}} & \frac{dy}{da_{22}} & \frac{dy}{da_{23}}
\end{pmatrix} = \begin{pmatrix}
1 & 1 & 1 \\
1 & 1 & 1
\end{pmatrix}
$$

と対応


---

<!-- _header: 多変数関数の微分 -->

```python
x = torch.tensor(2.0, requires_grad=True)
y = torch.tensor(3.0, requires_grad=True)
z = 2 * x + 4 * y
z.backward()
print(x.grad) # -> tensor(2.)
print(y.grad) # -> tensor(4.)
```

$$
z = 2x + 4y \\
$$
$$
\dfrac{\partial z}{\partial x} = 2, \ \dfrac{\partial z}{\partial y} = 4
$$

に対応

---

<!-- _header: 注意: 実際に適用される演算さえ微分可能ならOK -->

<br>

```python
x = torch.tensor(2.0, requires_grad=True)

def f(x):
    return x + 3
def g(x):
    return torch.sin(x) + torch.cos(x ** 2)

if rand() < 0.5:
    y = f(x)
else:
    y = g(x)
```
✅  実際に適用される演算は実行してみないとわからない... 
が, 適用される演算はどう転んでも微分可能な演算なのでOK !
(if 文があるから, for 文があるから, 自分が定義した関数に渡したから...ということは関係なく, <span class="lined">**実際に Tensor に適用される演算のみが問題になる**</span>)



---


<!-- _header: 自動微分 -->

### 抑えてほしいポイント 👀

- 任意の(勾配が定義できる)計算を `Tensor` 型に対して適用すれば常に自動微分可能
- **定義→計算→backward()** の流れ
- ベクトル, 行列など任意の `Tensor` 型について微分可能. 多変数関数の場合も同様
- 「実際に適用される演算」さえ微分可能ならOK
  
---

<!-- _header: 演習3: 自動微分 -->


1. $y = x^2 + 2x + 1$ の $x = 3.0$ における微分係数を求めよ.
(https://oj.abap34.com/problems/autograd-practice-1)

1. $y = f(x_1, x_2, x_3) = x_1^2 + x_2^2 + x_3^2$ の $x_1 = 1.0, \ x_2 = 2.0, \ x_3 = 3.0$ における勾配を求めよ.
(https://oj.abap34.com/problems/autograd-practice-2)

1. $f(\boldsymbol{x_1}) = \boldsymbol{x_1}^T \begin{pmatrix}
1 & 2 \\
2 & 1 \\
\end{pmatrix} \boldsymbol{x_1}$ の $\boldsymbol{x}_1 = (1.0, 2.0)^T$ における勾配を求めよ.
(https://oj.abap34.com/problems/autograd-practice-3)




---

<!--　_header: 演習3: 解答 -->

1.
```python
x = torch.tensor(3.0, requires_grad=True)
y = x ** 2 + 2 * x + 1

y.backward()
gx = x.grad

print(gx.item()) # -> 8.0
```


<div class="cite">

スペースの都合上  `import torch`　を省略しています

</div>


---
<!--　_header: 演習3: 解答 -->

2.
```python
import torch

x1 = torch.tensor(1.0, requires_grad=True)
x2 = torch.tensor(2.0, requires_grad=True)
x3 = torch.tensor(3.0, requires_grad=True)

y = x1**2 + x2**2 + x3**2

y.backward()

print(x1.grad.item()) # -> 2.0
print(x2.grad.item()) # -> 4.0
print(x3.grad.item()) # -> 6.0
```


---


<!--　_header: 演習3: 解答 -->

3.
```python
W = torch.tensor([[1.0, 2.0], [2.0, 1.0]])
x1 = torch.tensor([1.0, 2.0], requires_grad=True)

y = torch.matmul(torch.matmul(x1, W), x1)
y.backward()

gx = x1.grad

print(*gx.numpy()) # -> 10.0 8.0
```




---

<!-- _header: 思い出すシリーズ: 勾配降下法のPyTorchによる実装 -->

<br>

$f(x) = x^2 + e^{-x}$ の勾配降下法による最小値の探索

```python
from math import exp

x = 3
lr = 0.0005

# xでの微分係数
def grad(x):
    return 2 * x - exp(-x)

for i in range(10001):
    # 更新式
    x = x - lr * grad(x)
    if i % 1000 == 0:
        print('x_', i, '=', x)
```

---

<!-- _header: 勾配降下法のPyTorchによる実装 -->
<br>
<br>

これまでは,導関数 `grad` を我々が計算しなければいけなかった
⇨ 自動微分で置き換えられる！

```python
import torch

lr = 0.01
N = 10001
x = torch.tensor(3.0, requires_grad=True)

def f(x):
    return x ** 2 - torch.exp(-x)

for i in range(10001):
    y = f(x)
    y.backward()
    x.data = x.data - lr * x.grad
    x.grad.zero_()
```

---



## 今ならこれを倒せるはず 


<div class="def">


最小化してください.

$$
- \dfrac{1}{(x^2 + 1)}\log\left(\dfrac{1}{1 + e^{-x}} + 1\right)
$$


</div>


<div style="text-align: center;">

https://oj.abap34.com/problems/minimize-difficult-function

</div>


---

<!-- _header: おまけ: 自動微分のアルゴリズム -->

## どうやって PyTorch は微分を計算しているのか？🧐

---

<!-- _header: おまけ: 自動微分のアルゴリズム -->

<div class="columns">

<div>

👦 < 微分係数を計算してください！

<div style="text-align: center;">

⇩

</div>

[いちばん素直な方法]

$\displaystyle f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$

を、小さい値で近似する 👉

</div>


<div>

<br>
<br>
<br>

```python
def diff(f, x):
    h = 1e-6
    return (f(x + h) - f(x)) / h
```



</div>  


---

<!-- _header: 勾配の計算法を考える ~近似編 -->

これでもそれなりに近い値を得られる.

例) $f(x) = x^2$ の $x=2$ における微分係数 $4$ を求める.

```python
>>> def diff(f, x):
...     h = 1e-6
...     return (f(x + h) - f(x)) / h
...
>>> diff(lambda x : x**2, 2)
4.0000010006480125  # だいたいあってる
```

---

<!-- _header: 数値微分 -->


#### 実際に小さい $h$ をとって近似する
## **「数値微分」**


お手軽だけど...

- 誤差が出る
- 勾配ベクトルの計算が非効率

![bg right h:450](img/ch03_numerical_example.png)

---


<!-- _header: 数値微分 -->

<div class="section"> 1.3 勾配降下法と機械学習 </div>


<div class="columns">



<div>

#### 問題点①. 誤差が出る 
1. 本来極限をとるのに小さい $h$ を
とって計算しているので誤差が出る

1. 分子が極めて近い値同士の引き算に
なっていて $\left( \frac{\color{red}{f(x+h) - f(x)}}{h} \right)$
桁落ちによって精度が大幅に悪化.


</div>

<div>

#### 問題点②. 勾配ベクトルの計算が非効率

1. $n$ 変数関数の勾配ベクトル $\nabla f(\boldsymbol{x}) \in \mathbb{R}^n$ を計算するには,
各 $x_i$ について「少し動かす→計算」を繰り返すので $n$ 回 $f$ を評価する. 
   
2. 応用では $n$ がとても大きくなり, 
$f$ の評価が重くなりがちなので
これが <span class="lined">**致命的**</span>


</div>

</div>

---

<!-- _header: 数式の構造を捉える -->

<div style="text-align: center;">

⇩

いい感じに数式の構造をとって計算したい

</div>

---

<!-- _header: 計算グラフ -->

### ✅ 演算は **計算グラフ** とよばれる DAG で表現できる

$t = x + y, \ z = x \times t$ の計算グラフ　👉

![bg right h:500](img/ch03_cgraph0.png)

<div class="cite">

単に計算過程を表しただけのものを Kantorovich グラフなどと呼び,
これに偏導関数などの情報を加えたものを計算グラフと呼ぶような定義もあります.
(伊里, 久保田 (1998) に詳しく形式的な定義があります)
ただ, 単に計算グラフというだけで計算過程を表現するグラフを指すという用法はかなり普及していて一般的と思われます.そのためここでもそれに従って計算過程を表現するグラフを計算グラフと呼びます.

</div>

---

<!-- _header: 計算グラフ -->


### ✅ PyTorch も **計算と同時** に <br> 計算グラフを構築


( `torchviz` というライブラリを使うと可視化できる！ )

```python
import torchviz
x = torch.tensor([1., 2., 3.], requires_grad=True)
y = torch.sin(torch.sum(x) + 2)
torchviz.make_dot(y)
```

![bg right h:550](img/ch03_image-2.png)

<br>

<br>


<div class="cite">

PyTorch のように計算と同時に計算グラフを構築する仕組みを **define-by-run** と呼びます. これに対して計算前に計算グラフを構築する方法を **define-and-run** と呼びます. かつての TensorFlow などはこの方式でしたが, 現在では **define-by-run** が主流です. 「適用される演算のみが問題になる」という節からわかるように, この方法だと制御構文などを気にせず柔軟な計算グラフの構築が可能になるからです. 一方で、静的に計算グラフを作るのはパフォーマンスの最適化の観点からは非常にやりやすいというメリットもあります.

</div>




---




<!-- _header: 計算グラフによる表現 -->

<div class="section"> 2.3 自動微分 ─式からアルゴリズムへ  </div>

(一旦計算グラフを得たものとして)　
この構造から導関数を得ることを考えてみる.

---

<!-- _header: 連鎖律 -->

<div class="section"> 2.3 自動微分 ─式からアルゴリズムへ  </div>

<div class="thm">

**[連鎖律]**

$u, v$ の関数 $x, y$ による合成関数 $z \left(x(u, v), y(u, v)\right)$ に対して,

$$
\frac{\partial z}{\partial u} = \frac{\partial z}{\partial x} \cdot \frac{\partial x}{\partial u} + \frac{\partial z}{\partial y} \cdot \frac{\partial y}{\partial u}
$$

$$
\frac{\partial z}{\partial v} = \frac{\partial z}{\partial x} \cdot \frac{\partial x}{\partial v} + \frac{\partial z}{\partial y} \cdot \frac{\partial y}{\partial v}
$$


</div>


---


<!-- _header: 連鎖律と計算グラフの対応 -->

<div class="proof">


**目標**

$
\displaystyle
\begin{split}
x &= u + v \\
y &= u - v \\
z &= x \cdot y
\end{split}
$

のとき, $\dfrac{\partial z}{\partial u}$ を求める


</div>





![bg right h:550](img/ch03_cgraph1.png)   


---

<!-- _header: 連鎖律と計算グラフの対応 -->

$$
\frac{\partial z}{\partial u} = \frac{\partial z}{\partial x} \cdot \frac{\partial x}{\partial u} + \frac{\partial z}{\partial y} \cdot \frac{\partial y}{\partial u}
$$



との対応は

![bg right h:550](img/ch03_cgraph1.png) 

---


<!-- _header: 連鎖律と計算グラフの対応 -->

$$
\frac{\partial z}{\partial u} = \color{red} \frac{\partial z}{\partial x} \cdot \frac{\partial x}{\partial u} 
\color{black} + \color{blue} \frac{\partial z}{\partial y} \cdot \frac{\partial y}{\partial u}
$$

![bg right h:550](img/ch03_cgraph1_ano.svg)


---


<!-- _header: 連鎖律と計算グラフの対応 -->

<div class="thm">

✅ 変数 $z$ に対する $u$ による偏微分の
計算グラフ上の表現


$\leftrightarrow$ **$u$ から $z$ への全ての経路の偏微分の総積の総和**



$$
\large
\frac{\partial z}{\partial u} = \sum_{p \in \hat{P}(u, z)} \  \left( \prod_{(s, t) \in p} \dfrac{\partial t}{\partial s} \right)
$$


<div style="font-size: 15px"> 

$\hat{P}(u, z)$ は $u$ から $z$ への全ての経路の集合. $(s, t)$ は変数 $s$ から変数 $t$ への辺を表す.

</div>

</div>

![bg right:25% h:550](img/ch03_cgraph1_ano.svg)

---

<!-- _header: 連鎖律と計算グラフの対応 -->

<div class="columns">

<div>

演算を **基本的な演算の合成に分解** すれば、 $\dfrac{\partial t}{\partial s}$ は事前に網羅できる！

## ⇨ **全体の勾配が求まる 🙌**


</div>

<div>

<div class="thm">


$$
\large
\frac{\partial z}{\partial u} = \sum_{p \in \hat{P}(u, z)} \  \left( \prod_{(s, t) \in p} \dfrac{\partial t}{\partial s} \right)
$$

</div>



</div>

</div>

---

<!-- _header: OO を使った典型的な自動微分の実装 -->

<div class="columns">

<div>

<br>
<br>
<br>
<br>
<br>

1. **基本的な演算**　を用意しておく.

</div>


<div>

<br>

```python
class Add:
    def __call__(self, x0: Tensor, x1: Tensor) -> Tensor:
        self.x0 = x0
        self.x1 = x1
        return Tensor(x0.value + x1.value, creator=self)

    def backward(self, gy):
        return gy, gy

class Mul:
    def __call__(self, x0: Tensor, x1: Tensor) -> Tensor:
        self.x0 = x0
        self.x1 = x1
        return Tensor(x0.value * x1.value, creator=self)

    def backward(self, gy):
        return gy * self.x1, gy * self.x0
```

</div>

</div>

---

<!-- _header: OO を使った典型的な自動微分の実装 -->

<div class="columns">


<div>
<br>
<br>



1. **変数を表すオブジェクト**を用意しておき、これの基本的な演算をオーバーライドする.

</div>

<div>

```python
class Tensor:
    def __init__(self, value):
        ...

    def __add__(self, other):
        return Add()(self, other)

    def __mul__(self, other):
        return Mul()(self, other)
```


</div>



</div>




---

<!-- _header: 連鎖律と計算グラフの対応 -->

## ✅ 実は工夫するとノード数の定数倍で勾配を計算可能！

詳しくは [Julia Tokyo #11 トーク: 「Juliaで歩く自動微分」](https://speakerdeck.com/abap34/julia-tokyo-number-11-toku-juliadebu-kuzi-dong-wei-fen) をみよう！


PyTorch でもこの方法で勾配を計算している.

---


<!-- PAGE BREAK -->



<!-- SLIDE: ch04/lecture.md -->

---

<div id="ch04"></div>

<!-- _class: lead-->

# 機械学習講習会 第四回
## - 「ニューラルネットワークの構造」


**traP Kaggle班**
2024/07/01


---

<!-- _header: 振り返りタイム -->

<div class="def">

第一回 「学習」 
第二回 「勾配降下法」
第三回 「自動微分」


</div>

---

<!-- _header: 「学習」 -->

1. 予測をするには 「モデル」 を作る必要があった
1. モデルのパラメータを決めるためにパラメータの関数である損失関数を導入した

![bg right h:500](img/ch04_icecream_scatter_regression.png)

---

<!-- _header: 「勾配降下法」 -->


1. 複雑になりうる損失関数を最小にするために **「勾配降下法」** を使ってパラメータを探索した


![bg right h:500](img/ch04_fx2_tangent_x2.png)

---

<!-- _header: 「自動微分」 -->

1. 自動微分を使うことで, 手で微分をしなくても勾配を得て勾配降下法を適用できるようになった

![bg right h:500](img/ch04_cgraph-complex.png)

---




<!-- _header: 振り返りタイム -->

1. 予測をするには 「モデル」を作る必要があった
2. モデルのパラメータを決めるために, パラメータの関数である損失関数を導入した
3. 損失関数を最小にするパラメータを求めるために勾配降下法を導入した
4. 自動微分によって手で微分する必要がなくなった  [← 今ココ！]




---


<!-- _header: 第三回までのまとめ　-->

## われわれができるようになったこと

データさえあれば...誤差を小さくするパラメータを

- 例え複雑な式でも
- 例え自分で導関数を見つけられなくても

探しにいけるようになった！
(== **学習ができるようになった！**)

---

<!-- _header: 線形回帰からの飛躍 -->

ここまでは $f(x) = ax + b$ のかたちを仮定してきた (線形回帰)

⇨ われわれの手法はこの仮定に依存しているか？ 🧐


<div style="text-align: center;">

　⇩

# <span class="lined"> 依存していない </span>

(ように手法を選んだ！)

</div>


---


<!-- _header: 線形回帰からの飛躍 -->


<br>

我々の手法 (自動微分と勾配降下法による学習) で満たすべき条件だったのは...


# $L(a, b)$ が $a, b$ について
# 微分可能である

**のみ！**

⇨ この条件を満たす関数なら <span class="dot-text">**どんなものでも**</span> 学習できる！


---

<!-- _header: 今日のお話は... -->

##  $\large f$ を変えよう


<div style="text-align: center;">



</div>

$$
\LARGE
L(a, b) = \sum_{i=0}^{n-1} (y_i - \color{red}{\underline{f}}  \color{black}{(x_i)})^2
$$



---

<!-- _header: 線形回帰からの飛躍 -->


$f(x) = ax + b$　は, $a, b$ をどんなに変えても常に直線
⇨ 直線以外の関係を表現できない

![bg right h:500](img/ch04_icecream_scatter_regression.png)



---

<!-- _header: どんな関数をつかうべきか? -->
 
$f(x) = ax^2 + bx + c$ でも大丈夫

$f(x) = \sin(ax + b)$ でも大丈夫

$f(x) = e^{ax + b}$  でも大丈夫

⇨ 直線以外を表現することはできるが

- 二次曲線
- sinカーブ
- 指数カーブ(?)

しか表現できない

---

<!-- _header: 複雑な関数を表現する方法を考えよう！ -->

これらのパラメータどんなにいじっても

![bg right h:450](img/ch04_curve.png)


👉 

みたいな関数は表現できない




---


<!-- _header: 複雑さを生み出す方法 -->

#### ✅ アイデア1: 関数を合成する

$\exp, \sin, x^2 + x$ はそれぞれ非線形単純な関数



一方, 合成した $h(x) = \exp(\sin(x^2 + x))$ は　👉

![bg right h:430](img/ch04_hx.png)

<div class="cite">

**非線形でなくてはいけないことに注意してください！**
$f_i(x) = a_i x + b_i$ は、 $f_1 ( f_2 ( f_3 ( \cdots f_n(x) \cdots ) ) )$ が
$a_1 ( a_2 ( a_3 ( \cdots a_n x + b_n \cdots ) ) ) + b_1$ となって結局 $ax + b$ の形になってしまいます。

</div>



---

<!-- _header: 複雑さを生み出す方法 -->

#### ✅ アイデア2: 和をとる



---

<!-- _header: 複雑さを生み出す方法 -->

三角関数を 3つ用意

- $f_1(x) = \sin(0.5 x)$
- $f_2(x) = \cos(0.8 x)$
- $f_3(x) = \sin(0.75 x)$

✔︎ それぞれは単純.

![bg right h:450](img/ch04_basis_sincos.png)



---

<!-- _header: 複雑さを生み出す方法 -->

一方, 重み付き和をとると

$f(x) = 3  f_1(x) - 2 f_2(x) + f_3(x)$

![bg right h:450](img/ch04_basis_sum.png)

そこそこ複雑になっている 👉


---
<!-- _header: ぐにゃっとした関数の表現のしかた -->


<div class="thm">

### ✅ 簡単めの非線形関数の
### 1. 合成
### 2. 和
### を考えたら結構複雑なやつも表現できる

</div>


---


<!-- _header: パラメータを変えることによって幅広い表現が得られる確認 -->


パラメータとして
$\boldsymbol{a} = (a_1, a_2, a_3, a_4, a_5)$,
$\boldsymbol{b} = (b_1, b_2, b_3, b_4, b_5)$,
$\boldsymbol{c} = (c_1, c_2, c_3, c_4, c_5)$
をもつ
$$
f(x; \boldsymbol{a}, \boldsymbol{b}, \boldsymbol{c}) = \sum_{i=1}^5 a_i \sin(b_i x + c_i)
$$　

を考える

<div style="text-align: center;">

⇩

</div>


---


<!-- _header: パラメータを変えることによって幅広い表現が得られる確認 -->


$\boldsymbol{a} = (0.83, 0.27, 0.84, 0.28, 0.14)^T$
$\boldsymbol{b} = (0.71, 0.47, 0.56, 0.39, 0.94)^T$
$\boldsymbol{c} = (0.08, 0.92, 0.16, 0.44, 0.21)^T$　
のとき

![bg right h:450](img/ch04_random_model2.png)


---

<!-- _header: パラメータを変えることによって幅広い表現が得られる確認 -->

$\boldsymbol{a} = (0.39, -0.29, -0.67, -0.96, 0.92)^T$

$\boldsymbol{b} = (-0.35, 0.84, 0.22, -0.25, -0.04)^T$

$\boldsymbol{c} = (-0.61, -2.06, 3.97, 0.40, -3.85)^T$

のとき


![bg right h:450](img/ch04_random_model.png)

---


<!-- _header:  「基になる関数」はどう選ぶべきか？　-->


和をとる 「<span class="dot-text">基になる関数</span>」 にどのような関数を選ぶべきか？

- 三角関数?
- 多項式関数?
- 指数関数?
- もっと別の関数?


これまでの我々のアプローチを思い出すと...

<div style="text-align: center;">

<div class="proof">

**変化させるのが可能なところはパラメータにして, 学習で求める**」


</div>

</div>

---


<!-- _header:  「基になる関数」はどう選ぶべきか？　-->


# 「基になる関数」も
#  学習で求めよう


---

<!-- _header: ニューラルネットワーク -->


<br>

<div style="text-align: center;">

# ニューラルネットワーク

</div>

![bg blur:10px w:1000](img/ch04_image-1.png)


---

<!-- _header: ニューラルネットワーク -->

<div class="box">

[事実1] 
**最近流行りの機械学習モデルはたいていニューラルネットワークをつかっている**


</div>




![bg right vertical h:100](img/ch04_image-2.png)

![bg right h:300](img/ch04_image-4.png)

![bg right h:200](img/ch04_image-3.png)

<div class="cite">
上の画像は ChatGPT のロゴ.
中央の画像は https://diamond.jp/articles/-/241828 より.
 Ponanza と佐藤天彦名人の対局.  下の画像は StableDiffusion という画像生成モデルが生成した画像.

</div>


---

<!-- _header: ニューラルネットワーク -->

<div class="box">

[事実2] 
**ある程度以上複雑なタスクではニューラルネットワークが最も優れた性能を示すことが多い**


</div>


![bg right h:400](img/ch04_image-5.png)


<div class="cite">

グラフはILSVRC という画像認識の大会でニューラルネットワークを使ったモデル (AlexNet) が登場し, 圧倒的な精度で優勝した際のスコア.
https://medium.com/coinmonks/paper-review-of-alexnet-caffenet-winner-in-ilsvrc-2012-image-classification-b93598314160 から. 

</div>


---

<!-- _header: 今日の内容 -->

### 1. ニューラルネットワークの基本的な概念の整理
### 2. 全結合層の理解


---



<!-- _header: ニューラルネットワークの構造　-->

**基本単位: レイヤー**

ニューラルネットワークは 「レイヤー」と呼ばれる基本的な関数の合成によって構成されるモデル

![center h:250](img/ch04_layer2.svg)


---

<!-- _header: ニューラルネットワークの構造　-->

<br>

- 入力層
入力を受け取る部分

- 出力層
出力を出力する部分

- 中間層(隠れ層, hidden layer)
それ以外

![bg right h:250](img/ch04_layer2.svg)

<div style="text-align: center;">

⇩

データの流れは,
**$x$ →入力層→中間層...→出力層 = $y$**

</div>


---

<!-- _header: いろいろなレイヤー -->

PyTorch本体ででデフォルトで定義されているものだけで 160個以上? [1]

<div class="cite">

[1] `torch.nn.Module` のサブクラスの数を数えました.正確な数でないかもしれません.

</div>


---

<!-- _header: 全結合層 (Linear, Dense層) -->

## もっとも普遍的・基本のレイヤー

先に全ての情報を書くと....

<div class="def">

## 全結合層 (Linear, Dense層)

パラメータ $W \in \mathbb{R}^{m \times n}, \ \boldsymbol{b} \in \mathbb{R}^m$ と 

各レイヤーが固有にもつ活性化関数 $\sigma$ を用いて


入力として $\boldsymbol{x} \in \mathbb{R}^n$ を受け取り, $\sigma \left(W \boldsymbol{x} + \boldsymbol{b} \right)$ を出力する.


</div>




---


<!-- _header: 全結合層 (Linear, Dense層) -->

(これでわかったら苦労しないので、一つずつ見ていきます)



---

<!-- _header: 全結合層がしていること -->


1. $n$ 個の入力を受け取り,$m$ 個出力する


2. 複雑な関数を表現するアイデア...


   <div class="thm">
   
   1. 非線形関数の合成
   2. 和をとる
   
   </div>


    をする



---

<!-- _header: 全結合層がしていること -->

#### 1. $n$ 個の入力を受け取り, $m$ 個出力する



<div class="box">


パラメータ $W \in \mathbb{R}^{m \times n}, \ \boldsymbol{b} \in \mathbb{R}^m$ と 

各レイヤーが固有にもつ活性化関数 $\sigma$ を用いて


入力として $\boldsymbol{x} \in \mathbb{R}^n$ を受け取り, $\sigma \left(W \boldsymbol{x} + \boldsymbol{b} \right)$ を出力する.

</div>

👆 丁寧に計算の次元を追ってみよう！




---


<!-- _header: 合成 -->

演算を $d$ 回繰り返す


($n$ 次元ベクトル → $m_1$, → $m_2$, → $\cdots$, → $m_d$ 次元ベクトルへと変換されながら
計算が進んでいく)


$$
\boldsymbol{u}^{(1)} = \sigma \left(W^{(1)} \boldsymbol{x} + \boldsymbol{b}^{(1)} \right)
$$

$$
\boldsymbol{u}^{(2)} = \sigma \left(W^{(2)} \boldsymbol{u}^{(1)} + \boldsymbol{b}^{(2)} \right)
$$

$$
\cdots
$$

$$
\boldsymbol{u}^{(d)} = \sigma \left(W^{(d)} \boldsymbol{u}^{(d-1)} + \boldsymbol{b}^{(n)} \right)
$$


---

<!-- _header: 全結合層がしていること -->

1. 複雑な関数を表現するアイデア...


   <div class="thm">
   
   1. 非線形関数の合成
   2. 和をとる
   
   </div>


    をする




---



<!-- _header: 活性化関数とは？ -->

<br>
<br>


出力前に通す **非線形関数 $\sigma$**
 ( $\sigma \left(W \boldsymbol{x} + \boldsymbol{b} \right)$ )

- シグモイド関数
  $\small \sigma(x) = \dfrac{1}{1 + \exp(-x)}$

- ReLU関数
$\small  \mathrm{ReLU}(x) = \max(0, x)$

- tanh関数
$\small  \tanh(x) = \dfrac{\exp(x) - \exp(-x)}{\exp(x) + \exp(-x)}$

など (大量に存在)


![bg right h:800](img/ch04_activation.png)

---

<!-- _header: なぜ活性化関数が必要か？ -->


<div style="text-align: center;">

**✅ 最後に非線形関数を通すことで全結合層が非線形関数になる.** 

今できたこと $\cdots$ 全結合層を非線形にする.


⇩


これを合成している！ 

$=$ **非線形関数の合成**


</div>

---

<!-- _header: アイデア1. 合成 -->

<div style="text-align: center;">

非線形関数の合成を繰り返す ⇨ 複雑な関数を表現

<br>

</div>

![center h:250](img/ch04_layer2.svg)


---

<!-- _header: アイデア2. 和をとる -->

$m$ 個の出力のひとつに注目してみる.



<div style="text-align: center;">

$\boldsymbol{y} = \sigma \left(W \boldsymbol{x} + \boldsymbol{b} \right)$  

⇩

$y_i = \sigma \left( \displaystyle{\sum_{j} W_{ij} x_j + b_i} \right)$

</div>


![bg right w:500](img/ch04_linear.svg)




---

<!-- _header: 分解して考えると -->

$y_i = \sigma \left( \displaystyle{\sum_{j} W_{ij} x_j + b_i} \right)$ は, 

![bg right h:400](img/ch04_basis_sincos.png)

<span class="lined">**非線形関数の和をとる**</span> と

同じことをしている！！

---


<!-- _header: 分解して考えると -->

$y_i = \sigma \left( \displaystyle{\sum_{j} W_{ij} x_j + b_i} \right)$



**各層の入力 $x_j$ はそれまでの層で $\sigma$ を通ってきたもの！**

$\leftrightarrow$ $x_j$ は <span class="lined">**非線形**</span>

![bg right h:250](img/ch04_layer2.svg)

---

<!-- _header: 複雑な関数が生まれていた -->

<div style="text-align: center;">



$\sigma \left( \displaystyle{\sum_{j} W_{ij} x_j + b_i} \right)$

⬇︎

非線形関数の重みつき和

⬇︎

複雑な非線形関数を表現できる！ + **さらにそれを非線形関数に通す**


</div>



---



<!-- _header: 出力層　-->




<div style="text-align: center;">

## + 各層で和をとる「基になる関数」は、
## それまでの層のパラメータによって変化する

</div>



---


<!-- _header: というわけで　-->


# 「基になる関数」も
#  学習で求めよう



---

<!-- _header: MLP -->


<div style="text-align: center;">

とくに 全結合層のみからなるニューラルネットワークを
**多層パーセプトロン (Multi Layer Perceptron, MLP)** という

</div>


![center h:350](img/ch04_layer.svg)


---

<!-- _header: そのほかの用語たち -->

<!-- DNN (Deep Neural Network) ... 複数の隠れ層を持つニューラルネットワーク
ANN (Artificial Neural Network) ... 人工ニューラルネットワーク.本来の意味のニューラルネットワーク(動物の神経回路) と区別するため -->


| 用語                            | 意味                                                                                                                         |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| MLP (Multi Layer Perceptron)    | 全結合層のみからなるニューラルネットワーク                                                                                   |
| DNN (Deep Neural Network)       | 複数の隠れ層を持つニューラルネットワーク                                                                                     |
| ANN (Artificial Neural Network) | 人工ニューラルネットワーク.本来の意味のニューラルネットワーク(動物の神経回路) と区別するためこういう名前が使われることがある |


---

<!-- _header: ニューラルネットワークの性質 -->


そもそも直線をやめたくなった動機:
👦 < 直線だけしか表現できないのは困る. 
👩 < いろいろな関数が表現できるようになりたい.


<div style="text-align: center;">

⇩

どれくらいの関数が表現できるようになったのか？

</div>

---

<!-- _header: ニューラルネットワークの万能近似性 -->


## 結論

# 直線 ⇨ なんでも ※ 


<div class="cite">

※ ざっくりとした表現です.

</div>

---

<!-- _header: ニューラルネットワークの万能近似 -->




<div class="info">

### ニューラルネットワークの万能近似定理 (普遍性定理)

隠れ層を一つ持つニューラルネットワークは,
任意の連続関数を表現できる ※

</div>


<div class="cite">

※ ざっくりとした表現です.

</div>


---

<!-- _header: 今日のまとめ -->

- 我々の学習手法は, $f(x) = ax + b$ というモデルの構造自体に直接依存しているわけではなかった
- $f(x) = ax + b$ というモデルの構造では直線しか表現することができないので, 違う形を考えることにした
- 「基になる」簡単な関数の **合成** と **和** を考えることでかなり複雑な関数も表現できることがわかった
- 「基になる」関数の選び方を考える上で, この関数自体もパラメータによって変化させるモデルとしてニューラルネットワークを導入した
- ニューラルネットワークは非常に幅広い関数を表現できることがわかった


---



<!-- _header: 発展的話題:万能近似の(直感的な) <span class="dot-text">説明</span> -->


- ニューラルネットワークの表現能力は 1980年代後半 ~ 1990年代後半くらいまで盛んに研究
- いろいろな条件でいろいろな結果を得ている
- ここではおそらく最も有名である Cybenko による定理 [1] を紹介する

<div class="cite">

[1] Cybenko, George. "Approximation by superpositions of a sigmoidal function." Mathematics of control, signals and systems 2.4 (1989): 303-314.


</div>

---


<!-- _header: 準備-->

<br>


<div class="box">

**準備**

<div class="def">

**定義1. シグモイド型関数**

$$
\sigma(x) \to \left\{
\begin{array}{ll}
0 & (x \to -\infty) \\
1 & (x \to \infty)
\end{array}
\right.
$$

を満たす関数を「シグモイド型関数」と呼ぶ.

</div>



<div class="def">

$I = [0, 1]^d$ として,$C$ を $I$ 上の連続関数全体の集合とする.


</div>


</div>



---

<!-- _header: 主張　-->

<div class="thm">

**定理 (Cybenko, 1989)**

<br>

任意の $f \in C, \ \varepsilon > 0$ に対して,ある  $g(x) = \sum_{i=1}^{n} a_i \sigma(b_i x + c_i)$ が存在して

$$
\forall x \in I, \ |f(x) - g(x)| < \varepsilon
$$


<br>


</div>



---

<!-- _header: 主張　-->

平易に書くと,

**どんな連続関数も隠れ層が一つのニューラルネットワークで十分に近似できる**

---


<!-- _header: ステップ1. シグモイド型関数をつかった階段関数のつくりかた -->

$$
\large
g(x) = \sum_{i=1}^{n} a_i \sigma(b_i x + c_i)
$$


$$
\small
\left(\sigma(x) \to \left\{
\begin{array}{ll}
0 & (x \to -\infty) \\
1 & (x \to \infty)
\end{array}
\right. \ \right)
$$


<br>

$\sigma$ はシグモイド型関数 ⇨ $b_i$ をものすごく大きくするとどうなるか？



---


<!-- _header: 証明ステップ1 -->



$b_i = 9999999999999999999999999999999999999999$

とする.

すると, $x_i - \dfrac{c_i}{b_i}$ が少しでも正なら 

$\sigma(b_i x + c_i) = 1$ 

負なら
$\sigma(b_i x + c_i) = 0$.


![bg right h:400](img/ch04_step.png)





---


<!-- _header: 証明ステップ1 -->

$\sigma(b_ix + c_i)$ は $b_i = 999999999999999999999999999999999999999999999999999999999999999999999$

とすると $x_i - \dfrac{c_i}{b_i}$ が少しでも正ならば $1$, そうでなければ $0$ になる.

⇨ $c_i$ を適当に調整すれば, 狙った点 $t$ で

$$
\sigma(b_i x + c_i) = \left\{
\begin{array}{ll}
1 & (x > t) \\
0 & (x \leq t)
\end{array}
\right.
$$

とすることができる.　(例: $b_i = 10^{100}, c_i = 2 \times 10^{100}$ なら $t = 2$)

 
さらに $b_i$ を負の非常に大きい数にすると, <span class="lined">**逆のバージョンも作れる.**</span>

---

<!-- _header: 証明ステップ2. 矩形関数の作り方 -->
<br>
<br>

✅ すると 正の大きな数によってステップ関数にしたものと
負の大きな数によってステップ関数にしたものを足し合わせることで
<span class="lined">**矩形関数を作ることができる！**</span>

![](img/ch04_square.png)


---

<!-- _header: 証明ステップ3. -->


**✅ これさえできればもうOK**

連続関数を全て**矩形関数の和**としてみればよい.

![bg right h:450](img/ch04_riemann.png)


---

<!-- _header: 万能近似できるからいい？ -->


任意の連続関数を近似できるモデルはニューラルネットワークだけ？

⇨ **全然ふつうにNO.**

❌「万能近似ができるからニューラルネットワークがよくつかわれる」
 
 \+ あくまでそのような $\boldsymbol{a}, \boldsymbol{b}, \boldsymbol{c}$ が存在するという主張であって、
 <span class="lined"> **それを求める方法については何ら保証していない**</span> 


<div style="text-align: center;">

⇩

</div>


ニューラルネットワークの優位性を考えるなら,もうすこし議論を進めていく必要がある

---

<!-- _header: 「深さ」は必要？ -->

<!-- 文字少し小さく -->

<style>
    .small {
        font-size: 85%;
    }
</style>

<div class="small">

この結果の主張: 
**十分幅が広い「隠れ層」が一つあれば十分**

世の中の主張: 
**たくさんの層があるNNがよく機能する**


<div style="text-align: center;">
　
⇩　なぜ？

</div>


A. 層を深くすると指数関数的に表現力が上がり, 幅を広くすると多項式的に表現力が上がる. [1]


![bg right h:300](img/ch04_image-7.png)

</div>

<br>

<div class="cite">

[1] Montufar, Guido F., et al. "On the number of linear regions of deep neural networks." Advances in neural information processing systems 27 (2014).
画像も同論文より


</div>


---



<!-- PAGE BREAK -->



<!-- SLIDE: ch05/lecture.md -->

---

<div id="ch05"></div>

<!-- _class: lead-->

# 機械学習講習会 第五回
## - 「ニューラルネットワークの学習と評価」


**traP Kaggle班**
2024/07/03


---


<!-- _header: 振り返りタイム -->


- 我々の学習手法は, $f(x) = ax + b$ というモデルの構造自体に直接依存しているわけではなかった
- $f(x) = ax + b$ というモデルの構造では直線しか表現することができないので, 違う形を考えることにした
- 「基になる」簡単な関数の **合成** と **和** を考えることでかなり複雑な関数も表現できることがわかった
- 「基になる」関数の選び方を考える上で, この関数自体もパラメータによって変化させるモデルとしてニューラルネットワークを導入した
- ニューラルネットワークは非常に幅広い関数を表現できることがわかった


---

<!-- _header: DNNの学習はむずかしい？ -->


<div style="text-align: center;">

ニューラルネットワークは非常に多くのパラメータをもつ
(例: 全結合層はそれぞれ $W \in \mathbb{R}^{n \times m}$ と $b \in \mathbb{R}^m$ のパラメータを持つ)

⇩

**学習はそれなりに難しいタスク**


</div>


---


<!-- _header: DNNの学習はむずかしい？   -->

ニューラルネットワーク研究の歴史を遡ってみると...?

<div style="text-align: center;">

⇩

</div>


😯 実は真空管で計算をしている時代からニューラルネット(の原型)が作られて計算されていた


![bg right h:300](img/ch05_image-4.png)

<div class="cite">

右は真空管を使ったパーセプトロンの計算機を作っている Frank Rosenblatt. 
10ニューロン程度のパーセプトロンを作っていたらしい. 
(画像は https://news.cornell.edu/stories/2019/09/professors-perceptron-paved-way-ai-60-years-too-soon より)

</div>


---


<!-- _header: DNNの学習はむずかしい？   -->




- 1986年ごろ: 多層パーセプトロン
  → ニューラルネットで全部表現できる！すごい！！
  → 数学的な研究も進み始める (Hecht-Nielsen, 1987 や Cybenko, 1989 など)

---

<!-- _header: DNNの学習はむずかしい？   -->

1990年 ~ 2000年代

- ニューラルネットワークを大きくしていくと学習がとたんに難しくなる 😔
 (= まともなパラメータを獲得してくれない)

<div style="text-align: center;">

⇩

研究も下火に


</div>

---

<!-- _header: 学習手法の進化 -->




![bg right h:330](img/ch05_hinton.jpeg)

<div class="box">

## **Geoffrey  Hinton**

DBN (Deep Belief Network) やオートエンコーダに関する研究 [1][2] を通じて DNN の学習の安定化に大きく貢献


</div>

<div class="cite">



[1] Hinton, Geoffrey E., Simon Osindero, and Yee-Whye Teh. "A fast learning algorithm for deep belief nets." Neural computation 18.7 (2006): 1527-1554.
[2] Hinton, Geoffrey E., and Ruslan R. Salakhutdinov. "Reducing the Dimensionality of Data with Neural Networks." Science, vol. 313, no. 5786, 2006, pp. 504-507. doi:10.1126/science.1127647.


</div>


---

<!-- _header: 学習手法の進化 -->


<div style="text-align: center;">


<div class="box">

活性化関数の進化 (ReLU)
Dropout
Batch Normalization
オプティマイザの進化 (Adam, RMSprop ...)

</div>


⇩


<div class="def">


**✅ DNN の学習を比較的安定して行えるように**


</div>


</div>

---

<!-- _header: 今日のおしながき① -->


## ✅ DNN の学習を安定的に, 効率的に行う技法を知る

---

<!-- _header: 勾配降下法の復習 -->

### 微分係数

![bg right h:700](img/ch05_fx2_tangent.png)


<div style="text-align: center;">

  $f'(x)$ は $x$ における接線の傾き

  ⬇︎

  <div class="proof">
  
  
  $-f'(x)$ **方向に関数を
  すこし動かすと関数の値はすこし小さくなる**

  
  </div>

</div>

---

<!-- _header: 勾配降下法の復讐 -->




<div class="def">


## 勾配降下法


関数 $f(x)$ と初期値 $x_0$ が与えられたとき,
次の式で $\{x_k\}$ を更新するアルゴリズム

$$
x_{k+1} = x_k - \eta f'(x_k)
$$

($\eta$ は**学習率**と呼ばれる定数)

</div>



---

<!-- _header: 今日やること1. 「ニューラルネットワーク向け」の学習 -->

勾配降下法...  $x_{n+1} = x_n - \eta f'(x_n)$


をニューラルネットワークに適用するための色々な技法

<div class="proof">

🔲 初期化 ( $x_0$ を決める)

⇩

🔲 計算 ( $x_{n+1} = x_n - \eta f'(x_n)$ を計算する)


</div>

のそれぞれをカスタマイズします


---

<!-- _header: 今日やること1. 初期値  -->

勾配降下法...  $x_{n+1} = x_n - \eta f'(x_n)$


✅ $x_0$ は 自分でが決めなければいけなかった！

---

<!-- _header: 今日やること1. 初期値  -->

<span class="dot-text">一般の</span> $f$ を最小化するとき

⇨ 初期値として普遍的にいい値はない

⇨ <span class="lined">**NNは構造が固定されているのでいい初期値を考えられる**</span>


---


<!-- _header: 初期値の決め方 -->



## 1. Xavierの初期値
## 2. Heの初期値



---


<!-- _header: 初期値の決め方 -->

<div class="thm">

### Xavier (Glorot) の初期値


$$
\begin{cases}
W_{i, j} \sim \mathcal{U}\left(-\sqrt{\dfrac{6}{n + m}}, \sqrt{\dfrac{6}{n + m}}\right) \\

b_j = 0
\end{cases}
$$

</div>


<div class="cite">

Glorot, Xavier, and Yoshua Bengio. "Understanding the difficulty of training deep feedforward neural networks." Proceedings of the thirteenth international conference on artificial intelligence and statistics. JMLR Workshop and Conference Proceedings, 2010.

</div>

---

<!-- _header: Xavierの初期値: 気持ち -->

## 活性化関数にとって得意なところで計算が進んでほしい.

---

<!-- _header: シグモイド関数の性質 -->


- 出力が $0$ または $1$ に <span class="dot-text">貼り付く</span>
- $|x|$ が大きいと勾配がほぼ $0$


![bg right h:500](img/ch05_sigmoid.png)


---


<!-- _header: 勾配消失 -->


<div style="text-align: center;">

$$
x_{k+1} = x_k - \eta \color{red} f'(x_k)
$$
⇩



**勾配がほとんど $0$ だと**
**学習がなかなか進まなくなる❄️**

</div>


![bg right h:500](img/ch05_sigmoid.png)

---


<!-- _header: 思い出すシリーズ: 複雑さを生む -->

<br>

### ✅ 全結合層は非線形関数の和をとって複雑な関数を作っていた

|                                           |                                        |
| ----------------------------------------- | -------------------------------------- |
| ![h:350 horizontal](img/ch05_basis_sincos.png) | ![h:350 horizontal](img/ch05_basis_sum.png) |



---


<!-- _header: 思い出すシリーズ: 複雑さを生む -->

<br>

ほとんど同じような「基になる関数」をとっても効率がわるい

![center h:400](img/ch05_linear_combination.png)


---

<!-- _header: 各層で分散を維持する -->

 <span class="lined">**出力と勾配両方**</span> について

- 上下に貼り付く (分散大)
- ほとんど同じ値 (分散小)

にならないように
$\Leftrightarrow$ 分散を維持するようにすると

$\mathcal{U}(-\sqrt{6/(n+m)}, \sqrt{6/(n+m)})$ 

がいい初期値になる

![bg right h:400](img/ch05_sigmoid_highlight.png)



---



<!-- _header: 初期値の決め方 -->

シグモイド関数はよくない性質 ($=$ 勾配消失) がある！
⇨ 次第に $\textrm{ReLU}(x) = \max(0, x)$ が使われるようになる

<div style="text-align: center;">

⇩ **ReLU 向けの初期値** (導出は Xavier と一緒)

</div>


<div class="thm">

### He (Kaiming) の初期値

$$
W_{i, j} \sim \mathcal{N} \left(0, \sqrt{\dfrac{2}{n}}\right)
$$

</div>


<div class="cite">

He, Kaiming, et al. "Delving deep into rectifiers: Surpassing human-level performance on imagenet classification." Proceedings of the IEEE international conference on computer vision. 2015.

</div>

---

<!-- _header: 導出から自然にわかること -->

<span class="lined">**モデルの構造 (とくに活性化関数) によって適切な初期値のとり方が変わってくる！**</span>

例) SIREN [1] という活性化関数に $\sin$ を使うモデルは $\small \mathcal{U}\left(-\sqrt{6 / n}, \sqrt{6 / n}\right)$ がいいとされている
![bg right h:600](img/ch05_image-6.png)

<div class="cite">

[1] Sitzmann, Vincent, et al. "Implicit neural representations with periodic activation functions." Advances in neural information processing systems 33 (2020): 7462-7473.
画像も同論文より引用

</div>

---

<!-- _header: ちゃぶ台ひっくり返し -->

1. 初期値で頑張る
2. モデルの中で直してしまう

---


<!-- _header: Batch Normalization -->

<div class="box">

### Batch Normalization

- 入力をミニバッチごとに正規化するレイヤー

</div>


⇨ 学習の効率化にかなり役立ち <span class="dot-text">**初期化の影響を受けにくくする**
 </span>


<div class="cite">

Ioffe, Sergey, and Christian Szegedy. "Batch normalization: Accelerating deep network training by reducing internal covariate shift." International conference on machine learning. pmlr, 2015.

</div>



---

<!-- _header: おまけ: 「乱数」は初期値に必要か？ -->

### 実は決定論的にやってもよい？

## ⇨ **ZerO Initialization** [1]

✅ 乱数生成をやめると再現性が向上してうれしい.


<div class="cite">

[1] Zhao, Jiawei, Florian Schäfer, and Anima Anandkumar. "Zero initialization: Initializing neural networks with only zeros and ones." arXiv preprint arXiv:2110.12661 (2021).

</div>

---


<!-- _header: 初期値のまとめ -->

- 適切な初期値を選ぶことで学習の安定性を向上させることができる
- Xavierの初期値, Heの初期値などがよく使われる
- 一方, 近年は初期値にそこまで神経質にならなくてもよくなりつつある
  - さらに一方で (!?) 特殊なネットワークではそれに適した初期値を使うとよい

---

<!-- _header:  ミニバッチ学習 -->



<div class="proof">

☑️ 初期化 ( $x_0$ を決める)　← Done!

⇩

🔲 計算 ( $x_{n+1} = x_n - \eta f'(x_n)$ を計算する)


</div>

---

<!-- _header:  オプティマイザ -->

🔲 $x_{n+1} = x_n - \eta f'(x_n)$

$f(x_n)$ の計算はできるようになった

<div style="text-align: center;">

⇩

</div>

**われわれは自動微分が使えるので**
**これで $f'(x_n)$ も計算できる 🤗**

<div style="text-align: center;">

⇩

</div>

計算の過程もカスタマイズする！

![bg right h:400](img/ch05_torch.png)


---

<!-- _header:  確率的勾配降下法 -->

<div class="def">

## 確率的勾配降下法 (SGD)

データの **一部** をランダムに選んで,
そのデータに対する勾配を使ってパラメータを更新する


</div>


---

<!-- _header: 思い出すシリーズ: 局所最適解 -->

<div class="box">

**局所最適解** ... 付近で最小
**大域最適解** ... 全体で最小

</div>


![bg right h:350](img/ch05_fx2_tangent_sin.png)


---

<!-- _header: NNの「損失平面」 -->




https://www.telesens.co/loss-landscape-viz/viewer.html で見てみよう！




![bg right h:350](img/ch05_image-2.png)

<span style="font-size: 0.7em">(⚠️🚨 実際に右の3次元空間上で探索しているわけではないです！！！)</span>

<div class="cite">

Li, Hao, et al. "Visualizing the loss landscape of neural nets." Advances in neural information processing systems 31 (2018).

画像も同論文より

</div>

---

<!-- _header: 局所最適解にハマらないようにするには？ -->

谷からの脱出方法

### ⇨ <span class="dot-text">ランダム性</span> を入れる


---

<!-- _header: 局所最適解にハマらないようにするには？ -->

<div style="text-align: center;">

データを選ぶときに
ランダム性が入る！

⇩


<span class="lined">**局所最適解にトラップされない**</span>


</div>


![bg right h:400](img/ch05_local_minima.png)



---

<!-- _header: 更新式の改善 -->

<div style="text-align: center;">

<span class="dot-text">プレーン</span> な勾配降下法の更新式

$$
x_{n+1} = x_n - \eta f'(x_n)
$$


</div>

---


<!-- _header: オプティマイザ -->


- 学習率に鋭敏でなく
- 安定して
- 高速に
- 高い性能を得る

ためにいろいろなオプティマイザが提案されている 

(PyTorch 本体には13個)


![bg right](img/ch05_image-7.png)

<div class="cite">

画像は https://pytorch.org/docs/stable/optim.html より (2024年7月3日)

</div>

---

<!-- _header: オプティマイザの工夫の例: Momentum -->

<div class="def">

## Momentum

$$
\begin{cases}
v_{n+1} = \alpha v_n - \eta f'(x_n) \\
x_{n+1} = x_n + v_{n+1}
\end{cases}
$$

</div>



---

<!-- _header: Momentum -->

![center w:600](img/ch05_image-8.png)


---


<!-- _header: 局所最適解の谷の例 -->



✅ $f(x, y) = \dfrac{x^2}{4} + 16y^2$ 

の最小値 

$x = 0, \  y = 0$

 を勾配降下法で求めてみる

![bg right h:550](img/ch05_vally.png)

---


<!-- _header: 局所最適解の谷の例 -->

谷を往復し続けて収束の効率がめちゃくちゃ悪い 😔

![bg right h:650](img/ch05_gradient_descent.png)

<br>

アニメーション:  https://abap34.github.io/ml-lecture/ch05/img/ch05_gradient_descent.gif


---

<!-- _header: 「勢い」の導入 -->

<div class="def">

## Momentum
<div style="text-align: center;">

<span class="dot-text">勢い</span> を定義して,前の結果も使って更新する

$$
\begin{cases}
\color{red}v_{n+1} \color{black}  = \alpha \  \color{red}{v_n} \color{black}  -  \eta f'(x_n) \\
x_{n+1} = x_n + v_{n+1}
\end{cases}
$$

</div>




</div>

---



<!-- _header: Momentum による更新 -->

## ✅ なにもしない SGD より早く収束！


![bg right h:650](img/ch05_momentum.png)

アニメーション:  https://abap34.github.io/ml-lecture/ch05/img/ch05_momentum.gif

<div class="cite">

momentum で遊べるサイトです. おすすめです
https://distill.pub/2017/momentum/



</div>




---



<!-- _header: 学習 -->



<div style="text-align: center;">

☑️ 初期化 ($x_0$ を決める)

⇩

☑️ 計算 ( $x_{n+1} = x_n - \eta f'(x_n)$ を計算する)


</div>



---

<!-- _header: モデルを「評価」する -->
<!-- _class: lead -->

# **✅ 「学習」部分は完了**

---

<!-- _header: 「良さ」を再考する -->

いよいよ本格的なモデルが作れそうになってきた！

⇨ その前に **モデルの「<span class="dot-text">良さ</span>」** についてもう一度考えてみる


---

<!-- _header: 「良さ」を再考する -->


### 例) アイスの予測ができるモデルが完成した！！！

⇨ こいつの「良さ」をどう定義するべきか？


---

<!-- _header: 今までの「良さ」　〜損失関数〜 -->

<div class="def">

## [定義] これまでの「良さ」

<hr>

モデルの「良さ」とは「損失関数の小ささ」である！

これはすでに観測された値をもとに計算されるパラメータの関数で,
学習によってこの良さをあげるのがわれわれの目的だ！


</div>

---

<!-- _header: 疑問 -->

## 本当にこれでよかったのか？

---

<!-- _header: 学習した後のことを考えよう -->

### 例) アイスの予測ができるモデルが完成した！！！

学習の際に使ったデータは
{(20℃, 300円), (25℃, 350円), (30℃, 400円), (35℃, 450円), (40℃, 500円)}

⇨ さぁこれを使ってアイスの値段を予測するぞ！
⇨ 来るデータは....

<div style="text-align: center;">

{22℃, 24℃, 25℃, $\cdots$}

## <span class="lined">※ 重要: これらのデータは学習段階では存在しない</span>

</div>





---


<!-- _header: 真の目的は？ -->


> なんか来月の予想平均気温30度って気象庁が言ってたな.
> 来月の売り上げが予想できたらどのくらい牛乳仕入れたらいいかわかって嬉しいな.

<div style="text-align: center;">

⇩

</div>

## 本当の目的は <span class="lined">未知のデータに対して精度良く推論すること</span>


---


## 実はわれわれが勝手にしていた非常に重要かつ大胆な仮定

# 「<span class="dot-text"><span class="lined">将来も同じような入力がくる </span></span>」

---


<!-- _header: われわれが本当にしていたこと -->

未知のデータ $X$ に対しての誤差 $\mathcal{L}(X; \boldsymbol{\theta})$ は最小化できない (未知だから)

<div style="text-align: center;">


## かわりに既知のデータ $x'$ に対しての誤差 $\hat{\mathcal{L}}(x'; \boldsymbol{\theta})$ を最小化する


### ⇩ なぜなら, 


## 将来のデータと過去のデータは大体変わらないだろうから.

</div>


---

<!-- _header: 「良さ」の再定義 -->


ほんとうに高めたいもの: **未知のデータへの予測性能**

これを新たに良さとしたい！！


---

<!-- _header: 未知のデータに対する性能を検証する -->



<div class="box">

## バリデーション

学習データを分割して一部を学習に使い, 残りを検証に使う

</div>

<br>

![h:200 center](img/ch05_valid.png)


---

<!-- _header: 未知のデータに対する性能を検証する -->

学習データ

{ (20℃, 300円), (25℃, 350円), (30℃, 400円), (35℃, 450円), (40℃, 500円) }

<div style="text-align: center;">
⇩ 分割
</div>


- 学習データ
{ (20℃, 300円), (25℃, 350円), (30℃, 400円) }

- 検証用データ
{ (35℃, 450円), (40℃, 500円) } 


---

<!-- _header: 未知のデータに対する性能を検証する -->

学習データ
{ (20℃, 300円), (25℃, 350円), (30℃, 400円) }

のみで学習をおこなう

<div style="text-align: center;">
⇩
</div>

(35℃, 450円), (40℃, 500円)に対して推論を行い,誤差を評価

400円,500円と推論したとすると,
「検証用データに対する」平均二乗誤差は

$$
\frac{1}{2} \left( (400 - 450)^2 + (500 - 500)^2 \right) = 1250
$$

---

<!-- _header: 未知のデータに対する性能を検証する -->



学習データ: { (20℃, 300円), (25℃, 350円), (30℃, 400円) } のみで学習!

検証用データはパラメータの更新に使わず誤差の計算だけ


<div style="text-align: center;">


⇩　つまり

</div>


#### 擬似的に <span class="dot-text">未知のデータ</span> を作成して,「未知のデータに対する性能」を評価

---

<!-- _header: 何が起きたか？ -->

われわれの真の目標は <span class="lined">**未知のデータをよく予測すること**</span>

## ⇨ モデルの「良さ」は **「検証用データに対する性能」** 


---

<!-- _header: 損失関数と評価指標 -->

<br>

**これの計算結果に基づいてモデルを変更することはない. 単に評価するだけ**

<div style="text-align: center;">

⇩
</div>

計算さえできればいいので,われわれの学習手法で損失関数が満たす必要があった

- 微分可能

などの条件は必要ない！
<div style="text-align: center;">

⇩

</div>

もっといろいろなものが使える. 

例) 正解率, 絶対誤差　etc....


---

<!-- _header: 損失関数と評価指標 -->

この検証用データに対して定義される「良さ」を **「評価指標」** という.

つまり **損失関数の値を最小化することで「評価指標を改善する」のが目標.**




---

<!-- _header: 損失関数と評価指標 -->

注意⚠️: これらは学習とは全く独立した作業. 
⇨ **これの計算結果に基づいてモデルを変更することはない. 単に評価するだけ**
<div style="text-align: center;">

⇩
</div>

逆にいえば <span class="lined">**評価指標は直接最適化されない！**</span>

  <div style="text-align: center;">
  
  ⇩
  
  </div>


損失関数を最小化することで評価指標が改善するように損失関数を考える.

---


![bg](img/ch05_image-9.png)

---


<!-- _header: ちょっとまとめ -->



- 損失関数の値はあくまで「訓練データに対してこれくらいの誤差になるよ」という値

- ほんとうに興味があるのは, 知らないデータに対してどれくらいうまく予測できるか

- これの検証のために擬似的に学習に使わない未知のデータを作り, 未知のデータに対する予測の評価をする



<div class="cite">

バリデーションの手法や切り方についてはいろいろあり, 話すとかなり長くなりますのでここでは割愛します.
例えば Cross Validation や時系列を意識した Validation, テストデータとバリデーションデータの性質を近づけるための手法などもあります。
詳しくは 8月に実施予定の講習会で扱われるはずです！

</div>


---

<!-- _header: バリデーションと過学習 -->

バリデーションデータは学習データからランダムにとってきたもの.
⇨ 学習データと評価の結果が異なることってあるの？　🤔💭

<div style="text-align: center;">

⇩

## はい. 

</div>




---

<!-- _header: 過学習 -->

<!-- 3 * x ** 3 - 2 * x ** 2 + 1 + 0.005 * np.random.randn(20, 1) -->

$f(x) = 3x^3 - 2x^2 + 1$ にちょっとだけ誤差を載せたもの 👉 

![bg right h:400](img/ch05_data.png)

---


<!-- _header: 過学習 -->

学習データと検証データに分ける 👉

![bg right h:400](img/ch05_train_val.png)


---



<!-- _header: 振り返り -->

NN の万能近似性から, 常に損失を $0$ にできる.


<div class="cite">

前期の線形代数の知識だけで証明できるので暇な人はやってみてください！
もう少し正確に書くと 「"矛盾のないデータ"　($x_i = x_j \Rightarrow y_i = y_j$　が成立している) なら任意の $i$ に対して $y_i = f(x_i)$ となる NN が存在する」 を示してください

</div>

---

<!-- _header: 過学習 -->

**学習データに対して損失関数を**
**最小化ヨシ！** ✍️

<div style="text-align: center;">

⇩

</div>


<span style="color: red;">

**損失関数は小さくできたが**
**バリデーションデータには全く**
**当てはまっていない！！**

</span>

![bg right h:400](img/ch05_overfitting.png)

---

<!-- _header: 過学習 -->


<div class="def">

### 過学習 (過剰適合, overfitting, overlearning)

学習データに過剰に適合してしまい, 未知のデータに対する予測性能が低下してしまっている状態.


</div>


![bg right h:400](img/ch05_overfitting.png)




---

<!-- _header: 学習曲線 (learning curve) -->

![bg right h:500](img/ch05_image-11.png)

<div class="box">

### 学習曲線 
### (learning curve)

<hr>

- 横軸に学習のステップ
- 縦軸に損失関数の値

をプロットしたもの

</div>

⇨ 学習曲線を見て過学習を見つける


---

<!-- _header: バリデーションの重要性について -->


<div class="box">

<div style="text-align: center;">


**「AI作りました！ちなみにどのくらいの精度かはわからないです笑」**  
だと実運用はできない

</div>


</div>

<div style="text-align: center;">

⇩ 

</div>

<div class="proof">

<div style="text-align: center;">


きちんとバリデーションを行うことで, 
未知のデータに対する予測性能を評価することが大切.

**逆に, 適切にバリデーションを行なっていないが故の嘘に気をつけよう！！**

</div>


</div>

---

<!-- _header: 不適切なバリデーションの例 -->

2019年の京大の研究 [1]

「過去の気温のデータから気温変化を NN で予測して, 検証用データで 97% の精度で上がるか下がるかを的中できるようになりました！」というもの

![bg right h:400](img/ch05_image-12.png)

<div class="cite">

Ise, T., & Oba, Y. (2019). Forecasting Climatic Trends Using Neural Networks: An Experimental Study Using Global Historical Data. Frontiers in Robotics and AI, 6, 446979. https://doi.org/10.3389/frobt.2019.00032

</div>

---

<!-- _header: 不適切なバリデーションの例 -->

Q. どこが不適切でしょう？

> ... Randomly selecting 25% of images for validation ....


---

<!-- _header: 不適切なバリデーションの例 -->

**A. 本来モデルが得るはずがない「未来の情報」が学習時に混入している！**

バリデーションはなぜ未知のデータに対する予測性能を疑似的に計算できていたか？
 $\Leftrightarrow$ 未知のデータを予測するときの状況を <span class="dot-text">擬似的に再現</span> していたから。


---

<!-- _header: 不適切なバリデーションの例 -->

時系列なら **未知の情報に対する精度 $\Leftrightarrow$ 2024年以降のデータに対する精度**

<span class="lined">**1990年のデータが検証用データに入っているなら 1991年以降のデータが学習データに入っていると不当に性能を高く見積もってしまう**</span>

---


<!-- _header: バリデーションの重要性について -->

Kaggle をはじめとするデータ分析コンペは,「未知の情報」を予測するモデルの精度を競う

⇨ 試行錯誤している手法の「未知の情報を予測する能力」をきちんと評価することが大切！ (詳しくは第七回)


---


<!-- _header: バリデーションの重要性について -->

![h:200 center](img/ch05_bestfitting.jpeg) 

<div style="text-align: center;">

 bestfitting はこう言っています

</div>

$$
\color{red} \LARGE\textrm{A  good   CV  is   half   of  success.}
$$


---


<!-- _header: 今日のまとめ -->

- ニューラルネットワークの学習は培われてきたいろいろな工夫があった
- バリデーションを行うことで未知のデータに対しての予測性能を評価することができる.
- バリデーションデータに対して行う評価は学習とは独立した作業なので, 微分可能であったり微分の性質が良い必要はなくいろいろな評価指標を用いることができる.
- 訓練データのみに過剰に適合した状態のことを「過学習」といい, 学習曲線に目を光らせるととでこれに気をつける必要があった
- 適切にバリデーションを行うのは **非常に重要**

<!-- PAGE BREAK -->



<!-- SLIDE: ch06/lecture.md -->

---

<div id="ch06"></div>


<!-- _class: lead-->

# 機械学習講習会 第六回
## - 「ニューラルネットワークの実装」


**traP Kaggle班**
2024/07/10


---

<!-- _header: 今日すること -->

- PyTorch を使って実際にある情報を予測するニューラルネットワークを実装します
- データの読み込みからモデルの構築, 学習, 予測までを一通りやってみます
- **お題として今日から始めるコンペのデータを使います.**
  - <span class="lined">**1 Sub まで一気に行きます！！**</span> 

---

<!-- _header: はじめに -->


<div style="text-align: center;">

先に、コンペのルールなどの話をします　

https://abap34.github.io/ml-lecture/supplement/competetion.pdf

(※ あとからこの資料を読んでいる人は飛ばしても大丈夫です)

</div>

---

<!-- _header: 今回のコンペのお題 ~ あらすじ ~ -->

機械学習講習会用のオンラインジャッジを作った `@abap34` は困っていました.

攻撃はやめてくださいと書いてあるのにひっきりなしに攻撃が仕掛けられるからです.


部員の個人情報とサーバとモラルが心配になった `@abap34` は, 飛んでくる通信を機械学習を使って攻撃かを判定することで攻撃を未然に防ぐことにしました.

<br>


![bg blur:6px opacity:.2](img/ch06_image-9.png)

あなたの仕事はこれを高い精度でおこなえる機械学習モデルを作成することです.

<div class="cite">

※ 架空の話です. 僕の知る限りジャッジサーバへの攻撃は今のところきていないです.

</div>


---

<!-- _header: データ -->

通信ログから必要そうな情報を抽出したもの (<span class="lined">**詳細は Data タブから**</span>)

<div class="box">

- 接続時間
- ログイン失敗回数
- 過去2秒間の接続回数
- 特別なユーザ名 (`root`, `admin` `guest` とか) でログインしようとしたか？　

<div style="text-align: center;">


$\vdots$

</div>

</div>

---

<!-- _header: データ -->

<br>
<br>


- train.csv
  - 学習に使うデータ
- train_tiny.csv **(👈 時間と説明の都合上 今日はこれを使います)**
  - 学習に使うデータの一部を取り出し,一部を削除
- test.csv
  - 予測対象のデータ
- test_tiny.csv **(👈 時間と説明の都合上 今日はこれを使います)**
  - 予測対象のデータの欠損値を埋めて,一部のカラムを削除
- sample_suboldsymbolission.csv
  - 予測の提出方式のサンプル (値はでたらめ)


![w:1200](image/train_img.png)





---


<!-- _header: 全体の流れ -->

1. データの読み込み
2. モデルの構築
3. モデルの学習
4. 新規データに対する予測
5. 順位表への提出


---

<!-- _header: 全体の流れ1 ~モデルに入力するまで -->

<br>
<br>

<div style="text-align: center;">

## 1-0. データのダウンロード

⇩

## 1-1. データの読み込み

⇩

## 1-2. データの前処理

⇩

## 1-2. PyTorchに入力できる形に

</div>

---

<!-- _header: 1-0. データのダウンロード -->

<div style="text-align: center;">

✅ セルに以下をコピペして実行

</div>

```bash
!curl https://www.abap34.com/trap_ml_lecture/public-data/train_tiny.csv -o train.csv
!curl https://www.abap34.com/trap_ml_lecture/public-data/test_tiny.csv -o test.csv
!curl https://www.abap34.com/trap_ml_lecture/public-data/sample_submission.csv -o sample_submission.csv
```

![center h:280](img/ch06_image-21.png)


<div class="cite">

Jupyter Notebook では,先頭に `!` をつけることで,シェルコマンドを実行できます.

</div>

---


<!-- _header: 1-0. データのダウンロード -->



✅ 左の 📁 > train.csv, test.csv, sample_submission.csv で表が見えるようになっていたら OK！


![center h:350](img/ch06_image-23.png)


---


<!-- _header: 1-1. データの読み込み -->


<div class="thm">

<div style="text-align: center;">

✅ `pd.read_csv(path)` で,`path` にあるcsvファイルを読み込める

</div>


</div>

```python
# pandas パッケージを `pd` という名前をつけてimport
import pandas as pd

# これによって, pandas の関数を `pd.関数名` という形で使えるようになる
train = pd.read_csv("train.csv")
test = pd.read_csv("test.csv")
```


<div class="cite">


パスとは,コンピュータ上のファイルやフォルダへの経路のことです.
今回は train.csv と test.csv がノートブックと同じ階層にあるので, train.csv と test.csv までの経路は,ファイル名をそのまま指定するだけで大丈夫です.
ほかにも たとえば `../train.csv` と指定すると ノートブックの一つ上の階層にある train.csv というファイルを読み込みます.


</div>

---

<!-- _header: 1-1. データの読み込み -->


![w:1200](img/ch06_image-12.png)

<div class="cite">

<span class="lined">**セルに単に変数をかくと中身を確認できます！**</span>　(Jupyter Notebook の各セルは最後に評価された値を表示するためです) 
さっとデバッグするときに便利です. 中身がわからなくなったらとりあえず書いて実行してみましょう.

</div>

---

<!-- _header: 1-1. データの読み込み -->

<div style="text-align: center;">


今まで
⇩

</div>



```python
x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

def loss(a):
...
```

<div style="text-align: center;">

⇩

今回も入力と出力 (の目標) にわけておく


</div>



---


<!-- _header: 1-1. データの読み込み -->

```python
train['カラム名']
```

で「カラム名」という名前の列を取り出せる 📝

<div style="text-align: center;">

⇩

</div>

今回の予測の目標は

```python
train['class']
```

<div style="text-align: center;">

⇩

</div>

---


<!-- _header: 1-1. データの読み込み -->


```python
train_y = train['class']
```

⇨ **`train_y` に攻撃? or 通常? の列が入る🙌**

![bg right h:450](img/ch06_image-13.png)


---

<!-- _header: 1-1. データの読み込み -->



機械学習モデルは <span class="dot-text">直接的には</span> 数以外は扱えないので数に変換しておく.

```python
train_y = train['class'].map({
  'normal': 0,
  'attack': 1
})
```



![bg right h:450](img/ch06_image-18.png)


---


<!-- _header: 1-1. データの読み込み -->

**逆に, モデルに入力するデータは `train` から <span class="">さっきの列 <span style="color: gray;">(と `id`) </span> を除いたもの！**</span>

```python
train.drop(columns=['カラム名'])
```

を使うと `train` から「カラム名」という名前の **列を除いたもの** を取り出せる

<div style="text-align: center;">

⇩

今回は <span class="" style="font-size: 1.5em;">`train.drop(columns=['id', 'class'])`</span>

</div>



---

<!-- _header: 1-1. データの読み込み -->

```python
train_x = train.drop(columns=['id', 'class'])
test_x = test.drop(columns=['id'])
```


⇨ `train_x` にさっきの列と `id` を除いたもの, `test_x` に `id` を除いたものが入る🙌


![bg right h:400](img/ch06_image-25.png)


---


<!-- _header: 1-1. データの読み込み -->

### ✅ データの読み込みが完了!

<div class="def">

### 今の状況整理

- `train_x` $\cdots$ モデルに入力するデータ(接続時間,ログイン失敗回数,etc...)
- `train_y` $\cdots$  モデルの出力の目標(攻撃? 通常?)
- `test_x` $\cdots$ 予測対象のデータ


が入ってる

</div>




---

<!-- _header: 1-2. データの前処理 -->


✅ **データをそのままモデルに入れる前に処理をすることで学習の安定性や精度を向上**

(極端な例... 平均が $10^{18}$ の列があったらすぐオーバーフローしてしまうので平均を引く)


<div style="text-align: center;">


今回は各列に対して「<span class="lined">**標準化**</span>」をします


</div>

---

<!-- _header: 1-2. データの前処理 -->

<div class="def">

### 標準化

$$
\large x' = \dfrac{x - \mu}{\sigma} 
$$



<div style="text-align: center;">

( $\mu$ は平均, $\sigma$ は標準偏差)
</div>


</div>

1. 平均 $\mu_1$ のデータの全ての要素から $\mu_2$ を引くと,平均は $\mu_1 - \mu_2$
2. 標準偏差 $\sigma_1$ のデータの全ての要素を $\sigma_2$ で割ると,標準偏差は $\sigma_1/\sigma_2$
  
<div style="text-align: center;">

⇨ 標準化で <span class="lined">**平均を0,標準偏差を1**</span> にできる

</div>

<div class="cite">

初期化の際の議論を思い出すとこのようなスケーリングを行うことは自然な発想だと思います.
NN の入力の標準化については, LeCun, Yann, et al. "E cient BackProp." Lecture Notes in Computer Science 1524 (1998): 5-50.　にもう少し詳しく議論が載っていたので気になる人は読んでみてください.

</div>

---

<!-- _header: 1-2. データの前処理 -->

✅ `scikit-learn` というライブラリの `StandardScaler` クラスを使うと,
簡単に標準化できる！

```python
# sklearn.preprocessing に定義されているStandardScalerを使う
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()

# 計算に必要な量 (平均,標準偏差) を計算
scaler.fit(train_x)

# 実際に変換
train_x = scaler.transform(train_x)
test_x = scaler.transform(test_x)
```

<div class="cite">

`scalar.fit` によって引数で渡されたデータの各列ごとの平均と標準偏差が計算され, `scalar` に保存されます. そして,`scalar.transform` によってデータが実際に標準化されます. 勘がいい人は「`test` に対しても `train_x` で計算した平均と標準偏差を使って標準化しているけど大丈夫なのか？」と思ったかもしれないですね. 結論から言うとそうなのですが意図しています. ここに理由を書いたら信じられないくらいはみ出てしまったので, 省略します. 興味がある人は「Kaggleで勝つデータ分析の技術」p.124 などを参照してみてください.

</div>

---


<!-- _header: 1-2. データの前処理 -->

```python
train_x
```

```python
test_x
```

などを実行してみると,確かに何かしらの変換がされている！ ✊
(ついでに結果がテーブルから単なる二次元配列 (`np.ndarray`) に変換されてる)


<div class="cite">

最初のテーブルっぽい情報を持ったまま計算を進めたい場合は,`train_x[:] = scaler.transform(train_x)`のようにすると良いです. 

</div>

---

<!-- _header: 1-2. データの前処理 -->

ので `train_y` もここで中身を取り出して `np.ndarray` にしておく.

1. `train_y.values` で 中身の値を取り出せる.
2. `arr.reshape(-1, 1)` で `arr` を $N \times 1$ の形に変換できる


```python
train_y = train_y.values.reshape(-1, 1)
```

<div class="cite">

`np.ndarray` のメソッド `reshape` はその名の通り配列の形を変えるメソッドです. そして `-1` は「他の次元の要素数から自動的に決定する」という意味です.
例えば, $3 \times 4$ の配列に対して `.reshape(-1, 2)` とすると $6 \times 2$ にしてくれます. (2次元目が $2$ と確定しているので勝手に $6$ と定まる)


</div>



---


<!-- _header: 1-2. データの前処理 - バリデーション -->

<div style="text-align: center;">

## バリデーションのためにデータを分割しておく

<br>


</div>


![center h:200](img/ch06_valid.png)



<div class="cite">

バリデーションを前処理と呼ぶ人はいないと思いますがここでやっておきます.

</div>

---

<!-- _header: 1-2. データの前処理 - バリデーション -->


<div class="box">

## `sklearn.model_selection.train_test_split` による分割

`train_test_split(train_x, train_y, test_size=0.3, random_state=34)`

- `train_x`, `train_y`: 分割するデータ
- `test_size`: テストデータの割合
- `random_state`: <span class="lined">**乱数のシード**</span> **👈重要！！**


</div>

---

<!-- _header: 1-2. データの前処理 - バリデーション -->

`scikit-learn` の `train_test_split` を使うと簡単にデータを分割できる！


```python
from sklearn.model_selection import train_test_split
train_x, val_x, train_y, val_y = train_test_split(train_x, train_y, test_size=0.3, random_state=34)
```
---


<!-- _header: 乱数シードを固定しよう！！ -->

<div style="text-align: center;">


乱数に基づく計算がたくさん

⇩

実行するたびに結果が変わって,
**めちゃくちゃ困る😥**

⇩

乱数シードを固定すると,
毎回同じ結果になって
<span class="dot-text">**再現性確保**</span>


</div>





![bg right h:550](img/ch06_image-15.png)

<div class="cite">

実際はそんな素朴な世の中でもなく, 環境差異であったり, 並列処理をしたとき (とくに GPU が絡んだとき) には単に乱数シードを固定するような見た目のコードを書いても結果が変わりがちで, 困ることが多いです. 対処法もいろいろ考えられているので, 気になる人は jax の乱数生成の仕組みなどを調べてみると面白いかもしれません。

</div>



---


<!-- _header: 1-2. データの前処理 - バリデーション -->



(`train_x`, `train_y`) を 学習データ:検証データ = 7:3 に分割



```python
from sklearn.model_selection import train_test_split
train_x, val_x, train_y, val_y = train_test_split(train_x, train_y, test_size=0.3, random_state=34)
```

結果を確認すると...


```python
train_x.shape
```

```python
val_x.shape
```

確かに 7:3 くらいに分割されていることがわかる

---

<!-- _header: 1-3. PyTorchに入力できる形に  -->


✅　**PyTorchで扱える形にする**


---
<!-- _header: 1-3. PyTorchに入力できる形に  -->

数として **Tensor型** を使って自動微分などを行う

```python
>>> x = torch.tensor(2.0, requires_grad=True)
>>> def f(x):
...     return x ** 2 + 4 * x + 3
... 
>>> y = f(x)
>>> y.backward()
>>> x.grad
tensor(8.)
```

( $f(x) = x^2 + 4x + 3$ の $x = 2$ における微分係数 $8$ )


⇨ <span class="lined">**データをTensor型に直しておく必要あり**</span>



---

<!-- _header: 再掲: `Tensor` 型のつくりかた -->


<div class="box" style="border-width: 3px;">

## `torch.tensor(data, requires_grad=False)`

- `data`: 保持するデータ(配列**っぽい**ものならなんでも)
  - リスト,タプル, <span style="color: red;">**Numpy配列**</span>, スカラ....
- `requires_grad`: 勾配 (gradient)を保持するかどうかのフラグ
  - デフォルトは `False`
  - 勾配の計算(自動微分)を行う場合は `True` にする 
  - このあとこいつを微分の計算に使いますよ〜という表明



</div>


---
<!-- _header: 1-3. PyTorchに入力できる形に  -->



<div style="text-align: center;">

⚠️ 我々が勾配降下法で使うのは,

### 各 **パラメータ** の損失に対する勾配

⇩

**入力データの勾配は不要なので `requires_grad=True` とする必要はないことに注意！**

</div>


---

<!-- _header: 1-3. PyTorchに入力できる形に  -->

## ✅　単にこれで OK！

```python
import torch

train_x = torch.tensor(train_x, dtype=torch.float32)
train_y = torch.tensor(train_y, dtype=torch.float32)
val_x = torch.tensor(val_x, dtype=torch.float32)
val_y = torch.tensor(val_y, dtype=torch.float32)
test_x = torch.tensor(test_x, dtype=torch.float32)
```

---

<!-- _header: 全体の流れ1 ~モデルに入力するまで -->

<br>
<br>

<div style="text-align: center;">

## ✅ 1-0. データのダウンロード

⇩

## ✅  1-1. データの読み込み

⇩

## ✅  1-2. データの前処理

⇩

## ✅  1-2. PyTorchに入力できる形に

</div>


---



<!-- _header: 全体の流れ -->

1. データの読み込み
2. モデルの構築
3. モデルの学習
4. 新規データに対する予測
5. 順位表への提出


---



<!-- _header: 2. モデルの構築-->




<div style="text-align: center;">

###### 今からすること... 


## $f(\boldsymbol{x}; \boldsymbol{\theta})$ をつくる


![center h:320](img/ch06_layer.svg)

</div>






---



<!-- _header: 2. モデルの構築-->



<br>
<br>


<div class="box">


## `torch.nn.Sequential` によるモデルの構築

**✅ `torch.nn.Sequential` を使うと <span class="dot-text">一直線</span> のモデルを簡単に定義できる.**


```python
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(30, 32),
    nn.Sigmoid(),
    nn.Linear(32, 64),
    nn.Sigmoid(),
    nn.Linear(64, 1)
)
```


</div>

---




<!-- _header: 2. モデルの構築 ~ 二値分類の場合 -->


<br>

<br>


<div class="box">


## 二値分類の場合

⇨ 最後に **シグモイド関数** をかけることで出力を $[0, 1]$ の中に収める.


```python
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(30, 32),
    nn.Sigmoid(),
    nn.Linear(32, 64),
    nn.Sigmoid(),
    nn.Linear(64, 1),
    nn.Sigmoid() # <- ここ重要！
)
```


</div>

---


<!-- _header: 2. モデルの構築-->

<div class="columns">

<div>

```python
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(30, 32),
    nn.Sigmoid(),
    nn.Linear(32, 64),
    nn.Sigmoid(),
    nn.Linear(64, 1),
    nn.Sigmoid()
)
```

⇨ すでにこの時点でパラメータの初期化などは終わっている


</div>


<div>


**引数に層を順番に渡すことで,モデルを構築してくれる！**

👈 「全結合層($W \in \mathbb{R}^{30, 32}$) $\rightarrow$ シグモイド関数 $\rightarrow$ 全結合層 ($W \in \mathbb{R}^{32, 64}$) $\rightarrow$ シグモイド関数 $\rightarrow$ 全結合層($W \in \mathbb{R}^{64, 1}$)」
という MLP の定義


</div>


</div>

---


<!-- _header: 2. モデルの構築-->


`model.parameters()` または `model.state_dict()` で
モデルのパラメータを確認できる

```python
model.state_dict()
```

各全結合層のパラメータ $W^{(i)}$, $\boldsymbol{b}^{(i)}$ が見える 👀 👉

![bg right h:500](img/ch06_image-17.png)

---


<!-- _header: 2. モデルの構築 -->

**✅ 構築したモデルは関数のように呼び出すことができる**

```python
import torch
dummy_input = torch.rand(1, 30)
model(dummy_input)
```

`torch.rand(shape)` で,形が `shape` のランダムな `Tensor` が作れる


⇨ モデルに入力して計算できることを確認しておく！

(現段階では乱数でパラメータが初期化されたモデルに乱数を入力しているので値に意味はない)


---


<!-- _header: 2. モデルの構築 -->


<div style="text-align: center;">


## ✅ $f(\boldsymbol{x}; \boldsymbol{\theta})$ をつくる

⇩

### あとはこれを勾配降下法の枠組みで学習させる！


</div>


<div style="text-align: center;">
⇩

<br>

思い出すシリーズ　

## <span class="lined">確率的勾配降下法</span>

</div>

---


<!-- _header: 全体の流れ -->

1. ✅ データの読み込み
2. ✅  モデルの構築
3. モデルの学習
4. 新規データに対する予測
5. 順位表への提出


---

<!-- _header: 全体の流れ3. モデルの学習-->




<div style="text-align: center;">

## 3-1. 確率的勾配降下法の準備

⇩

## 3-2. 確率的勾配降下法の実装

</div>



---

<!-- _header:  確率的勾配降下法 -->

<div class="def">

## 確率的勾配降下法 (SGD)

データの **一部** をランダムに選んで,
そのデータに対する勾配を使ってパラメータを更新する


</div>


---

<!-- _header: 3-1. 確率的勾配降下法の準備 -->


整理: **我々がやらなきゃいけないこと**

👉 データをいい感じに選んで供給する仕組みを作る


---

<!-- _header: 3-1. 確率的勾配降下法の準備 -->


<div style="text-align: center;">

# ![h:60](img/ch06_torch.png) < 私がやります


## ✅ `torch.utils.data.Dataset`, `torch.utils.data.DataLoader`　を
## 使うと簡単に実装できる！

</div>


---

<!-- _header: 3-1. 確率的勾配降下法の準備 -->

## 現状確認☝️

`train_x`, `train_y`, `val_x`, `val_y`, `test_x` にデータが 
`Tensor` 型のオブジェクトとして格納されている.





---

<!-- _header: 3-1. 確率的勾配降下法の準備 -->

### 1. Datasetの作成 (`Dataset`)
- データセット (データの入出力のペア $\mathcal{D} = \{(\boldsymbol{x}_i, y_i)\}_{i=1}^N$) を表すクラス




---

<!-- _header: 3-1. 確率的勾配降下法の準備 -->



`TensorDataset` に

- モデルの入力データ (`train_x`)と
- 出力の目標データ (`train_y`) を渡すことで `Dataset` のサブクラスである `TensorDataset` が作れる！

```python
from torch.utils.data import TensorDataset

# データセットの作成

# 学習データのデータセット
train_dataset = TensorDataset(train_x, train_y)
# 検証データのデータセット
val_dataset = TensorDataset(val_x, val_y)
```




<div class="cite">

実際は `torch.utils.data.Dataset` を継承したクラスを作ることでも `Dataset` のサブクラスのオブジェクトを作ることができます.
この方法だと非常に柔軟な処理が行えるためふつうはこれを使います (今回は簡単のために `TensorDataset` を使いました)


</div>



---

<!-- _header: 3-1. 確率的勾配降下法の準備 -->

### 1. DataLoaderの作成 (`DataLoader`)

- `Dataset`から一部のデータ (ミニバッチ) を取り出して供給してくれるオブジェクト


つまり....

<div class="proof">

整理: **我々がやらなきゃいけないこと**

👉 データをいい感じに選んで供給する仕組みを作る

</div>

をやってくれる

--- 

<!-- _header: 3-1. 確率的勾配降下法の準備 -->


### 1. DataLoaderの作成 (`DataLoader`)
- `Dataset`からミニバッチを取り出して供給してくれるオブジェクト

#### `DataLoader(dataset, batch_size=batch_size, shuffle=shuffle)`


```python
from torch.utils.data import DataLoader

batch_size = 32
train_dataloader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, drop_last=True)
val_dataloader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
```

⇨ これを for文で回すことでデータを取り出すことができる

---



<!-- _header: 3-1. 確率的勾配降下法の準備 -->


<br>

### 1. DataLoaderの作成(`DataLoader`型)



```python
for inputs, targets in train_dataloader:
    print('inputs.shape', inputs.shape)
    print('targets.shape', targets.shape)
    print('-------------')
```

<div style="text-align: center;">


⇩ 

</div>

```python
inputs.shape torch.Size([32, 30])
targets.shape torch.Size([32, 1])
-------------
inputs.shape torch.Size([32, 30])
targets.shape torch.Size([32, 1])
...
```

<div style="text-align: center;">

✔︎ データセットを一回走査するまでループが回ることを確認しよう！

</div>

---

<!-- _header: 3-1. 確率的勾配降下法の準備 -->


### ✅ DatasetとDataLoaderの作成

```python
from torch.utils.data import TensorDataset, DataLoader

# データセットの作成
train_dataset = TensorDataset(train_x, train_y)
val_dataset = TensorDataset(val_x, val_y)

# データローダの作成
batch_size = 32
train_dataloader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, drop_last=True)
val_dataloader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
```

---


<!-- _header: 3-1. 確率的勾配降下法の準備 -->



整理: **我々がやらなきゃいけないこと**

👉 データをいい感じに選んで供給する仕組みを作る


<div style="text-align: center;">

## ✅ Done!

</div>

---

<!-- _header: 3.2 確率的勾配降下法の実装 -->

## ✅ データは回るようになった

⇨ あとは学習を実装すればOK！

### TODOリスト

1. 損失関数を設定する
2. 勾配の計算を行う
3. パラメータの更新を行う

---


<!-- _header: 3.2 確率的勾配降下法の実装: 損失関数の設定 -->

<br>
<br>


## 1. 損失関数は何のためにあるのか？


![center h:480](img/ch06_frame.png)

---

<!-- _header: 3.2 確率的勾配降下法の実装: 損失関数の設定 -->

今回の評価指標 👉 **正解率！**  

---

<!-- _header: 3.2 確率的勾配降下法の実装: 損失関数の設定 -->


<div style="text-align: center;">


今までは評価指標もすべて平均二乗和誤差だった

⇩

平均二乗誤差は微分可能なのでこれを <span class="dot-text">損失関数</span> として勾配降下法で最適化すれば
<span class="dot-text">評価指標である</span> 平均二乗誤差も最適化できた

</div>


---

<!-- _header: 3.2 確率的勾配降下法の実装: 損失関数の設定 -->

正解率は直接最適化できる？
# ⇨ <span style="color: red;">No!!</span> 

---

<!-- _header: 正解率の微分 -->


**パラメータを微小に変化させても
正解率は変化しない！**

⇨ 正解率は,

- **ほとんどの点で微分係数 $0$**
- **変わるところも微分不可能**

<div style="text-align: center;">

⇩
<span class="lined">**勾配降下法で最適化できない**</span>

</div>


![bg right h:600](img/ch06_logistic_regression.png)

<div class="cite">

右のグラフは, 適当に作った二値分類 ($\mathbb{R}^2 \to \{0, 1\}$) のタスクをロジスティック回帰というモデルで解いたときの、パラメータ平面上の正解率をプロットしてみたものです。これを見ればほとんどのところが微分係数が $0$ ($\leftrightarrow$ 平坦) で、変わるところも微分不可 ($\leftrightarrow$ 鋭い) ことがわかります。
</div>

---

<!-- _header: 正解率を間接的に最適化する -->

### どうするか？

⇨ こういう分類を解くのに向いている損失関数を使って **間接的に** 正解率を上げる.


---

<!-- _header: Binary Cross Entropy Loss -->

<div class="def">

## 二値交差エントロピー誤差 (Binary Cross Entropy Loss)

$$
\large - \dfrac{1}{N} \sum_{i=1}^{N} \ y_i \log(f(x_i)) + (1 - y_i) \log(1 - f(x_i))
$$

</div>



---


<!-- _header: Binary Cross Entropy Loss -->


$$
- \dfrac{1}{N} \sum_{i=1}^{N} \ y_i \log(f(x_i)) + (1 - y_i) \log(1 - f(x_i))
$$


### 確認してほしいこと: 

<div class="columns">

<div>


- 正解 $y_i$ と予測 $f(x_i)$ が近いほど値は小さくなっている.
( $y_i \in \{0, 1\}$　なのでそれぞれの場合について考えてみるとわかる)
  
- 微分可能である


</div>

<div>


<br>

## 👉 なので、損失関数として妥当


</div>

</div>

<div class="cite">

これもやはり二乗和誤差のときと同様に同様に尤度の最大化として <span class="dot-text">導出</span> できます.

</div>

---

<!-- _header: Binary Cross Entropy Loss -->

## ✅ PyTorch では, `torch.nn.BCELoss` で使える！

```python
import torch

criterion = torch.nn.BCELoss()

y = torch.tensor([0.0, 1.0, 1.0])
pred = torch.tensor([0.1, 0.9, 0.2])

loss = criterion(pred, y)
print(loss)   # => tensor(0.6067)
```  


---


<!-- _header: 3.2 確率的勾配降下法の実装 -->

### TODOリスト

☑️ 1. 損失関数を設定する
2. 勾配の計算を行う
3. パラメータの更新を行う

---

<!-- _header: 3.2 確率的勾配降下法の実装 -->

# 2. 勾配の計算を行う

<br>

<div style="text-align: center;">

やりかたは....？

</div>

---


<!-- _header: 3.2 確率的勾配降下法の実装 -->


定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義
定義→計算→backward(),   定義→計算→backward(),   定義→計算→backward(), 定義



---


<!-- _header: 損失に対するパラメータの勾配の計算例 -->

<br>


```python
# ここから
model = nn.Sequential(
    nn.Linear(30, 32),
    ...
)
# ここまでが "定義"

dummy_input = torch.rand(1, 30)
dummy_target = torch.rand(1, 1)

# "計算"
pred = model(dummy_input)
loss = criterion(pred, dummy_target)

# "backward()"
loss.backward()
```


---


<!-- _header: 3.2 確率的勾配降下法の実装 -->

### ✔︎ チェックポイント 
1. `loss` に対する勾配を計算している

```python
# backward
loss.backward()
```
2. 勾配は **パラメータ** に対して計算される

```python
for param in model.parameters():
    print(param.grad)
```

(`dummy_input`, `dummy_target`は`requires_grad=False`なので勾配は計算されない)



---


<!-- _header: 3.2 確率的勾配降下法の実装 -->

### TODOリスト

☑️ 1. 損失関数を設定する
☑️ 2. 勾配の計算を行う
3. パラメータの更新を行う


---

<!-- _header: 3.2 確率的勾配降下法の実装 -->

```python
for epoch in range(epochs):
    for inputs, targets in train_dataloader:
        # 計算
        outputs = model(inputs)
        loss = criterion(outputs, targets)

        # backward
        loss.backward()

        # -----------------------
        # ....
        # ここにパラメータの更新を書く
        # ....
        # -----------------------
```


---


<!-- _header: 3.2 確率的勾配降下法の実装 -->

これまでは,我々が手動(?)で更新するコードを書いていた

# ⇨ ![h:50](img/ch06_torch.png) < 私がやります



## ✅ torch.optimのオプティマイザを使うことで簡単にいろいろな最適化アルゴリズムを使える


---


<!-- _header: 3.2 確率的勾配降下法の実装 -->

<br>
<br>


**(⚠️: 完成版ではない)**
 
```python
optimizer = optim.SGD(model.parameters(), lr=lr)

# 学習ループ
for epoch in range(epochs):
    for inputs, targets in train_dataloader:
        # 勾配の初期化
        optimizer.zero_grad()
        # 計算
        outputs = model(inputs)
        loss = criterion(outputs, targets)

        # backward
        loss.backward()
        
        # パラメータの更新
        optimizer.step()
```

---



<!-- _header: 3.2 確率的勾配降下法の実装 -->

<div class="def">

✅ **`optimizer = optim.SGD(params)` のようにすることで**
**`params` を勾配降下法で更新するオプティマイザを作成できる！**

</div>


<div style="text-align: center;">

たとえば Adam が使いたければ `optimizer = optim.Adam(params)` とするだけでOK！

⇩

勾配を計算したあとに `optimizer.step()` を呼ぶと, 
各 `Tensor` に載っている勾配の値を使ってパラメータを更新してくれる


</div>


---


<!-- _header: 3.2 確率的勾配降下法の実装 -->

**⚠️ 注意 ⚠️**

`optimizer.step()` で一回パラメータを更新するたびに
`optimizer.zero_grad()` で勾配を初期化する必要がある！

(これをしないと前回の`backward` の結果が残っていておかしくなる)

---




⇩ 次のページ...

# 学習の全体像を貼ります！！！





---


<!-- _header: 3.2 確率的勾配降下法の実装 -->

<br>
<br>

```python
from torch import nn


model = nn.Sequential(
    nn.Linear(30, 32),
    nn.Sigmoid(),
    nn.Linear(32, 64),
    nn.Sigmoid(),
    nn.Linear(64, 1),
    nn.Sigmoid()
)

optimizer = torch.optim.SGD(model.parameters(), lr=1e-2)
criterion = torch.nn.BCELoss()

n_epoch = 100
for epoch in range(n_epoch):
    running_loss = 0.0

    for inputs, targets in train_dataloader:
        # 前の勾配を消す
        optimizer.zero_grad()

        # 計算
        outputs = model(inputs)
        loss = criterion(outputs, targets)

        # backwardで勾配を計算
        loss.backward()

        # optimizerを使ってパラメータを更新
        optimizer.step()

        running_loss += loss.item()

    val_loss = 0.0
    with torch.no_grad():
        for inputs, targets in val_dataloader:
            outputs = model(inputs)
            loss = criterion(outputs, targets)
            val_loss += loss.item()

    # エポックごとの損失の表示
    train_loss = running_loss / len(train_dataloader)
    val_loss = val_loss / len(val_dataloader)
    print(f'Epoch {epoch + 1} - Train Loss: {train_loss:.4f} - Val Loss: {val_loss:.10f}')
```

---


<!-- _header: 各行の解説 (for文以降) -->



- 1行目. `for epoch in range(n_epoch)` .... データ全体を `n_epoch` 回まわす
- 2行目. `running_loss = 0.0` .... 1エポックごとの訓練データの損失を計算するための変数
- 4行目. `for inputs, targets in train_dataloader` .... 訓練データを1バッチずつ取り出す(`DataLoader`の項を参照してください！)
- 6行目. `optimizer.zero_grad()` .... 勾配を初期化する. 二つ前のページのスライドです！
- 9, 10行目.  `outputs = ...` .... 損失の計算をします.

---

<!-- _header: 3.2 確率的勾配降下法の実装 -->

- 13行目. `loss.backward()` .... 勾配の計算です.これによって`model`のパラメータに **損失に対する** 勾配が記録されます
- 16行目. `optimizer.step()` .... `optimizer`が記録された勾配に基づいてパラメータを更新します.
- 18行目. `running_loss += loss.item()` .... 1バッチ分の損失を`running_loss`に足しておきます.
  
- 20行目~25行目. 1エポック分の学習が終わったらバリデーションデータでの損失を計算します. バリデーションデータの内容は学習に影響させないので勾配を計算する必要がありません.したがって`torch.no_grad()`の中で計算します.

---


<!-- _header: 3.2 確率的勾配降下法の実装 -->

- 28行目〜30行目. 1エポック分の学習が終わったら, 訓練データと検証データの損失を表示します. `len(train_dataloader)`は訓練データが何個のミニバッチに分割されたかを表す数, `len(val_dataloader)`は検証データが何個のミニバッチに分割されたかを表す数です. これで割って平均の値にします.
  
- 32行目. 損失を出力します.

---


<!-- _header: 3.2 確率的勾配降下法の実装 -->

### TODOリスト

☑️ 1. 損失関数を設定する
☑️ 2. 勾配の計算を行う
☑️  3. パラメータの更新を行う

---

<!-- _header: バリデーション -->

バリデーションデータで 今回の評価指標である正解率がどのくらいになっているか計算しておく！

👉 これがテストデータに対する予測精度のめやす.


---

<!-- _header: 正解率の計算 -->

1. $0.5$ 以上なら異常と予測する.

```python
val_pred = model(val_x) > 0.5
```

2. `torch.Tensor` から `numpy.ndarray` に変換する

```python
val_pred_np = val_pred.numpy().astype(int)
val_y_np = val_y.numpy().astype(int)
```


2. `sklearn.metrics` の `accuracy_score` を使って正解率を計算する

```python
from sklearn.metrics import accuracy_score
accuracy_score(val_y_np, val_pred_np) # => (乞うご期待. これを高くできるように頑張る)
```

---

<!-- _header: 3. 学習が完了！！！ -->

<br>

### \+ オプション　 学習曲線を書いておこう

1. 各エポックの損失を記録する配列を作っておく

```python
train_losses = []
val_losses = []
```

1. 先ほどの学習のコードの中に,損失を記録するコードを追加する

```python
train_loss = running_loss / len(train_dataloader)
val_loss = val_loss / len(val_dataloader)
train_losses.append(train_loss) # これが追加された
val_losses.append(val_loss)　# これが追加された
print(f'Epoch {epoch + 1} - Train Loss: {train_loss:.4f} - Val Loss: {val_loss:.10f}')
```

(各 エポックで正解率も計算するとより実験がしやすくなるので実装してみよう)

---

<!-- _header: 3. 学習が完了！！！ -->

<br>

#### \+ オプション　 学習曲線を書いておこう

`matplotlib` というパッケージを使うことでグラフが書ける

```python
# matplotlib.pyplot を pltという名前でimport
import matplotlib.pyplot as plt
```

```python
plt.plot(train_losses, label='train')
plt.plot(val_losses, label='val')
plt.legend()
plt.xlabel('epoch')
plt.ylabel('loss')
plt.show()
```

⇨ いい感じのプロットが見れる



---



<!-- _header: 全体の流れ -->

1. データの読み込み
2. モデルの構築
3. モデルの学習
4. 新規データに対する予測
5. 順位表への提出

---


<!-- _header: 4. 新規データに対する予測 -->

## そういえば 💡

`test_x` に予測したい未知のデータが入っている


```python
model(test_x)
```

⇨ 予測結果が出る

---


<!-- _header: 5. 順位表への提出 -->


```python
import csv

def write_pred(predictions, filename='submit.csv'):
    pred = predictions.squeeze().tolist()
    assert set(pred) == set([True, False])
    pred_class =  ["attack" if x else "normal" for x in pred]
    sample_submission = pd.read_csv('sample_submission.csv')
    sample_submission['pred'] = pred_class
    sample_submission.to_csv('submit.csv', index=False)
```

をコピペ
→ 

---

<!-- _header:  5. 順位表への提出 -->

予測結果 (`True`, `False` からなる `Tensor`)

```python
pred = model(test_x) > 0.5
```

を作って,

```python
write_pred(pred)
```

すると,

---

<!-- _header:  5. 順位表への提出 -->

📂 > submit.csv

ができる！

👉 ダウンロードして, submit から投稿！ <span class="lined">**順位表に乗ろう!**</span>

![bg right h:450](img/ch06_image-19.png)

![alt text](img/ch06_image-20.png)


---

<!-- _class: lead -->
<!-- _header: 5. 順位表への提出 -->

# めざせ　No.1！




<!-- PAGE BREAK -->



<!-- SLIDE: ch07/lecture.md -->

---

<div id="ch07"></div>

<!-- _class: lead-->

# 機械学習講習会 第七回
## - 「機械学習の応用,データ分析コンペ」


**traP Kaggle班**
2024/07/17


---


<!-- _header: 今日の内容 -->    

- **コンペの結果発表　🥳**
- データ分析コンペという競技について
- ポエム



---


<!-- _header: まずは -->


# <span class="lined"># コンペの結果発表　🥳</span>

<br>

⇨ https://abap34.github.io/ml-lecture/supplement/competetion-result.html

<br>

 
---

<!-- _header: データ分析コンペという競技について -->

Q. 今回のコンペでどんな取り組み方をしましたか？

---


<!-- _header: コンペの戦い方 1.EDA -->

✅ データ分析コンペにおける勝敗を分けるポイントのひとつ

# ⇨ データへの <span class="dot-text">理解度</span>


---


<!-- _header: コンペの戦い方 1.EDA -->

あたり前に確認すべきこと...

1. データはどのくらいあるのか？
2. どういう形式なのか？


\+ **どのような情報が予測に役立つのか？**


---

<!-- _header: EDA: 探索的データ分析 (Exploratory Data Analysis) -->

<div class="box">

## EDA: 探索的データ分析 (Exploratory Data Analysis)

事前に仮説やモデルを仮定せず,データの特徴や構造を理解する分析.

</div>


例) データの分布,欠損値の確認,各変数の組の相関係数　などなど...



---

<!-- _header: EDA: 今回のコンペを例に -->

## ものすごく簡単な例: ([abap34.com/ml-lecture/supplement/EDA.html](https://abap34.github.io/ml-lecture/supplement/EDA.html))


![bg right h:600](img/ch07_image.png)


---


<!-- _header: コンペの戦い方 2.バリデーションについて -->

## <span class="lined">Trust Your CV </span> ... <ruby>CV<rp>(</rp><rt>Cross  Validation</rt><rp>)</rp></ruby> を信じよという有名な信仰.


---

<!-- _header: バリデーション -->

Q. Public LeaderBoard に大量の提出を繰り返すとどうなる？

⇨ Public LB でのスコアが上振れる.

Q. するとどうなる？

## ⇨ **shake**  で死ぬ.

---


<!-- _header: shake  -->

<div class="def">

# **shake** 
### Public LB と Private LB の順位が大きく異なる現象


</div>

![bg right h:550](img/ch07_image-2.png)

<div class="cite">

写真はつい先日終わった Learning Agency Lab - Automated Essay Scoring 2.0 というコンペの順位表です. こちらのリンク (https://kaggle.com/competitions/learning-agency-lab-automated-essay-scoring-2/leaderboard) から見れます.恐怖. 

</div>

---

<!-- _header: shake の波を乗り切るにはどうするか？ -->

<br>

### ✅ Public LB に振り回されないために

1. スコアのブレの程度を把握しておく
   1. テストと同じくらいのサイズのバリデーションデータをとり,そのスコアのブレを見るなど
   2. <span class="lined">**Public Score の上振れを引いても Private Score は上がらないので CV を上げることに専念**</span>
2. バリデーションデータとテストデータの分布の乖離に気を付ける
   1. たいていのコンペでは参加者同士が CV と LB のスコアを比較するディスカッションが立っていがち. **これを<span class="dot-text">必ず</span> 確認する！**
   2. 分布の違いの原因を調べて, よりテストデータに近いバリデーションデータを作る方法を考える (例: adversarial validation)


---

<!-- _header: Public LB との向き合い方 -->




ただ, Public LB も <span class="dot-text">重要な情報</span>

**👀 (ふつうの) 機械学習の枠組みでは絶対見られないテストスコアの一部が見られる**

<div style="text-align: center;">

⇩　以下のケースでは Public LB も **重要なスコアの指針**

</div>

<div class="proof" style="font-weight: bold;">


1. Public LB 用のデータが学習データと同じ分布で同程度のサイズ 
2. 時系列で学習データとテストデータが分割されている
   1. Public / Private 間はランダムに分割 ← とくに重要な指針になる
   2. Public / Private も時系列で分割

</div>

---


<!-- _header: コンペの戦い方 3. ハイパーパラメータの調整 -->


**ハイパーパラメータ(学習率, 木の深さ, ... などの学習時の設定) の調整は大事！**　
だけど

## <span class="lined">⚠️ 最初からハイパーパラメータの調整に時間をかけすぎない ⚠️ </span>




---


<!-- _header: ハイパーパラメータの調整 -->

<br>


<br>



✅ **ハイパーパラメータの調整は決定的な差別化ポイントになりづらい！**

⇨ 調整はそこそこに
- データの理解
- 特徴量エンジニアリング

に時間を費やすのが　🙆

(もちろん, 確実にスコアを上げられる手段なので**終盤にはちゃんと調整**する)



![bg right h:650](img/ch07_hyopt.drawio.png)


---


<!-- _header:  テーブルコンペの全体的な流れ -->

1. まず与えられたデータに対して EDA を行い, データの基本的な性質や予測に役立つ情報を把握する
2. 信頼できるバリデーションの仕組みを構築する
3. 特徴量エンジニアリングを行い, 学習
4. 提出
5. ディスカッションを参考にしつつ, スコアの信頼性などを確かめる.終盤ならハイパーパラメータの調整などをしても良いかも.   
6. 3 に戻る↩︎

---


<!-- _header: ポエム -->

- この講習会で扱わなかったこと

---

<!-- _header: この講習会で扱わなかったこと -->
 
> <span class="lined">**この講習会は機械学習の洞窟を全て探検することを目指しているのではなく、一旦ガイド付きで洞窟の最深部まで一気に駆け抜けることで二回目以降の探検をしやすくすることを目指しています。**</span>

(前がきより)


---

<!-- _header: この講習会で扱わなかったこと -->

<br>

**✅　機械学習の世界はめちゃくちゃ広い！**

関連する
- 数学
- コンピュータサイエンス

の話題もたくさん (本当にたくさん)

解ける面白い問題もたくさん！

⇨ <span class="lined">**必ず興味があるものに遭遇するはず!**</span>

## **⇨ Kaggle 班で色々やりましょう！お疲れ様でした！**
