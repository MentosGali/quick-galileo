// ==========================================
// ==========================================
//  PIXEL ART ANIMATION TOOL - app.js
//  Paleta VGA 256 colores (modo 13h)
//  Exporta archivos .asm por capa + orquestador
// ==========================================

// ==========================================
// PALETA VGA 256 COLORES (índices 0-255)
// Valores RGB para representación en canvas
// ==========================================
const VGA_PALETTE = [
  // 0-15: Colores básicos EGA/VGA
  [0, 0, 0],
  [0, 0, 168],
  [0, 168, 0],
  [0, 168, 168],
  [168, 0, 0],
  [168, 0, 168],
  [168, 84, 0],
  [168, 168, 168],
  [84, 84, 84],
  [84, 84, 252],
  [84, 252, 84],
  [84, 252, 252],
  [252, 84, 84],
  [252, 84, 252],
  [252, 252, 84],
  [252, 252, 252],
  // 16-31
  [0, 0, 0],
  [20, 20, 20],
  [32, 32, 32],
  [44, 44, 44],
  [56, 56, 56],
  [68, 68, 68],
  [80, 80, 80],
  [96, 96, 96],
  [112, 112, 112],
  [128, 128, 128],
  [144, 144, 144],
  [160, 160, 160],
  [180, 180, 180],
  [200, 200, 200],
  [224, 224, 224],
  [252, 252, 252],
  // 32-55: Azules
  [0, 0, 252],
  [64, 0, 252],
  [124, 0, 252],
  [188, 0, 252],
  [252, 0, 252],
  [252, 0, 188],
  [252, 0, 124],
  [252, 0, 64],
  [252, 0, 0],
  [252, 64, 0],
  [252, 124, 0],
  [252, 188, 0],
  [252, 252, 0],
  [188, 252, 0],
  [124, 252, 0],
  [64, 252, 0],
  [0, 252, 0],
  [0, 252, 64],
  [0, 252, 124],
  [0, 252, 188],
  [0, 252, 252],
  [0, 188, 252],
  [0, 124, 252],
  [0, 64, 252],
  // 56-79
  [124, 124, 252],
  [156, 124, 252],
  [188, 124, 252],
  [220, 124, 252],
  [252, 124, 252],
  [252, 124, 220],
  [252, 124, 188],
  [252, 124, 156],
  [252, 124, 124],
  [252, 156, 124],
  [252, 188, 124],
  [252, 220, 124],
  [252, 252, 124],
  [220, 252, 124],
  [188, 252, 124],
  [156, 252, 124],
  [124, 252, 124],
  [124, 252, 156],
  [124, 252, 188],
  [124, 252, 220],
  [124, 252, 252],
  [124, 220, 252],
  [124, 188, 252],
  [124, 156, 252],
  // 80-103
  [180, 180, 252],
  [196, 180, 252],
  [216, 180, 252],
  [232, 180, 252],
  [252, 180, 252],
  [252, 180, 232],
  [252, 180, 216],
  [252, 180, 196],
  [252, 180, 180],
  [252, 196, 180],
  [252, 216, 180],
  [252, 232, 180],
  [252, 252, 180],
  [232, 252, 180],
  [216, 252, 180],
  [196, 252, 180],
  [180, 252, 180],
  [180, 252, 196],
  [180, 252, 216],
  [180, 252, 232],
  [180, 252, 252],
  [180, 232, 252],
  [180, 216, 252],
  [180, 196, 252],
  // 104-127
  [0, 0, 112],
  [28, 0, 112],
  [56, 0, 112],
  [84, 0, 112],
  [112, 0, 112],
  [112, 0, 84],
  [112, 0, 56],
  [112, 0, 28],
  [112, 0, 0],
  [112, 28, 0],
  [112, 56, 0],
  [112, 84, 0],
  [112, 112, 0],
  [84, 112, 0],
  [56, 112, 0],
  [28, 112, 0],
  [0, 112, 0],
  [0, 112, 28],
  [0, 112, 56],
  [0, 112, 84],
  [0, 112, 112],
  [0, 84, 112],
  [0, 56, 112],
  [0, 28, 112],
  // 128-151
  [56, 56, 112],
  [68, 56, 112],
  [84, 56, 112],
  [96, 56, 112],
  [112, 56, 112],
  [112, 56, 96],
  [112, 56, 84],
  [112, 56, 68],
  [112, 56, 56],
  [112, 68, 56],
  [112, 84, 56],
  [112, 96, 56],
  [112, 112, 56],
  [96, 112, 56],
  [84, 112, 56],
  [68, 112, 56],
  [56, 112, 56],
  [56, 112, 68],
  [56, 112, 84],
  [56, 112, 96],
  [56, 112, 112],
  [56, 96, 112],
  [56, 84, 112],
  [56, 68, 112],
  // 152-175
  [80, 80, 112],
  [88, 80, 112],
  [96, 80, 112],
  [104, 80, 112],
  [112, 80, 112],
  [112, 80, 104],
  [112, 80, 96],
  [112, 80, 88],
  [112, 80, 80],
  [112, 88, 80],
  [112, 96, 80],
  [112, 104, 80],
  [112, 112, 80],
  [104, 112, 80],
  [96, 112, 80],
  [88, 112, 80],
  [80, 112, 80],
  [80, 112, 88],
  [80, 112, 96],
  [80, 112, 104],
  [80, 112, 112],
  [80, 104, 112],
  [80, 96, 112],
  [80, 88, 112],
  // 176-199: Escala de grises adicional y colores tierra
  [0, 0, 64],
  [16, 0, 64],
  [32, 0, 64],
  [48, 0, 64],
  [64, 0, 64],
  [64, 0, 48],
  [64, 0, 32],
  [64, 0, 16],
  [64, 0, 0],
  [64, 16, 0],
  [64, 32, 0],
  [64, 48, 0],
  [64, 64, 0],
  [48, 64, 0],
  [32, 64, 0],
  [16, 64, 0],
  [0, 64, 0],
  [0, 64, 16],
  [0, 64, 32],
  [0, 64, 48],
  [0, 64, 64],
  [0, 48, 64],
  [0, 32, 64],
  [0, 16, 64],
  // 200-223: Tonos pastel / piel
  [32, 32, 64],
  [40, 32, 64],
  [48, 32, 64],
  [56, 32, 64],
  [64, 32, 64],
  [64, 32, 56],
  [64, 32, 48],
  [64, 32, 40],
  [64, 32, 32],
  [64, 40, 32],
  [64, 48, 32],
  [64, 56, 32],
  [64, 64, 32],
  [56, 64, 32],
  [48, 64, 32],
  [40, 64, 32],
  [32, 64, 32],
  [32, 64, 40],
  [32, 64, 48],
  [32, 64, 56],
  [32, 64, 64],
  [32, 56, 64],
  [32, 48, 64],
  [32, 40, 64],
  // 224-247: Marrones, piel, neutros
  [44, 28, 28],
  [52, 28, 28],
  [60, 28, 28],
  [68, 28, 28],
  [80, 40, 20],
  [100, 60, 20],
  [120, 80, 40],
  [140, 100, 60],
  [160, 120, 80],
  [180, 140, 100],
  [200, 160, 120],
  [220, 180, 140],
  [240, 200, 160],
  [255, 220, 180],
  [255, 240, 200],
  [255, 255, 220],
  [180, 100, 60],
  [160, 80, 40],
  [140, 60, 20],
  [120, 40, 0],
  [100, 30, 0],
  [80, 20, 0],
  [60, 10, 0],
  [40, 5, 0],
  // 248-255: Especiales
  [255, 128, 0],
  [255, 165, 0],
  [255, 200, 0],
  [200, 100, 200],
  [100, 200, 200],
  [200, 200, 100],
  [128, 0, 128],
  [0, 128, 128],
];

// Devuelve el string CSS rgb() para un índice de paleta
function vgaColor(index) {
  const [r, g, b] = VGA_PALETTE[index] || [0, 0, 0];
  return `rgb(${r},${g},${b})`;
}

// ==========================================
// ESTADO PRINCIPAL
// ==========================================

let backgroundLayer = {
  id: 0,
  name: "Fondo",
  rectangles: [],
  sprites: [],
  visible: true,
  isBackground: true,
};

let frames = [];
let frameIdCounter = 0;
let activeFrameId = null;
let editingBackground = true;

let drawingMode = "rect"; // "rect" | "single" | "stamp" | "select"
let drawingState = {
  isFirstClickFixed: false,
  startPoint: null,
  hoverPoint: null,
};

let selectedColorIndex = 15; // índice 0-255 en VGA_PALETTE (default: blanco)
let gridActive = true;
let rectangleIdCounter = 0;
let spriteIdCounter = 0;

let activeSelectedSpriteId = null; // ID del sprite actualmente seleccionado
let isDraggingSprite = false;
let dragOffset = { x: 0, y: 0 };

const COSTOS_BYTES = {
  PINTAR_PIXEL: 12,
  DRAW_REGION: 25,
  TEXTO: 15,
  CURSOR: 10,
};
const LIMITE_MEMORIA_BYTES = 400 * 1024;
let memoriaConsumida = 0;

