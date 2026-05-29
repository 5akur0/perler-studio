import re
with open('styles.css', 'r') as f:
    css = f.read()

# remove #boardZoomControls in mobile (max-width: 860px)
mobile_media_index = css.find('@media (max-width: 860px) {')
if mobile_media_index != -1:
    css = css[:mobile_media_index + 27] + '\n  #boardZoomControls {\n    display: none !important;\n  }\n' + css[mobile_media_index + 27:]

with open('styles.css', 'w') as f:
    f.write(css)
