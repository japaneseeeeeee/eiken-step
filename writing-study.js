const lessons = [...document.querySelectorAll(".writing-lesson")];
const writingProgress = window.EikenProgress.read().writing || {};
const completedLessons = new Set(Array.isArray(writingProgress.studyCompleted) ? writingProgress.studyCompleted : []);

function saveStudyProgress(detail) {
  window.EikenProgress.updateSection(
    "writing",
    {
      studyCompleted: [...completedLessons],
      studyQuizBest: Number(writingProgress.studyQuizBest) || 0
    },
    {
      href: "writing-study.html",
      title: "ライティング講座の続き",
      detail
    }
  );
}

function renderLessonProgress() {
  lessons.forEach((lesson) => {
    const button = lesson.querySelector(".lesson-complete");
    const isComplete = completedLessons.has(lesson.dataset.lesson);
    lesson.classList.toggle("completed", isComplete);
    button.textContent = isComplete ? "完了済み ✓" : "この講座を完了";
    button.setAttribute("aria-pressed", String(isComplete));
  });

  const count = completedLessons.size;
  document.querySelector("#lessonCount").textContent = `${count} / ${lessons.length}`;
  document.querySelector("#lessonProgressBar").style.width = `${(count / lessons.length) * 100}%`;
  document.querySelector("#studyProgressMessage").textContent = count === lessons.length
    ? "基礎講座をすべて完了しました。次は100題の練習で型を定着させましょう。"
    : `あと${lessons.length - count}講座です。自分のペースで進めましょう。`;
}

lessons.forEach((lesson) => {
  lesson.querySelector(".lesson-complete").addEventListener("click", () => {
    const id = lesson.dataset.lesson;
    if (completedLessons.has(id)) completedLessons.delete(id);
    else completedLessons.add(id);
    writingProgress.studyCompleted = [...completedLessons];
    renderLessonProgress();
    saveStudyProgress(`基礎講座 ${completedLessons.size}/${lessons.length} 完了`);
  });
});

const quizQuestions = [
  {
    question: "英検2級ライティングの目標語数は？",
    choices: ["40〜50語", "60〜70語", "80〜100語", "120〜150語"],
    answer: 2,
    explanation: "英検2級では80〜100語を目安に書きます。"
  },
  {
    question: "最初の文で最も大切なことは？",
    choices: ["難しい単語を使う", "自分の立場を明確にする", "具体例を3つ書く", "反対意見だけを書く"],
    answer: 1,
    explanation: "I think that ... などを使い、賛成・反対をはっきり示します。"
  },
  {
    question: "理由を説明するとき、内容を広げる方法として適切なのは？",
    choices: ["同じ文を繰り返す", "日本語を入れる", "理由・具体例・結果を足す", "単語だけを並べる"],
    answer: 2,
    explanation: "「なぜ？」「例えば？」「その結果は？」に答えると具体的になります。"
  },
  {
    question: "2つ目の理由を始める表現は？",
    choices: ["However,", "For example,", "Second,", "In conclusion,"],
    answer: 2,
    explanation: "First, と Second, を使うと理由の順番が明確になります。"
  },
  {
    question: "見直しで確認する組み合わせとして最もよいものは？",
    choices: ["文字の色と大きさ", "語数・理由2つ・基本文法", "タイトルと日付", "長い単語の数だけ"],
    answer: 1,
    explanation: "語数、内容、文頭・文末、主語と動詞などを順番に確認しましょう。"
  }
];

const quizRoot = document.querySelector("#studyQuiz");
const quizAnswers = new Map();

quizQuestions.forEach((item, questionIndex) => {
  const article = document.createElement("article");
  article.className = "study-quiz-question";
  const heading = document.createElement("h3");
  heading.textContent = `Q${questionIndex + 1}. ${item.question}`;
  article.appendChild(heading);

  const choices = document.createElement("div");
  choices.className = "study-quiz-choices";
  item.choices.forEach((choice, choiceIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => {
      if (quizAnswers.has(questionIndex)) return;
      quizAnswers.set(questionIndex, choiceIndex);
      [...choices.children].forEach((itemButton, index) => {
        itemButton.disabled = true;
        if (index === item.answer) itemButton.classList.add("correct");
        else if (index === choiceIndex) itemButton.classList.add("incorrect");
      });
      feedback.hidden = false;
      feedback.textContent = `${choiceIndex === item.answer ? "正解！" : "もう一歩。"} ${item.explanation}`;
      if (quizAnswers.size === quizQuestions.length) showQuizResult();
    });
    choices.appendChild(button);
  });
  article.appendChild(choices);

  const feedback = document.createElement("p");
  feedback.className = "study-quiz-feedback";
  feedback.hidden = true;
  article.appendChild(feedback);
  quizRoot.appendChild(article);
});

function showQuizResult() {
  const score = quizQuestions.reduce((total, question, index) => total + (quizAnswers.get(index) === question.answer ? 1 : 0), 0);
  const result = document.querySelector("#studyQuizResult");
  result.hidden = false;
  result.innerHTML = `<strong>${score} / ${quizQuestions.length} 正解</strong><p>${score === quizQuestions.length ? "全問正解です。基本の型を使って実際に書いてみましょう。" : "間違えた問題の解説を確認して、もう一度講座を見直しましょう。"}</p>`;
  writingProgress.studyQuizBest = Math.max(Number(writingProgress.studyQuizBest) || 0, score);
  window.EikenProgress.updateSection(
    "writing",
    { studyCompleted: [...completedLessons], studyQuizBest: writingProgress.studyQuizBest },
    {
      href: "writing-study.html#checkTitle",
      title: "ライティング講座の続き",
      detail: `理解度チェック 最高${writingProgress.studyQuizBest}/5点`
    }
  );
  result.scrollIntoView({ behavior: "smooth", block: "center" });
}

renderLessonProgress();