let onionSkinEnabled = true;
let onionSkinLayers = 3;

let templates = [];
let selectedTemplateId = null;
let templateIdCounter = 0;

let canvasTooltip = null;

// ==========================================
// ELEMENTOS DEL DOM
// ==========================================
const canvas = document.getElementById("pixel-canvas");
const ctx = canvas.getContext("2d");
const canvasOverlay = document.getElementById("canvas-overlay");
const hoverCoordsEl = document.getElementById("coords-hover");
const paletteContainer = document.getElementById("color-palette");
const selectedColorCircle = document.getElementById("color-preview-circle");
const selectedColorIndexText = document.getElementById("color-index-text");
const historyList = document.getElementById("history-list");
const rectCountBadge = document.getElementById("rect-count");
const templatesList = document.getElementById("templates-list");
const framesList = document.getElementById("frames-list");
const activeLayerLabel = document.getElementById("active-layer-label");

const btnToggleGrid = document.getElementById("btn-toggle-grid");
const btnClear = document.getElementById("btn-clear");
const btnExport = document.getElementById("btn-export");
const btnModeRect = document.getElementById("btn-mode-rect");
const btnModeSingle = document.getElementById("btn-mode-single");
const btnModeStamp = document.getElementById("btn-mode-stamp");
const btnModeSelect = document.getElementById("btn-mode-select");
const btnCreateTemplate = document.getElementById("btn-create-template");
const btnAddFrame = document.getElementById("btn-add-frame");
const btnCloneFrame = document.getElementById("btn-clone-frame");
const btnEditBackground = document.getElementById("btn-edit-background");
const btnToggleOnion = document.getElementById("btn-toggle-onion");

// ==========================================
// INICIALIZACIÓN
// ==========================================
function init() {
  renderPalette();
  updateSelectedColorUI();

  addFrame("Frame 1");
  switchToBackground();

  setupEventListeners();
  createCanvasTooltip();
  updateTemplatesUI();
  updateFramesUI();
  updateHistoryUI();
  renderizarUI();
  draw();
}

function createCanvasTooltip() {
  canvasTooltip = document.createElement("div");
  canvasTooltip.id = "canvas-tooltip";
  canvasTooltip.style.cssText = `
    position:fixed;background:rgba(8,12,28,0.96);
    border:1px solid rgba(99,102,241,0.55);color:#e2e8f0;
    padding:6px 12px;border-radius:8px;font-size:11px;
    font-family:'JetBrains Mono',monospace;pointer-events:none;
    z-index:9999;display:none;box-shadow:0 4px 20px rgba(0,0,0,0.6);
    backdrop-filter:blur(8px);white-space:nowrap;
  `;
  document.body.appendChild(canvasTooltip);
}

