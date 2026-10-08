// 録音済み音声を優先し、読み込みに失敗した場合だけ端末音声へ切り替えます。
window.EikenAudio = (() => {
  const synth = window.speechSynthesis;
  let playbackToken = 0;
  let currentAudio = null;

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

  function makeUtterance(text, kind, rate = 0.78) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = kind === "male" ? "en-GB" : "en-US";
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;
    const voice = selectVoice(kind);
    if (voice) utterance.voice = voice;
    return utterance;
  }

  function stop() {
    playbackToken += 1;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    synth.cancel();
  }

  function speak(text, options = {}) {
    stop();
    synth.speak(makeUtterance(text, options.kind || "female", options.rate || 0.78));
  }

  function speakDialogue(script, callbacks = {}) {
    synth.cancel();
    const parts = [...script.matchAll(/(Woman|Man|Narrator):\s*([\s\S]*?)(?=\s+(?:Woman|Man|Narrator):|$)/g)];
    if (!parts.length) {
      const utterance = makeUtterance(script, "female", 0.78);
      utterance.addEventListener("end", () => callbacks.onEnd?.(), { once: true });
      utterance.addEventListener("error", () => callbacks.onError?.(), { once: true });
      synth.speak(utterance);
      return;
    }
    parts.forEach((part, index) => {
      const kind = part[1] === "Man" ? "male" : "female";
      const utterance = makeUtterance(part[2].trim(), kind, 0.78);
      if (index === parts.length - 1) {
        utterance.addEventListener("end", () => callbacks.onEnd?.(), { once: true });
        utterance.addEventListener("error", () => callbacks.onError?.(), { once: true });
      }
      synth.speak(utterance);
    });
  }

  function playDialogue(paths, script, callbacks = {}) {
    stop();
    const token = playbackToken;
    const sources = Array.isArray(paths) ? paths : [];
    if (!sources.length) {
      callbacks.onStart?.();
      speakDialogue(script, callbacks);
      return;
    }

    let index = 0;
    let fallbackStarted = false;
    callbacks.onStart?.();

    function fallback() {
      if (fallbackStarted || token !== playbackToken) return;
      fallbackStarted = true;
      currentAudio = null;
      callbacks.onError?.();
      speakDialogue(script, { onEnd: callbacks.onEnd });
    }

    function playNext() {
      if (token !== playbackToken) return;
      if (index >= sources.length) {
        currentAudio = null;
        callbacks.onEnd?.();
        return;
      }

      const audio = new Audio(sources[index]);
      index += 1;
      currentAudio = audio;
      audio.preload = "auto";
      audio.addEventListener("ended", () => {
        const pause = index === sources.length - 1 ? (callbacks.pauseBeforeLast || 760) : 320;
        window.setTimeout(playNext, pause);
      }, { once: true });
      audio.addEventListener("error", fallback, { once: true });
      const started = audio.play();
      if (started?.catch) started.catch(fallback);
    }

    playNext();
  }

  synth.getVoices();
  return { speak, speakDialogue, playDialogue, stop };
})();
