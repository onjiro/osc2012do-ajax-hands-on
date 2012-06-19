# OSC 2012 do AJAX plactice

[![Build Status](https://secure.travis-ci.org/onjiro/osc2012do-ajax-hands-on.png)](http://travis-ci.org/onjiro/osc2012do-ajax-hands-on)

AJAX ハンズオンの演習課題用サーバー環境とサンプル画面です。

http://osc2012do-ajax-hands-on.herokuapp.com/

## 演習課題サンプル

* https://github.com/onjiro/osc2012do-ajax-hands-on/blob/master/view_sample/practice0.html
* https://github.com/onjiro/osc2012do-ajax-hands-on/blob/master/view_sample/practice1.html
* https://github.com/onjiro/osc2012do-ajax-hands-on/blob/master/view_sample/practice2.html
* https://github.com/onjiro/osc2012do-ajax-hands-on/blob/master/view_sample/practice3.html
* https://github.com/onjiro/osc2012do-ajax-hands-on/blob/master/view_sample/practice4.html
* https://github.com/onjiro/osc2012do-ajax-hands-on/blob/master/view_sample/practice5.html

## API

### 予約状況

* URL
  * ${root}/reservations

* 操作
  * GET: 予約状況取得、query で検索条件を指定
  * POST: 予約実行、予約情報をdataとして指定
