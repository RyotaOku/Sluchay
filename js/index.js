// 変数を宣言
let addText = [];
const wd1aMember = ["中井侑吾", "森田翔太郎", "福村晃弘", "池田博人", "ジェイソン", "神﨑未希", "須崎魁人", "細田海斗", "大澤心春", "奥綾太", "薛思穏", "大垣陸斗", "ダレン", "山野練磨", "阪本陸", "山地咲愛", "和田卓斗", "基 恵都", "本村永遠", "中木屋十夢"];
const textInput = document.querySelector("#text");
const addButton = document.querySelector("#add");
const textTable = document.querySelector("#textTable");
const startButton = document.querySelector("#start");
const resultTable = document.querySelector("#resultTable");
const rangeInput = document.getElementById('range');
const valueMonitor = document.getElementById('value');
const allClear = document.getElementById('allClear');
let onSplit = document.getElementById("onSplit");
let offSplit = document.getElementById("offSplit");
const wd1a = document.getElementById('wd1a');
const main = document.querySelector(".main");
const copy = document.getElementById("copy");
const shutdown = document.getElementById('shutdown');

// シャットダウンボタン(XPより)
shutdown.addEventListener("click", function () {
  let image = new Image();
  image.src = "shutdown_display.png";
  image.style.position = "fixed";
  image.style.top = "0";
  image.style.left = "0";
  image.style.zIndex = "999999999";
  document.body.appendChild(image);

  let audio = new Audio("shutdown.mp3");
  audio.play();

  setTimeout(function () {
    window.close();
  }, 5000); // 5秒後にタブを閉じます
})

// balloonを表示した際の音声(WindowsXPより)
shutdown.addEventListener("mouseover", function () {
  document.getElementById("overSound").currentTime = 0;
  document.getElementById("overSound").play();
})



// 詳細表示ボタン
const button = document.getElementById('detail');
const menu = document.getElementById("menuDisplay")
button.addEventListener('click', () => {
  copy.style.zIndex = "5"
  menu.classList.toggle("active")
  if (!menu.classList.contains("active")) {
    const over = document.querySelector('.overDetail')
    setTimeout(() => {
      over.remove()
    }, 300)
  }
  let newElement = document.createElement("div"); // div要素作成
  newElement.setAttribute("class", "overDetail"); // div要素にclassを設定
  let parent = document.querySelector('main'); // main要素を取得
  parent.insertBefore(newElement, null); // 要素を生成

  button.addEventListener('click', () => {
    if (!menu.classList.contains("active")) {
      menu.classList.remove("active")
      const over = document.querySelector('.overDetail')
      over.classList.add("hidden")
      setTimeout(() => {
        over.remove()
      }, 300)
    }
  })

  document.querySelector('.overDetail').addEventListener('click', function () {
    menu.classList.remove("active")
    const over = document.querySelector('.overDetail')
    over.classList.add("hidden")
    setTimeout(() => {
      over.remove()
    }, 300)
  })
});


// クリップボードにコピーボタンの動作
copy.addEventListener('click', function () {
  // #resultTableが空っぽじゃないなら実行
  if (resultTable.children.length > 0) {

    // 「分割する」にチェックが付いているかどうか
    let split = document.getElementById("onSplit").checked;

    // 子要素を取得するために、#resultTableの中のolを取得
    let list = document.querySelector("#resultTable ol");

    // 上記のlistの中のliを取得
    let listItems = list.getElementsByTagName("li");

    // コピペする元になる変数を宣言
    let listText = "";

    // listで取得できた小要素の数だけ繰り返し処理
    for (let i = 0; i < listItems.length; i++) {
      // さっきの「分割する」にチェックが付いてるなら半分にして真ん中に区切り線
      if (split && i == Math.ceil(listItems.length / 2)) {
        listText += "-----------\n";
      }
      // 「分割しない」ならただ単に結果を取得。結果1行ごとに改行して見やすく。
      listText += (i + 1) + ". " + listItems[i].innerText + "\n";
    }
    // コピペできるようにtextarea要素を生成する
    let tempInput = document.createElement("textarea");

    // 先程生成した要素の中に、改行されて見やすくなった結果たちを入れる
    tempInput.value = listText;

    // ここでbodyの子要素としてtextareaを生成
    document.body.appendChild(tempInput);

    // 生成したtextareaにフォーカス(選択状態にして全選択)
    tempInput.select();

    // 全選択した範囲をクリップボードにコピー
    document.execCommand("copy");

    // コピーした結果とともにアラートに表示
    alert("クリップボードにコピーしました。\n\n" + listText);

    // 用済みになったtextareaを削除
    document.body.removeChild(tempInput);
  } else {
    // if文の分岐に引っかからなかったら(#resultTableが空なら)
    alert('結果が存在しません。')
  }
})




