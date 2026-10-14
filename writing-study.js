const lessons = [...document.querySelectorAll(".writing-lesson")];
const writingProgress = window.EikenProgress.read().writing || {};
const completedLessons = new Set(Array.isArray(writingProgress.studyCompleted) ? writingProgress.studyCompleted : []);
const studyExercises = { ...(writingProgress.studyExercises || {}) };
const studyBuilder = { ...(writingProgress.studyBuilder || {}) };

function saveStudyProgress(detail) {
  window.EikenProgress.updateSection(
    "writing",
    {
      studyCompleted: [...completedLessons],
      studyQuizBest: Number(writingProgress.studyQuizBest) || 0,
      studyExercises,
      studyBuilder
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

const drillRules = {
  opinion: {
    input: document.querySelector("#drillOpinion"),
    test: (text) => /\b(I think(?: that)?|In my opinion|I (?:agree|disagree))\b/i.test(text),
    success: "自分の立場がはっきり伝わる文になっています。",
    retry: "I think that ... などを使って、賛成か反対かを明確にしましょう。"
  },
  reason: {
    input: document.querySelector("#drillReason"),
    test: (text) => /\bfirst(?:ly)?\b/i.test(text) && /\bbecause\b/i.test(text),
    success: "First と because で、理由と説明をつなげられています。",
    retry: "First と because の両方を入れて、理由を詳しく説明しましょう。"
  },
  example: {
    input: document.querySelector("#drillExample"),
    test: (text) => /\bfor (?:example|instance)\b/i.test(text),
    success: "具体例を示す表現が正しく使えています。",
    retry: "文の最初に For example, または For instance, を入れてみましょう。"
  },
  conclusion: {
    input: document.querySelector("#drillConclusion"),
    test: (text) => /\b(for these reasons|therefore|in conclusion|overall)\b/i.test(text),
    success: "まとめの合図があり、最後の段落らしい文になっています。",
    retry: "For these reasons, などのまとめ表現から始めましょう。"
  }
};

document.querySelectorAll(".sentence-drill").forEach((drill) => {
  const id = drill.dataset.drill;
  const rule = drillRules[id];
  const feedback = drill.querySelector(".drill-feedback");
  rule.input.value = studyExercises[id] || "";
  rule.input.addEventListener("input", () => {
    studyExercises[id] = rule.input.value;
    feedback.textContent = "入力内容を自動保存しました。";
    feedback.className = "drill-feedback";
    saveStudyProgress(`1文トレーニング ${Object.values(studyExercises).filter((text) => text.trim()).length}/4入力`);
  });
  drill.querySelector(".check-drill").addEventListener("click", () => {
    const text = rule.input.value.trim();
    if (text.split(/\s+/).filter(Boolean).length < 5) {
      feedback.textContent = "まずは5語以上の英文を書いてみましょう。";
      feedback.className = "drill-feedback retry";
      return;
    }
    const passed = rule.test(text);
    feedback.textContent = passed ? `✓ ${rule.success}` : rule.retry;
    feedback.className = `drill-feedback ${passed ? "success" : "retry"}`;
  });
});

const builderIds = ["builderOpinion", "builderReason1", "builderDetail1", "builderReason2", "builderDetail2", "builderConclusion"];
const builderFields = builderIds.map((id) => document.querySelector(`#${id}`));

function builderText() {
  return builderFields.map((field) => field.value.trim()).filter(Boolean).join(" ");
}

function builderWords(text) {
  return text ? (text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || []).length : 0;
}

function renderBuilder() {
  const text = builderText();
  const words = builderWords(text);
  document.querySelector("#builderPreview").textContent = text || "入力した英文がここにつながって表示されます。";
  document.querySelector("#builderWordCount").textContent = String(words);
  const guide = document.querySelector("#builderCountGuide");
  guide.textContent = words < 80 ? `あと${80 - words}語で目標に到達` : words <= 100 ? "目標語数に達しています" : `目標より${words - 100}語多いです`;
  guide.classList.toggle("on-target", words >= 80 && words <= 100);
}

builderFields.forEach((field) => {
  field.value = studyBuilder[field.id] || "";
  field.addEventListener("input", () => {
    studyBuilder[field.id] = field.value;
    renderBuilder();
    saveStudyProgress(`答案ビルダー ${builderWords(builderText())}語を保存`);
  });
});

document.querySelector("#checkBuilder").addEventListener("click", () => {
  const text = builderText();
  const words = builderWords(text);
  const checks = [
    { ok: builderFields.every((field) => field.value.trim()), label: "6つのマスがすべて書けている" },
    { ok: words >= 80 && words <= 100, label: `80〜100語に収まっている（現在${words}語）` },
    { ok: /\bfirst(?:ly)?\b/i.test(text) && /\bsecond(?:ly)?\b/i.test(text), label: "First と Second で理由を整理している" },
    { ok: /\b(because|for example|for instance|this is because)\b/i.test(text), label: "理由の説明または具体例がある" },
    { ok: /\b(for these reasons|therefore|in conclusion|overall)\b/i.test(text), label: "最後に意見をまとめている" }
  ];
  const feedback = document.querySelector("#builderFeedback");
  feedback.replaceChildren();
  const heading = document.createElement("strong");
  heading.textContent = `${checks.filter((item) => item.ok).length} / ${checks.length}項目クリア`;
  feedback.appendChild(heading);
  const list = document.createElement("ul");
  checks.forEach((item) => {
    const line = document.createElement("li");
    line.className = item.ok ? "passed" : "needs-work";
    line.textContent = `${item.ok ? "✓" : "△"} ${item.label}`;
    list.appendChild(line);
  });
  feedback.appendChild(list);
  feedback.hidden = false;
  feedback.scrollIntoView({ behavior: "smooth", block: "center" });
});

renderBuilder();
