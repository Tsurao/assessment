'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
/**
 * 指定した要素の子要素を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    while (element.firstChild){//子要素がある限り削除
        element.removeChild(element.firstChild)
    }
}

userNameInput.onkeydown = event => {
    if(event.key === 'Enter'){
        assessmentButton.onclick();
        //TODOボタンのoneclick()処理を呼び出す
    }
};
assessmentButton.onclick = ()　=> {
    const userName = userNameInput.value;
    if(userName === 0){
        //名前が空の時は処理を終了する
        return;
    }

    //TODO 診断結果表示エリアの作成
     removeAllChildren(resultDivided);
     const header = document.createElement('h3');
     header.innerText = '診断結果';
     resultDivided.appendChild(header);

     const paragraph = document.createElement('p');
     const result = assessment(userName);
     paragraph.innerText = result;
     resultDivided.appendChild(paragraph);

    //TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue =
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('あなたのいいところ') +
        '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    //Widgets.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};
    
const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆んなを惹きつけ、心に残ります。',
    '{userName}のいいところは眼差しです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆んなを楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の自己肯定感の高さにみんながひいています。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気にかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆んなが共感し、わかりあうことができます。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆んなが感謝しています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}は皆んなから評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string}userName ユーザーの名前
 * @return {string}診断結果
 */
function assessment(userName){
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for(let i = 0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result= result.replace(/\{userName\}/g, userName);

    //TODO {username}をユーザーの名前に置き換える
    return　result;
}

//テストコード
console.assert(
    assessment('太郎')===　'太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。}',
    '診断結果の文言の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
