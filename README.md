
# 目次
- [目次](#目次)
- [概要](#概要)
  - [時間割から学校の授業用フォルダを作成するツール](#時間割から学校の授業用フォルダを作成するツール)
  - [指定した数の範囲で連番フォルダ作るツール](#指定した数の範囲で連番フォルダ作るツール)
- [★今すぐこのアプリを使用する方法](#今すぐこのアプリを使用する方法)
  - [オンライン：このリポジトリのGitHub Pagesにアクセス](#オンラインこのリポジトリのgithub-pagesにアクセス)
  - [ローカル・オフライン：ビルド済みの単一htmlを開いて使用](#ローカルオフラインビルド済みの単一htmlを開いて使用)
- [このアプリをビルド/実行する方法](#このアプリをビルド実行する方法)
  - [必要となる環境](#必要となる環境)
  - [npmでパッケージをインストール](#npmでパッケージをインストール)
  - [httpプロトコルで動くやつをビルド(デフォルト)](#httpプロトコルで動くやつをビルドデフォルト)
  - [httpプロトコル＋fileプロトコルでも動くやつをビルド](#httpプロトコルfileプロトコルでも動くやつをビルド)
- [使用しているJSのライブラリ](#使用しているjsのライブラリ)
  - [JSZip.js：ZIPファイルの作成](#jszipjszipファイルの作成)
  - [FileSaver.js：ファイルの保存とDL](#filesaverjsファイルの保存とdl)
- [リポジトリのライセンス](#リポジトリのライセンス)


<br>  

# 概要
よく使うフォルダの構造を一発で作るための超簡単なWebアプリです。  
<br>

## 時間割から学校の授業用フォルダを作成するツール
・時間割の表に科目名、下部のフォームに授業の回数を入力すると、  
　「各曜日＞各授業＞各回」という構造のフォルダを生成します。  
・エクセルに貼り付けて利用するためのTSVも一緒に生成します。  

## 指定した数の範囲で連番フォルダ作るツール
・指定した数の範囲で連番フォルダを作るツールです。  
・フォルダ名と数字の範囲を入力した後に、  
　連番の形式を選択するとフォルダを生成します。  
<br>  


<br>  

# ★今すぐこのアプリを使用する方法

## オンライン：このリポジトリのGitHub Pagesにアクセス
**GitHub Pages↓にデプロイしています。**  
<br>

## ローカル・オフライン：ビルド済みの単一htmlを開いて使用
`dist-offline/index.html`をダウンロードし、  
ブラウザでindex.htmlを開くことで使用可能です。  
ローカルかつオフライン環境でも動作可能です。  

下記のリンクに入り、右上の「・・・」→「Download」を押す、  
又は、中央付近にある「↓」のボタンを押すとダウンロードできます。  
https://github.com/TweeTeaFOX223/directory-structure-generator/blob/main/dist-offline/index.html  
<br>
# このアプリをビルド/実行する方法


## 必要となる環境  
  「vite」と「vite-plugin-singlefile」でビルドする仕様です。  
 `node.js v22.2.0`と`npm v10.7.0`のインストールが必要です。  

## npmでパッケージをインストール  
このリポジトリをCloneし、ターミナルを開きます。  
npmのコマンドを実行し必要パッケージをローカルにインストールします。  
```
npm install
```


##  httpプロトコルで動くやつをビルド(デフォルト)  
```
npm run dev
```
：Viteの機能でDEVサーバを起動してアプリを動作させます。  
：コンソールに出てくるローカルホストにアクセスすると動きます。  

```
npm run build
```  
：`./dist`にhtmlとjsとcssが生成されます。  
：それをサーバーに設置してhttpプロトコルでアクセスすると動く。

<br>  
<hr>  

##  httpプロトコル＋fileプロトコルでも動くやつをビルド  
```
npm run build-offline
```
：`./dist-offline`に単一の`index.html`が生成されます。  
：そのindex.htmlをブラウザで開くと動かすことができます。  
：このhtmlはローカルかつオフライン環境でも動作が可能です。  
<br>

# 使用しているJSのライブラリ
これらのライブラリを使用しています。  <br><br>

## JSZip.js：ZIPファイルの作成
https://github.com/Stuk/jszip  
Copyright (c) 2009-2016 Stuart Knightley, David Duponchel, Franz Buchinger, António Afonso.
<br>
  
## FileSaver.js：ファイルの保存とDL  
https://github.com/eligrey/FileSaver.js  
Copyright © 2016 Eli Grey.
<br>
  
# リポジトリのライセンス
・[MIT license](https://en.wikipedia.org/wiki/MIT_License)です。