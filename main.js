/**
 * 「下準備」
 * HTML上でidの付いた要素を取得する
 */
const A = document.getElementById("a");
const B = document.getElementById("b");
const TIMER = document.getElementById("timer");
const RESULT_DISPLAY = document.getElementById("result-display");
const EXPLAIN_DISPLAY = document.getElementById("explain-display");
const CORRECT = document.getElementById("audio-correct");
const WRONG = document.getElementById("audio-wrong");

/**
 * 「回答発表」
 * AとB(ボタン)が押された時にresult-displayのタグの中身を変更する。
 * 
 * 補足説明:
 * 「タイマーを止める」関数と「音を鳴らす」関数を呼び出します。
 * + Timeout関数を解くclearTimeout()も使います。
*/
A.onclick = function () {
  RESULT_DISPLAY.textContent = "正解!!!";
  playCorrect();

  //タイマー止める
  stopTimer();
  clearTimeout(limit);
}

B.onclick = function () {
  RESULT_DISPLAY.textContent = "残念!!!";
  playWrong();

  //タイマー止める
  stopTimer();
  clearTimeout(limit);
}

/**
 * 「音を鳴らす」
 * audioタグを再生するには、
 * audioタグを取得した関数.play()
 * って書いたらなります。
 * 
 * 回答したときに呼び出せる様にしましょう。
 */
const playCorrect = function () {
  CORRECT.play();
}

const playWrong = function () {
  WRONG.play();
}


/**
 * 「タイマーを作る」
 * タイマーを作るのには2つの関数と5つの関数を書く必要があります。
 * setInterval(関数,時間)は関数を時間(ミリ秒)ごとに実行するモノを作る関数です。
 * 
 * 補足説明:
 * function(){}の中で宣言したletやconstはfunctionの外から使うことができません。
 * 関数をまたいで使いたい時は、外で宣言だけしておきましょう。
 */

// 10秒分のミリ秒を変数で宣言する。(10秒=1000ms) 変数名はtimeを使う(なんでも良いけど説明のため)
let time = 1000;

// setIntervalでオブジェクトを入れる変数を宣言「だけ」する。 変数名はtimerを使う
// (どこからでもアクセスできるように用意しておく)
let timer;

// 同じくsetTimeoutを入れる変数を用意する。 変数名はlimitを使う
let limit


/**
 * timeの値を減らすcountDown関数
 */ 
const countDown = function () {
  // timeを1減らす
  time = time - 1;

  // timeを秒単位にしてHTMLの表示を更新する (textContentの中身を入れ替える)
  // time(マイクロ秒)を秒単位にするには time / 100
  TIMER.textContent = time / 100;
};

/**
 * timeの値を取得するgetTime関数
 */
const getTime = function () {
  return time;
};

/**
 * タイマーをスタートさせるstartTimer関数
 */
const startTimer = function () {
  // setInterval を使って 10ms ごとに countDown を実行する モノを作る
  timer = setInterval(countDown, 10);
};

/**
 * タイマーを止めるstopTimer関数
 */
const stopTimer = function () {
  // clearInterval(setIntervalで登録した変数)と書くと登録は消える。
  clearInterval(timer);
};

/**
 * window.onloadで使うため時間切れになったときの動作をする関数を作る。
 */
const timeout = function () {
    
    //タイマーを止める
    stopTimer(timer);

    // result-displayの中身を時間切れにする
    RESULT_DISPLAY.textContent = "時間切れ!!!!";
    stopTimer();

    // 不正解の音を再生する。
    playWrong();
}

/**
 * windowが読み込まれたら(on + load)タイマーを開始する
 */
window.onload = function () {
  // タイマーをスタートさせる。
  startTimer();

  // setTimeout(関数,時間)とするとミリ秒に止めれる。limitにいれておく。
  // 0秒以下になったら正解にしてタイマーを止める。
  // (つまり、10000ミリ秒後に不正解の時と同じことをする。)
  limit = setTimeout(timeout, 10000);
};

