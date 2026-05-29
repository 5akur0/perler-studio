import re

with open('script.js', 'r') as f:
    js = f.read()

autosave_code = """
  // --- Auto Save ---
  function autoSave() {
    if (state.phase === "choose") {
      localStorage.removeItem("beadWorkshopSession.v1");
      return;
    }
    const session = {
      phase: state.phase,
      sandboxMode: state.sandboxMode,
      selectedPatternId: state.selectedPattern ? state.selectedPattern.id : null,
      patternColorMaps: state.patternColorMaps,
      patternSize: state.patternSize,
      placed: state.placed,
      heat: state.heat,
      tool: state.tool,
      trayColor: state.trayColor,
      trayBeans: state.trayBeans,
      trayMatrix: state.trayMatrix,
      tweezerBead: state.tweezerBead,
      needleLoaded: state.needleLoaded,
      errors: state.errors,
      temperature: state.temperature,
      pressure: state.pressure,
      warp: state.warp,
      cooling: state.cooling,
      spill: state.spill
    };
    try {
      localStorage.setItem("beadWorkshopSession.v1", JSON.stringify(session));
    } catch(e) {}
  }

  function loadAutoSave() {
    try {
      const data = localStorage.getItem("beadWorkshopSession.v1");
      if (!data) return false;
      const session = JSON.parse(data);
      if (!session || session.phase === "choose") return false;
      
      const pattern = patterns.find(p => p.id === session.selectedPatternId);
      if (!pattern && !session.sandboxMode) return false;
      
      state.phase = session.phase;
      state.sandboxMode = session.sandboxMode;
      state.selectedPattern = pattern;
      if (session.patternColorMaps) state.patternColorMaps = session.patternColorMaps;
      if (session.patternSize) state.patternSize = session.patternSize;
      state.placed = session.placed || [];
      state.heat = session.heat || [];
      state.tool = session.tool || "needle";
      state.trayColor = session.trayColor || null;
      state.trayBeans = ~~session.trayBeans;
      state.trayMatrix = session.trayMatrix || [];
      state.tweezerBead = session.tweezerBead || null;
      state.needleLoaded = ~~session.needleLoaded;
      state.errors = session.errors || [];
      state.temperature = session.temperature || 62;
      state.pressure = session.pressure || 56;
      state.warp = session.warp || 18;
      state.cooling = session.cooling || 0;
      state.spill = session.spill || null;
      
      // restore transient states
      if (state.selectedPattern) loadPattern(state.selectedPattern);
      if (state.phase !== "choose") compileCurrentPattern();
      syncFusionMatrix();
      setPhase(state.phase);
      return true;
    } catch(e) {
      return false;
    }
  }

"""

if 'function autoSave(' not in js:
    # insert before markDirty
    idx = js.find('  function markDirty(')
    js = js[:idx] + autosave_code + js[idx:]

# call autoSave in markDirty, but throttle it via requestAnimationFrame? Actually, just sync if it's fine.
# We'll just call autoSave in markDirty inside the body.
js = js.replace('state.uiDirty = true;\n  }', 'state.uiDirty = true;\n    requestAnimationFrame(autoSave);\n  }')

# call loadAutoSave in DOMContentLoaded
js = js.replace('updateBoardZoomControls();\n  });', 'updateBoardZoomControls();\n    if (!loadAutoSave()) setPhase("choose");\n  });')


with open('script.js', 'w') as f:
    f.write(js)

