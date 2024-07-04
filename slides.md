---
marp: true
theme: honwaka
paginate: true
math: mathjax
---

<!-- _class: lead -->

# **機械学習講習会**
## **[1] 「学習」**

**2024/06/24** 
**traP Kaggle班**

---

# **はじめに**

---
 


<!-- _header: この講習会のゴール　-->

## ✅ 機械学習の基本的なアイデアを理解して、
## 問題解決の手段として使えるようになる。



---

<!-- _header: おしながき　-->

<div class="def">

第1回 │ 学習
第2回 │ 勾配降下法
第3回 │ 自動微分
第4回 │ ニューラルネットワークの構造
第5回 │ ニューラルネットワークの学習と評価
第6回 │ PyTorch による実装
第7回 │ 機械学習の応用、データ分析コンペ

</div>




---

<!-- _header: この講習会で扱うこと、扱わないこと　-->

<br>

機械学習は非常に広大な分野 ⇨ 全7回ではちょっと限界がある

今回の講習会ではとくに**ディープラーニング**についてメインに扱います

- ツールを触るだけで原理は全然やらない
- 原理をやるだけで全然使えない

にならないようにどちらもバランス良くやります




---

<!-- _header: 全体の流れ　-->

第1回 学習
第2回 勾配降下法
第3回 自動微分

<br>


第4回 ニューラルネットワークの構造
第5回 ニューラルネットワークの学習と評価
第6回 PyTorch による実装

<br>

第7回 機械学習の応用、データ分析コンペ





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
- 基本的な行列の演算や操作 (積、転置など)
- 基本的な微分積分の知識 (偏微分など)
  
(1年前期の (線形代数)　+ (微分積分のさわり) くらい)



---

<!-- _header: 著者のページ -->

## ＠abap34
- 情報理工学院情報工学系 B3
- Kaggle班班長
  - アルゴ班にも入ってます
- 趣味
  - 機械学習　🤖 
  - 個人開発　⚙️
  - 野球 ⚾️
  - 音楽 🎤

![bg right height:300](img/ch01_image-2.png)
![bg right height:300 horizontal](img/ch01_icon.png)


---

<!-- _header: 謝辞 -->

<br>

内容の議論・チェックなど
- 24D @YumizSui さん (ex-traP)
- 22M @idaten さん  (ex-traP)
- 23B @Kobakos くん 

ありがとうございます🙏



---

<!-- _header: 質問・相談など -->

#### 1. ![h:50](img/ch01_wufficon.png) Wuff
- テキストを書くとこの画面に流れます
- <span class="lined">**匿名**</span> なので気軽にどうぞ

