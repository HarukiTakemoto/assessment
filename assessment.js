'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

//assessmentButton.onclick = function(){  <= this is also possible
function removeAllChildren(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter'){
        assessmentButton.onclick();
    }
}


assessmentButton.onclick=()=>{
    //same as assessmentButton.onclick = function() {
    const userName = userNameInput.value;
    if (userName.length ===0){
        return;
    }
    console.log(userName);
    //todo making result area
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText='診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    //todo making tweet area
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    //const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あなたのいいところ')
    +'&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたの良いところ';

    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);

    //reference, original script from Twitter.
    //<a href="https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-text="診断結果の文章" data-show-count="false">Tweet #あなたのいいところ</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
}

const answers=[
    '{userName}の良いところはAです',
    '{userName}の良いところはBです',
    '{userName}の良いところはCです',
    '{userName}の良いところはDです',
    '{userName}の良いところはEです',
    '{userName}の良いところはFです',
    '{userName}の良いところはGです',
    '{userName}の良いところはHです',
    '{userName}の良いところはIです',
    '{userName}の良いところはJです',
    '{userName}の良いところはKです',
    '{userName}s good point is lovely'
];

/**
 * 名前の文字列を渡すと診断結果を返す変数
 * ＠param{string} userName ユーザーの名前
 * @return{string} 診断結果
 */
function assessment(userName){
    let sum0fcharcode = 0;
    for(let i = 0; i<userName.length; i++){
        sum0fcharcode = sum0fcharcode + userName.charCodeAt(i);
    }
    const index = sum0fcharcode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g,userName);
    //put \ in front of specific letter like '{}', put /g if I want to replace several times.
    return result;
}

console.log(assessment('taro'));
console.log(assessment('jiro'));
console.assert(
    assessment('taro') === 'taroの良いところはJです', 'something is wrong'
);