// ==========================================
// PALETA 256 COLORES
// ==========================================
function renderPalette() {
  paletteContainer.innerHTML = "";
  VGA_PALETTE.forEach((rgb, index) => {
    const swatch = document.createElement("div");
    swatch.className = "color-swatch";
    swatch.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    swatch.title = `#${index} — rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    swatch.dataset.index = index;
    if (index === selectedColorIndex) swatch.classList.add("active");
    swatch.addEventListener("click", () => {
      document
        .querySelectorAll(".color-swatch")
        .forEach((s) => s.classList.remove("active"));
      swatch.classList.add("active");
      selectedColorIndex = index;
      updateSelectedColorUI();
    });
    paletteContainer.appendChild(swatch);
  });
}

function updateSelectedColorUI() {
  const [r, g, b] = VGA_PALETTE[selectedColorIndex];
  selectedColorCircle.style.backgroundColor = `rgb(${r},${g},${b})`;
  selectedColorIndexText.textContent = `Idx: ${selectedColorIndex} | rgb(${r},${g},${b})`;
}

function getTipoInstruccion(rect) {
  if (!rect) return null;
  if (rect.type === "pixel") return "PINTAR_PIXEL";
  if (rect.type === "rect") return "DRAW_REGION";
  if (typeof rect.type === "string") return rect.type.toUpperCase();
  return null;
}

function getCostoInstruccion(tipo) {
  return COSTOS_BYTES[tipo] || 0;
}

function renderizarUI() {
  const bar = document.getElementById("memory-bar");
  const text = document.getElementById("memory-text");
  const percentage = (memoriaConsumida / LIMITE_MEMORIA_BYTES) * 100;

  if (bar) {
    bar.style.width = `${Math.min(percentage, 100)}%`;
    bar.style.backgroundColor = percentage > 90 ? "#dc3545" : "#28a745";
  }

  if (text) {
    text.textContent = `${(memoriaConsumida / 1024).toFixed(1)} KB / 400 KB`;
  }
}

function agregarInstruccion(tipo) {
  memoriaConsumida = Math.max(0, memoriaConsumida + getCostoInstruccion(tipo));
  renderizarUI();
}

function eliminarInstruccion(tipo) {
  memoriaConsumida = Math.max(0, memoriaConsumida - getCostoInstruccion(tipo));
  renderizarUI();
}

function sincronizarMemoriaDesdeHistorial(rects) {
  memoriaConsumida = (rects || []).reduce((total, rect) => {
    return total + getCostoInstruccion(getTipoInstruccion(rect));
  }, 0);
  renderizarUI();
}

// ==========================================
// COORDENADAS LÓGICAS
// ==========================================
function getLogicalCoords(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const clientX = e.clientX || (e.touches && e.touches[0].clientX);
  const clientY = e.clientY || (e.touches && e.touches[0].clientY);
  let x = Math.floor((clientX - rect.left) * scaleX);
  let y = Math.floor((clientY - rect.top) * scaleY);
  x = Math.max(0, Math.min(x, canvas.width - 1));
  y = Math.max(0, Math.min(y, canvas.height - 1));
  return { x, y };
}

// ==========================================
// EVENTOS
// ==========================================
function setupEventListeners() {
  canvas.addEventListener("mousemove", handlePointerMove);
  canvas.addEventListener("mousedown", handlePointerDown);
  canvas.addEventListener("mouseup", handlePointerUp);
  canvas.addEventListener("mouseleave", handlePointerLeave);
  canvas.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      handlePointerMove(e);
    },
    { passive: false },
  );
  canvas.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      handlePointerDown(e);
    },
    { passive: false },
  );
  canvas.addEventListener("touchend", handlePointerUp);

  btnToggleGrid.addEventListener("click", toggleGrid);
  btnClear.addEventListener("click", clearCanvas);
  btnExport.addEventListener("click", exportASM);

  const btnImportTrigger = document.getElementById("btn-import-trigger");
  const importFileInput = document.getElementById("import-file-input");
  if (btnImportTrigger && importFileInput) {
    btnImportTrigger.addEventListener("click", () => {
      importFileInput.click();
    });
    importFileInput.addEventListener("change", handleImportZIP);
  }

  btnModeRect.addEventListener("click", () => setDrawingMode("rect"));
  btnModeSingle.addEventListener("click", () => setDrawingMode("single"));
  btnModeStamp.addEventListener("click", () => setDrawingMode("stamp"));
  btnModeSelect.addEventListener("click", () => setDrawingMode("select"));
  btnCreateTemplate.addEventListener("click", createTemplateFromCurrentDrawing);

  btnAddFrame.addEventListener("click", () => {
    addFrame(`Frame ${frames.length + 1}`);
    switchToFrame(frames[frames.length - 1].id);
  });
  btnCloneFrame.addEventListener("click", cloneActiveFrame);
  btnEditBackground.addEventListener("click", switchToBackground);
  btnToggleOnion.addEventListener("click", toggleOnionSkin);
}

// ==========================================
// MODO DE DIBUJO
// ==========================================
function setDrawingMode(mode) {
  drawingMode = mode;
  drawingState.isFirstClickFixed = false;
  drawingState.startPoint = null;
  drawingState.hoverPoint = null;
  activeSelectedSpriteId = null; // Deseleccionar al cambiar de modo

  [btnModeRect, btnModeSingle, btnModeStamp, btnModeSelect].forEach((b) => {
    if (b) {
      b.classList.remove("btn-primary", "active");
      b.classList.add("btn-secondary");
    }
  });

  const targets = {
    rect: btnModeRect,
    single: btnModeSingle,
    stamp: btnModeStamp,
    select: btnModeSelect,
  };
  
  if (targets[mode]) {
    targets[mode].classList.remove("btn-secondary");
    targets[mode].classList.add("btn-primary", "active");
  }

  if (mode === "stamp" && selectedTemplateId === null && templates.length > 0) {
    selectedTemplateId = templates[0].id;
    updateTemplatesUI();
  }
  draw();
}

// ==========================================
// HOVER + TOOLTIP
// ==========================================
function handlePointerMove(e) {
  const coords = getLogicalCoords(e);
  drawingState.hoverPoint = coords;

  if (isDraggingSprite && activeSelectedSpriteId !== null) {
    const layer = getActiveEditingLayer();
    if (layer && layer.sprites) {
      const sprite = layer.sprites.find(s => s.id === activeSelectedSpriteId);
      if (sprite) {
        sprite.x = clamp(coords.x - dragOffset.x, 0, canvas.width - 1);
        sprite.y = clamp(coords.y - dragOffset.y, 0, canvas.height - 1);
        draw();
        updateHistoryUI();
      }
    }
  }

  let hoveredInfo = null;
  const currentFrameIndex = editingBackground
    ? -1
    : frames.findIndex((f) => f.id === activeFrameId);
  const visibleIndices = getVisibleFrameIndices();

  // Buscar en fondo (sprites primero, luego rects)
  const bgSprite = getSpriteAtCoords(backgroundLayer, coords);
  if (bgSprite) {
    hoveredInfo = {
      label: `🌅 Fondo | 🎭 Sprite: ${bgSprite.name || "Sprite"} (${bgSprite.x},${bgSprite.y})`,
      color: `linear-gradient(135deg,#a855f7,#6366f1)`,
    };
  }
  if (!hoveredInfo) {
    const bgRect = backgroundLayer.rectangles.find((r) =>
      isPointInRect(coords, r),
    );
    if (bgRect) {
      const [r, g, b] = VGA_PALETTE[bgRect.colorIndex];
      hoveredInfo = {
        label: `🌅 Fondo | idx:${bgRect.colorIndex}`,
        color: `rgb(${r},${g},${b})`,
      };
    }
  }

  // Buscar en frames visibles (el más reciente tiene prioridad)
  for (let i = visibleIndices.length - 1; i >= 0; i--) {
    const fi = visibleIndices[i];
    const frame = frames[fi];
    if (!frame || !frame.visible) continue;
    
    // Primero buscar sprites
    const frameSprite = getSpriteAtCoords(frame, coords);
    if (frameSprite) {
      hoveredInfo = {
        label: `🎞️ ${frame.name} | 🎭 ${frameSprite.name || "Sprite"} (${frameSprite.x},${frameSprite.y})`,
        color: `linear-gradient(135deg,#a855f7,#6366f1)`,
      };
      break;
    }
    
    const found = frame.rectangles.find((r) => isPointInRect(coords, r));
    if (found) {
      const [r, g, b] = VGA_PALETTE[found.colorIndex];
      hoveredInfo = {
        label: `🎞️ ${frame.name} (#${fi + 1}) | idx:${found.colorIndex}`,
        color: `rgb(${r},${g},${b})`,
      };
      break;
    }
  }

  if (hoveredInfo) showCanvasTooltip(e.clientX, e.clientY, hoveredInfo);
  else hideCanvasTooltip();

  // Cambiar cursor a "move" si estamos sobre un sprite de la capa activa
  const activeLayer = getActiveEditingLayer();
  const spriteUnderCursor = activeLayer ? getSpriteAtCoords(activeLayer, coords) : null;
  canvas.style.cursor = spriteUnderCursor ? "move" : "crosshair";

  hoverCoordsEl.textContent = `X:${coords.x}  Y:${coords.y}${hoveredInfo ? "  |  " + hoveredInfo.label : ""}`;
  draw();
}

function handlePointerLeave() {
  hoverCoordsEl.textContent = `X: ---  Y: ---`;
  drawingState.hoverPoint = null;
  hideCanvasTooltip();
  draw();
}

function handlePointerUp() {
  isDraggingSprite = false;
}

function showCanvasTooltip(cx, cy, info) {
  if (!canvasTooltip) return;
  canvasTooltip.innerHTML = `<span style="color:#a5b4fc">${info.label}</span> <span style="display:inline-block;width:10px;height:10px;background:${info.color};border-radius:2px;vertical-align:middle;margin-left:4px;border:1px solid rgba(255,255,255,0.2)"></span>`;
  canvasTooltip.style.display = "block";
  canvasTooltip.style.left = cx + 16 + "px";
  canvasTooltip.style.top = cy - 10 + "px";
}

function hideCanvasTooltip() {
  if (canvasTooltip) canvasTooltip.style.display = "none";
}

function isPointInRect(point, rect) {
  const minX = Math.min(rect.x1, rect.x2),
    maxX = Math.max(rect.x1, rect.x2);
  const minY = Math.min(rect.y1, rect.y2),
    maxY = Math.max(rect.y1, rect.y2);
  return (
    point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY
  );
}

// ==========================================
// DIBUJO EN CANVAS
// ==========================================
function getVisibleFrameIndices() {
  const currentIndex = editingBackground
    ? frames.length - 1
    : frames.findIndex((f) => f.id === activeFrameId);
  const indices = [];
  if (onionSkinEnabled) {
    for (
      let i = Math.max(0, currentIndex - onionSkinLayers);
      i < currentIndex;
      i++
    ) {
      if (frames[i] && frames[i].visible) indices.push(i);
    }
  }
  if (currentIndex >= 0 && frames[currentIndex]) indices.push(currentIndex);
  return indices;
}

function drawSprite(sprite, opacity, mixBlue, isLayerEditable) {
  sprite.rects.forEach(rect => {
    let fillColor;
    if (mixBlue) {
      const [r, g, b] = VGA_PALETTE[rect.colorIndex];
      const mix = mixBlue;
      const nr = Math.round(r * (1 - mix) + 60 * mix);
      const ng = Math.round(g * (1 - mix) + 80 * mix);
      const nb = Math.round(b * (1 - mix) + 200 * mix);
      fillColor = `rgb(${nr},${ng},${nb})`;
    } else {
      fillColor = vgaColor(rect.colorIndex);
    }
    ctx.fillStyle = fillColor;
    ctx.globalAlpha = opacity;
    
    const x1 = clamp(rect.x1 + sprite.x, 0, canvas.width - 1);
    const y1 = clamp(rect.y1 + sprite.y, 0, canvas.height - 1);
    const x2 = clamp(rect.x2 + sprite.x, 0, canvas.width - 1);
    const y2 = clamp(rect.y2 + sprite.y, 0, canvas.height - 1);
    const minX = Math.min(x1, x2), maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2), maxY = Math.max(y1, y2);
    ctx.fillRect(minX, minY, maxX - minX + 1, maxY - minY + 1);
  });
  
  ctx.globalAlpha = 1.0;
  // Resaltado de selección si es la capa que se está editando
  if (isLayerEditable && activeSelectedSpriteId === sprite.id) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    sprite.rects.forEach(r => {
      const x1 = r.x1 + sprite.x;
      const x2 = r.x2 + sprite.x;
      const y1 = r.y1 + sprite.y;
      const y2 = r.y2 + sprite.y;
      minX = Math.min(minX, x1, x2);
      maxX = Math.max(maxX, x1, x2);
      minY = Math.min(minY, y1, y2);
      maxY = Math.max(maxY, y1, y2);
    });
    ctx.strokeStyle = "#a855f7"; // Violeta/Morado
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.strokeRect(minX - 1.5, minY - 1.5, maxX - minX + 4, maxY - minY + 4);
    ctx.setLineDash([]);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const currentFrameIndex = editingBackground
    ? (frames.length > 0 ? frames.length - 1 : -1)
    : frames.findIndex((f) => f.id === activeFrameId);

  // 1. Fondo siempre al 100%
  if (backgroundLayer.visible) {
    ctx.globalAlpha = 1.0;
    backgroundLayer.rectangles.forEach((rect) => drawRect(rect));
    if (backgroundLayer.sprites) {
      backgroundLayer.sprites.forEach((sprite) => {
        drawSprite(sprite, 1.0, null, editingBackground);
      });
    }
  }

  // 2. Frames con onion skinning
  const visibleIndices = getVisibleFrameIndices();
  visibleIndices.forEach((fi) => {
    const frame = frames[fi];
    if (!frame || !frame.visible) return;
    const isCurrentFrame = fi === currentFrameIndex;
    const distance = currentFrameIndex - fi;
    const isEditable = !editingBackground && activeFrameId === frame.id;

    if (isCurrentFrame) {
      ctx.globalAlpha = 1.0;
      frame.rectangles.forEach((rect) => drawRect(rect));
      if (frame.sprites) {
        frame.sprites.forEach((sprite) => {
          drawSprite(sprite, 1.0, null, isEditable);
        });
      }
    } else {
      const opacitySteps = [0.35, 0.2, 0.1, 0.05];
      const opacity = opacitySteps[Math.min(distance - 1, opacitySteps.length - 1)];
      const mixBlue = Math.min(0.5, distance * 0.2);

      frame.rectangles.forEach((rect) => {
        // Tinte azul para onion skin
        const [r, g, b] = VGA_PALETTE[rect.colorIndex];
        const nr = Math.round(r * (1 - mixBlue) + 60 * mixBlue);
        const ng = Math.round(g * (1 - mixBlue) + 80 * mixBlue);
        const nb = Math.round(b * (1 - mixBlue) + 200 * mixBlue);
        ctx.fillStyle = `rgb(${nr},${ng},${nb})`;
        ctx.globalAlpha = opacity;
        const minX = Math.min(rect.x1, rect.x2),
          maxX = Math.max(rect.x1, rect.x2);
        const minY = Math.min(rect.y1, rect.y2),
          maxY = Math.max(rect.y1, rect.y2);
        ctx.fillRect(minX, minY, maxX - minX + 1, maxY - minY + 1);
      });

      if (frame.sprites) {
        frame.sprites.forEach((sprite) => {
          drawSprite(sprite, opacity, mixBlue, false);
        });
      }
    }
  });

  ctx.globalAlpha = 1.0;
  drawPreview();
}

