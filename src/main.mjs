"use strict";
import { saveAs } from "file-saver";
import JSZip from "jszip";

//ファイルに使用できない記号を置換する関数
const filenameReplace = function (targetString) {
  let string = targetString;
  //ウィンドウズのファイル名で使用できない記号
  let marks = ["\\", "/", ":", "*", "?", "<", ">", "|"];

  //全部置き換えて消す
  marks.forEach(function (element) {
    string = string.replace(element, "ぬ");
  });
  return string;
};

//TSV用の二次元配列を反転させる用の関数
//フォルダ作る処理の関係で、反転させた状態の二次元配列できるため必要
const reverseTableArray = function (targetTable) {
  let reverseTable = [];

  for (let col = 0; col < targetTable[0].length; col++) {
    let newRow = [];

    for (let row = 0; row < targetTable.length; row++) {
      newRow.push(targetTable[row][col]);
    }

    reverseTable.push(newRow);
  }

  console.table(reverseTable);
  return reverseTable;
};

//二次元配列をTSVファイル用の文字列に変換する関数
const tableArrayToTSV = function (targetTable) {
  let tsvString = "";

  targetTable.forEach((nowRow) => {
    nowRow.forEach((nowElem) => {
      tsvString += `${nowElem}\t`;
    });
    tsvString += "\n";
  });

  console.log(tsvString);
  return tsvString;
};

//フォルダ生成ボタンを押したときの処理
const generator = function () {
  const zip = new JSZip(); ///「jszip.min.js」の機能→保存したいファイル作る

  const folderName = document.getElementById("folder-name");
  const lessonsNum = document.getElementById("lessons-num");

  let name = filenameReplace(folderName.value); //呼び出しと同時にやばい記号置換

  if (name === "") {
    name = prompt("フォルダの名前を入力してください");

    if (!name) {
      return;
    }

    folderName.value = filenameReplace(name); //入力したものをhtmlにも反映
  }

  //TSV用の二次元配列、後で反転させる
  let tsvData = [
    [
      " ",
      "1時間目",
      "2時間目",
      "3時間目",
      "4時間目",
      "5時間目",
      "6時間目",
      "7時間目",
      "8時間目",
    ],
  ];

  let weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa"]; //曜日、elementIdを取得する用
  let weekdaysJp = [
    "1_月曜日",
    "2_火曜日",
    "3_水曜日",
    "4_木曜日",
    "5_金曜日",
    "6_土曜日",
  ]; //曜日、ファイル名に入れる用

  //月～土曜日でループ
  weekdays.forEach(function (element, index) {
    let nowDaysTSV = [weekdaysJp[index].slice(2, 4)]; //～曜日のTSVデータ

    //1時間目～8時間目でループ
    for (let nStudy = 1; nStudy <= 8; nStudy++) {
      const nowWeekday = weekdaysJp[index]; //現在の曜日(日本語)
      const nowLessonId = `${element}-${nStudy}st`; //現在の時間の授業のid

      const nowLessonElem = document.getElementById(`${nowLessonId}`); //現在の時間の授業の要素
      const nowLessonRow = nowLessonElem.value; //現在の時間の授業の名称
      const nowLesson = filenameReplace(nowLessonRow); //やばい記号を置換する

      //重要：window[変数名]で、html側のidを書くのと同義になるが使ってはいけない
      //https://qiita.com/FumioNonaka/items/0d4e014314e7ac572d0f
      //console.log(window[nowLessonId].value)

      if (nowLesson == "") {
        //授業名に何も記載されていない＝空白の時はフォルダデータには何もしない

        nowDaysTSV.push(" "); //TSVのデータに空白を追加する
      } else {
        let nowPass = `${nowWeekday}/${nStudy}_${nowLesson}`; //現在のパス
        console.log(nowPass);
        //各科目用のメモを作成する
        zip.file(
          `${nowPass}/${nowLesson}_メモ.txt`,
          `これは${nowLesson}のメモです`
        );

        //各回分のメモを作成する(使わない可能性高いがフォルダ作るために)
        for (let nTime = 1; nTime <= lessonsNum.value; nTime++) {
          zip.file(
            `${nowPass}/${nowLesson}_${nTime}回目/${nowLesson}の${nTime}回目メモ.txt`,
            `これは${nowLesson}の${nTime}回目メモです`
          );
        }
        //TSVのデータに追加する
        nowDaysTSV.push(`${nowLesson}`); //TSVの
      }
    }

    tsvData.push(nowDaysTSV);
  });

  console.table(tsvData); //TSVの配列(反転前)をチェック
  const tsvDataString = reverseTableArray(tsvData); //TSVの配列(反転)をチェック
  const tsvDataRaw = tableArrayToTSV(tsvDataString); //TSV用文字列をチェック
  zip.file(`${name}_時間割.tsv`, tsvDataRaw); //ZIPファイルにTSVデータを入れる！！！

  //ブラウザで保存する処理(compressionはSTOREにして無圧縮にする。DEFLATEだと圧縮になる)
  zip
    .generateAsync({ type: "blob", compression: "STORE" })
    .then(function (content) {
      saveAs(content, `${name}.zip`);
    });
};

