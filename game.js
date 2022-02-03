var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var patternNumber = 0;

function btnFlash(color) {
    $("." + color).addClass("pressed");
    setTimeout(function () {
        $("." + color).removeClass("pressed");
    }, 100);
}
function soundPlay(key) {
    var sound = new Audio("sounds/" + key + ".mp3");
    sound.play();
}
// ランダムカラーの生成と、その記憶
function nextSequence() {
    // 色の決定
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // タイトルの変更
    $("h1").text("Level " + gamePattern.length);
    // 決定色ボタンの点滅
    setTimeout(function () {
        btnFlash(randomChosenColour);
        soundPlay(randomChosenColour);
    }, 1000);
    // 音声再生
}

// ゲーム開始 by any key down 
$(document).keydown(function () {
    if (gamePattern.length === 0) {
        // ゲーム開始
        nextSequence();
    }
});

// ゲーム中ボタンクリック判定
$(".btn").click(function () {
    clickedColor = $(this).attr("id");
    btnFlash(clickedColor);
    if (gamePattern.length !== 0) {
        // 判定
        if (clickedColor === gamePattern[patternNumber] ){
            // 正解なら次の順番
            patternNumber++;
            soundPlay(clickedColor);
            if (patternNumber === gamePattern.length) {
                //全問正解なら次の色
                nextSequence();
                patternNumber = 0;
            }
        } else {
            // NGの場合はゲームオーバーリセット
            // タイトルの変更
            $("h1").text("Game Over, Press Any Key to Restart");
            // 背景の点滅
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 500);
            // saund
            soundPlay("wrong");
            // リセット処理
            patternNumber = 0;
            gamePattern.length = 0;
        }

    }
});