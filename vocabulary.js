const words = window.VOCAB_DATA || [];
const savedVocabulary = window.EikenProgress.read().vocabulary || {};
let current = Math.min(Math.max(Number(savedVocabulary.current) || 0, 0), Math.max(words.length - 1, 0));
let flipped = false;
const $ = (selector) => document.querySelector(selector);

function saveProgress() {
  window.EikenProgress.updateSection(
    "vocabulary",
    { current, total: words.length },
    {
      href: "vocabulary.html?resume=1",
      title: "単語・熟語の続き",
      detail: `${current + 1} / ${words.length}`
    }
  );
}

function render() {
  const word = words[current];
  if (!word) return;
  flipped = false;
  $("#wordType").textContent = word.type;
  $("#wordText").textContent = word.word;
  $("#wordMeaning").textContent = word.meaning;
  $("#wordExample").textContent = word.example;
  $("#wordTranslation").textContent = `訳：${word.translation}`;
  $("#cardProgress").textContent = `${current + 1} / ${words.length}`;
  $(".word-front").hidden = false;
  $(".word-back").hidden = true;
  $("#flipWord").textContent = "意味を見る";
  $("#prevWord").disabled = current === 0;
  $("#nextWord").disabled = current === words.length - 1;
  saveProgress();
}

function flip() {
  flipped = !flipped;
  $(".word-front").hidden = flipped;
  $(".word-back").hidden = !flipped;
  $("#flipWord").textContent = flipped ? "単語に戻る" : "意味を見る";
  saveProgress();
}

function speak(event) {
  event.stopPropagation();
  window.EikenAudio.speak(words[current].word, { rate: 0.78 });
  saveProgress();
}

$("#wordCard").addEventListener("click", flip);
$("#wordCard").addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    flip();
  }
});
$("#flipWord").addEventListener("click", flip);
$("#speakWord").addEventListener("click", speak);
$("#prevWord").addEventListener("click", () => {
  if (current > 0) {
    current -= 1;
    render();
  }
});
$("#nextWord").addEventListener("click", () => {
  if (current < words.length - 1) {
    current += 1;
    render();
  }
});

$("#wordList").innerHTML = words.slice(0, 40).map((word) => (
  `<div><strong>${word.word}</strong><span>${word.type}</span><p>${word.meaning}</p></div>`
)).join("");

render();
