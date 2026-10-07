const words=[
{word:"achieve",type:"動詞",meaning:"達成する",example:"She worked hard to achieve her goal.",translation:"彼女は目標を達成するために一生懸命努力しました。"},
{word:"environment",type:"名詞",meaning:"環境",example:"We should do more to protect the environment.",translation:"私たちは環境を守るためにもっと行動すべきです。"},
{word:"available",type:"形容詞",meaning:"利用できる、手に入る",example:"This service is available in many countries.",translation:"このサービスは多くの国で利用できます。"},
{word:"increase",type:"動詞",meaning:"増加する、増やす",example:"The number of visitors increased last year.",translation:"昨年、訪問者の数が増えました。"},
{word:"opportunity",type:"名詞",meaning:"機会、好機",example:"Studying abroad is a good opportunity to learn.",translation:"留学は学ぶためのよい機会です。"},
{word:"deal with",type:"熟語",meaning:"～に対処する、～を扱う",example:"We need to deal with this problem quickly.",translation:"私たちはこの問題にすぐ対処する必要があります。"},
{word:"take part in",type:"熟語",meaning:"～に参加する",example:"More than 100 students took part in the event.",translation:"100人以上の生徒がその行事に参加しました。"},
{word:"be responsible for",type:"熟語",meaning:"～に責任がある、～を担当する",example:"He is responsible for training new staff.",translation:"彼は新人スタッフの研修を担当しています。"},
{word:"as a result",type:"熟語",meaning:"その結果",example:"It rained heavily. As a result, the game was canceled.",translation:"激しい雨が降りました。その結果、試合は中止になりました。"},
{word:"in addition to",type:"熟語",meaning:"～に加えて",example:"In addition to English, she speaks French.",translation:"英語に加えて、彼女はフランス語も話します。"}
];
let current=0,flipped=false;const $=s=>document.querySelector(s);
function render(){const w=words[current];flipped=false;$("#wordType").textContent=w.type;$("#wordText").textContent=w.word;$("#wordMeaning").textContent=w.meaning;$("#wordExample").textContent=w.example;$("#wordTranslation").textContent=`訳：${w.translation}`;$("#cardProgress").textContent=`${current+1} / ${words.length}`;$(".word-front").hidden=false;$(".word-back").hidden=true;$("#flipWord").textContent="意味を見る";$("#prevWord").disabled=current===0;$("#nextWord").disabled=current===words.length-1}
function flip(){flipped=!flipped;$(".word-front").hidden=flipped;$(".word-back").hidden=!flipped;$("#flipWord").textContent=flipped?"単語に戻る":"意味を見る"}
function speak(e){e.stopPropagation();speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(words[current].word);u.lang="en-US";u.rate=.8;speechSynthesis.speak(u)}
$("#wordCard").addEventListener("click",flip);$("#wordCard").addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();flip()}});$("#flipWord").addEventListener("click",flip);$("#speakWord").addEventListener("click",speak);$("#prevWord").addEventListener("click",()=>{if(current>0){current--;render()}});$("#nextWord").addEventListener("click",()=>{if(current<words.length-1){current++;render()}});
$("#wordList").innerHTML=words.map(w=>`<div><strong>${w.word}</strong><span>${w.type}</span><p>${w.meaning}</p></div>`).join("");render();
