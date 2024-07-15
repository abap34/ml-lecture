---
marp: true
theme: honwaka
paginate: true
math: mathjax
---


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


![bg blur:6px opacity:.2](img/image-9.png)

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

![center h:280](img/image-21.png)


<div class="cite">

Jupyter Notebook では,先頭に `!` をつけることで,シェルコマンドを実行できます.

</div>

---


<!-- _header: 1-0. データのダウンロード -->



✅ 左の 📁 > train.csv, test.csv, sample_submission.csv で表が見えるようになっていたら OK！


![center h:350](img/image-23.png)


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


![w:1200](img/image-12.png)

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

![bg right h:450](img/image-13.png)


---

<!-- _header: 1-1. データの読み込み -->



機械学習モデルは <span class="dot-text">直接的には</span> 数以外は扱えないので数に変換しておく.

```python
train_y = train['class'].map({
  'normal': 0,
  'attack': 1
})
```



![bg right h:450](img/image-18.png)


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


![bg right h:400](img/image-25.png)


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


![center h:200](img/valid.png)



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





![bg right h:550](img/image-15.png)

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


![center h:320](img/layer.svg)

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

![bg right h:500](img/image-17.png)

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

# ![h:60](img/torch.png) < 私がやります


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


![center h:480](img/frame.png)

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


![bg right h:600](img/logistic_regression.png)

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

# ⇨ ![h:50](img/torch.png) < 私がやります



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

![bg right h:450](img/image-19.png)

![alt text](img/image-20.png)


---

<!-- _class: lead -->
<!-- _header: 5. 順位表への提出 -->

# めざせ　No.1！