function drawRect(rect) {
  ctx.fillStyle = vgaColor(rect.colorIndex);
  const minX = Math.min(rect.x1, rect.x2),
    maxX = Math.max(rect.x1, rect.x2);
  const minY = Math.min(rect.y1, rect.y2),
    maxY = Math.max(rect.y1, rect.y2);
  ctx.fillRect(minX, minY, maxX - minX + 1, maxY - minY + 1);
}

function drawPreview() {
  if (!drawingState.hoverPoint) return;
  const hp = drawingState.hoverPoint;

  if (drawingMode === "single") {
    ctx.fillStyle = vgaColor(selectedColorIndex);
    ctx.globalAlpha = 0.6;
    ctx.fillRect(hp.x, hp.y, 1, 1);
    ctx.globalAlpha = 1.0;
  } else if (drawingMode === "stamp" && selectedTemplateId !== null) {
    const tmpl = templates.find((t) => t.id === selectedTemplateId);
    if (tmpl) {
      ctx.globalAlpha = 0.5;
      tmpl.rects.forEach((r) => {
        ctx.fillStyle = vgaColor(r.colorIndex);
        const x1 = clamp(r.x1 + hp.x, 0, canvas.width - 1);
        const y1 = clamp(r.y1 + hp.y, 0, canvas.height - 1);
        const x2 = clamp(r.x2 + hp.x, 0, canvas.width - 1);
        const y2 = clamp(r.y2 + hp.y, 0, canvas.height - 1);
        const mnX = Math.min(x1, x2),
          mxX = Math.max(x1, x2);
        const mnY = Math.min(y1, y2),
          mxY = Math.max(y1, y2);
        ctx.fillRect(mnX, mnY, mxX - mnX + 1, mxY - mnY + 1);
      });
      ctx.globalAlpha = 1.0;
      // Bounding box
      const bounds = tmpl.rects.reduce(
        (a, r) => ({
          minX: Math.min(a.minX, r.x1, r.x2),
          maxX: Math.max(a.maxX, r.x1, r.x2),
          minY: Math.min(a.minY, r.y1, r.y2),
          maxY: Math.max(a.maxY, r.y1, r.y2),
        }),
        { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity },
      );
      if (bounds.minX !== Infinity) {
        ctx.strokeStyle = "#a855f7";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        const bx = clamp(bounds.minX + hp.x, 0, canvas.width - 1);
        const by = clamp(bounds.minY + hp.y, 0, canvas.height - 1);
        ctx.strokeRect(
          bx - 0.5,
          by - 0.5,
          bounds.maxX - bounds.minX + 2,
          bounds.maxY - bounds.minY + 2,
        );
        ctx.setLineDash([]);
      }
    }
  } else if (
    drawingMode === "rect" &&
    drawingState.isFirstClickFixed &&
    drawingState.startPoint
  ) {
    ctx.fillStyle = vgaColor(selectedColorIndex);
    ctx.globalAlpha = 0.55;
    const minX = Math.min(drawingState.startPoint.x, hp.x);
    const maxX = Math.max(drawingState.startPoint.x, hp.x);
    const minY = Math.min(drawingState.startPoint.y, hp.y);
    const maxY = Math.max(drawingState.startPoint.y, hp.y);
    ctx.fillRect(minX, minY, maxX - minX + 1, maxY - minY + 1);
    ctx.globalAlpha = 1.0;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    ctx.strokeRect(minX - 0.5, minY - 0.5, maxX - minX + 2, maxY - minY + 2);
    ctx.setLineDash([]);
  }
}

function clamp(v, mn, mx) {
  return Math.max(mn, Math.min(v, mx));
}

/**
 * Busca un sprite que contenga las coordenadas dadas
 */
function getSpriteAtCoords(layer, coords) {
  if (!layer || !layer.sprites) return null;
  // Buscar del último al primero (el de arriba primero)
  for (let i = layer.sprites.length - 1; i >= 0; i--) {
    const s = layer.sprites[i];
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    s.rects.forEach(r => {
      const x1 = r.x1 + s.x;
      const x2 = r.x2 + s.x;
      const y1 = r.y1 + s.y;
      const y2 = r.y2 + s.y;
      minX = Math.min(minX, x1, x2);
      maxX = Math.max(maxX, x1, x2);
      minY = Math.min(minY, y1, y2);
      maxY = Math.max(maxY, y1, y2);
    });
    if (coords.x >= minX && coords.x <= maxX && coords.y >= minY && coords.y <= maxY) {
      return s;
    }
  }
  return null;
}

// ==========================================
// EVENTOS DE DIBUJO
// ==========================================
function handlePointerDown(e) {
  const coords = getLogicalCoords(e);
  const layer = getActiveEditingLayer();
  if (!layer) return;

  // ── Detección universal de sprites ──
  // En CUALQUIER modo, si el usuario hace clic sobre un sprite existente,
  // se selecciona y se inicia el arrastre inmediatamente (edición rápida).
  const hitSprite = getSpriteAtCoords(layer, coords);
  if (hitSprite) {
    activeSelectedSpriteId = hitSprite.id;
    isDraggingSprite = true;
    dragOffset = {
      x: coords.x - hitSprite.x,
      y: coords.y - hitSprite.y,
    };
    draw();
    updateHistoryUI();
    return; // No ejecutar la herramienta de dibujo
  }

  // Si estamos en modo select y no tocamos ningún sprite → deseleccionar
  if (drawingMode === "select") {
    activeSelectedSpriteId = null;
    draw();
    updateHistoryUI();
    return;
  }

  // ── Deseleccionar sprite si hacemos clic en vacío con otra herramienta ──
  if (activeSelectedSpriteId !== null) {
    activeSelectedSpriteId = null;
    updateHistoryUI();
  }

  // ── Herramientas de dibujo normales ──
  if (drawingMode === "stamp") {
    if (selectedTemplateId === null) {
      alert("Selecciona una plantilla primero.");
      return;
    }
    const tmpl = templates.find((t) => t.id === selectedTemplateId);
    if (!tmpl) return;
    
    const newSprite = {
      id: ++spriteIdCounter,
      name: tmpl.name,
      x: coords.x,
      y: coords.y,
      width: tmpl.width,
      height: tmpl.height,
      rects: tmpl.rects.map(r => ({ ...r }))
    };
    
    if (!layer.sprites) layer.sprites = [];
    layer.sprites.push(newSprite);
    
    tmpl.rects.forEach(r => {
      const tipo = getTipoInstruccion(r) || "DRAW_REGION";
      agregarInstruccion(tipo);
    });

    draw();
    updateHistoryUI();
    updateFramesUI();
  } else if (drawingMode === "single") {
    agregarInstruccion("PINTAR_PIXEL");
    layer.rectangles.push({
      id: ++rectangleIdCounter,
      type: "pixel",
      x1: coords.x,
      y1: coords.y,
      x2: coords.x,
      y2: coords.y,
      colorIndex: selectedColorIndex,
    });
    optimizeRectangles(layer);
    drawingState.isFirstClickFixed = false;
    drawingState.startPoint = null;
    draw();
    updateHistoryUI();
    updateFramesUI();
  } else {
    // rect: 2 clics
    if (!drawingState.isFirstClickFixed) {
      drawingState.isFirstClickFixed = true;
      drawingState.startPoint = coords;
      drawingState.hoverPoint = coords;
      draw();
    } else {
      layer.rectangles.push({
        id: ++rectangleIdCounter,
        type: "rect",
        x1: drawingState.startPoint.x,
        y1: drawingState.startPoint.y,
        x2: coords.x,
        y2: coords.y,
        colorIndex: selectedColorIndex,
      });
      agregarInstruccion("DRAW_REGION");
      optimizeRectangles(layer);
      drawingState.isFirstClickFixed = false;
      drawingState.startPoint = null;
      drawingState.hoverPoint = null;
      draw();
      updateHistoryUI();
      updateFramesUI();
    }
  }
}


// ==========================================
// OPTIMIZACIÓN
// ==========================================
function optimizeRectangles(layer) {
  if (!layer || layer.rectangles.length < 2) return;
  const rects = layer.rectangles;
  const last = rects[rects.length - 1];
  const nMinX = Math.min(last.x1, last.x2),
    nMaxX = Math.max(last.x1, last.x2);
  const nMinY = Math.min(last.y1, last.y2),
    nMaxY = Math.max(last.y1, last.y2);
  for (let i = rects.length - 2; i >= 0; i--) {
    const p = rects[i];
    const pMinX = Math.min(p.x1, p.x2),
      pMaxX = Math.max(p.x1, p.x2);
    const pMinY = Math.min(p.y1, p.y2),
      pMaxY = Math.max(p.y1, p.y2);
    if (nMinX <= pMinX && nMaxX >= pMaxX && nMinY <= pMinY && nMaxY >= pMaxY)
      rects.splice(i, 1);
  }
}

