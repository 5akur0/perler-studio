import re

with open('script.js', 'r') as f:
    js = f.read()

haptics_code = """
  // --- Audio & Haptics ---
  let audioCtx = null;
  function initAudio() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) { }
    }
  }

  function playClickSound(type = "light") {
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if (type === "light") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.04);
    } else if (type === "heavy") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.06);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.06);
    }
  }

  function triggerHaptic(type = "light") {
    initAudio();
    if (navigator.vibrate) {
      if (type === "light") navigator.vibrate(5);
      else if (type === "heavy") navigator.vibrate(10);
      else if (type === "error") navigator.vibrate([15, 30, 15]);
    }
    playClickSound(type);
  }

"""

if 'function triggerHaptic' not in js:
    # insert before function setPhase
    idx = js.find('  function setPhase(')
    js = js[:idx] + haptics_code + js[idx:]

with open('script.js', 'w') as f:
    f.write(js)
