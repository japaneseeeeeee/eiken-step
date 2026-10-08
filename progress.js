(function () {
  const STORAGE_KEY = "eikenStepProgressV1";

  function emptyProgress() {
    return {
      version: 1,
      updatedAt: null,
      lastActivity: null,
      vocabulary: { current: 0, total: 1500 },
      quiz: { answered: 0, correct: 0, bestScore: 0, session: null },
      listening: { current: 0, total: 115, mode: "practice", session: null },
      writing: { promptIndex: 0, drafts: {} }
    };
  }

  function read() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved || saved.version !== 1) return emptyProgress();
      const defaults = emptyProgress();
      return {
        ...defaults,
        ...saved,
        vocabulary: { ...defaults.vocabulary, ...(saved.vocabulary || {}) },
        quiz: { ...defaults.quiz, ...(saved.quiz || {}) },
        listening: { ...defaults.listening, ...(saved.listening || {}) },
        writing: { ...defaults.writing, ...(saved.writing || {}) }
      };
    } catch (_error) {
      return emptyProgress();
    }
  }

  function write(progress) {
    try {
      progress.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      return true;
    } catch (_error) {
      return false;
    }
  }

  function updateSection(section, values, activity) {
    const progress = read();
    progress[section] = { ...(progress[section] || {}), ...values };
    if (activity) {
      progress.lastActivity = {
        section,
        href: activity.href,
        title: activity.title,
        detail: activity.detail,
        updatedAt: new Date().toISOString()
      };
    }
    write(progress);
    return progress;
  }

  function formatSavedAt(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("ja-JP", {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  function renderDashboard() {
    const resumeCard = document.querySelector("#resumeCard");
    if (!resumeCard) return;

    const progress = read();
    const activity = progress.lastActivity;
    if (activity) {
      document.querySelector("#resumeTitle").textContent = activity.title;
      document.querySelector("#resumeDetail").textContent = activity.detail;
      document.querySelector("#resumeTime").textContent = formatSavedAt(activity.updatedAt);
      document.querySelector("#resumeLink").href = activity.href;
      resumeCard.hidden = false;
    }

    const vocabulary = progress.vocabulary || {};
    const quiz = progress.quiz || {};
    const listening = progress.listening || {};
    const writing = progress.writing || {};
    const draftCount = Object.values(writing.drafts || {}).filter((draft) => draft.trim()).length;

    const summaries = {
      vocabProgress: vocabulary.current > 0 || activity?.section === "vocabulary"
        ? `${vocabulary.current + 1}番まで学習`
        : "未学習",
      quizProgress: quiz.answered > 0 ? `累計${quiz.answered}問・正答${quiz.correct}問` : "未学習",
      listenProgressSummary: listening.current > 0 || listening.session
        ? `${listening.current + 1}問目まで学習`
        : "未学習",
      writingProgress: draftCount > 0 ? `${draftCount}題の下書きを保存` : "未学習"
    };

    Object.entries(summaries).forEach(([id, text]) => {
      const element = document.querySelector(`#${id}`);
      if (element) element.textContent = text;
    });
  }

  window.EikenProgress = { read, write, updateSection };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderDashboard);
  } else {
    renderDashboard();
  }
})();