// ==========================================
// GESTIÓN DE CAPAS / FRAMES
// ==========================================
function getActiveEditingLayer() {
  if (editingBackground) return backgroundLayer;
  return frames.find((f) => f.id === activeFrameId) || null;
}

function getActiveFrame() {
  return frames.find((f) => f.id === activeFrameId) || null;
}

function addFrame(name) {
  const f = {
    id: ++frameIdCounter,
    name: name || `Frame ${frameIdCounter}`,
    rectangles: [],
    sprites: [],
    visible: true,
  };
  frames.push(f);
  return f;
}

function switchToFrame(fId) {
  activeFrameId = fId;
  editingBackground = false;
  updateActiveLayerLabel();
  updateFramesUI();
  updateHistoryUI();
  draw();
}

function switchToBackground() {
  editingBackground = true;
  activeFrameId = null;
  updateActiveLayerLabel();
  updateFramesUI();
  updateHistoryUI();
  draw();
}

function cloneActiveFrame() {
  if (editingBackground) {
    alert("Selecciona un Frame para clonar.");
    return;
  }
  const af = getActiveFrame();
  if (!af) return;
  const newF = {
    id: ++frameIdCounter,
    name: `${af.name} (Copia)`,
    rectangles: af.rectangles.map((r) => ({ ...r, id: ++rectangleIdCounter })),
    sprites: (af.sprites || []).map((s) => ({
      ...s,
      id: ++spriteIdCounter,
      rects: s.rects.map((r) => ({ ...r })),
    })),
    visible: true,
  };
  frames.push(newF);
  switchToFrame(newF.id);
}

function deleteFrameById(id) {
  if (frames.length <= 1) {
    alert("Debe haber al menos un frame.");
    return;
  }
  const f = frames.find((f) => f.id === id);
  if (!f) return;
  if (confirm(`¿Eliminar "${f.name}"?`)) {
    frames = frames.filter((f) => f.id !== id);
    if (activeFrameId === id) switchToFrame(frames[frames.length - 1].id);
    else {
      updateFramesUI();
      draw();
    }
  }
}

function toggleFrameVisibility(id) {
  const f = frames.find((f) => f.id === id);
  if (f) {
    f.visible = !f.visible;
    updateFramesUI();
    draw();
  }
}

// ==========================================
// ONION SKIN
// ==========================================
function toggleOnionSkin() {
  onionSkinEnabled = !onionSkinEnabled;
  if (onionSkinEnabled) {
    btnToggleOnion.classList.replace("btn-secondary", "btn-primary");
    btnToggleOnion.innerHTML = '<span class="btn-icon">🧅</span> Cebolla: ON';
  } else {
    btnToggleOnion.classList.replace("btn-primary", "btn-secondary");
    btnToggleOnion.innerHTML =
      '<span class="btn-icon">🧅</span> Cebolla: OFF';
  }
  draw();
}

// ==========================================
// UPDATE UI
// ==========================================
function updateActiveLayerLabel() {
  if (!activeLayerLabel) return;
  if (editingBackground) {
    activeLayerLabel.textContent = "✏️ Editando: Fondo";
    activeLayerLabel.style.color = "#fbbf24";
  } else {
    const f = getActiveFrame();
    activeLayerLabel.textContent = f ? `✏️ Editando: ${f.name}` : "—";
    activeLayerLabel.style.color = "#818cf8";
  }
}

function updateHistoryUI() {
  if (!historyList) return;
  historyList.innerHTML = "";
  const layer = getActiveEditingLayer();
  if (!layer) {
    rectCountBadge.textContent = "0 Rects";
    return;
  }
  const rects = layer.rectangles;
  const sprites = layer.sprites || [];
  const totalRectCount = rects.length + sprites.reduce((a, s) => a + s.rects.length, 0);
  const spriteCount = sprites.length;
  let badgeText = `${totalRectCount} ${totalRectCount === 1 ? "Rect" : "Rects"}`;
  if (spriteCount > 0) badgeText += ` · ${spriteCount} Spr`;
  rectCountBadge.textContent = badgeText;

  // Sincronizar memoria: rects sueltos + rects dentro de sprites
  const allRectsForMemory = [
    ...rects,
    ...sprites.flatMap((s) => s.rects),
  ];
  sincronizarMemoriaDesdeHistorial(allRectsForMemory);

  if (rects.length === 0 && sprites.length === 0) {
    const e = document.createElement("li");
    e.className = "empty-state";
    e.textContent = "No hay figuras en esta capa.";
    historyList.appendChild(e);
    return;
  }

  // --- Rectángulos sueltos ---
  rects.forEach((rect, idx) => {
    const item = document.createElement("li");
    item.className = "history-item";

    const details = document.createElement("div");
    details.className = "history-item-details";

    const preview = document.createElement("div");
    preview.className = "history-color-preview";
    preview.style.backgroundColor = vgaColor(rect.colorIndex);

    const coordsSpan = document.createElement("span");
    coordsSpan.className = "history-coords";
    const isPixel = rect.type === "pixel";
    if (isPixel) {
      coordsSpan.innerHTML = `P${idx + 1}: (${rect.x1}),(${rect.y1})`;
    } else {
      coordsSpan.innerHTML = `R${idx + 1}: [${rect.x1},${rect.y1}] \u2192 [${rect.x2},${rect.y2}]`;
    }

    const colorSpan = document.createElement("span");
    colorSpan.className = "history-color-hex";
    colorSpan.textContent = ` idx:${rect.colorIndex}`;

    coordsSpan.appendChild(colorSpan);
    details.appendChild(preview);
    details.appendChild(coordsSpan);

    const del = document.createElement("button");
    del.className = "btn-delete-item";
    del.title = "Eliminar";
    del.innerHTML = "\u274c";
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      eliminarInstruccion(getTipoInstruccion(rect));
      layer.rectangles = layer.rectangles.filter((r) => r.id !== rect.id);
      draw();
      updateHistoryUI();
      updateFramesUI();
    });

    item.appendChild(details);
    item.appendChild(del);
    historyList.appendChild(item);
  });

  // --- Separador si hay ambos ---
  if (rects.length > 0 && sprites.length > 0) {
    const sep = document.createElement("li");
    sep.className = "history-separator";
    sep.innerHTML = `<span style="color:#a5b4fc;font-size:10px;text-transform:uppercase;letter-spacing:1px;">── Sprites ──</span>`;
    sep.style.cssText = "text-align:center;padding:6px 0;list-style:none;";
    historyList.appendChild(sep);
  }

  // --- Sprites agrupados ---
  sprites.forEach((sprite, sIdx) => {
    // Cabecera del sprite (clic = seleccionar en canvas)
    const header = document.createElement("li");
    header.className = "history-item sprite-header" +
      (activeSelectedSpriteId === sprite.id ? " sprite-selected" : "");
    header.style.cssText = "cursor:pointer;border-left:3px solid #a855f7;";
    header.addEventListener("click", () => {
      activeSelectedSpriteId = sprite.id;
      setDrawingMode("select");
      draw();
      updateHistoryUI();
    });

    const headerDetails = document.createElement("div");
    headerDetails.className = "history-item-details";

    const spriteIcon = document.createElement("div");
    spriteIcon.className = "history-color-preview";
    spriteIcon.style.cssText = "background:linear-gradient(135deg,#a855f7,#6366f1);border-radius:4px;";

    const spriteLabel = document.createElement("span");
    spriteLabel.className = "history-coords";
    spriteLabel.innerHTML = `<strong style="color:#c4b5fd;">\ud83c\udfad Sprite ${sIdx + 1}</strong>` +
      `<span style="color:#94a3b8;font-size:10px;"> ${sprite.name || ""} (${sprite.x},${sprite.y}) · ${sprite.rects.length}r</span>`;

    headerDetails.appendChild(spriteIcon);
    headerDetails.appendChild(spriteLabel);

    // Botón eliminar sprite completo
    const delSprite = document.createElement("button");
    delSprite.className = "btn-delete-item";
    delSprite.title = "Eliminar sprite completo";
    delSprite.innerHTML = "\ud83d\uddd1\ufe0f";
    delSprite.addEventListener("click", (e) => {
      e.stopPropagation();
      sprite.rects.forEach((r) =>
        eliminarInstruccion(getTipoInstruccion(r) || "DRAW_REGION"),
      );
      layer.sprites = layer.sprites.filter((s) => s.id !== sprite.id);
      if (activeSelectedSpriteId === sprite.id) activeSelectedSpriteId = null;
      draw();
      updateHistoryUI();
      updateFramesUI();
    });

    header.appendChild(headerDetails);
    header.appendChild(delSprite);
    historyList.appendChild(header);

    // Sub-items del sprite (sus rects individuales, con indentación)
    sprite.rects.forEach((rect, rIdx) => {
      const subItem = document.createElement("li");
      subItem.className = "history-item sprite-sub-item" +
        (activeSelectedSpriteId === sprite.id ? " sprite-selected-child" : "");
      subItem.style.cssText = "padding-left:24px;opacity:0.85;border-left:3px solid rgba(168,85,247,0.3);";

      const subDetails = document.createElement("div");
      subDetails.className = "history-item-details";

      const subPreview = document.createElement("div");
      subPreview.className = "history-color-preview";
      subPreview.style.backgroundColor = vgaColor(rect.colorIndex);

      const subCoords = document.createElement("span");
      subCoords.className = "history-coords";
      // Mostrar coordenadas absolutas (relativas + offset)
      const absX1 = rect.x1 + sprite.x;
      const absY1 = rect.y1 + sprite.y;
      const absX2 = rect.x2 + sprite.x;
      const absY2 = rect.y2 + sprite.y;
      if (rect.type === "pixel") {
        subCoords.innerHTML = `  P: (${absX1}),(${absY1})`;
      } else {
        subCoords.innerHTML = `  R: [${absX1},${absY1}] \u2192 [${absX2},${absY2}]`;
      }

      const subColor = document.createElement("span");
      subColor.className = "history-color-hex";
      subColor.textContent = ` idx:${rect.colorIndex}`;

      subCoords.appendChild(subColor);
      subDetails.appendChild(subPreview);
      subDetails.appendChild(subCoords);
      subItem.appendChild(subDetails);
      historyList.appendChild(subItem);
    });
  });
}


