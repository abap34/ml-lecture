---
marp: true
theme: honwaka
paginate: true
math: mathjax
---

<!-- _class: lead -->

# コンペのルールについて

---


<!-- _header: コンペについて 〜 基本情報 ~ -->

- お題: このあと発表
- 開始: 7/09 18:00~ よりサブミット可能
- 終了: 7/16 23:59:59 (JST) 
- サイト: [dacq.abap34.com](https://dacq.abap34.com/)




<div style="text-align: center;">

<span style="color: red;">**※ ⚠️ 注意事項があります！この後もちゃんと読んでください！**</span>
</div>

---

<!-- _header: コンペについて : DacQ -->

<br>

<br>

![center h:360](img/image-11.png) ![h:100](img/image.png) < データ分析コンペプラットフォームです. 

---

<!-- _header:  DacQ の使い方: Manual -->

<br>
<br>

<div style="text-align: center;">



**✅ サイドバーにある 「Manual」**
**から使い方を確認できます！**


</div>

![bg right h:300](img/image-4.png)

<div style="text-align: center;">

(バグ報告は @abap34 の 
DM までお願いします)
稼働状況やバグのアナウンスは
#event/workshop/machine-learning/system-announcement でしています



</div>


---

<!-- _header: Private LB と Public LB -->


⚠️コンペ期間中に見える LB は <span class="lined">**Public LB**</span> とよばれる <span class="dot-text">暫定スコア</span>　です. 

---


<!-- _header: Private LB と Public LB -->

期間中に見えるスコア $=$ 最終的なスコア　の場合...

1. 各行の値を変えたときのスコアを見ることで値を改善できてしまい不毛
2. 上振れを引くために、サブミットしまくるのが最適戦略になってしまい不毛

<div style="text-align: center;">

⇩

**コンペ中は暫定スコアを表示して**
**最終結果は競技者が選んだサブミットに対して <span class="lined">裏で計算したスコア</span> を使う**


</div>


---

<!-- _header: Private / Public LB まとめ -->

<div style="text-align: center;">

<br>

運営があらかじめデータを 
Public 用 / Private 用に分割
↓
それぞれに対してスコアを計算しPublic Score だけが期間中見られる
↓
サブミットのうち数個を競技者が
期間中に選んでおき
その Private Score で順位が決定

![bg right h:380](img/image-6.png)

</div>

---

<!-- _header: DacQ における Private / Public LB -->

<span style="color: red;">**重要: DacQ では最終スコアとして最後の 2つのサブミットが使われます。**</span>


---

<!-- _header: スコアの計算例 -->

<div class="columns">


| 投稿日 | Public Score | Private Score |
| --- | --- | --- |
| 7/17 | 0.7 | 0.9 |
| 7/16 | 0.9 | 0.8 |
| 7/14 | 0.99 | 0.95 |
| 7/13 | 0.6 | 0.7 |
| 7/12 | 0.5 | 0.6 | 

<div>

<br>

の場合、 Public LB の値は 

### 0.5→0.6→0.99→0.99→0.99 

Private LB に乗る値は

<div style="text-align: center;">


# **0.9**


</div>

</div>

</div>


<div style="text-align: center;">


<div class="box">

<span style="color: red;">**🚨 注意: 自信のある投稿を最後に再投稿することを忘れずに！！！！！！ 🚨**</span>

</div>


</div>

---

<!-- _header: 投稿に関する特別なルール -->


### 終了直前は、混雑によって <br> 投稿ができない可能性があります

<div style="text-align: center;">

⇩

</div>


1. なるべく余裕を持って提出してください
2. 次善策として、終了 3 時間前からに限り、 <span class="lined">**終了時刻前に @abap34 のDMへ送信されたものも提出として認めます**</span>


![bg right h:550](img/image-7.png)

---


<!-- _header: 注意 -->

<span style="color: red;">**🚨最善を期しているつもりですが、不具合によって投稿データなどが失われる可能性があります。投稿ファイルは忘れずに、必ず手元にとっておいてください。🚨**</span>



---

<!-- _header: そのほかの細かいルールや注意事項について -->

<br>

<div style="text-align: center;">


<span style="color: red;">**Rules タブを、絶対に読んでください！！！　<br> 不明なことをしたくなったら @abap34 まで必ず連絡してください！**</span>

</div>

![center h:400](img/image-8.png)