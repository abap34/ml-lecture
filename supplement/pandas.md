---
title: pandas基本操作チートシート
author: abap34
date: 2024/09/25
tags: [pandas, Python]
twitter_id: abap34
github_id: abap34
mail: abap0002@gmail.com
ogp_url: https://abap34.github.io/ml-lecture/supplement/img/pandas.png
description: 機械学習講習会のための補足資料です。 pandas 基本操作を動く例で紹介しています。
url: https://abap34.github.io/ml-lecture/supplement/pandas.html
site_name: abap34.github.io
twitter_site: abap34
---
<style>
    h4 {
        margin-top: 1em;
        margin-bottom: 0em;
        padding-top: 0em;
        padding-bottom: 0em;
    }
    h4::before {
        content: "▶︎ " !important;
    }
</style>

<script>
    const setUp = async () => {
        let pyodide = await pyodidePromise;
        pyodide.FS.writeFile("/example.csv", "A,B,C\n1,apple,0.1\n2,banana,0.2\n3,cherry,0.3\n4,date,0.4\n");
    };
    setUp();
</script>
:::loadlib
pandas
matplotlib
numpy
:::
## このページについて

このページは、 pandas の基本的な操作を列挙したものです。

コードは実際に編集・実行できるので、実行していろいろ把握していってみてください。 (各コードブロックのメモリ空間は共有されています。)