#### 2. #workshop/machine-learning/sodan
- [traQの相談チャンネル: #event/workshop/machine-learning/sodan](https://q.trap.jp/channels/event/workshop/machine-learning/sodan)　


#### 3. 各講習会資料に載ってる質問ボタン

![h:80](img/ch01_image-3.png) ← これを押すと投稿できます！



---

<!-- _header: 質問・相談など -->

前提として、 <span class="lined">**大変**</span>

1. 講義パートでは、5秒わからなかったら質問しよう
(traQでもwuffでも:ok:)

1. 演習パートでは、5分わからなかったら質問しよう


---
<!-- _header: がんばりましょう -->

(ここだけの話、機械学習はめちゃくちゃおもしろい)


<br>


# 全7回、がんばりましょう！！




---

<!-- _class: lead-->

# **第一回: 学習**

---

<!-- _header: おしながき -->
   
### 今日の目標

機械学習の基本的な用語を整理して、
「学習」ということばをきちんと説明できるようになる。


---



<!-- _header: 機械学習 or AI？　-->

- AI(人工知能)
「人間っぽい知能」を実現しようとする分野・あるいは知能そのもの
- 機械学習(Machine Learning, ML)　
様々な情報から「学習」をして動作するアルゴリズム
人工知能の一つのかたちと見られることが多い 

<div style="text-align: center;">

⬇︎


</div>



---

<!-- _header: 機械学習 or AI？　-->


<div class="def">


## **機械学習** で **人工知能** を実現

### ($\leftrightarrow$  **スーパーカー** で、**爆速移動** を実現)


</div>

<div class="cite">

ここでは一つの定義を紹介しましたが、実際この二つの言葉に明確に定義や合意があるわけではないです。
手法を厳密に分類してもあまり嬉しいことはないと思いますが、とりあえずこの講習会ではこういう形で整理してみることにします。

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

# ✅ 「学習」を説明できるようになる


<div class="cite">

る

</div>

---

<!-- _header: 「気温」と「アイス」 　-->

<br>
<br>

- 気温↑　→　売れそう
- 気温↓　→　売れなさそう

「アイスの売り上げ」は
「気温」からある程度わかりそう？

<br>

![height:30](img/ch01_icon.png)  < ...来月の売り上げが予想できたらどのくらい牛乳仕入れたらいいかわかって嬉しいな。


![bg right height:500](img/ch01_icecream_scatter.png)

<div class="cite">
データは https://okumuralab.org/~okumura/stat/160118.html　から引用
</div>

---


<!-- _header: アイスの売り上げを予測するAIをつくる.　-->


<br>


![height:30](img/ch01_icon.png) < なんか来月の予想平均気温30度って気象庁が言ってたな。

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


![height:60](img/ch01_kisyoucyou.jpg) **<そのまた来月の予想平均気温は40℃です。**

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
→ 入力を受け取って、それっぽい出力をすること


⇩


今回は、「入力: 気温」 → 「出力: アイスの売り上げ」

そして、 ✅ <span class="lined"> **入力は知ってるものだけとは限らない**</span>


</div>

---

<!-- _header: 予測できるようになる ↔︎  ?　-->

![height:50](img/ch01_icon.png) ← こいつが本当にやらなくてはいけなかったことは...

## 売り上げ = $f$(気温) となる関数 $f$ の推定

このような、入力データを受け取り結果を返す $f$ を**モデル**と呼ぶ


---


<!-- _header: 線形回帰 -->



売り上げ = $f$(気温) となる関数 $f$ を作りたい。



⇨ 一旦話を簡単にするために
<div class="def">


<div style="text-align: center;">

「**$f$(気温) = $a \times$気温 + $b$**」

</div>


</div>


のかたちであることにしてみる。


<div class="cite">

$f$ がパラメータについて線形であるようなモデルを「線形モデル」と呼びます。

</div>


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
数を、「<span class="dot-text">パラメータ</span>」という。 ( $f$ は $a, b$ をパラメータとして持つ )


<div style="text-align: center;">

⬇︎

<div class="thm">


$f$ の構造を決めておけば...


### 「$f$ の推定 $\leftrightarrow$ $f$ のパラメータの推定」

</div>


</div>

<div class="cite">

関数 $f$ がパラメータ $\boldsymbol{\theta}$ を持つことを陽に示すために、$f(x; \boldsymbol{\theta})$ と書くことがあります。 今回の場合は $f(x; a, b)$ となります。 


</div>



---


<!-- _header: ちょっとまとめ　-->

- アイスの売り上げを予測するには、気温から売り上げを予測する
  「関数」を構築するのが必要であった。
- いったん、今回は関数の形として $f(x) = ax + b$ (一次関数) に限って、関数を決めることにした。
- この関数は、パラメータとして $a, b$ をもち、$a, b$ を変えることで
  性質が変わるのがわかった
- これからやる仕事は、 
  「$a, \ b$ をいい感じのものにする」ことで「いい感じの $f$ を作る」こと

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


## ![height:30](img/ch01_icon.png)  < 見りゃわかる


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

売り上げ = $f$(気温, 湿度, $\cdots$)

<div style="text-align: center;">

⇩

</div>

案1. 高次元の存在になる
案2. 定量的な指標を考える


---



<!-- _header: 損失関数の導入 -->

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

なぜ差を二乗するのか疑問に思った人もいるかもしれません。　
全てをここで話すと情報量過多なので一旦置いといてあとで軽く議論します。(末尾の付録)

</div>

---

<!-- _header: 計算例  -->

<br>

$\boldsymbol{x} = (50, 80)^T$, $\boldsymbol{y} = (140, 200)^T$, $f(x) = 2x + 50$ のとき、

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

Q. 損失は何の関数？ (何を動かして、損失を小さくする？)

✅  各 $x_i, y_i$ は変数みたいな見た目だけど、実際は <span class="dot-text">「もう観測された確定値」 </span>


<div class="proof">

$$
\mathcal{L}(a, b) = \dfrac{1}{n}\sum_{i=0}^{n-1} \ (y_i - f(x_i; a, b))^2
$$

</div>


<div class="cite">

ものすごく進んだ話: たまに「入力データ」っぽいものに当たるものについても変数とみることもあります。
自分の知っている話だと DeepSDF という三次元形状を表現する NN では latent code と呼ばれる物体固有の表現を表すベクトルも変化させて損失関数を最小化していました。 

</div>


---

<!-- _header: いい勝負だったやつの計算例 -->

![bg right vertical height:350](img/ch01_icecream_scatter_regression_20_100.png)

![bg right height:350](img/ch01_icecream_scatter_regression_50_-300.png)



上: $a = 20, \ b=100$
下: $a = 50, \ b=-300$

頑張って計算すると、

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

$a = 36.00780537461501$
$b = 126.12821494344632$ 

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


- アイスの売り上げを予測するには、気温から売り上げを予測する
  「関数」を構築するのが必要であった。
- いったん、今回は関数の形として $f(x) = ax + b$ (一次関数) に限って、関数を決めることにした。
- この関数は、パラメータとして $a, b$ をもち、$a, b$ を変えることで
  性質が変わるのがわかった
- パラメータを変えることで損失関数を最小化する過程のことを「学習」と呼ぶ


---

<!-- _header: 付録: なぜ二乗するのか？ -->

### レベル1の説明

⇨ 性質がいいから

- 微分可能で導関数も簡単　(絶対値関数は微分不可能な点がある)
- 計算もそんなに大変ではない (百乗誤差などと比べて)


<div class="cite">
理論的なことを考えると微分可能でないと大変なことが多いです。

一方で現実の最適化だと微分不可能な点が有限個(何なら可算無限個) あっても何とかなることが多いです。
</div>


---


<!-- _header: 付録: なぜ二乗するのか？ -->

### レベル2の(ちゃんとした)説明

⇨ 誤差が正規分布 $\mathcal{N}(0, \sigma^2)$ にしたがうと仮定したとき、
二乗誤差の最小化は尤度の最大化に対応する


---

<!-- _header: 付録: なぜ二乗するのか？ -->

<div class="proof">

### [証明]

$y_i = f(x_i) + \epsilon_i$, $\epsilon_i \sim \mathcal{N}(0, \sigma^2)$ とする。
このとき、 $y_i \overset{\text{i.i.d.}}{\sim} \mathcal{N}(f(x_i), \sigma^2)$　より
尤度は

$$
\prod_{i=0}^{n-1} \dfrac{1}{\sqrt{2\pi\sigma^2}} \exp \left( -\dfrac{(y_i - f(x_i))^2}{2\sigma^2} \right)
$$


$\sigma^2$ が固定されていることに注意すると、
これの最大化は結局 $\sum_{i=0}^{n-1} (y_i - f(x_i))^2$ の最小化に帰着する. $\square$


</div>

<!-- PAGE BREAK -->



<!-- SLIDE: ch02/lecture.md -->

---

<!-- _class: lead -->

# **機械学習講習会**
## **[2] 「勾配降下法」**

**2024/06/25** 
**traP Kaggle班**

---


<!-- _header: まとめ -->


- アイスの売り上げを予測するには、気温から売り上げを予測する
  「関数」を構築するのが必要であった。
- いったん、今回は関数の形として $f(x) = ax + b$ (一次関数) に限って、関数を決めることにした。
- この関数は、パラメータとして $a, b$ をもち、$a, b$ を変えることで
  性質が変わるのがわかった
- パラメータを変えることで損失関数を最小化する過程のことを「学習」と呼ぶ


---


<!-- _header: 前回到達したところ... -->



$a, \ b$ を動かすことで....

$\displaystyle \mathcal{L}(a, b) = \dfrac{1}{n}\sum_{i=0}^{n-1} \ (y_i - f(x_i; a, b))^2$ を小さくしたい🥺





---



<!-- _header: 「関数の最小化」を考える -->

## 問題 

<div class="def">

最小化してください。

$$
f(x) = x^2 + 4x + 6
$$ 


</div>

---

<!-- _header: 「関数の最小化」を考える -->

<br>

## 問題 

<div class="def">

最小化してください。

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
- 機械的に書くなら、
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

最小化してください。

$$
f(x) = x^2 + e^{-x}
$$


</div>


---


<!-- _header: 第二問 -->

$f'(x) = 2x - e^{-x}$ なので、最小値であることの必要条件 $f'(x) = 0$ を調べると...

$$
2x - e^{-x} = 0
$$ 

を満たす $x$ を考えると。。。。。。。


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

✅ **このレベルの単純な形の関数でも、解をよく知っている形で書き表すことは難しい**

---


<!-- _header: もう一度目的を整理する -->


われわれの目標...

## 誤差 $\mathcal{L}(a, b)$ を最小化したかった。 
　

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


### 一方、 <span class="lined">「誤差 1」 が 「誤差1.001」 になってもほとんど変わらない</span>

---

<!-- _header: 効いてくる条件② -->

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

<div class="cite">

複雑そうな式をおもむろに乗せただけなのであまり意図はありません

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

  $f'(x)$ は、 $x$ における接線の傾き


</div>

---

<!-- _header: 微分は「傾き」 -->

### 微分係数

![bg right h:700](img/ch02_fx2_tangent.png)

<div style="text-align: center;">

  $f'(x)$ は、 $x$ における接線の傾き

  ⬇︎

  <div class="proof">
  
  
  $-f'(x)$ **方向に関数を
  すこし動かすと、関数の値はすこし小さくなる**

  
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


関数 $f(x)$ と、初期値 $x_0$ が与えられたとき、
次の式で $\{x_k\}$ を更新するアルゴリズム

$$
x_{k+1} = x_k - \eta f'(x_k)
$$

($\eta$ は**学習率**と呼ばれる定数)

</div>


<div class="cite">


正確にはこれは最急降下法と呼ばれるアルゴリズムで、「勾配降下法」は勾配を使った最適化手法の総称として用いられることが多いと思います。
(そこまで目くじらを立てる人はいないと思いますし、勾配降下法あるいは勾配法と言われたらたいていの人がこれを思い浮かべると思います。)


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


<!-- > 大抵はそうなのですが、固定幅で収束が早いという主張の手法もあったりして(https://arxiv.org/abs/2302.06675)　一概には言えないのですが、大体この通りであることは確かです。 -->

---


<!-- _header:  勾配降下法のお気持ち  -->


<div style="text-align: center;">

**値が $-f'(x)$ の方向に更新される**
  
(さっきの説明の通り)

</div>

![bg right h:700](img/ch02_fx2_tangent_x3.png)


<div class="cite">

る

</div>

---


<!-- _header: 学習率による更新幅の制御 -->

<br>

✅ 微分はあくまで「<span class="dot-text">その点</span>の情報」

<div style="text-align: center;">

傾向が成り立つのはその周辺だけ

⬇︎

ちょっとずつ更新していく必要がある

⬇︎

小さな値 **学習率** $\eta$ をかけることで
少しずつ更新する

</div>


![bg right h:650](img/ch02_fx2_tangent_x3.png)


---

<!-- _header: 実際にやってみる  -->

$f(x) = x^2$

初期値として、$x_0 = 3$ 
学習率として、$\eta = 0.1$ を設定。(この二つは自分で決める！)

$x_1 = x_0 - \eta f'(x_0) = 3 - 0.1 \times 6 = 2.4$
$x_2 = x_1 - \eta f'(x_1) = 2.4 - 0.1 \times 4.8 = 1.92$
$x_3 = x_2 - \eta f'(x_2) = 1.92 - 0.1 \times 3.84 = 1.536$
$\cdots$
$x_{100} = 0.0000000006111107929$

#### ✅ 最小値を与える $x = 0$ に非常に近い値が得られた！

---
 
<!-- _header: 勾配降下法のココがすごい！  -->


**✅ その式を (解析的に) 解いた結果が何であるか知らなくても、**
**導関数さえ求められれば解を<span class="lined">探しにいける</span>**


---

<!-- _header: 実際にやってみる2  -->


## 第二問

<div class="def">

最小化してください。

$$
f(x) = x^2 + e^{-x}
$$


</div>



---

<!-- _header: 実際にやってみる2  -->

$f'(x) = 2x - e^{-x}$. 

初期値として $x = 3$, 学習率として $\eta = 0.01$ を設定。

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
# （注意: $\eta$ は、学習率 (learning rate) の略である lr としています。）
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


![bg h:500](img/ch02_fx2_tangent_sin.png)



---

<!-- _header: 局所最適解への収束 -->

**局所最適解** ... 付近では最小値
**大域最適解** ... 全体で最小値

![center h:380](img/ch02_f_sin.png)

---


<!-- _header: マイナーチェンジ -->

<br>
<br>

⇨ なるべく局所最適解にハマりまくらないように色々と工夫 (詳しくは第5回)

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


多変数関数の場合は、微分係数→勾配ベクトル　に置き換えればOK

$$
\boldsymbol{x_{n+1}} = \boldsymbol{x_n} - \eta  \nabla f(\boldsymbol{x_n})
$$


<div class="cite">

勾配ベクトルとは、各変数の偏微分係数を並べたものです。
例えば、$f(x, y) = x^2 + y^2$ の $(x, y)$ における勾配ベクトルは $(2x, 2y)$ です。
これを$\nabla f(x, y) = (2x, 2y)$ と書きます。
一年生はちょうど微分積分学第一でやるころかと思うので大きくは扱いませんでしたが、
一変数の場合できちんと理解できていれば大丈夫です。

</div>



---

<!-- _header: 再掲: 一般の関数の最小化 -->

## 第三問

<div class="def">


最小化してください。

$$
- \dfrac{1}{(x^2 + 1)}\log\left(\dfrac{1}{1 + e^{-x}} + 1\right)
$$


</div>

<div class="cite">

嫌です。

</div>



---

<!-- _class: lead -->
<!-- _header: 次回予告 -->

# 第三回　自動微分


<!-- PAGE BREAK -->



<!-- SLIDE: ch03/lecture.md -->

---

<!-- _class: lead-->

# 機械学習講習会 第三回
## - 「自動微分」


**traP アルゴリズム班 Kaggle部**
2023/xx/xx

---



# 今日は講義内で演習もします


---

<!-- _class: lead-->

# 第三回: 自動微分


---

<!-- _header: 前回のまとめ　-->

- 損失関数の最小化を考える上で、一般の関数の最小化を考えることにした
- 損失関数の厳密な最小値を求める必要はなく、また損失関数は非常に複雑になりうるので、広い範囲の関数に対してそこそこ上手くいく方法を考えることにした
- たいていの関数に対して、導関数を求めることさえできればそれなりに小さい値を探しに行けるようになった
- 逆に、**「導関数」は自分で求める必要がある**

---

<!-- _header: 前回のまとめ　-->

- 損失関数の最小化を考える上で、一般の関数の最小化を考えることにした
- 損失関数の厳密な最小値を求める必要はなく、また損失関数は非常に複雑になりうるので、広い範囲の関数に対してそこそこ上手くいく方法を考えることにした
- たいていの関数に対して、導関数を求めることさえできればそれなりに小さい値を探しに行けるようになった
- 逆に、 <span class="lined">**「導関数」は自分で求める必要がある**</span>

---

<!-- _header: 実は -->

# いまはね


---

<!-- _header: 思い出すシリーズ: 一般の関数の最小化 -->

## 第三問


<div class="def">


最小化してください。

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


# 自動微分
### (Automatic Differentiation)

</div>

</div>

<div class="cite">

正確には「自動微分」は、コンピュータに自動で微分を行わせる手法のうち、関数を単純な関数の合成と見て、特に連鎖律を利用して、陽に導関数を求めることなく微分を行う手法を指します(より狭義に、back propagationを用いるもののみを指すこともあるようです)。　

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


例) 新しい車を開発するときも、部品は大体同じ、組み立ても大体同じ

<div style="text-align: center;">

⇩
 毎回同じことをみんながそれぞれやるのは面倒
⇩
<span class="dot-text">共通基盤</span> を提供するソフトウェアの需要がある

</div>


---

<!-- _header: どの組み立て機を使う？ 有名なフレームワークたち -->

- TensorFlow
    - (主に) Googleが開発したフレームワーク
    - 産業界で人気 (が、最近はPyTorchに押され気味)
- PyTorch
    - (主に) Facebookが開発したフレームワーク
    - 研究界で人気 (最近はみんなこれ？)
- Keras
    - いろんなフレームワークを使いやすくしたラッパー (おもに TensorFLow)
    - とにかくサッと実装できる
- jax/flux, Chainer, MXNet, Caffe, Theano, ...

---

<!-- _header: そもそもPyTorchとは？　〜深層学習フレームワーク〜 -->

どれがいいの？
⇨ PyTorchを使っておけば間違いない (と、思います)

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

大体の有名フレームワークにそこまで致命的な速度差はなく、記述に関しては好みによるところも多いです。PyTorchの差別化ポイントは、有名モデルの実装サンプルが大体存在するという点です。
実際に論文を読んで実装するのは骨の折れる作業なので、サンプルが充実していのはとても大きな利点です。

</div>

---

<!-- _header: 今日のお話 -->

✅ 自動微分ライブラリとしての PyTorch の使い方を習得して、
**手で微分するのをやめる**



---

<!-- _header: `Tensor` 型 -->

数学の 「数」 に対応するオブジェクトとして、PyTorchでは

<div style="text-align: center;">

#  `Tensor` 型

</div>


を使う


---

<!-- _header: `Tensor` 型のつくりかた -->


<div class="box" style="border-width: 3px;">

## `torch.tensor(data, requires_grad=False)`

- `data`: 保持するデータ(配列**っぽい**ものならなんでも)
  - リスト、タプル、NumPy配列、スカラ、...
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

かつては自動微分には `Variable` という名前の型が使われていて、(現在は `Tensor` 型に統合)　`Tensor` と数学の変数の概念にある程度の対応があることがわかります。


</div>

---


<!-- _header: `Tensor` 型 -->

```python
>>> x = torch.tensor([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]], requires_grad=True)
```
$\begin{pmatrix} 1.0 & 2.0 & 3.0 \\ 4.0 & 5.0 & 6.0 \end{pmatrix}$ という行列を保持する`Tensor` 型のオブジェクトを作成


(`requires_grad=True`とすれば、勾配計算が可能な `Tensor` 型を作成できる)

---

<!-- _header: 演習1 -->

これらを勾配計算が可能な`Tensor` 型として表現してください。

1. $x = 3.0$
2. $\vec{x} = (3.0, 4.0, 5.0)$
3. $X = \begin{pmatrix} 3.0 & 4.0 & 5.0 \\ 6.0 & 7.0 & 8.0 \end{pmatrix}$

(このページの内容は、実際にやらなくてもやり方がわかればOKです)

↓ 問題の続き次のページへ


---

<!-- _header: 演習1 -->

(実際にやってください)

4. **整数** $x = 3$ を勾配計算が可能な`Tensor` 型として表現することを試みてください。また、その結果を確認して説明できるようにしてください。

<div style="text-align: center;">

※ 次のページにヒントあり
</div>

---

<!-- _header: 演習1 ヒント -->

**1, 2, 3**: 講義資料を遡って、`torch.tensor`の第一引数と作成される`Tensor` 型の対応を見比べてみましょう。

**4**: Pythonのエラーは、 
```
~~たくさん書いてある~
~~Error: {ここにエラーの端的な内容が書いてある}
```
という形式です。"~~Error"というところのすぐ後に書いてある内容を読んでみましょう。


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

としてみると、

>RuntimeError: Only Tensors of floating point and complex dtype can require gradients

と出力されます。 これは、勾配が計算可能なのは浮動小数点数と複素数のみであるという PyTorch の仕様によるエラーです。

---

<!-- _header: `Tensor` 型に対する演算 -->

`Tensor` 型は、「数」なので当然各種演算が可能

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

平方根を取ったり、`sin`や`exp`などの関数も使える

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
PyTorchは、計算と共に勾配の計算ができる！

抑えてほしいポイント:

<div class="def">

##  `requires_grad=True`である `Tensor` 型に対して計算を行うと、行われた演算が記録された `Tensor` ができる.

</div>


---


<!-- _header: PyTorch と 自動微分 -->


```python
x = torch.tensor(2.0, requires_grad=True)
```

足し算をする。
```python
y = x + 2
```



---


<!-- _header: PyTorch と 自動微分 -->


```python
print(y)
```

これの出力は、

<div class="thm">

<div style="text-align: center;">

## `tensor(4., grad_fn=<AddBackward0>)`

⇩

### **Add** という演算によって作られたという情報を `y` が持っている！


</div>

</div>

---


<!-- _header: PyTorch と 自動微分 -->


普通のPythonの数値では、
```python
x = 2
y = x + 2
print(y) # -> 4.0
```

`y`がどこから来たのかはわからない(値として $4.0$ を持っている **それだけ**)

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

## ✅ PyTorchは、`backward` 関数をつかって
## 記録された演算を *辿る* ことで、勾配を計算できる


</div>

---

<!-- _header: `backward` による勾配計算 -->

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

**✅ `x.grad` に計算された勾配が格納される！！**

```python
print(x.grad) # -> tensor(1.)
```




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
#### 2. 記録された演算を辿って、勾配を計算する 

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

すると、`x.grad`に計算された勾配が格納される。


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

例1) $f(x) = sin((x + 2) + (1 + e^{x^2}))$　の微分
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