//フォルダ生成ボタンの処理
const numGenerator = function () {
  //ーーーーーーーーーー入力された値を読み込むーーーーーーーーーー
  let inputName = document.getElementById("num-folder-name");
  let folderName = filenameReplace(inputName.value); //呼び出しと同時にやばい記号置換

  let selectedFolderType = document.getElementById("select-type");
  let folderType = selectedFolderType.value;
  console.log(folderType);

  let inputStartNum = document.getElementById("start-number");
  let inputEndNum = document.getElementById("end-number");

  //注意：inputのtypeが「number」だとisNaNがうまくできないので注意
  //「number」だと文字列は全部「0」に変換されるため
  let startNum = Number(inputStartNum.value);
  let endNum = Number(inputEndNum.value);
  console.log(isNaN(inputEndNum.value));

  //ーーーーーーーーーーZIPファイルを作成するーーーーーーーーーー

  if (Number.isNaN(startNum) || Number.isNaN(endNum)) {
    alert("エラー：開始の数か終了の数に\n数字以外の値が入力されてる");
  } else if (endNum <= startNum) {
    alert("エラー：開始の数が終了の数より大きい！");
    console.log(`${endNum} <= ${startNum}`);
  } else if (startNum < 0) {
    alert("エラー：開始の数が0未満になっている！");
  } else if (1000 < endNum) {
    alert(
      "セーフティ：連番の数が1000以上です!\nこれで作りたい場合は自己責任でコード書き換えてください)"
    );
  } else {
    const zip = new JSZip(); ///「jszip.min.js」の機能→保存したいファイル作る

    for (let i = startNum; i <= endNum; i++) {
      const nowPass = folderType.replace("名前", folderName).replace("数字", i);
      zip.file(`${nowPass}/保持用.txt`, "あ");
    }

    //ブラウザで保存する処理(compressionはSTOREにして無圧縮にする。DEFLATEだと圧縮になる)
    zip
      .generateAsync({ type: "blob", compression: "STORE" })
      .then(function (content) {
        saveAs(content, `${folderName}.zip`);
      });
  }
};

//時間割の時限目の部分を、画面幅に合わせて書き換える
//https://qiita.com/amamamaou/items/a29b29f5267196a5e4ea
document.addEventListener("DOMContentLoaded", function () {
  const periods = document.querySelectorAll("th.periodCell");

  var mql = window.matchMedia("screen and (max-width: 1050px)");
  function timetableChange(mql) {
    if (mql.matches) {
      //1050pxよりも小さい時
      periods.forEach((period) => {
        period.textContent = period.textContent.replace("時間目", "");
      });
    } else {
      //1050pxより大きい時
      periods.forEach((period) => {
        if (!period.textContent.includes("時間目")) {
          period.textContent = period.textContent += "時間目";
        }
      });
    }
  }

  //境目の所になったら変える
  //https://ao-system.net/note/215
  mql.addEventListener("change", timetableChange);

  // 初回チェック
  timetableChange(mql);
});

//ここをメインの処理とする

//アプリを選択する処理

const selectApps = document.querySelectorAll(".select-app-menu li");

selectApps.forEach((selectApp) => {
  selectApp.addEventListener("click", () => {
    selectApps.forEach((app) => {
      app.classList.remove("selected-app");
      document.getElementById(app.dataset.id).classList.remove("active");
    });

    selectApp.classList.add("selected-app");
    document.getElementById(selectApp.dataset.id).classList.add("active");
  });
});

const tableForms = document.querySelectorAll(".timetable input");
console.table(tableForms);

//時間割を入力した時に、曜日と時限の部分の色を変える処理
tableForms.forEach((forms) => {
  const dayClass = forms.id.split("-");
  const nowDay = document.getElementById(dayClass[0]);
  const nowClass = document.getElementById(dayClass[1]);

  forms.addEventListener("focus", () => {
    nowDay.classList.add("focus-day-class");
    nowClass.classList.add("focus-day-class");
  });

  forms.addEventListener("blur", () => {
    nowDay.classList.remove("focus-day-class");
    nowClass.classList.remove("focus-day-class");
  });
});

//授業回数がマイナスor空白 or 数字ではない文字列だった場合の処理
const lessonsNumForm = document.getElementById("lessons-num");
lessonsNumForm.addEventListener("blur", () => {
  console.log(lessonsNumForm.value);
  //input number　→数字ではない文字列が入力されると<empty string>になる
  if (lessonsNumForm.value <= 0 || lessonsNumForm.value == "") {
    lessonsNumForm.value = 1;
  } else if (100 < lessonsNumForm.value) {
    alert(
      "授業回数の値が100を超えている！\nこれ以上は動作保証できないので\n試したい場合は自分でコード書き換えてください"
    );
    lessonsNumForm.value = 12;
  }
});

//生成ボタンをクリックした時
const generateBtn = document.getElementById("generateBtn");
generateBtn.addEventListener("click", () => {
  generator();
});

//生成ボタンをクリックした時
const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", () => {
  numGenerator();
});