// 「マウス振ったら実行する」に必要なパーツを準備しておく。
let startX;
let moveX;
let direction;
let currentDirection;
let count = 0;

// 結果が出力される部分でマウスを左右に4回以上振った場合に結果がクリアされる。
main.addEventListener("mousemove", function (event) {
  main.addEventListener('mouseleave', function () {
    count = 0
  })
  // 結果が表示されているときのみ実行
  if (resultTable.children.length > 0) {

    // 「startX」変数が未定義の場合に現在のマウスのX座標位置を代入します。


    if (!startX) {
      startX = event.clientX;
      return;
    }

    // moveXにマウスのX軸の移動量を代入
    moveX = event.clientX - startX;

    // 上記での移動量が300pxよりも大きい場合に実行
    if (Math.abs(moveX) >= 300) {
      // moveXが正の場合に'right'、負の場合に'left'をdirectionに代入。
      direction = moveX > 0 ? 'right' : 'left';

      // if文で、countが3かつdirectionが現在の方向と異なる場合確認ダイアログを表示し、
      // OKを押した場合、Randomの結果をリセット、countを0にリセットします。
      if (count === 3 && direction !== currentDirection) {
        let mouseClear = window.confirm('結果をクリアします。よろしいですか?');
        if (mouseClear) {
          resultTable.innerHTML = "";
          count = 0;
          if (addText.length > 0) {
            let deleteArray = window.confirm('追加されている文字列もクリアしますか?');
            if (deleteArray) {
              let table = document.getElementById("textTable");
              let rows = table.getElementsByTagName("tr");
              while (rows.length > 1) {
                table.deleteRow(1);
              }
              addText.length = 0;
            }
          }

        }
        // directionがcurrentDirectionと異なる場合
        // (directionに「right」が代入されていて、currentDirectionと一致しない(=left)場合)
      } else if (direction !== currentDirection) {
        // countに+1する
        count++;
      }
      // 以上のすべての分岐に引っかからなかったらcurrentDirectionには現在のdirectionが代入される。
      currentDirection = direction;
      // カーソルを移動し始めたX座標を記録
      startX = event.clientX;
    }
  }
});





onSplit.addEventListener('change', function () {
  const ol = document.querySelector("div#resultTable ol");
  const lis = ol.querySelectorAll("li");
  let middleIndex = Math.floor(lis.length / 2);
  if (lis.length % 2 === 0) middleIndex -= 1;
  lis[middleIndex].style.borderBottom = "2px solid rgb(98, 109, 135)";
  lis[middleIndex].style.marginBottom = "20px";
  lis[middleIndex].style.paddingBottom = "20px";
})

offSplit.addEventListener('change', function () {
  const style = document.querySelector("div#resultTable ol li[style]");
  style.style = "";
})

// フォントサイズの変更とモニター
rangeInput.addEventListener('input', function () {
  valueMonitor.innerText = rangeInput.value;
  resultTable.style.fontSize = rangeInput.value + "rem";
})



// 追加ボタンがクリックされた時の処理
addButton.addEventListener("click", function () {
  if (!textInput.value == "") {
    add()
  }
});

// テキスト欄でエンターが押下されたときの処理
textInput.addEventListener("keypress", function (e) {
  if (e.code === 'Enter' && !textInput.value == "") {
    add();
  }
});

function add() {

  // 配列に入力されたテキストを追加
  addText.push(textInput.value);

  // テーブルに新しい行を追加
  const newRow = textTable.insertRow();

  // 新しい行に文字列を表示するセルを追加
  const textCell = newRow.insertCell();
  textCell.innerText = textInput.value;

  // 新しい行に削除ボタンを表示するセルを追加
  const buttonCell = newRow.insertCell();
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  buttonCell.appendChild(deleteButton);

  // 削除ボタンがクリックされた時の処理
  deleteButton.addEventListener("click", function () {
    // 配列から文字列を削除
    addText.splice(addText.indexOf(textCell.innerText), 1);

    // テーブルから行を削除
    textTable.deleteRow(newRow.rowIndex);
  });

  allClear.addEventListener("click", function clear() {
    let table = document.getElementById("textTable");
    let rows = table.getElementsByTagName("tr");
    while (rows.length > 1) {
      table.deleteRow(1);
    }
    addText.length = 0;
  });

  // 追加時にテキスト欄を空白にする。
  textInput.value = '';
}