<!-- _header: ベクトル、行列演算の勾配 -->

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

<!-- _header: ベクトル、行列演算の勾配 -->

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

<!-- _header: 実際に適用される演算さえ微分可能ならOK -->

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
✅ ポイント: 実際に適用される演算は、実行してみないとわからないが、適用される演算はどう転んでも微分可能な演算なのでOK.
(if文があるから, for文があるから, 自分が定義した関数に渡したから...ということは関係なく、実際に適用される演算のみが問題になる)



---


<!-- _header: 自動微分 -->

### 抑えてほしいポイント

- 任意の(勾配が定義できる)計算を `Tensor` 型に対して適用すれば、常に自動微分可能
- **定義→計算→backward()** の流れ
- ベクトル、行列など任意の `Tensor` 型について微分可能。多変数関数の場合も同様
- 「実際に適用される演算」さえ微分可能ならOK
  
---

<!-- _header: 演習3: 自動微分 -->


1. $y = x^2 + 2x + 1$ の$x = 3.0$ における微分係数を求めよ。
(https://oj.abap34.com/problems/autograd-practice-1)

1. $y = f(x_1, x_2, x_3) = x_1^2 + x_2^2 + x_3^2$ の $x_1 = 1.0, x_2 = 2.0, x_3 = 3.0$ における勾配を求めよ。
(https://oj.abap34.com/problems/autograd-practice-2)

1. $f(\boldsymbol{x_1}) = \boldsymbol{x_1}^T \begin{pmatrix}
1 & 2 \\
2 & 1 \\
\end{pmatrix} \boldsymbol{x_1}$ の  $\boldsymbol{x}_1 = (1.0, 2.0)^T$ における勾配を求めよ。
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

print(*gx.numpy())
```




---

<!-- _header: 思い出すシリーズ: 勾配降下法のPyTorchによる実装 -->

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

これまでは、導関数 `grad` を我々が計算しなければいけなかった
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


最小化してください。

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

いちばん素直な方法

$\displaystyle f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$

⇨ 小さい値で近似する

</div>


<div>

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
4.0000010006480125  # おしい
```

---

<!-- _header: 数値微分 -->


#### 実際に小さい $h$ をとって計算
## **「数値微分」**


お手軽だけ..

- 誤差が出る
- 勾配ベクトルの計算が非効率

![bg right h:450](img/ch03_numerical_example.png)

---


<!-- _header: 数値微分 -->

<div class="section"> 1.3 勾配降下法と機械学習 </div>


<div class="columns">



<div>

#### 問題点①. 誤差が出る 
1. 本来極限をとるのに、小さい $h$ を
とって計算しているので誤差が出る

2. 分子が極めて近い値同士の引き算に
なっていて、$\left( \frac{\color{red}{f(x+h) - f(x)}}{h} \right)$
桁落ちによって精度が大幅に悪化.


</div>

<div>

#### 問題点②. 勾配ベクトルの計算が非効率

1. $n$ 変数関数の勾配ベクトル $\nabla f(\boldsymbol{x}) \in \mathbb{R}^n$ を計算するには、
各 $x_i$ について「少し動かす→計算」を繰り返すので $n$ 回 $f$ を評価する. 
   
2. 応用では $n$ がとても大きくなり、 
$f$ の評価が重くなりがちで これが **致命的**


</div>

</div>

---

<!-- _header: 数式の構造を捉える -->

<div style="text-align: center;">

⇩

いい感じに数式の構造をとって計算したいなぁ

</div>

---

<!-- _header: 計算グラフ -->

### ✅ 演算は、**計算グラフ** とよばれる DAG で表現できる

![bg right h:500](img/ch03_cgraph0.png)

<div class="cite">

単に計算過程を表しただけのものを Kantorovich グラフなどと呼び、
これに偏導関数などの情報を加えたものを計算グラフと呼ぶような定義もあります.
(伊里, 久保田 (1998) に詳しく形式的な定義があります)
ただ、単に計算グラフというだけで計算過程を表現するグラフを指すという用法はかなり普及していて一般的と思われます。そのためここでもそれに従って計算過程を表現するグラフを計算グラフと呼びます.

</div>

---

<!-- _header: 計算グラフ -->


### ✅ PyTorch も、**計算と同時** に <br> 計算グラフを構築


( `torchviz` というライブラリを使うと可視化できる！ )

```python
import torchviz
x = torch.tensor([1., 2., 3.], requires_grad=True)
y = torch.sin(torch.sum(x) + 2)
torchviz.make_dot(y)
```

![bg right h:550](img/ch03_image-2.png)




---




<!-- _header: 計算グラフによる表現 -->

<div class="section"> 2.3 自動微分 ─式からアルゴリズムへ  </div>

(一旦計算グラフを得たものとして、)　
この構造から導関数を得ることを考えてみる.

---

<!-- _header: 連鎖律 -->

<div class="section"> 2.3 自動微分 ─式からアルゴリズムへ  </div>

<div class="thm">

**[連鎖律]**

$u, v$ の関数 $x, y$ による合成関数 $z \left(x(u, v), y(u, v)\right)$ に対して、

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

のとき、 $\dfrac{\partial z}{\partial u}$ を求める


</div>





![bg right h:550](img/ch03_cgraph1.png)   


---

<!-- _header: 連鎖律と計算グラフの対応 -->

$$
\frac{\partial z}{\partial u} = \frac{\partial z}{\partial x} \cdot \frac{\partial x}{\partial u} + \frac{\partial z}{\partial y} \cdot \frac{\partial y}{\partial u}
$$



との対応は、

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

## ✅ 実は工夫するとノード数の定数倍で計算可能！

詳しくは [Julia Tokyo #11 トーク: 「Juliaで歩く自動微分」](https://speakerdeck.com/abap34/julia-tokyo-number-11-toku-juliadebu-kuzi-dong-wei-fen) をみよう！！


PyTorch でもこの方法で勾配を計算している。


<!-- PAGE BREAK -->



<!-- SLIDE: ch04/lecture.md -->

---

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

1. 予測をするには、「モデル」を作る必要があった
1. モデルのパラメータを決めるために、パラメータの関数である損失関数を導入した

![bg right h:500](img/ch04_icecream_scatter_regression.png)

---

<!-- _header: 「勾配降下法」 -->


3. 複雑な関数である損失関数を最小にするために、
「勾配降下法」 を使ってパラメータを探索した


![bg right h:500](img/ch04_fx2_tangent_x2.png)

---

<!-- _header: 「自動微分」 -->

4. 自動微分を使うことで、手で微分をしなくて勾配を計算できるようになり、勾配降下法を使えるようになった


![bg right h:500](img/ch04_cgraph-complex.png)

---




<!-- _header: 振り返りタイム -->

1. 予測をするには、「モデル」を作る必要があった
2. モデルのパラメータを決めるために、パラメータの関数である損失関数を導入した
3. 損失関数を最小にするパラメータを求めるために勾配降下法を導入した
4. 自動微分によって手で微分する必要がなくなった  [← 今ココ！]




---


<!-- _header: 第三回までのまとめ　-->

## われわれができるようになったこと

データさえあれば...誤差を小さくするパラメータを

- 例え複雑な式でも
- 例え自分で導関数を見つけられなくても

求められるようになった！
(== **学習ができるようになった！**)

---

<!-- _header: 線形回帰からの飛躍 -->

ここまでは $f(x) = ax + b$ のかたちを仮定してきた (線形回帰)

⇨ われわれの手法はこの仮定に依存しているか？ 🧐


<div style="text-align: center;">

　⇩

# <span class="lined"> 依存していない </span>

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


$f(x) = ax + b$　は、 $a, b$ をどんなに変えても常に直線
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

みたいなものは表現できない




---


<!-- _header: 複雑さを生み出す方法 -->

#### ✅ アイデア1: 関数を合成する

$\exp, \sin, x^2 + x$ はそれぞれ単純な関数

👉 一方、合成した $h(x) = \exp(\sin(x^2 + x))$ は、

![bg right h:430](img/ch04_hx.png)


---

<!-- _header: 複雑さを生み出す方法 -->

#### ✅ アイデア2: 和をとる



---

<!-- _header: 複雑さを生み出す方法 -->

三角関数を 3つ用意

- $f_1(x) = \sin(0.5 x)$
- $f_2(x) = \cos(0.8 x)$
- $f_3(x) = \sin(0.75 x)$

それぞれは単純

![bg right h:450](img/ch04_basis_sincos.png)



---

<!-- _header: 複雑さを生み出す方法 -->

一方、重み付き和をとると

$f(x) = 3  f_1(x) - 2 f_2(x) + f_3(x)$

![bg right h:450](img/ch04_basis_sum.png)

👉 そこそこ複雑


---
<!-- _header: ぐにゃっとした関数の表現のしかた -->


<div class="thm">

### ✅ 簡単めの関数の
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






<div class="cite">

正確な値は `a = [ -6.4801085083, 6.1051318800, 7.9832160997, -8.3429947226, 5.3951834931 ], b = [ 0.0749141624, -0.0644060425, -0.2030537747, -0.2263950685, -0.0981644237 ], c = [ -2.5574982288, 11.9469148236, -9.5401909056, -9.7479688677, 8.6363494625 ]` です

</div>



---

<!-- _header: パラメータを変えることによって幅広い表現が得られる確認 -->

$\boldsymbol{a} = (0.39, -0.29, -0.67, -0.96, 0.92)^T$

$\boldsymbol{b} = (-0.35, 0.84, 0.22, -0.25, -0.04)^T$

$\boldsymbol{c} = (-0.61, -2.06, 3.97, 0.40, -3.85)^T$

のとき


<div class="cite">

正確な値は`a = [ 0.3902687779, -0.2931365774, -0.6719522358, -0.9616291983, 0.9248299981 ],b = [ -0.3522200005, 0.8488925592, 0.2250941117, -0.2574283604, -0.0413569962 ], c = [ -0.6140479386, -2.0554661015, 3.9653490740, 0.3968633932, -3.8504082926]` です

</div>

![bg right h:450](img/ch04_random_model.png)

---


<!-- _header:  「基になる関数」はどう選ぶべきか？　-->


「<span class="dot-text">基になる関数</span>」 にどのような関数を選ぶべきか？

- 三角関数?
- 多項式関数?
- 指数関数?
- もっと別の関数?
...

これまでの我々のアプローチを思い出すと、

**変化させるのが可能なところはパラメータにして、学習で求める**」


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
中央の画像は https://diamond.jp/articles/-/241828 より.
 Ponanza と佐藤天彦名人の対局

</div>


---

<!-- _header: ニューラルネットワーク -->

<div class="box">

[事実2] 
**ある程度以上複雑なタスクでは、ニューラルネットワークが最も優れた性能を示すことが多い**


</div>


![bg right h:400](img/ch04_image-5.png)


<div class="cite">

画像は https://medium.com/coinmonks/paper-review-of-alexnet-caffenet-winner-in-ilsvrc-2012-image-classification-b93598314160 から

</div>


---

<!-- _header: 今日の内容 -->

### 1. ニューラルネットワークの基本的な概念の整理
### 2. 全結合層の理解

---

<!-- _header: 基本的な概念 -->

**基本単位: レイヤー**

ニューラルネットワークは、「レイヤー(層)」と呼ばれる関数の合成によって構成されるモデル




---



<!-- _header: ニューラルネットワークの構造　-->

**基本単位: レイヤー**

ニューラルネットワークは、「レイヤー(層)」と呼ばれる関数の合成によって構成されるモデル

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

データの流れは、
**$x$ →入力層→中間層...→出力層 = $y$**

</div>


---

<!-- _header: いろいろなレイヤーがある -->

PyTorch本体ででデフォルトで定義されているものだけで 160個以上? [1]

<div class="cite">

[1] `torch.nn.Module` のサブクラスの数を数えました。正確な数でないかもしれません。

</div>


---

<!-- _header: 全結合層 (Linear, Dense層) -->

## もっとも普遍的・基本のレイヤー


<div class="def">

## 全結合層 (Linear, Dense層)

パラメータ $W \in \mathbb{R}^{m \times n}, \ \boldsymbol{b} \in \mathbb{R}^m$ と 

各レイヤーが固有にもつ活性化関数 $\sigma$ を用いて


入力として $\boldsymbol{x} \in \mathbb{R}^n$ を受け取り、 $\sigma \left(W \boldsymbol{x} + \boldsymbol{b} \right)$ を出力する。


</div>


---

<!-- _header: 全結合層がしていること -->


1. $n$ 個の入力を受け取り、$m$ 個出力する


2. 複雑な関数を表現するアイデア...


   <div class="thm">
   
   1. 合成
   2. 和をとる
   
   </div>


    をする



---

<!-- _header: 全結合層がしていること -->

#### 1. $n$ 個の入力を受け取り、$m$ 個出力する


パラメータ $W \in \mathbb{R}^{m \times n}, \ \boldsymbol{b} \in \mathbb{R}^m$ と 

各レイヤーが固有にもつ活性化関数 $\sigma$ を用いて


入力として $\boldsymbol{x} \in \mathbb{R}^n$ を受け取り、 $\sigma \left(W \boldsymbol{x} + \boldsymbol{b} \right)$ を出力する。


---

<!-- _header: 全結合層がしていること -->

2. 複雑な関数を表現するアイデア...


   <div class="thm">
   
   1. 合成
   2. 和をとる
   
   </div>


    をする




---



<!-- _header: 活性化関数 -->

非線形関数
- シグモイド関数
  $\sigma(x) = \dfrac{1}{1 + \exp(-x)}$

- ReLU関数
$\mathrm{ReLU}(x) = \max(0, x)$

- tanh関数
$\tanh(x) = \dfrac{\exp(x) - \exp(-x)}{\exp(x) + \exp(-x)}$


![bg right h:800](img/ch04_activation.png)

---

<!-- _header: アイデア1. 合成 -->

<div style="text-align: center;">

合成を繰り返す ⇨ 複雑な関数を表現

<br>

</div>

![center h:250](img/ch04_layer2.svg)


---

<!-- _header: アイデア2. 和をとる -->

$m$個の出力のひとつに注目してみる

$\boldsymbol{y} = \sigma \left(W \boldsymbol{x} + \boldsymbol{b} \right)$  

<div style="text-align: center;">

⇩

</div>

 $y_i = \sigma \left( \displaystyle{\sum_{j} W_{ij} x_j + b_i} \right)$

<br>

![bg right w:500](img/ch04_linear.svg)




---

<!-- _header: 分解して考えると -->

$y_i = \sigma \left( \displaystyle{\sum_{j} W_{ij} x_j + b_i} \right)$

は、 

![bg right h:400](img/ch04_basis_sincos.png)

👉 と同じことをしている

---


<!-- _header: 分解して考えると -->

$y_i = \sigma \left( \displaystyle{\sum_{j} W_{ij} x_j + b_i} \right)$

この層の入力 $x_j$ はそれまでの層で $\sigma$ を通ってきたもの.

![bg right h:250](img/ch04_layer2.svg)

---

<!-- _header: 複雑な関数が生まれていた -->

<div style="text-align: center;">



$\sigma \left( \displaystyle{\sum_{j} W_{ij} x_j + b_i} \right)$

⬇︎

非線形関数の重みつき和

⬇︎

複雑な非線形関数を表現できる！ + さらにそれを非線形関数に通す


</div>


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



<!-- _header: 出力層　-->


ここで、


<div style="text-align: center;">

#### 　$\boldsymbol{u}^{(i)}$ は非常に複雑な $\boldsymbol{x}$ の**非線形**な関数

## + これはパラメータによって変化する

</div>



---


<!-- _header: というわけで　-->


# 「基になる関数」も
#  学習で求めよう



---

<!-- _header: MLP -->




とくに、全結合層のみからなるニューラルネットワークを
**多層パーセプトロン (Multi Layer Perceptron, MLP)** という

![center h:350](img/ch04_layer.svg)

---

<!-- _header: そのほかの用語たち -->

<!-- DNN (Deep Neural Network) ... 複数の隠れ層を持つニューラルネットワーク
ANN (Artificial Neural Network) ... 人工ニューラルネットワーク。本来の意味のニューラルネットワーク(動物の神経回路) と区別するため -->


| 用語 | 意味 |
| --- | --- |
| MLP (Multi Layer Perceptron) | 全結合層のみからなるニューラルネットワーク |
| DNN (Deep Neural Network) | 複数の隠れ層を持つニューラルネットワーク |
| ANN (Artificial Neural Network) | 人工ニューラルネットワーク。本来の意味のニューラルネットワーク(動物の神経回路) と区別するためこういう名前が使われることがある |


---

<!-- _header: ニューラルネットワークの性質 -->


そもそもの動機: 
直線だけしか表現できないのは困る。いろいろな関数が表現できるようになりたい。


<div style="text-align: center;">

⇩

どれくらいの範囲の関数が表現できるようになったのか？

</div>

---

<!-- _header: ニューラルネットワークの万能近似性 -->


## 結論

# 直線 ⇨ 任意の関数 ※ 


<div class="cite">

※ ざっくりとした表現です。

</div>

---

<!-- _header: ニューラルネットワークの万能近似 -->




<div class="info">

### ニューラルネットワークの万能近似定理 (普遍性定理)

隠れ層を一つ持つニューラルネットワークは、
任意の連続関数を表現できる ※

</div>


<div class="cite">

※ ざっくりとした表現です。

</div>


---

<!-- _header: 今日のまとめ -->

- 我々の学習手法は、 $f(x) = ax + b$ というモデルの構造自体に直接依存しているわけではなかった

- そして、 $f(x) = ax + b$ というモデルの構造では直線しか表現することができないので、違う形を考えることにした
- 「基になる」簡単な関数の、合成と和を考えることでかなり複雑な関数も表現できることがわかった
- 「基になる」関数の選び方を考える上で、この関数自体もパラメータによって変化させるモデルとして、ニューラルネットワークを導入した
- ニューラルネットワークは任意の関数を表現できることがわかった



---

<!-- _header: 次回予告 -->

<br>

## 第5回 ニューラルネットワークの学習と評価

- He, Xavierの初期化
- 確率的勾配降下法
- 損失関数
- オプティマイザ
- バリデーションと性能評価
- ハイパーパラメータ


## Next ⇨ 第6回　ニューラルネットワークの実装

---



<!-- _header: 発展的話題:万能近似の(直感的な) <span class="dot-text">説明</span> -->


- ニューラルネットワークの表現能力は 1980年代後半 ~ 1990年代後半くらいまで盛んに研究されていた
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

を満たす関数を「シグモイド型関数」と呼ぶ。

</div>



<div class="def">

$I = [0, 1]^d$ として、$C$ を $I$ 上の連続関数全体の集合とする。


</div>


</div>



---

<!-- _header: 主張　-->

<div class="thm">

**定理 (Cybenko, 1989)**

<br>

任意の $f \in C, \ \varepsilon > 0$ に対して、ある  $g(x) = \sum_{i=1}^{n} a_i \sigma(b_i x + c_i)$ が存在して

$$
\forall x \in I, \ |f(x) - g(x)| < \varepsilon
$$


<br>


</div>



---

<!-- _header: 主張　-->

平易に書くと、

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

とする。

すると、 $x_i - \dfrac{c_i}{b_i}$ が少しでも正なら 

$\sigma(b_i x + c_i) = 1$ 

負なら
$\sigma(b_i x + c_i) = 0$.


![bg right h:400](img/ch04_step.png)





---


<!-- _header: 証明ステップ1 -->

$\sigma(b_ix + c_i)$ は $b_i = 999999999999999999999999999999999999999999999999999999999999999999999$

とすると、$x_i - \dfrac{c_i}{b_i}$ が少しでも正ならば $1$, そうでなければ $0$ になる。

⇨ $c_i$ を適当に調整すれば、 狙った点 $t$ で、

$$
\sigma(b_i x + c_i) = \left\{
\begin{array}{ll}
1 & (x > t) \\
0 & (x \leq t)
\end{array}
\right.
$$

とすることができる.　(例: $b_i = 10^{100}, c_i = 2 \times 10^{100}$ なら $t = 2$)

 
さらに、 $b_i$ を負の非常に大きい数にすると、 <span class="lined">**逆のバージョンも作れる.**</span>

---

<!-- _header: 証明ステップ2. 矩形関数の作り方 -->
<br>
<br>

✅ すると、 正の大きな数によってステップ関数にしたものと
負の大きな数によってステップ関数にしたものを足し合わせることで、
<span class="lined">**矩形関数を作ることができる！**</span>

![](img/ch04_square.png)


---

<!-- _header: 証明ステップ3. ウイニングラン -->


**✅　これさえできればもうOK**

連続関数を全て**矩形関数の和**としてみればよい.

![bg right h:450](img/ch04_riemann.png)


---

<!-- _header: 万能近似できるからいい？ -->


任意の連続関数を近似できるモデルはニューラルネットワークだけ？

⇨ **全然ふつうにNO.**

❌「万能近似ができるからニューラルネットワークがよくつかわれる」
 
 \+ あくまでそのような $a_i, b_i, c_i$ が存在するという主張であって、
 <span class="lined"> **それを求める方法については何ら保証していない**</span>


<div style="text-align: center;">

⇩

</div>


ニューラルネットワークの優位性を考えるなら、もうすこし議論を進めていく必要がある

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


A. 層を深くすると指数関数的に表現力が上がり、幅を広くすると多項式的に表現力が上がる。 [1]

![bg right h:300](img/ch04_image-6.png)

</div>

<br>

<div class="cite">

[1] 
Eldan, Ronen, and Ohad Shamir. "The power of depth for feedforward neural networks." Conference on learning theory. PMLR, 2016.

画像も同論文より


</div>




<!-- PAGE BREAK -->



<!-- SLIDE: ch05/lecture.md -->

---

<!-- _class: lead-->

# 機械学習講習会 第五回
## - 「ニューラルネットワークの学習と評価」


**traP アルゴリズム班 Kaggle部**
2023/6/28



---

<!-- _class: lead-->

# 第五回:
# ニューラルネットワークの
# 学習と評価


---


<!-- _header: 振り返りタイム -->


- 我々の学習手法は $f(x) = ax + b$ というモデルの構造自体に直接依存しているわけではなかった
- そして、 $f(x) = ax + b$ というモデルの構造では直線しか表現することができないので、違う形を考えることにした
- 「基になる」簡単な関数の、合成と和を考えることでかなり複雑な関数も表現できることがわかった
- 「基になる」関数の選び方を考える上で、この関数自体もパラメータによって変化させるモデルとして、ニューラルネットワークを導入した
- ニューラルネットワークは任意の関数を表現できることがわかった


---

<!-- _header: DNNの学習はむずかしい？ -->


<div style="text-align: center;">

ニューラルネットワークは非常に多くのパラメータをもつ
(例: 全結合層は、それぞれ $W \in \mathbb{R}^{n \times m}$ と $b \in \mathbb{R}^m$ のパラメータを持つ)

⇩

**学習は、かなりそれなりに難しいタスク**


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

DBN (Deep Belief Network)やオートエンコーダに関する研究 [1][2] を通じて、 DNN の学習の安定化に大きく貢献


</div>

<div class="cite">



[1] Hinton, Geoffrey E., Simon Osindero, and Yee-Whye Teh. "A fast learning algorithm for deep belief nets." Neural computation 18.7 (2006): 1527-1554.
[2] Hinton, Geoffrey E., and Ruslan R. Salakhutdinov. "Reducing the Dimensionality of Data with Neural Networks." Science, vol. 313, no. 5786, 2006, pp. 504-507. doi:10.1126/science.1127647.


</div>


---

<!-- _header: 学習手法の進化 -->


<div style="text-align: center;">


活性化関数の進化 (ReLU)
Dropout
Batch Normalization
オプティマイザの進化 (Adam, RMSprop ...)


⇩


<div class="def">


✅ DNN の学習を、比較的安定して行えるように


</div>


</div>

---

<!-- _header: 今日のおしながき① -->


## ✅ DNN の学習を安定的に、効率的に行う技法を知る

---

<!-- _header: 勾配降下法の復習 -->

### 微分係数

![bg right h:700](img/ch05_fx2_tangent.png)


<div style="text-align: center;">

  $f'(x)$ は、 $x$ における接線の傾き

  ⬇︎

  <div class="proof">
  
  
  $-f'(x)$ **方向に関数を
  すこし動かすと、関数の値はすこし小さくなる**

  
  </div>

</div>

---

<!-- _header: 勾配降下法の復讐 -->




<div class="def">


## 勾配降下法


関数 $f(x)$ と、初期値 $x_0$ が与えられたとき、
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

⇨ 当然、初期値として普遍的にいい値はない

⇨ <span class="lined">**NNは、構造が固定されているのでいい初期値を考えられる**</span>


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

## 活性化関数にとって、得意なところで計算が進んでほしい。

---

<!-- _header: シグモイド関数の性質 -->


- 出力が $0$ または $1$ に <span class="dot-text">貼り付く</span>
- $|x|$ が大きいと、勾配がほぼ $0$


![bg right h:500](img/ch05_sigmoid.png)


---


<!-- _header: 勾配消失 -->


<div style="text-align: center;">

$$
x_{k+1} = x_k - \eta \color{red} f'(x_k)
$$
⇩



**勾配がほとんど $0$ だと、**
**学習がなかなか進まなくなってしまう🌀**

</div>


![bg right h:500](img/ch05_sigmoid.png)

---


<!-- _header: 思い出すシリーズ: 複雑さを生む -->

<br>

### ✅ 全結合層は、非線形関数の和をとって複雑な関数を作っていた

|                                           |                                        |
| ----------------------------------------- | -------------------------------------- |
| ![h:350 horizontal](img/ch05_basis_sincos.png) | ![h:350 horizontal](img/ch05_basis_sum.png) |



---


<!-- _header: 思い出すシリーズ: 複雑さを生む -->

<br>

ほとんど同じような「基になる関数」をとっても効率がわるい.

![center h:400](img/ch05_linear_combination.png)


---

<!-- _header: 各層で分散を維持する -->

 <span class="lined">**出力と勾配両方**</span> について、

- 上下に貼り付く (分散大)
- ほとんど同じ値 (分散小)

にならないように
$\Leftrightarrow$ 分散を維持するようにすると

$\mathcal{U}(-\sqrt{6/(n+m)}, \sqrt{6/(n+m)})$ 

がいい初期値になる

![bg right h:400](img/ch05_sigmoid_highlight.png)



---



<!-- _header: 初期値の決め方 -->

シグモイド関数はよくない性質がある！　
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


⇨ 学習の効率化にかなり役立ち、 <span class="dot-text">**初期化の影響を受けにくくする**
 </span>


<div class="cite">

Ioffe, Sergey, and Christian Szegedy. "Batch normalization: Accelerating deep network training by reducing internal covariate shift." International conference on machine learning. pmlr, 2015.

</div>



---

<!-- _header: おまけ: 「乱数」は初期値に必要か？ -->

### 実は決定論的にやってもよい？

## ⇨ **ZerO Initialization** [1]

✅ 乱数生成をやめると、再現性が向上してうれしい。


<div class="cite">

[1] Zhao, Jiawei, Florian Schäfer, and Anima Anandkumar. "Zero initialization: Initializing neural networks with only zeros and ones." arXiv preprint arXiv:2110.12661 (2021).

</div>

---


<!-- _header: 初期値のまとめ -->

- 適切な初期値を選ぶことで、学習の安定性を向上させることができる
- Xavierの初期値、Heの初期値などがよく使われる
- 一方、近年は初期値にそこまで神経質にならなくてもよくなりつつある
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

**われわれは自動微分が使えるので、これで $f'(x_n)$ も計算できる 🤗**

<div style="text-align: center;">

⇩

</div>

計算の過程もカスタマイズするぞ！

![bg right h:400](img/ch05_torch.png)


---

<!-- _header:  確率的勾配降下法 -->

<div class="def">

## 確率的勾配降下法 (SGD)

データの **一部** をランダムに選んで、
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

データを選ぶときにランダム性が入る！

⇩


<span class="lined">**局所最適解にトラップされない**</span>


</div>


![bg right h:400](img/ch05_local_minima.png)


<div class="cite">

る

</div>

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

ために、いろいろなオプティマイザが提案されている 

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

---

<!-- _header: 「勢い」の導入 -->

<div class="def">

## Momentum
<div style="text-align: center;">

<span class="dot-text">勢い</span> を定義して、前の結果も使って更新する

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


<div class="cite">

momentum で遊べるサイトです。おすすめです
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

# ✅ 「学習」部分は完了

---

<!-- _header: 「良さ」を再考する -->

いよいよ本格的なモデルが作れそうになってきた！

⇨ その前に、**モデルの「<span class="dot-text">良さ</span>」** についてもう一度考えてみる


---

<!-- _header: 「良さ」を再考する -->


### 例) アイスの予測ができるモデルが完成した！！！

⇨ こいつの「良さ」をどう定義するべきか？


---

<!-- _header: 今までの「良さ」　〜損失関数〜 -->

<div class="def">

## [定義] これまでの「良さ」

<hr>

モデルの「良さ」とは、損失関数の小ささである！

これは、すでに観測された値をもとに計算されるパラメータの関数で、
学習によってこの良さをあげるのがわれわれの目的だ。


</div>

---

<!-- _header: 疑問 -->

## 本当にこれでよかったのか？

---

<!-- _header: 学習した後のことを考えよう -->

### 例) アイスの予測ができるモデルが完成した！！！

学習の際に使ったデータは、
{(20℃, 300円), (25℃, 350円), (30℃, 400円), (35℃, 450円), (40℃, 500円)}

⇨ さぁこれを使ってアイスの値段を予測するぞ！
⇨ 来るデータは....

<div style="text-align: center;">

{22℃, 24℃, 25℃, $\cdots$}

## <span class="lined">※ 重要: これらのデータは学習段階では存在しない</span>

</div>





---


<!-- _header: 真の目的は？ -->


> なんか来月の予想平均気温30度って気象庁が言ってたな。
> 来月の売り上げが予想できたらどのくらい牛乳仕入れたらいいかわかって嬉しいな。

<div style="text-align: center;">

⇩

</div>

## 本当の目的は、<span class="lined">未知のデータに対して精度良く推論すること</span>


---


## 実はすっぽかしていた非常に重要かつ大胆な仮定:

# <span class="dot-text"><span class="lined">　将来も同じような入力がくる </span></span>

---


<!-- _header: われわれが本当にしていたこと -->

未知のデータ $X$ に対しての誤差 $\mathcal{L}(X; \boldsymbol{\theta})$ は最小化できない。 (未知だから)

## かわりに既知のデータ $x'$ に対しての誤差 $\hat{\mathcal{L}}(x'; \boldsymbol{\theta})$ を最小化する

<div style="text-align: center;">

### ⇩ なぜなら、

</div>

## 将来のデータと過去のデータは大体変わらないだろうから。

---

<!-- _header: 極端な例 -->

2024年7月から未成年のアイスが違法化し、売り上げ激減

<div style="text-align: center;">

⇩

</div>

2024年6月までのデータを使って損失関数を最小化しても、ほとんど意味がない

---

<!-- _header: 「良さ」の再定義 -->


ほんとうに高めたいもの: **未知のデータへの予測性能**

これを新たに良さとしたい！！


---

<!-- _header: 未知のデータに対する性能を検証する -->



<div class="box">

## バリデーション

学習データを分割して、一部を学習に使い、残りを検証に使う

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

(35℃, 450円), (40℃, 500円)に対して推論を行い、誤差を評価

400円、500円と推論したとすると、
「検証用データに対する」平均二乗誤差は

$$
\frac{1}{2} \left( (400 - 450)^2 + (500 - 500)^2 \right) = 1250
$$

---

<!-- _header: 未知のデータに対する性能を検証する -->



学習データ: { (20℃, 300円), (25℃, 350円), (30℃, 400円) } のみで学習!

検証用データはパラメータの更新に使わず、誤差の計算だけ


<div style="text-align: center;">


⇩　つまり、

</div>


#### 擬似的に <span class="dot-text">未知のデータ</span> を作成して、「未知のデータに対する性能」を評価

---

<!-- _header: 何が起きたか？ -->

われわれの真の目標は <span class="lined">**未知のデータをよく予測すること**</span>

## ⇨ モデルの「良さ」は、**「検証用データに対する性能」** 


---

<!-- _header: 損失関数と評価指標 -->

<br>

**これの計算結果に基づいてモデルを変更することはない. 単に評価するだけ**

<div style="text-align: center;">

⇩
</div>

計算さえできればいいので、われわれの学習手法で損失関数が満たす必要があった

- 微分可能

などの条件は必要ない！
<div style="text-align: center;">

⇩

</div>

もっといろいろなものが使える. 

例) 正解率, 絶対誤差　etc....


---

<!-- _header: 損失関数と評価指標 -->

この検証用データに対して定義される評価の指標を **「評価指標」** という。

つまり、**損失関数の値を最小化することで、評価指標を改善するのが目標.**




---

<!-- _header: 損失関数と評価指標 -->

注意⚠️: これらは、学習とは全く独立した作業. 
⇨ **これの計算結果に基づいてモデルを変更することはない. 単に評価するだけ**
<div style="text-align: center;">

⇩
</div>

逆にいえば <span class="lined">**評価指標は直接最適化の対象にはならない！**</span>

  <div style="text-align: center;">
  
  ⇩
  
  </div>


損失関数を最小化することで、評価指標が改善するように損失関数を考える.

---


![bg](img/ch05_image-9.png)

---


<!-- _header: ちょっとまとめ -->



- 損失関数の値は、あくまで「訓練データに対してこれくらいの誤差になるよ」という値

- ほんとうに興味があるのは、知らないデータに対してどれくらいうまく予測できるか

- これの検証のために、擬似的に学習に使わない未知のデータを作り、未知のデータに対する予測の評価をする



<div class="cite">

バリデーションの手法や切り方についてはいろいろあり、話すとかなり長くなりますのでここでは割愛します。
メジャーなものだと Cross Validation や時系列を意識した Validation などがあります。
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

NN の万能近似性から、常に損失を $0$ にできる.


<div class="cite">

前期の線形代数の知識だけで証明できるので暇な人はやってみてください！
もう少し正確に書くと、 「矛盾のないデータ」　($x_i = x_j \Rightarrow y_i = y_j$　が成立している) なら任意の $i$ に対して $y_i = f(x_i)$ となる NN が存在することを示してください

</div>

---

<!-- _header: 過学習 -->

**学習データに対して損失関数を最小化ヨシ！** ✍️

![bg right h:400](img/ch05_overfitting.png)

---

<!-- _header: 過学習 -->


<div class="def">

### 過学習 (過剰適合, overfitting, overlearning)

学習データに過剰に適合してしまって、未知のデータに対する予測性能が低下してしまっている状態。


</div>


![bg right h:400](img/ch05_overfitting.png)




---

<!-- _header: 学習曲線 (learning curve) -->

![bg right h:500](img/ch05_image-11.png)

<div class="box">

### 学習曲線 
### (learning curve)

横軸に学習のステップ、縦軸に損失関数の値をプロットしたもの

</div>

⇨ 学習曲線を見て、過学習に注意


---

<!-- _header: バリデーションの重要性について -->

「AI作りました！ちなみにどのくらいの精度で動作するかはわからないです笑」

<div style="text-align: center;">

⇩

</div>


きちんとバリデーションを行い、未知のデータに対する予測性能を評価することが大切.

**逆に、適切にバリデーションを行なっていないが故の嘘に気をつけよう！！**


---

<!-- _header: 不適切なバリデーションの例 -->

2019年の京大の研究 [1]

「過去の気温のデータから、気温変化を NN で予測して、検証用データで 97% の精度で上がるか下がるかを予測できるようになりました！」というもの

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

バリデーション $\Leftrightarrow$ 未知のデータを予測するときの情報を <span class="dot-text">擬似的に再現</span>


---

<!-- _header: 不適切なバリデーションの例 -->

時系列なら、**未知の情報に対する精度 $\Leftrightarrow$ 2024年以降のデータに対する精度**

<span class="lined">**1990年のデータが検証用データに入っているなら、1991年以降のデータが学習データに入っていると不当に性能を高く見積もってしまう**</span>

---


<!-- _header: バリデーションの重要性について -->

Kaggle をはじめとするデータ分析コンペは、「未知の情報」を予測するモデルの精度を競う

⇨ 試行錯誤している手法の、「未知の情報を予測する能力」をきちんと評価することが大切！


---


<!-- _header: バリデーションの重要性について -->

![h:200 center](img/ch05_bestfitting.jpeg) 

<div style="text-align: center;">

 bestfitting はこう言っています。

</div>

$$
\color{red} \LARGE\textrm{A  good   CV  is   half   of  success.}
$$


---


<!-- _header: 今日のまとめ -->

- ニューラルネットワークは、学習において培われてきたいろいろな工夫があった
- バリデーションを行うことで、未知のデータに対しての予測性能を評価することができる
- バリデーションデータに対して行う評価は、学習とは独立した作業なので、微分可能であったり微分の性質が良い必要はなく、いろいろな評価指標を用いることができる
- 訓練データのみに過剰に適合した状態のことを「過学習」といい、学習曲線に目を光らせるととでこれに気をつける必要があった
- 適切にバリデーションを行うのは、**非常に重要。**