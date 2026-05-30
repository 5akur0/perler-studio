import { state } from './state.js';
import { backgroundThemes, toolStyles } from './constants.js';

export function currentBackgroundTheme() {
  return backgroundThemes[state.bgTheme] || backgroundThemes.mist;
}

export function currentToolStyle() {
  return toolStyles[state.toolStyle] || toolStyles.candy;
}