function updateFramesUI() {
  if (!framesList) return;
  framesList.innerHTML = "";

  // Item de Fondo
  const bgItem = document.createElement("li");
  bgItem.className =
    "layer-item frame-bg-item" + (editingBackground ? " active" : "");
  bgItem.title = "Capa de Fondo — aparece en todos los frames";
  bgItem.addEventListener("click", () => switchToBackground());

  const bgLeft = document.createElement("div");
  bgLeft.className = "layer-item-left";
  const bgVis = document.createElement("button");
  bgVis.className = "btn-layer-visibility";
  bgVis.innerHTML = backgroundLayer.visible ? "👁️" : "🕶️";
  bgVis.addEventListener("click", (e) => {
    e.stopPropagation();
    backgroundLayer.visible = !backgroundLayer.visible;
    updateFramesUI();
    draw();
  });
  const bgLabel = document.createElement("span");
  bgLabel.className = "layer-name-display bg-label";
  bgLabel.innerHTML = `🌅 Fondo <small class="badge-persistent">[persistente]</small>`;
  bgLeft.appendChild(bgVis);
  bgLeft.appendChild(bgLabel);

  const bgRight = document.createElement("div");
  bgRight.className = "layer-item-right";
  const bgCount = document.createElement("span");
  bgCount.className = "layer-rect-count";
  const bgSprCount = (backgroundLayer.sprites || []).length;
  bgCount.textContent = `${backgroundLayer.rectangles.length}r${bgSprCount > 0 ? " · " + bgSprCount + "s" : ""}`;
  bgRight.appendChild(bgCount);

  bgItem.appendChild(bgLeft);
  bgItem.appendChild(bgRight);
  framesList.appendChild(bgItem);

  // Separador
  const sep = document.createElement("li");
  sep.className = "frames-separator";
  sep.innerHTML = `── Frames (${frames.length}) ──`;
  framesList.appendChild(sep);

  // Frames (más reciente arriba)
  [...frames].reverse().forEach((frame, ri) => {
    const item = document.createElement("li");
    item.className =
      "layer-item" +
      (!editingBackground && activeFrameId === frame.id ? " active" : "");
    item.addEventListener("click", () => switchToFrame(frame.id));

    const left = document.createElement("div");
    left.className = "layer-item-left";
    const visBtn = document.createElement("button");
    visBtn.className = "btn-layer-visibility";
    visBtn.innerHTML = frame.visible ? "👁️" : "🕶️";
    visBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFrameVisibility(frame.id);
    });

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.className = "layer-name-input";
    nameInput.value = frame.name;
    nameInput.addEventListener("change", (e) => {
      frame.name = e.target.value;
      updateFramesUI();
      updateActiveLayerLabel();
    });
    nameInput.addEventListener("click", (e) => {
      if (!editingBackground && activeFrameId === frame.id) e.stopPropagation();
    });

    left.appendChild(visBtn);
    left.appendChild(nameInput);

    const right = document.createElement("div");
    right.className = "layer-item-right";
    const cnt = document.createElement("span");
    cnt.className = "layer-rect-count";
    const fSprCount = (frame.sprites || []).length;
    cnt.textContent = `${frame.rectangles.length}r${fSprCount > 0 ? " · " + fSprCount + "s" : ""}`;
    const del = document.createElement("button");
    del.className = "btn-layer-control delete";
    del.innerHTML = "🗑️";
    del.title = "Eliminar frame";
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteFrameById(frame.id);
    });

    right.appendChild(cnt);
    right.appendChild(del);
    item.appendChild(left);
    item.appendChild(right);
    framesList.appendChild(item);
  });

  updateActiveLayerLabel();
}

// ==========================================
// ACCIONES
// ==========================================
function toggleGrid() {
  gridActive = !gridActive;
  if (gridActive) {
    canvasOverlay.classList.add("grid-active");
    btnToggleGrid.innerHTML =
      '<span class="btn-icon">🌐</span> Cuadrícula: ON';
    btnToggleGrid.classList.replace("btn-secondary", "btn-primary");
  } else {
    canvasOverlay.classList.remove("grid-active");
    btnToggleGrid.innerHTML =
      '<span class="btn-icon">🌐</span> Cuadrícula: OFF';
    btnToggleGrid.classList.replace("btn-primary", "btn-secondary");
  }
}

function clearCanvas() {
  const layer = getActiveEditingLayer();
  if (!layer) return;
  const totalElements = layer.rectangles.length + (layer.sprites || []).length;
  if (totalElements === 0) return;
  const name = editingBackground ? "Fondo" : getActiveFrame()?.name || "";
  if (confirm(`¿Limpiar todos los elementos de "${name}"?`)) {
    layer.rectangles.forEach((rect) =>
      eliminarInstruccion(getTipoInstruccion(rect)),
    );
    (layer.sprites || []).forEach((sprite) =>
      sprite.rects.forEach((r) => eliminarInstruccion(getTipoInstruccion(r) || "DRAW_REGION")),
    );
    layer.rectangles = [];
    layer.sprites = [];
    activeSelectedSpriteId = null;
    draw();
    updateHistoryUI();
    updateFramesUI();
  }
}

// ==========================================
// FORMATEO ASM
// ==========================================

/**
 * Convierte un índice de color (0-255) al formato (XXXX)H
 * Ej: 255 → "(00FF)H",  16 → "(0010)H"
 */
function colorToASMHex(colorIndex) {
  const hex = colorIndex.toString(16).toUpperCase().padStart(4, "0");
  return `${hex}H`;
}

/**
 * Genera un comando ASM para un solo rect, aplicando un offset de posición.
 */
function buildSingleRectCommand(rect, offsetX, offsetY) {
  if (rect.type === "pixel") {
    const px = rect.x1 + offsetX;
    const py = rect.y1 + offsetY;
    return `    PINTAR_PIXEL (${px}), (${py}), (${rect.colorIndex})`;
  } else {
    const x1 = Math.min(rect.x1, rect.x2) + offsetX;
    const y1 = Math.min(rect.y1, rect.y2) + offsetY;
    const x2 = Math.max(rect.x1, rect.x2) + offsetX;
    const y2 = Math.max(rect.y1, rect.y2) + offsetY;
    const colorHex = colorToASMHex(rect.colorIndex);
    return `    DRAW_REGION ${x1},${y1}, ${x2},${y2} , ${colorHex}`;
  }
}

/**
 * Genera los comandos ASM (DRAW_REGION / PINTAR_PIXEL) de un layer completo.
 * Incluye tanto rectangles sueltos como sprites agrupados con comentarios.
 * Devuelve solo el bloque de instrucciones, sin cabecera de archivo.
 */
function buildCommandsBlock(rects, sprites) {
  let commands = "";
  const allSprites = sprites || [];

  // 1. Rectángulos sueltos (no pertenecen a ningún sprite)
  rects.forEach((rect) => {
    commands += buildSingleRectCommand(rect, 0, 0) + "\n";
  });

  // 2. Sprites agrupados con comentarios
  allSprites.forEach((sprite, idx) => {
    commands += `\n    ; Sprite ${idx + 1} - ${sprite.name || "Sin nombre"} (pos: ${sprite.x},${sprite.y})\n`;
    sprite.rects.forEach((rect) => {
      commands += buildSingleRectCommand(rect, sprite.x, sprite.y) + "\n";
    });
    commands += `    ; Fin Sprite ${idx + 1}\n`;
  });

  return commands || "    ; (capa vacía)\n";
}

/**
 * Genera fondo.asm — Capa de fondo persistente.
 * Proc name: "fondo"
 */
