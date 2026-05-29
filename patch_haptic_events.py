import re

with open('script.js', 'r') as f:
    js = f.read()

# Replace board interactions: place/pick needle/tweezer
# In function applyPlaceAt
js = js.replace('state.placed.push({ x: cx, y: cy, index, code: state.tweezerBead });\n      state.tweezerBead = null;',
                'state.placed.push({ x: cx, y: cy, index, code: state.tweezerBead });\n      state.tweezerBead = null;\n      triggerHaptic("light");')
js = js.replace('state.placed.push({ x: cx, y: cy, index, code: state.trayColor });\n      state.needleLoaded -= 1;',
                'state.placed.push({ x: cx, y: cy, index, code: state.trayColor });\n      state.needleLoaded -= 1;\n      triggerHaptic("light");')

# Tweezer pick up from board
js = js.replace('state.placed.splice(i, 1);\n          state.tweezerBead = p.code;',
                'state.placed.splice(i, 1);\n          state.tweezerBead = p.code;\n          triggerHaptic("light");')

# Load needle from tray
js = js.replace('state.needleLoaded += add;\n            state.trayBeans -= add;',
                'state.needleLoaded += add;\n            state.trayBeans -= add;\n            triggerHaptic("light");')

# Pick with tweezer from tray
js = js.replace('state.tweezerBead = state.trayColor;\n            state.trayBeans -= 1;',
                'state.tweezerBead = state.trayColor;\n            state.trayBeans -= 1;\n            triggerHaptic("light");')

# Pour tray
js = js.replace('state.trayBeans += amount;',
                'state.trayBeans += amount;\n        triggerHaptic("heavy");')

# Change selected color
js = js.replace('state.selectedColor = c;',
                'state.selectedColor = c;\n        triggerHaptic("light");')

with open('script.js', 'w') as f:
    f.write(js)