// WD1Aのメンバーを追加するボタン
wd1a.addEventListener('click', function () {
  if (addText.length > 0) {
    let result = window.confirm('すでにいくつかの文字列が追加されているようです。処理を続行しますか？');
    if (result) {
      addWD1A()
    }
  } else {
    addWD1A()
  }
})

// WD1Aのメンバーを追加するボタン
function addWD1A() {
  for (let i = 0; i < wd1aMember.length; i++) {
    const newRow = textTable.insertRow();
    const textCell = newRow.insertCell();
    textCell.innerText = wd1aMember[i];
    const buttonCell = newRow.insertCell();
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "削除";
    buttonCell.appendChild(deleteButton);
    deleteButton.addEventListener("click", function () {
      addText.splice(addText.indexOf(textCell.innerText), 1);
      textTable.deleteRow(newRow.rowIndex);
    });
  }
  addText = addText.concat(wd1aMember)
  alert('WD1Aのメンバーを追加しました。')
  allClear.addEventListener("click", function clear() {
    let table = document.getElementById("textTable");
    let rows = table.getElementsByTagName("tr");
    while (rows.length > 1) {
      table.deleteRow(1);
    }
    addText.length = 0;
  });
}



// ランダム変更ボタンの処理
startButton.addEventListener("click", function () {
  if (addText.length === 0) {
    alert("文字列が追加されていません")
    return
  } else {
    // 配列をランダムに並び替え
    addText.sort(() => Math.random() - 0.5);

    // 結果を表示するためのol要素を作成
    const orderedList = document.createElement("ol");

    // 配列の内容をol要素に追加
    for (let i = 0; i < addText.length; i++) {
      const listItem = document.createElement("li");
      listItem.innerText = addText[i];
      // 分割する場合
      if (document.getElementById("onSplit").checked) {
        // 配列の要素数が偶数か奇数かで処理を分岐
        if (addText.length % 2 === 0) {
          // 配列の要素数が偶数の場合、配列の中央の1つの要素にborder-bottomを適用
          if (i === addText.length / 2 - 1) {
            listItem.style.borderBottom = "2px solid rgb(98, 109, 135)";
            listItem.style.marginBottom = "20px";
            listItem.style.paddingBottom = "20px";
          }
        } else {
          // 配列の要素数が奇数の場合、配列の中央の要素にborder-bottomを適用
          if (i === Math.floor(addText.length / 2)) {
            listItem.style.borderBottom = "2px solid rgb(98, 109, 135)";
            listItem.style.marginBottom = "20px";
            listItem.style.paddingBottom = "20px";
          }
        }
      }
      orderedList.appendChild(listItem);
    }
    // 結果を表示
    resultTable.innerHTML = "";
    resultTable.appendChild(orderedList);
  }
});



// モーダルで結果を拡大表示
document.getElementById('modal').addEventListener('click', function () {

  // #resultTableが空っぽの場合はエラー
  if (resultTable.children.length === 0) {
    alert("結果が存在しません。")
    return
  } else {
    copy.style.zIndex = "25";

    let newElement = document.createElement("div"); // div要素作成
    newElement.setAttribute("class", "over"); // div要素にclassを設定
    let parent = document.querySelector('main'); // main要素を取得
    parent.insertBefore(newElement, null); // 要素を生成

    // #モーダルに表示するための土台を生成
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "overDiv"); // div要素にclassを設定

    // #resultTable内の結果を取得
    for (var i = 0; i < resultTable.children.length; i++) {
      newDiv.appendChild(resultTable.children[i].cloneNode(true));
    }
    // 取得した結果を土台にコピペ
    document.querySelector('main').appendChild(newDiv);


    // モーダルを解除
    document.querySelector('.over').addEventListener('click', function () {
      const over = document.querySelector('.over')
      const overPic = document.querySelector('.overDiv')
      over.classList.add("hidden")
      overPic.classList.add("hidden")
      setTimeout(() => {
        over.remove()
        overPic.remove()
      }, 300)
    })
  }
})