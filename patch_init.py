import re
with open('script.js', 'r') as f:
    js = f.read()

js = js.replace('  renderUI();\n  requestAnimationFrame(tick);', '  if (!loadAutoSave()) {\n    setPhase("choose");\n  }\n  renderUI();\n  requestAnimationFrame(tick);')

with open('script.js', 'w') as f:
    f.write(js)
