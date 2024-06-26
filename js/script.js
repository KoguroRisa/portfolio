$(function () {
  //フェードイン
  $(function () {
    // ウインドウをスクロールしたら
    $(window).scroll(function () {
      // .js-fadeのクラスを持つ要素（それぞれに対して）
      $('.js-fade').each(function () {
        // この要素のスクロール位置（上から）
        var pos = $(this).offset().top;
        // ウインドウのスクロール量（上から）
        var scroll = $(window).scrollTop();
        // ウインドウの縦幅
        var windowHeight = $(window).height();
        // ウインドウのスクロール量（上から）が
        // この要素のスクロール位置 - ウインドウの縦幅 + 100pxより大きい場合
        if (scroll > pos - windowHeight + 100) {
          // .scrollというクラス.js-fadeに付与する
          $(this).addClass('scroll');
        }
      });
    });
  });

  //TOPへ戻るボタン表示
  const pagetop = $('.pagetop');
  pagetop.hide();

  $(window).scroll(function () {

    if ($(window).scrollTop() > 100) {
      pagetop.fadeIn();
    }
    else {
      pagetop.fadeOut();

    }
  });

  //ページ内スクロール
  var navHeight = $(".header").outerHeight();

  $('a[href^="#"]').on("click", function () {
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top - navHeight;
    $("html, body").animate({ scrollTop: position, }, 300, "swing");
    return false;
  });

  //ページトップ
  $("#js-page-top").on("click", function () {
    $("body,html").animate({ scrollTop: 0, }, 300);
    return false;
  });

  //線が伸びるための設定を関数でまとめる
  function ScrollTimelineAnime() {
    $('.timeline li').each(function () {// それぞれのli要素の
      var elemPos = $(this).offset().top;// 上からの高さ取得
      var scroll = $(window).scrollTop();// スクロール値取得
      var windowHeight = $(window).height();// windowの高さ取得
      var startPoint = 100; //線をスタートさせる位置を指定※レイアウトによって調整してください
      if (scroll >= elemPos - windowHeight - startPoint) {
        var H = $(this).outerHeight(true)//liの余白と高さを含めた数値を取得
        //スクロール値から要素までの高さを引いた値を、liの高さの半分のパーセントで出す
        var percent = (scroll + startPoint - elemPos) / (H / 2) * 100;//liの余白と高さの半分で線を100％に伸ばす

        // 100% を超えたらずっと100%を入れ続ける
        if (percent > 100) {
          percent = 100;
        }
        // ボーダーの長さをセット
        $(this).children('.border-line').css({
          height: percent + "%", //CSSでパーセント指定
        });
      }
    });
  }

  // 画面をスクロールをしたら動かしたい場合の記述
  $(window).on('scroll', function () {
    ScrollTimelineAnime();// 線が伸びる関数を呼ぶ
  });

  // smoothTriggerにsmoothTextAppearというクラス名を付ける定義
  function SmoothTextAnime() {
    $('.smoothTextTrigger').each(function () { //smoothTextTriggerというクラス名が
      var elemPos = $(this).offset().top - 50;//要素より、50px上の
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight) {
        $(this).addClass('smoothTextAppear');// 画面内に入ったらsmoothTextAppearというクラス名を追記
      } else {
        $(this).removeClass('smoothTextAppear');// 画面外に出たらsmoothTextAppearというクラス名を外す
      }
    });
  }

  // 画面をスクロールをしたら動かしたい場合の記述
  $(window).scroll(function () {
    SmoothTextAnime();/* アニメーション用の関数を呼ぶ*/
  });// ここまで画面をスクロールをしたら動かしたい場合の記述

  //タイピングっぽい動き
  const typewriter = (param) => {
    let el = document.querySelector(param.el);
    let speed = param.speed;
    let string = param.string.split("");
    //配列内の文字を一定の秒間隔で一文字ずつ指定要素に出力する
    string.forEach((char, index) => {
      setTimeout(() => {
        el.textContent += char;
      }, speed * index);
    });
  };
  typewriter({
    el: "#typewriter", //要素
    string: "I'm a growing web creator.", //文字列
    speed: 50 //速度
  });

  //tab 選択イベント
  const tabLen = $('.tabItem').length;
  //
  for (i = 0; i < tabLen; i++) {
    tabChange(i);
  }

  function tabChange(index) {
    //クリックしたタブが何番目かを取得
    $('.tabItem:nth-child(' + (index + 1) + ')').on('click', function (e) {
      e.preventDefault();
      //対応するコンテンツエリアを表示
      $('.tabItem.tabItem-current').removeClass('tabItem-current');
      $(this).removeClass('tabItem-current');

      $('.tabBlock.tabBlock-show').addClass('tabBlock-none');                   //tab内コンテンツ非表示設定
      $('.tabBlock.tabBlock-show').removeClass('tabBlock-show');
      $('.tabItem:nth-child(' + (index + 1) + ')').addClass('tabItem-current'); //タブ色を選択状態にする
      $('.tabBlock:nth-child(' + (index + 1) + ')').addClass('tabBlock-show');  //tab内コンテンツ表示設定
      $('.tabBlock:nth-child(' + (index + 1) + ')').removeClass('tabBlock-none');
    });
  }

  //TOPへ戻るボタンクリック
  $('.pagetop').click(function () {
    $("body,html").animate({
      scrollTop: 0,
    }, 800);

    //親要素に伝播させない
    return false;
  });
  //   //タイトルアニメーション
  //   const titleVisible = "-visible";
  //   const TIMEOUT = 1900;
  //   const $target = $(".title");

  //   setInterval(() => {
  //     $target.addClass(titleVisible);
  //     setTimeout(() => {
  //       $target.removeClass(titleVisible);
  //     }, TIMEOUT);
  //   }, TIMEOUT * 2);
});

// 左に動くアニメーション
$(window).on('load', function () {
  $('.leftAnime').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      //左から右へ表示するクラスを付与
      //テキスト要素を挟む親要素（左側）とテキスト要素を元位置でアニメーションをおこなう
      $(this).addClass("slideAnimeLeftRight"); //要素を左枠外にへ移動しCSSアニメーションで左から元の位置に移動
      $(this).children(".leftAnimeInner").addClass("slideAnimeRightLeft");  //子要素は親要素のアニメーションに影響されないように逆の指定をし元の位置をキープするアニメーションをおこなう
    } else {
      //左から右へ表示するクラスを取り除く
      $(this).removeClass("slideAnimeLeftRight");
      $(this).children(".leftAnimeInner").removeClass("slideAnimeRightLeft");
    }
  });
});




// //ローディング画面の表示
// $(window).on('load', function () {
//   $("#loading").delay(1500).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
//   $("#loading_box").delay(1200).fadeOut('slow');//ローディングテキストを1.2秒（1200ms）待機してからフェードアウト
// });
