const GRID_SIZE = 5;
const pixels = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));

const pixelGrid = document.querySelector('#pixelGrid');
const filledCount = document.querySelector('#filledCount');
const titleInput = document.querySelector('#achievementTitle');
const descriptionInput = document.querySelector('#achievementDescription');
const requirementInput = document.querySelector('#achievementRequirement');
const resultText = document.querySelector('#resultText');
const copyButton = document.querySelector('#copyButton');
const copyStatus = document.querySelector('#copyStatus');
const clearButton = document.querySelector('#clearButton');

let pointerDrawing = false;
let pointerValue = 1;

function clearCopyStatus() {
  copyStatus.textContent = '';
}

function matrixText() {
  return `[
${pixels.map((row) => `  [${row.join(', ')}]`).join(',\n')}
]`;
}

function generatedText() {
  return `请在项目中添加以下成就：

标题：${titleInput.value.trim() || '（未填写）'}
介绍：${descriptionInput.value.trim() || '（未填写）'}
达成内容：${requirementInput.value.trim() || '（未填写）'}
像素矩阵（5×5，0 表示空白，1 表示填充）：
${matrixText()}`;
}

function updateOutput() {
  resultText.value = generatedText();
  const total = pixels.flat().reduce((sum, value) => sum + value, 0);
  filledCount.value = `${total} / 25`;
}

function updateCell(button, row, column, value) {
  pixels[row][column] = value;
  button.classList.toggle('is-filled', value === 1);
  button.setAttribute('aria-pressed', String(value === 1));
  button.setAttribute('aria-label', `第 ${row + 1} 行，第 ${column + 1} 列：${value}`);
}

function setCell(button, value) {
  const row = Number(button.dataset.row);
  const column = Number(button.dataset.column);
  if (pixels[row][column] === value) return;
  updateCell(button, row, column, value);
  clearCopyStatus();
  updateOutput();
}

function cellAtPoint(x, y) {
  const target = document.elementFromPoint(x, y);
  const button = target?.closest('.pixel-cell');
  return button && pixelGrid.contains(button) ? button : null;
}

function makeCell(row, column) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'pixel-cell';
  button.dataset.row = String(row);
  button.dataset.column = String(column);
  button.setAttribute('role', 'gridcell');
  updateCell(button, row, column, 0);

  button.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    pointerDrawing = true;
    pointerValue = pixels[row][column] === 1 ? 0 : 1;
    pixelGrid.setPointerCapture(event.pointerId);
    setCell(button, pointerValue);
  });
  button.addEventListener('click', (event) => {
    if (event.detail === 0) setCell(button, pixels[row][column] === 1 ? 0 : 1);
  });
  return button;
}

function stopDrawing() {
  pointerDrawing = false;
}

for (let row = 0; row < GRID_SIZE; row += 1) {
  for (let column = 0; column < GRID_SIZE; column += 1) {
    pixelGrid.append(makeCell(row, column));
  }
}

document.addEventListener('pointerup', stopDrawing);
document.addEventListener('pointercancel', stopDrawing);
pixelGrid.addEventListener('pointermove', (event) => {
  if (!pointerDrawing) return;
  const button = cellAtPoint(event.clientX, event.clientY);
  if (button) setCell(button, pointerValue);
});

[titleInput, descriptionInput, requirementInput].forEach((input) => {
  input.addEventListener('input', () => {
    clearCopyStatus();
    updateOutput();
  });
});

clearButton.addEventListener('click', () => {
  pixelGrid.querySelectorAll('.pixel-cell').forEach((button) => setCell(button, 0));
  clearCopyStatus();
});

copyButton.addEventListener('click', async () => {
  const text = generatedText();
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    resultText.focus();
    resultText.select();
    document.execCommand('copy');
  }
  copyStatus.textContent = '已复制，可以直接粘贴回 Codex。';
  copyButton.textContent = '已复制';
  window.setTimeout(() => {
    copyButton.textContent = '复制文本';
  }, 1800);
});

updateOutput();