function generateFondoASM(rects, sprites) {
  const commands = buildCommandsBlock(rects, sprites);
  return [
    "INCLUDE LIBRO.LIB",
    "INCLUDE M.LIB",
    "",
    ".MODEL LARGE",
    ".CODE",
    "",
    "PUBLIC fondo",
    "fondo PROC",
    "",
    "MOV AX,@DATA",
    "MOV DS,AX",
    "",
    commands.trimEnd(),
    "",
    "RET",
    "fondo ENDP",
    "",
    "END fondo",
    "",
  ].join("\n");
}

/**
 * Genera F1.asm ... Fn.asm — Un frame de animación.
 * @param {string} procName  "F1", "F2", etc.
 * @param {Array}  rects     rectángulos del frame
 */
function generateFrameASM(procName, rects, sprites) {
  const commands = buildCommandsBlock(rects, sprites);
  return [
    "INCLUDE LIBRO.LIB",
    "INCLUDE M.LIB",
    "",
    ".MODEL LARGE",
    ".CODE",
    "",
    `PUBLIC ${procName}`,
    `${procName} PROC`,
    "",
    "MOV AX,@DATA",
    "MOV DS,AX",
    "",
    commands.trimEnd(),
    "",
    "RET",
    `${procName} ENDP`,
    "",
    `END ${procName}`,
    "",
  ].join("\n");
}

/**
 * Genera Orquesta.asm — Archivo principal orquestador.
 * Estructura:
 *   EXTRN fondo:FAR
 *   EXTRN F1:FAR ... EXTRN Fn:FAR
 *   ...
 *   CALL fondo
 *       CALL F1
 *       PAUSA 2
 *   CALL fondo
 *       CALL F2
 *       PAUSA 2
 *   (para cada frame)
 *
 * @param {number} frameCount — número de frames (F1..Fn)
 */
function generateOrquestaASM(frameCount) {
  // ── EXTRN block ──
  let extrns = "EXTRN fondo:FAR\n";
  for (let i = 1; i <= frameCount; i++) {
    extrns += `EXTRN F${i}:FAR\n`;
  }

  // ── CALL block: por cada frame → CALL fondo + CALL Fn + PAUSA 2 ──
  let calls = "";
  for (let i = 1; i <= frameCount; i++) {
    calls += `    CALL fondo\n    CALL F${i}\n    PAUSA 2\n`;
    if (i < frameCount) calls += "\n";
  }

  return [
    "CAMBIAR_MODO_GRAFICO Macro Modo",
    "MOV AX, Modo",
    "INT 10h",
    "ENDM",
    "",
    "INCLUDE LIBRO.LIB",
    "INCLUDE M.LIB",
    "",
    extrns.trimEnd(),
    "",
    ".MODEL LARGE",
    ".STACK 100H",
    ".DATA",
    ".CODE",
    "",
    "PRIN PROC FAR",
    "Inicio:",
    "MOV AX,@DATA",
    "MOV DS,AX",
    "CAMBIAR_MODO_GRAFICO 0013H",
    "",
    calls.trimEnd(),
    "",
    "Salida:",
    "MOV AH, 4CH",
    "INT 21H",
    "",
    "PRIN ENDP",
    "END PRIN",
    "",
  ].join("\n");
}

function generateBuildBAT(frameCount) {
  const lines = [
    "@echo off",
    "echo Compilando fondo.asm...",
    "tasm fondo.asm",
    "if errorlevel 1 goto error",
    "",
  ];

  for (let i = 1; i <= frameCount; i++) {
    lines.push(
      `echo Compilando F${i}.asm...`,
      `tasm F${i}.asm`,
      "if errorlevel 1 goto error",
      "",
    );
  }

  lines.push(
    "echo Compilando Orquesta.asm...",
    "tasm Orquesta.asm",
    "if errorlevel 1 goto error",
    "",
    "echo Enlazando Orquesta.exe...",
    "tlink @link.rsp",
    "if errorlevel 1 goto error",
    "",
    "echo Ejecutando Orquesta...",
    "Orquesta",
    "goto end",
    "",
    ":error",
    "echo.",
    "echo Error al compilar o enlazar. Revisa los mensajes anteriores.",
    "",
    ":end",
  );

  return lines.join("\r\n") + "\r\n";
}

function generateLinkResponse(frameCount) {
  const objects = ["Orquesta.obj", "fondo.obj"];

  for (let i = 1; i <= frameCount; i++) {
    objects.push(`F${i}.obj`);
  }

  return (
    objects
      .map((objectName, index) =>
        index < objects.length - 1 ? `${objectName}+` : objectName,
      )
      .join("\r\n") + "\r\n"
  );
}

/**
 * Exporta todos los archivos .asm en un ZIP:
 *   fondo.asm     — capa de fondo
 *   F1.asm ... Fn.asm — frames de animación
 *   Orquesta.asm  — orquestador principal
 */
async function exportASM() {
  // Construir lista de capas para validar: [Fondo, Frame1, Frame2, ...]
  const allLayers = [backgroundLayer, ...frames];
  const totalRects = allLayers.reduce((a, l) => a + l.rectangles.length + (l.sprites || []).length, 0);

  if (totalRects === 0) {
    alert("No hay datos que exportar. Dibuja algo primero.");
    return;
  }

  // Generar archivos
  const files = {}; // { filename: content }

  files["fondo.asm"] = generateFondoASM(backgroundLayer.rectangles, backgroundLayer.sprites);

  frames.forEach((frame, i) => {
    const procName = `F${i + 1}`;
    files[`${procName}.asm`] = generateFrameASM(procName, frame.rectangles, frame.sprites || []);
  });

  files["Orquesta.asm"] = generateOrquestaASM(frames.length);
  files["build.bat"] = generateBuildBAT(frames.length);
  files["link.rsp"] = generateLinkResponse(frames.length);

  // Intentar ZIP con JSZip
  if (typeof JSZip !== "undefined") {
    const zip = new JSZip();
    Object.entries(files).forEach(([name, content]) => zip.file(name, content));
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, `pixel_animation_asm_${Date.now()}.zip`);
  } else {
    // Fallback: descarga individual
    Object.entries(files).forEach(([name, content]) => {
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      downloadBlob(blob, name);
    });
  }
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ==========================================
// PLANTILLAS
// ==========================================
function updateTemplatesUI() {
  if (!templatesList) return;
  templatesList.innerHTML = "";
  if (templates.length === 0) {
    const e = document.createElement("li");
    e.className = "empty-state-sm";
    e.textContent = "No hay plantillas guardadas.";
    templatesList.appendChild(e);
    return;
  }
  templates.forEach((tmpl) => {
    const item = document.createElement("li");
    item.className =
      "template-item" + (selectedTemplateId === tmpl.id ? " active" : "");
    item.addEventListener("click", () => {
      selectedTemplateId = tmpl.id;
      updateTemplatesUI();
      if (drawingMode !== "stamp") setDrawingMode("stamp");
      else draw();
    });

    const det = document.createElement("div");
    det.className = "template-item-details";
    const nm = document.createElement("span");
    nm.className = "template-name";
    nm.textContent = tmpl.name;
    const inf = document.createElement("span");
    inf.className = "template-info";
    inf.textContent = `${tmpl.rects.length} rects (${tmpl.width}×${tmpl.height})`;
    det.appendChild(nm);
    det.appendChild(inf);

    const del = document.createElement("button");
    del.className = "btn-delete-template";
    del.innerHTML = "🗑️";
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTemplateById(tmpl.id);
    });

    item.appendChild(det);
    item.appendChild(del);
    templatesList.appendChild(item);
  });
}

