import re

with open('styles.css', 'r') as f:
    css = f.read()

pattern = r'''  \/\* Place / inspect: dock the palette.*?\/\* reserve space so trailing content can scroll clear of the fixed dock \*\/
  \.studio-grid\[data-phase="place"\] \.left-panel,
  \.studio-grid\[data-phase="inspect"\] \.left-panel \{
    padding-bottom: 230px;
  \}

  \.studio-grid\[data-phase="place"\] \.color-palette,
  \.studio-grid\[data-phase="inspect"\] \.color-palette \{
    max-height: 150px;
    overflow-y: auto;
  \}'''

css = re.sub(pattern, '', css, flags=re.DOTALL)

pattern2 = r'''  \/\* place-hint sits just above the docked palette instead of over the board \*\/
  \.place-hint \{
    top: auto;
    bottom: calc\(208px \+ env\(safe-area-inset-bottom, 0px\)\);
    max-width: calc\(100vw - 20px\);
  \}'''

css = re.sub(pattern2, '', css, flags=re.DOTALL)

# Now fix the ordering inside .left-panel
css = css.replace('  .studio-grid:not([data-phase="choose"]) #stageControls {\n    order: 1;\n  }', '  .studio-grid:not([data-phase="choose"]) #stageControls {\n    order: 3;\n  }')
css = css.replace('  .studio-grid:not([data-phase="choose"]) #toolRack {\n    order: 2;\n  }', '  .studio-grid:not([data-phase="choose"]) #toolRack {\n    order: 1;\n  }')
css = css.replace('  .studio-grid:not([data-phase="choose"]) .side-reference {\n    order: 3;\n    margin-top: 10px;\n    margin-bottom: 0;\n  }', '  .studio-grid:not([data-phase="choose"]) .side-reference {\n    order: 2;\n    margin-top: 10px;\n    margin-bottom: 16px;\n  }')

with open('styles.css', 'w') as f:
    f.write(css)

