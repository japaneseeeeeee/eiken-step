// 端末内の英語音声から、自然さを優先して選択します。
window.EikenAudio = (() => {
  const synth = window.speechSynthesis;

  function englishVoices() {
    return synth.getVoices().filter((voice) => /^en[-_]/i.test(voice.lang));
  }

  function rankVoice(voice, preferredNames) {
    const name = voice.name.toLowerCase();
    let score = voice.localService ? 2 : 0;
    if (/en[-_]us/i.test(voice.lang)) score += 4;
    preferredNames.forEach((preferred, index) => {
      if (name.includes(preferred)) score += 20 - index;
    });
    if (/compact|novelty|whisper|zarvox|bells|organ/.test(name)) score -= 30;
    return score;
  }

  function selectVoice(kind = "female") {
    const voices = englishVoices();
    const preferred = kind === "male"
      ? ["daniel", "alex", "aaron", "fred", "google us english"]
      : ["samantha", "ava", "allison", "susan", "google us english"];
    return voices.sort((a, b) => rankVoice(b, preferred) - rankVoice(a, preferred))[0] || null;
  }

  function makeUtterance(text, kind, rate = 0.88) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    utterance.pitch = kind === "male" ? 0.92 : 1.04;
    utterance.volume = 1;
    const voice = selectVoice(kind);
    if (voice) utterance.voice = voice;
    return utterance;
  }

  function speak(text, options = {}) {
    synth.cancel();
    synth.speak(makeUtterance(text, options.kind || "female", options.rate || 0.86));
  }

  function speakDialogue(script) {
    synth.cancel();
    const parts = [...script.matchAll(/(Woman|Man):\s*([\s\S]*?)(?=\s+(?:Woman|Man):|$)/g)];
    if (!parts.length) {
      speak(script, { rate: 0.86 });
      return;
    }
    parts.forEach((part) => {
      const kind = part[1] === "Man" ? "male" : "female";
      synth.speak(makeUtterance(part[2].trim(), kind, 0.86));
    });
  }

  // Chromeでは音声一覧が遅れて読み込まれるため、先に取得を促します。
  synth.getVoices();
  return { speak, speakDialogue };
})();