動作について詳しく知りたい場合は、 [pandas のドキュメント](https://pandas.pydata.org/docs/) か、 [nkmk note](https://note.nkmk.me/pandas/) を参考にするのがおすすめです。

このページは [almo](https://github.com/abap34/almo) によって作られています。

## 基本操作

### データフレームの構築
:::code
import pandas as pd

df = pd.DataFrame({
    'A': [1, 2, 3, 4],
    'B': ['apple', 'banana', 'cherry', 'date'],
    'C': [0.1, 0.2, 0.3, 0.4]
})

print(df)
:::

### 超基本操作

#### 列の取得
:::code
print(df['A'])
:::

#### 行の取得
:::code
print(df.loc[0])
:::

#### 複数列の取得

:::code
print(df[['A', 'B']])
:::

#### 複数行の取得

:::code
print(df.loc[0:2])
:::

#### 特定の行と列の取得

:::code
print(df.loc[0, 'A'])
:::

#### 条件によるフィルタリング

:::code
print(df[df['A'] > 2])
:::

#### 列の追加

:::code
df['D'] = df['A'] + df['C']
print(df)
:::

#### 列の削除

:::code
df = df.drop(columns=['D'])
print(df)
:::

#### 行の追加

:::code
df = df.append({'A': 5, 'B': 'elderberry', 'C': 0.5}, ignore_index=True)
print(df)
:::

#### 行の削除

:::code
df = df.drop(0)
print(df)
:::

#### 列の名前を変更

:::code
df = df.rename(columns={'A': 'Alpha', 'B': 'Beta', 'C': 'Gamma'})
print(df)
:::

#### データ型の確認

:::code
print(df.dtypes)
:::

#### データ型の変更

:::code
df['Alpha'] = df['Alpha'].astype(float)
print(df.dtypes)
:::


#### データの基本統計量の表示

:::code
print(df.describe())
:::

#### グループ化と集計

:::code
df_grouped = df.groupby('Beta').sum()
print(df_grouped)
:::

#### CSVファイルからの読み込み

:::code
df_csv = pd.read_csv('/example.csv')
print(df_csv)
:::

#### CSVファイルへの書き出し

:::code
df.to_csv('output.csv', index=False)
:::

#### データフレームの形状を取得

:::code
print(df.shape)
:::

#### 先頭の数行を取得

:::code
print(df.head())
:::

#### 先頭の数行を指定して取得

:::code
print(df.head(2))
:::

#### 末尾の数行を取得

:::code
print(df.tail())
:::

#### 末尾の数行を指定して取得

:::code
print(df.tail(2))
:::

#### データフレームのインデックスをリセット

:::code
df = df.reset_index(drop=True)
print(df)
:::

#### データフレームのソート（昇順）

:::code
df = df.sort_values(by='Alpha')
print(df)
:::

#### データフレームのソート（降順）

:::code
df = df.sort_values(by='Alpha', ascending=False)
print(df)
:::

#### 列ごとの一意な値の取得

:::code
print(df['Beta'].unique())
:::

#### 列ごとの値のカウント

:::code
print(df['Beta'].value_counts())
:::

#### データフレームの転置

:::code
print(df.T)
:::

#### 行ごとの合計

:::code
print(df.sum(axis=1))
:::

#### 列ごとの合計

:::code
print(df.sum())
:::

## データ操作

### データの結合


#### データの結合（共通の列を基準）

:::code
df1 = pd.DataFrame({'key': ['A', 'B', 'C'], 'value': [1, 2, 3]})
df2 = pd.DataFrame({'key': ['B', 'C', 'D'], 'value': [4, 5, 6]})

df_merged = pd.merge(df1, df2, on='key')
print(df_merged)
:::

#### データの結合（全行を含む）
:::code
df_outer_merged = pd.merge(df1, df2, on='key', how='outer')
print(df_outer_merged)
:::

#### データの結合（左側のデータフレームを基準）
:::code
df_left_merged = pd.merge(df1, df2, on='key', how='left')
print(df_left_merged)
:::

#### データの結合（右側のデータフレームを基準）
:::code
df_right_merged = pd.merge(df1, df2, on='key', how='right')
print(df_right_merged)
:::

#### データの結合（インデックスを基準）
:::code
df1 = pd.DataFrame({'value': [1, 2, 3]}, index=['A', 'B', 'C'])
df2 = pd.DataFrame({'value': [4, 5, 6]}, index=['B', 'C', 'D'])

df_index_merged = pd.merge(df1, df2, left_index=True, right_index=True, how='outer')
print(df_index_merged)
:::

## 欠損値の扱い

### 欠損値の確認
:::code
# データフレームに欠損値を含めたサンプルデータを作成
df_missing = pd.DataFrame({
    'A': [1, 2, None, 4],
    'B': ['apple', None, 'cherry', 'date'],
    'C': [0.1, 0.2, 0.3, None]
})
print(df_missing.isna().sum())
:::

### 欠損値埋め
:::code
# 欠損値を特定の値で埋める
df_missing['A'] = df_missing['A'].fillna(0)
df_missing['B'] = df_missing['B'].fillna('unknown')
df_missing['C'] = df_missing['C'].fillna(df_missing['C'].mean())
print(df_missing)
:::

## ピボットテーブル

### ピボットテーブルの作成
:::code
df_pivot = pd.DataFrame({
    'A': ['foo', 'foo', 'foo', 'bar', 'bar', 'bar'],
    'B': ['one', 'one', 'two', 'two', 'one', 'one'],
    'C': ['small', 'large', 'small', 'small', 'small', 'large'],
    'D': [1, 2, 2, 3, 3, 4]
})

pivot_table = pd.pivot_table(df_pivot, values='D', index=['A', 'B'], columns=['C'], aggfunc=np.sum)
print(pivot_table)
:::

## タイムシフト操作

### 日付と時刻の操作
:::code
import pandas as pd

# サンプルデータの作成
df_time = pd.DataFrame({
    'date': pd.date_range(start='1/1/2020', periods=5, freq='D'),
    'value': [1, 2, 3, 4, 5]
})

# 日付列をインデックスに設定
df_time.set_index('date', inplace=True)
print(df_time)
:::

### 日付範囲の生成
:::code
date_range = pd.date_range(start='1/1/2020', end='1/10/2020')
print(date_range)
:::

### タイムシフト
:::code
# 一日後にシフト
shifted_df = df_time.shift(1)
print(shifted_df)
:::

### 移動平均の計算
:::code
# 3日間の移動平均を計算
rolling_mean = df_time.rolling(window=3).mean()
print(rolling_mean)
:::

## プロット関連

### ライブラリのインポート
:::code
import matplotlib.pyplot as plt

# データフレームの構築
df_plot = pd.DataFrame({
    'Category': ['A', 'B', 'C', 'D'],
    'Values': [4, 3, 2, 1]
})
:::

### 棒グラフの作成
:::code
plt.figure(figsize=(8, 5))
plt.bar(df_plot['Category'], df_plot['Values'])
plt.title('Bar Plot Example')
plt.xlabel('Category')
plt.ylabel('Values')
plt.show()
:::

### 散布図の作成
:::code
# サンプルデータの作成
df_scatter = pd.DataFrame({
    'X': [1, 2, 3, 4, 5],
    'Y': [5, 4, 3, 2, 1]
})

plt.figure(figsize=(8, 5))
plt.scatter(df_scatter['X'], df_scatter['Y'])
plt.title('Scatter Plot Example')
plt.xlabel('X')
plt.ylabel('Y')
plt.show()
:::

### ヒストグラムの作成
:::code
# サンプルデータの作成
df_hist = pd.DataFrame({
    'Values': [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
})

plt.figure(figsize=(8, 5))
plt.hist(df_hist['Values'], bins=4, edgecolor='black')
plt.title('Histogram Example')
plt.xlabel('Values')
plt.ylabel('Frequency')
plt.show()
:::

### ボックスプロットの作成
:::code
# サンプルデータの作成
df_box = pd.DataFrame({
    'Category': ['A', 'A', 'B', 'B', 'C', 'C'],
    'Values': [1, 2, 3, 4, 5, 6]
})

plt.figure(figsize=(8, 5))
df_box.boxplot(by='Category', column=['Values'])
plt.title('Box Plot Example')
plt.suptitle('')  # デフォルトのタイトルを消す
plt.xlabel('Category')
plt.ylabel('Values')
plt.show()
:::
