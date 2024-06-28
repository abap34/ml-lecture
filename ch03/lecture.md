---
marp: true
theme: honwaka
paginate: true
math: katex
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
\mathcal{L} (\bm{\theta}) = \dfrac{\sum_{p \in S} |f(p; \bm{\theta}) - \mathcal{F}(p)|^2 \cdot \omega_p}{\sum_{p \in S} \omega_p}
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


![center w:1000](img/pytorch.png)




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

![center h:300](img/tf_torch.jpg)

<div style="text-align: center;">
(赤: PyTorch, 青: TensorFlow)
</div>

---

<!-- _header: なので -->

### 今回は **PyTorch** を使います！


![bg right](img/torch.png)

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

<!-- _header: Tensor型 -->

数学の 「数」 に対応するオブジェクトとして、PyTorchでは

<div style="text-align: center;">

#  `Tensor` 型

</div>


を使う


---

<!-- _header: Tensor型のつくりかた -->


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

<!-- _header: Tensor型 -->

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


<!-- _header: Tensor型 -->

```python
>>> x = torch.tensor([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]], requires_grad=True)
```
$\begin{pmatrix} 1.0 & 2.0 & 3.0 \\ 4.0 & 5.0 & 6.0 \end{pmatrix}$ という行列を保持するTensor型のオブジェクトを作成


(`requires_grad=True`とすれば、勾配計算が可能な `Tensor` 型を作成できる)

---

<!-- _header: 演習1 -->

これらを勾配計算が可能なTensor型として表現してください。

1. $x = 3.0$
2. $\vec{x} = (3.0, 4.0, 5.0)$
3. $X = \begin{pmatrix} 3.0 & 4.0 & 5.0 \\ 6.0 & 7.0 & 8.0 \end{pmatrix}$

(このページの内容は、実際にやらなくてもやり方がわかればOKです)

↓ 問題の続き次のページへ


---

<!-- _header: 演習1 -->

(実際にやってください)

4. **整数** $x = 3$ を勾配計算が可能なTensor型として表現することを試みてください。また、その結果を確認して説明できるようにしてください。

<div style="text-align: center;">

※ 次のページにヒントあり
</div>

---

<!-- _header: 演習1 ヒント -->

**1, 2, 3**: 講義資料を遡って、`torch.tensor`の第一引数と作成されるTensor型の対応を見比べてみましょう。

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

<!-- _header: Tensor型に対する演算 -->

Tensor型は、「数」なので当然各種演算が可能

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

<!-- _header: Tensor型に対する演算 -->

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

##  `requires_grad=True`であるTensor型に対して計算を行うと、行われた演算が記録されたTensorができる.

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


<div class="proof" style="border-radius: 100px;">

<!-- gray -->
#### <span style="color: gray;"> 2. 記録された演算を辿って、勾配を計算する </span>

</div>


![bg right h:200](img/image.png)


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


![bg right h:200](img/image-1.png)


---

<!-- _header: 自動微分の流れ -->

1. 変数 (`Tensor` 型)の定義
2. 計算
3. backward()
   
```python
# 1. 変数(Tensor型)の定義
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

1. $f(\bm{x_1}) = \bm{x_1}^T \begin{pmatrix}
1 & 2 \\
2 & 1 \\
\end{pmatrix} \bm{x_1}$ の  $\boldsymbol{x}_1 = (1.0, 2.0)^T$ における勾配を求めよ。
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
x1 = torch.tensor([[1.0, 2.0]], requires_grad=True)

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