function createTemplateFromCurrentDrawing() {
  const layer = getActiveEditingLayer();
  if (!layer || layer.rectangles.length === 0) {
    alert("Dibuja algo primero.");
    return;
  }
  const name = prompt(
    "Nombre de la plantilla:",
    `Sprite ${templates.length + 1}`,
  );
  if (name === null) return;

  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  layer.rectangles.forEach((r) => {
    const rMinX = Math.min(r.x1, r.x2),
      rMaxX = Math.max(r.x1, r.x2);
    const rMinY = Math.min(r.y1, r.y2),
      rMaxY = Math.max(r.y1, r.y2);
    if (rMinX < minX) minX = rMinX;
    if (rMaxX > maxX) maxX = rMaxX;
    if (rMinY < minY) minY = rMinY;
    if (rMaxY > maxY) maxY = rMaxY;
  });

  const relRects = layer.rectangles.map((r) => ({
    x1: r.x1 - minX,
    y1: r.y1 - minY,
    x2: r.x2 - minX,
    y2: r.y2 - minY,
    colorIndex: r.colorIndex,
    type: r.type,
  }));

  const tmpl = {
    id: ++templateIdCounter,
    name: name || `Sprite ${templateIdCounter}`,
    rects: relRects,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
  templates.push(tmpl);
  selectedTemplateId = tmpl.id;
  updateTemplatesUI();
  setDrawingMode("stamp");
}

function deleteTemplateById(id) {
  templates = templates.filter((t) => t.id !== id);
  if (selectedTemplateId === id)
    selectedTemplateId = templates.length > 0 ? templates[0].id : null;
  updateTemplatesUI();
  draw();
}

// ==========================================
// IMPORTACIÓN DE PROYECTO
// ==========================================

/**
 * Parsea una línea de código ASM buscando instrucciones DRAW_REGION o PINTAR_PIXEL
 */
function parseAsmLine(line) {
  const cleanLine = line.split(";")[0].trim();
  if (!cleanLine) return null;

  // PINTAR_PIXEL (X), (Y), (COLOR_DECIMAL) - ej: PINTAR_PIXEL (10), (20), (15)
  // Permite paréntesis opcionales y espacios flexibles
  const pixelRegex = /PINTAR_PIXEL\s*\(?\s*(\d+)\s*\)?\s*,\s*\(?\s*(\d+)\s*\)?\s*,\s*\(?\s*(\d+)\s*\)?/i;

  // DRAW_REGION X1,Y1, X2,Y2 , COLOR_HEX - ej: DRAW_REGION 10,20, 30,40 , 00FFH o (00FF)H
  const rectRegex = /DRAW_REGION\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*\(?\s*([0-9A-F]+)\s*\)?H/i;

  let match = cleanLine.match(pixelRegex);
  if (match) {
    const x = parseInt(match[1], 10);
    const y = parseInt(match[2], 10);
    const colorIndex = parseInt(match[3], 10);
    return {
      id: 0,
      type: "pixel",
      x1: x,
      y1: y,
      x2: x,
      y2: y,
      colorIndex: colorIndex
    };
  }

  match = cleanLine.match(rectRegex);
  if (match) {
    const x1 = parseInt(match[1], 10);
    const y1 = parseInt(match[2], 10);
    const x2 = parseInt(match[3], 10);
    const y2 = parseInt(match[4], 10);
    const colorIndex = parseInt(match[5], 16);
    return {
      id: 0,
      type: "rect",
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      colorIndex: colorIndex
    };
  }

  return null;
}

/**
 * Parsea el contenido de un archivo .asm para extraer rectángulos sueltos y sprites agrupados.
 * Detecta bloques "; Sprite N - ..." / "; Fin Sprite N" y los agrupa.
 * @returns {{ rectangles: Array, sprites: Array }}
 */
function parseAsmContentWithSprites(content) {
  const lines = content.split(/\r?\n/);
  const rectangles = [];
  const sprites = [];
  
  let currentSprite = null; // { name, posX, posY, rects: [] }
  
  const spriteStartRegex = /;\s*Sprite\s+(\d+)\s*(?:-\s*(.*?))?(?:\(pos:\s*(\d+)\s*,\s*(\d+)\s*\))?/i;
  const spriteEndRegex = /;\s*Fin\s+Sprite\s+\d+/i;
  
  for (let line of lines) {
    const trimmed = line.trim();
    
    // Check for sprite start comment
    const startMatch = trimmed.match(spriteStartRegex);
    if (startMatch) {
      // If there was a previous unclosed sprite, close it
      if (currentSprite && currentSprite.rects.length > 0) {
        sprites.push(currentSprite);
      }
      const spriteName = (startMatch[2] || "").trim() || `Sprite ${startMatch[1]}`;
      const posX = startMatch[3] ? parseInt(startMatch[3], 10) : 0;
      const posY = startMatch[4] ? parseInt(startMatch[4], 10) : 0;
      currentSprite = {
        name: spriteName,
        posX: posX,
        posY: posY,
        rects: [],
      };
      continue;
    }
    
    // Check for sprite end comment
    if (currentSprite && spriteEndRegex.test(trimmed)) {
      if (currentSprite.rects.length > 0) {
        sprites.push(currentSprite);
      }
      currentSprite = null;
      continue;
    }
    
    // Parse ASM instruction
    const rect = parseAsmLine(line);
    if (rect) {
      if (currentSprite) {
        currentSprite.rects.push(rect);
      } else {
        rectangles.push(rect);
      }
    }
  }
  
  // Close any unclosed sprite
  if (currentSprite && currentSprite.rects.length > 0) {
    sprites.push(currentSprite);
  }
  
  // Convert parsed sprites to the app format:
  // The ASM has absolute coords; we need to compute relative coords based on sprite position
  const appSprites = sprites.map((s) => {
    const posX = s.posX;
    const posY = s.posY;
    return {
      id: 0, // will be assigned later
      name: s.name,
      x: posX,
      y: posY,
      rects: s.rects.map((r) => ({
        ...r,
        x1: r.x1 - posX,
        y1: r.y1 - posY,
        x2: r.x2 - posX,
        y2: r.y2 - posY,
      })),
    };
  });
  
  return { rectangles, sprites: appSprites };
}

/**
 * Maneja la importación de un archivo .zip que reconstruye la animación.
 * Soporta sprites agrupados con comentarios "; Sprite N".
 */
async function handleImportZIP(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (typeof JSZip === "undefined") {
    alert("JSZip no está disponible en la página.");
    return;
  }

  try {
    const zip = await JSZip.loadAsync(file);

    // 1. Cargar fondo.asm
    const fondoFile = zip.file("fondo.asm");
    if (!fondoFile) {
      alert("No se encontró el archivo fondo.asm en el ZIP.");
      return;
    }
    const fondoContent = await fondoFile.async("text");
    const bgParsed = parseAsmContentWithSprites(fondoContent);

    // 2. Cargar frames (F1.asm, F2.asm...)
    const frameFiles = [];
    zip.forEach((relativePath, zipEntry) => {
      const match = relativePath.match(/^F(\d+)\.asm$/i);
      if (match) {
        frameFiles.push({
          num: parseInt(match[1], 10),
          entry: zipEntry
        });
      }
    });

    frameFiles.sort((a, b) => a.num - b.num);

    if (frameFiles.length === 0) {
      alert("No se encontraron archivos de frames de animación (F1.asm, F2.asm...) en el ZIP.");
      return;
    }

    const importedFrames = [];
    for (const fInfo of frameFiles) {
      const content = await fInfo.entry.async("text");
      const parsed = parseAsmContentWithSprites(content);
      importedFrames.push({
        id: fInfo.num,
        name: `Frame ${fInfo.num}`,
        rectangles: parsed.rectangles,
        sprites: parsed.sprites,
        visible: true
      });
    }

    // 3. Reemplazar estado de la aplicación
    let localRectId = 0;
    let localSpriteId = 0;
    
    backgroundLayer.rectangles = bgParsed.rectangles;
    backgroundLayer.rectangles.forEach(r => { r.id = ++localRectId; });
    backgroundLayer.sprites = bgParsed.sprites;
    backgroundLayer.sprites.forEach(s => { s.id = ++localSpriteId; });

    frames = [];
    frameIdCounter = 0;
    importedFrames.forEach(f => {
      f.id = ++frameIdCounter;
      f.rectangles.forEach(r => { r.id = ++localRectId; });
      (f.sprites || []).forEach(s => { s.id = ++localSpriteId; });
      frames.push(f);
    });

    rectangleIdCounter = localRectId;
    spriteIdCounter = localSpriteId;
    activeSelectedSpriteId = null;

    // Volver a la capa de fondo y actualizar la UI
    switchToBackground();
    const totalSprites = bgParsed.sprites.length + importedFrames.reduce((a, f) => a + (f.sprites || []).length, 0);
    let msg = `Proyecto importado con éxito.\n1 capa de fondo y ${frames.length} frame(s).`;
    if (totalSprites > 0) msg += `\n${totalSprites} sprite(s) detectados.`;
    alert(msg);
  } catch (err) {
    console.error(err);
    alert("Error al importar el archivo ZIP: " + err.message);
  } finally {
    e.target.value = "";
  }
}

/**
 * Elimina el sprite actualmente seleccionado de la capa activa.
 */
function deleteSelectedSprite() {
  if (activeSelectedSpriteId === null) return;
  const layer = getActiveEditingLayer();
  if (!layer || !layer.sprites) return;
  
  const sprite = layer.sprites.find(s => s.id === activeSelectedSpriteId);
  if (!sprite) return;
  
  sprite.rects.forEach((r) =>
    eliminarInstruccion(getTipoInstruccion(r) || "DRAW_REGION"),
  );
  layer.sprites = layer.sprites.filter((s) => s.id !== activeSelectedSpriteId);
  activeSelectedSpriteId = null;
  draw();
  updateHistoryUI();
  updateFramesUI();
}

// ==========================================
// ARRANCAR
// ==========================================

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Delete / Suprimir → eliminar sprite seleccionado
  if ((e.key === "Delete" || e.key === "Backspace") && activeSelectedSpriteId !== null) {
    // No interceptar si el foco está en un input/textarea
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    e.preventDefault();
    deleteSelectedSprite();
  }
  // Escape → deseleccionar sprite
  if (e.key === "Escape" && activeSelectedSpriteId !== null) {
    activeSelectedSpriteId = null;
    draw();
    updateHistoryUI();
  }
});

window.addEventListener("DOMContentLoaded", init);
