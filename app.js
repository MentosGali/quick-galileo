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
  // 11-15: completar colores básicos
  [84, 252, 252],
  [252, 84, 84],
  [252, 84, 252],
  [252, 252, 84],
  [252, 252, 252],
  // 16-31: rampa de grises
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
  // 32-55: anillo saturación completa
  [0, 0, 252],
  [60, 0, 252],
  [124, 0, 252],
  [188, 0, 252],
  [252, 0, 252],
  [252, 0, 188],
  [252, 0, 124],
  [252, 0, 60],
  [252, 0, 0],
  [252, 60, 0],
  [252, 124, 0],
  [252, 188, 0],
  [252, 252, 0],
  [188, 252, 0],
  [124, 252, 0],
  [60, 252, 0],
  [0, 252, 0],
  [0, 252, 60],
  [0, 252, 124],
  [0, 252, 188],
  [0, 252, 252],
  [0, 188, 252],
  [0, 124, 252],
  [0, 60, 252],
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
const DEFAULT_VGA_PALETTE_16 = [
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
];

function buildSafeVGAPalette(sourcePalette) {
  const safePalette = [];
  const source = Array.isArray(sourcePalette) ? sourcePalette : [];

  for (let index = 0; index < 256; index++) {
    const color = source[index];
    if (
      Array.isArray(color) &&
      color.length >= 3 &&
      color.every((component) => Number.isFinite(component))
    ) {
      safePalette.push([color[0], color[1], color[2]]);
      continue;
    }

    if (index < DEFAULT_VGA_PALETTE_16.length) {
      safePalette.push(DEFAULT_VGA_PALETTE_16[index]);
      continue;
    }

    const cubeIndex = index - DEFAULT_VGA_PALETTE_16.length;
    const red = Math.floor(cubeIndex / 36) % 6;
    const green = Math.floor(cubeIndex / 6) % 6;
    const blue = cubeIndex % 6;
    safePalette.push([red * 51, green * 51, blue * 51]);
  }

  return safePalette;
}

const VGA_PALETTE_SAFE = buildSafeVGAPalette(VGA_PALETTE);

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
/** Índice reservado: píxel transparente en frames superpuestos sobre el fondo. */
const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 200;
const BITMAP_SKIP_INDEX = 255;
/** Por encima de este umbral se exporta como bitmap (1 .asm por capa). */
const BITMAP_EXPORT_THRESHOLD = 250;
/** Tamaño máximo seguro para cada bloque de datos bitmap dentro de un .asm. */
const BITMAP_CHUNK_MAX_BYTES = 58000;
const LIMITE_MEMORIA_BYTES = 400 * 1024;
let memoriaConsumida = 0;

let onionSkinEnabled = true;
let onionSkinLayers = 3;

let templates = [];
let selectedTemplateId = null;
let templateIdCounter = 0;

let canvasTooltip = null;

// ==========================================
// ESTADO Y LÓGICA DEL MODO 2: TEXTO 80x25
// ==========================================
let currentEnvironment = "video"; // "video" | "text"

let mode2Fields = [
  {
    id: 1,
    varName: "boleto",
    label: "Boleto:",
    maxLen: 2,
    row: 5,
    colLabel: 18,
    colInput: 30,
    colorCuadro: "016H",
    colorCampo: "016H",
  },
  {
    id: 2,
    varName: "destino",
    label: "Destino:",
    maxLen: 16,
    row: 10,
    colLabel: 18,
    colInput: 30,
    colorCuadro: "21H",
    colorCampo: "21H",
  },
  {
    id: 3,
    varName: "precio",
    label: "Precio:",
    maxLen: 4,
    row: 16,
    colLabel: 18,
    colInput: 30,
    colorCuadro: "21H",
    colorCampo: "21H",
  },
];
let textFieldsIdCounter = 3;

// Colores aproximados de los atributos de color BIOS
const BIOS_ATTR_COLORS = {
  "71H": { bg: "#c0c0c0", fg: "#0000aa" },
  "00CH": { bg: "#000000", fg: "#ff5555" },
  "016H": { bg: "#0000aa", fg: "#55ffff" },
  "21H": { bg: "#00aa00", fg: "#0000aa" },
  "4EH": { bg: "#aa0000", fg: "#ffff55" },
  "1FH": { bg: "#0000aa", fg: "#ffffff" },
  "70H": { bg: "#c0c0c0", fg: "#000000" },
  "0FH": { bg: "#000000", fg: "#ffffff" },
  "1EH": { bg: "#0000aa", fg: "#ffff00" },
  "2EH": { bg: "#0000aa", fg: "#ff00ff" },
  "3EH": { bg: "#0000aa", fg: "#00ffff" },
  "4FH": { bg: "#aa0000", fg: "#ffffff" },
  "5FH": { bg: "#aa00aa", fg: "#ffffff" },
  "6FH": { bg: "#00aa00", fg: "#ffffff" },
  "7FH": { bg: "#aaaaaa", fg: "#000000" },
  "8FH": { bg: "#555555", fg: "#ffffff" },
};
const BIOS_ATTR_COLOR_KEYS = Object.keys(BIOS_ATTR_COLORS);

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
  VGA_PALETTE_SAFE.forEach((rgb, index) => {
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
  const [r, g, b] = VGA_PALETTE_SAFE[selectedColorIndex] || [0, 0, 0];
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
  if (canvas) {
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
  }

  if (btnToggleGrid) btnToggleGrid.addEventListener("click", toggleGrid);
  if (btnClear) btnClear.addEventListener("click", clearCanvas);
  if (btnExport) btnExport.addEventListener("click", exportASM);

  const btnImportTrigger = document.getElementById("btn-import-trigger");
  const importFileInput = document.getElementById("import-file-input");
  if (btnImportTrigger && importFileInput) {
    btnImportTrigger.addEventListener("click", () => {
      importFileInput.click();
    });
    importFileInput.addEventListener("change", handleImportZIP);
  }

  if (btnModeRect)
    btnModeRect.addEventListener("click", () => setDrawingMode("rect"));
  if (btnModeSingle)
    btnModeSingle.addEventListener("click", () => setDrawingMode("single"));
  if (btnModeStamp)
    btnModeStamp.addEventListener("click", () => setDrawingMode("stamp"));
  if (btnModeSelect)
    btnModeSelect.addEventListener("click", () => setDrawingMode("select"));
  if (btnCreateTemplate)
    btnCreateTemplate.addEventListener(
      "click",
      createTemplateFromCurrentDrawing,
    );

  if (btnAddFrame) {
    btnAddFrame.addEventListener("click", () => {
      addFrame(`Frame ${frames.length + 1}`);
      switchToFrame(frames[frames.length - 1].id);
    });
  }
  if (btnCloneFrame) btnCloneFrame.addEventListener("click", cloneActiveFrame);
  if (btnEditBackground)
    btnEditBackground.addEventListener("click", switchToBackground);
  if (btnToggleOnion) btnToggleOnion.addEventListener("click", toggleOnionSkin);

  // Eventos Modo 2 Texto
  setupTextModeEvents();

  const btnExportTextASM = document.getElementById("btn-export-text-asm");
  if (btnExportTextASM) {
    btnExportTextASM.addEventListener("click", exportTextModeASM);
  }

  // Eventos de Importación de GIF
  const btnImportGifTrigger = document.getElementById("btn-import-gif-trigger");
  const gifFileInput = document.getElementById("gif-file-input");
  if (btnImportGifTrigger && gifFileInput) {
    btnImportGifTrigger.addEventListener("click", () => {
      gifFileInput.click();
    });
    gifFileInput.addEventListener("change", handleImportGIFFile);
  }

  const btnCloseGifModal = document.getElementById("btn-close-gif-modal");
  const btnCancelGifImport = document.getElementById("btn-cancel-gif-import");
  const btnConfirmGifImport = document.getElementById("btn-confirm-gif-import");
  const gifImportModal = document.getElementById("gif-import-modal");

  if (btnCloseGifModal && gifImportModal) {
    btnCloseGifModal.addEventListener("click", () => {
      gifImportModal.classList.remove("active");
    });
  }
  if (btnCancelGifImport && gifImportModal) {
    btnCancelGifImport.addEventListener("click", () => {
      gifImportModal.classList.remove("active");
    });
  }
  if (btnConfirmGifImport) {
    btnConfirmGifImport.addEventListener("click", processSelectedGIF);
  }

  const gifScalingSelect = document.getElementById("gif-scaling");
  const gifScaleFactorField = document.getElementById("gif-scale-factor");
  if (gifScalingSelect && gifScaleFactorField) {
    const updateFactorState = () => {
      gifScaleFactorField.disabled = gifScalingSelect.value !== "factor";
    };
    gifScalingSelect.addEventListener("change", updateFactorState);
    updateFactorState();
  }

  const gifOffsetModeSelect = document.getElementById("gif-offset-mode");
  const gifOffsetXField = document.getElementById("gif-offset-x");
  const gifOffsetYField = document.getElementById("gif-offset-y");
  if (gifOffsetModeSelect && gifOffsetXField && gifOffsetYField) {
    const updateOffsetState = () => {
      const isCustom = gifOffsetModeSelect.value === "custom";
      gifOffsetXField.disabled = !isCustom;
      gifOffsetYField.disabled = !isCustom;
    };
    gifOffsetModeSelect.addEventListener("change", updateOffsetState);
    updateOffsetState();
  }

  const gifIgnoreColorModeSelect = document.getElementById(
    "gif-ignore-color-mode",
  );
  const gifCustomIgnoreContainer = document.getElementById(
    "gif-custom-ignore-container",
  );
  if (gifIgnoreColorModeSelect && gifCustomIgnoreContainer) {
    const updateIgnoreColorState = () => {
      gifCustomIgnoreContainer.style.display =
        gifIgnoreColorModeSelect.value === "custom" ? "block" : "none";
    };
    gifIgnoreColorModeSelect.addEventListener("change", updateIgnoreColorState);
    updateIgnoreColorState();
  }

  // Eventos de Importación de Foto Estática
  const btnImportPhotoTrigger = document.getElementById("btn-import-photo-trigger");
  const photoFileInput = document.getElementById("photo-file-input");
  if (btnImportPhotoTrigger && photoFileInput) {
    btnImportPhotoTrigger.addEventListener("click", () => {
      photoFileInput.click();
    });
    photoFileInput.addEventListener("change", handleImportPhotoFile);
  }

  const btnClosePhotoModal = document.getElementById("btn-close-photo-modal");
  const btnCancelPhotoImport = document.getElementById("btn-cancel-photo-import");
  const btnConfirmPhotoImport = document.getElementById("btn-confirm-photo-import");
  const photoImportModal = document.getElementById("photo-import-modal");

  if (btnClosePhotoModal && photoImportModal) {
    btnClosePhotoModal.addEventListener("click", () => {
      photoImportModal.classList.remove("active");
    });
  }
  if (btnCancelPhotoImport && photoImportModal) {
    btnCancelPhotoImport.addEventListener("click", () => {
      photoImportModal.classList.remove("active");
    });
  }
  if (btnConfirmPhotoImport) {
    btnConfirmPhotoImport.addEventListener("click", processSelectedPhoto);
  }

  const photoScalingSelect = document.getElementById("photo-scaling");
  const photoScaleFactorField = document.getElementById("photo-scale-factor");
  if (photoScalingSelect && photoScaleFactorField) {
    const updatePhotoFactorState = () => {
      photoScaleFactorField.disabled = photoScalingSelect.value !== "factor";
    };
    photoScalingSelect.addEventListener("change", updatePhotoFactorState);
    updatePhotoFactorState();
  }

  const photoOffsetModeSelect = document.getElementById("photo-offset-mode");
  const photoOffsetXField = document.getElementById("photo-offset-x");
  const photoOffsetYField = document.getElementById("photo-offset-y");
  if (photoOffsetModeSelect && photoOffsetXField && photoOffsetYField) {
    const updatePhotoOffsetState = () => {
      const isCustom = photoOffsetModeSelect.value === "custom";
      photoOffsetXField.disabled = !isCustom;
      photoOffsetYField.disabled = !isCustom;
    };
    photoOffsetModeSelect.addEventListener("change", updatePhotoOffsetState);
    updatePhotoOffsetState();
  }

  const photoIgnoreColorModeSelect = document.getElementById("photo-ignore-color-mode");
  const photoCustomIgnoreContainer = document.getElementById("photo-custom-ignore-container");
  if (photoIgnoreColorModeSelect && photoCustomIgnoreContainer) {
    const updatePhotoIgnoreColorState = () => {
      photoCustomIgnoreContainer.style.display =
        photoIgnoreColorModeSelect.value === "custom" ? "block" : "none";
    };
    photoIgnoreColorModeSelect.addEventListener("change", updatePhotoIgnoreColorState);
    updatePhotoIgnoreColorState();
  }

  renderTextModeConsole();
  updateTextFieldsUI();
}

// ==========================================
// ESTADO Y LÓGICA DE LA PIZARRA MODO TEXTO (80x25)
// ==========================================
let textToolMode = "cuadro";

let textBoardObjects = [
  { id: 1, type: "cuadro", r1: 2, c1: 12, r2: 22, c2: 61, color: "00CH" },
  { id: 2, type: "cuadro", r1: 5, c1: 30, r2: 5, c2: 41, color: "016H" },
  {
    id: 3,
    type: "label",
    row: 5,
    col: 18,
    text: "Boleto:",
    varName: "lbl_boleto",
    color: "71H",
  },
  {
    id: 4,
    type: "input",
    row: 5,
    col: 30,
    maxLen: 2,
    varName: "eboleto",
    color: "016H",
  },

  { id: 5, type: "cuadro", r1: 10, c1: 30, r2: 10, c2: 45, color: "21H" },
  {
    id: 6,
    type: "label",
    row: 10,
    col: 18,
    text: "Destino:",
    varName: "lbl_destino",
    color: "71H",
  },
  {
    id: 7,
    type: "input",
    row: 10,
    col: 30,
    maxLen: 16,
    varName: "edestino",
    color: "21H",
  },

  { id: 8, type: "cuadro", r1: 16, c1: 30, r2: 16, c2: 41, color: "21H" },
  {
    id: 9,
    type: "label",
    row: 16,
    col: 18,
    text: "Precio:",
    varName: "lbl_precio",
    color: "71H",
  },
  {
    id: 10,
    type: "input",
    row: 16,
    col: 30,
    maxLen: 4,
    varName: "eprecio",
    color: "21H",
  },
];
let textObjectIdCounter = 10;
let activeSelectedTextObjId = null;

let isDrawingTextRect = false;
let textRectStart = null;

let isDraggingTextObj = false;
let textDragOffset = { r: 0, c: 0 };
let isResizingTextObj = false;
let textResizeHandle = null;

const TEXT_RESIZE_GRIP_SIZE = 1;

function setupTextModeEvents() {
  const btnEnvVideo = document.getElementById("btn-env-video");
  const btnEnvText = document.getElementById("btn-env-text");
  if (btnEnvVideo && btnEnvText) {
    btnEnvVideo.addEventListener("click", () => switchEnvironment("video"));
    btnEnvText.addEventListener("click", () => switchEnvironment("text"));
  }

  const tools = {
    cuadro: document.getElementById("btn-text-tool-cuadro"),
    label: document.getElementById("btn-text-tool-label"),
    input: document.getElementById("btn-text-tool-input"),
    select: document.getElementById("btn-text-tool-select"),
  };

  Object.entries(tools).forEach(([mode, btn]) => {
    if (btn) {
      btn.addEventListener("click", () => setTextToolMode(mode));
    }
  });

  const consoleEl = document.getElementById("text-console");
  if (consoleEl) {
    consoleEl.addEventListener("mousemove", handleTextConsoleMouseMove);
    consoleEl.addEventListener("mousedown", handleTextConsoleMouseDown);
    consoleEl.addEventListener("mouseup", handleTextConsoleMouseUp);
    consoleEl.addEventListener("contextmenu", handleTextConsoleContextMenu);
  }

  const ctxSave = document.getElementById("ctx-btn-save");
  const ctxDel = document.getElementById("ctx-btn-delete");
  if (ctxSave) ctxSave.addEventListener("click", saveContextMenuProps);
  if (ctxDel) ctxDel.addEventListener("click", deleteContextMenuObj);

  const ctxPalette = document.getElementById("ctx-color-palette");
  const ctxInputText = document.getElementById("ctx-input-text");
  const ctxInputRow = document.getElementById("ctx-input-row");
  const ctxInputCol = document.getElementById("ctx-input-col");
  const ctxInputMaxLen = document.getElementById("ctx-input-maxlen");

  if (ctxPalette) {
    ctxPalette.addEventListener("click", (event) => {
      const swatch = event.target.closest("button[data-color]");
      if (!swatch) return;
      applyContextMenuColor(swatch.dataset.color);
    });
  }

  if (ctxInputText) {
    ctxInputText.addEventListener("input", applyContextMenuText);
  }

  if (ctxInputRow) {
    ctxInputRow.addEventListener("input", applyContextMenuPosition);
  }

  if (ctxInputCol) {
    ctxInputCol.addEventListener("input", applyContextMenuPosition);
  }

  if (ctxInputMaxLen) {
    ctxInputMaxLen.addEventListener("input", applyContextMenuSize);
  }

  document.addEventListener("click", (e) => {
    const ctxMenu = document.getElementById("text-context-menu");
    if (ctxMenu && !ctxMenu.contains(e.target) && e.button !== 2) {
      ctxMenu.style.display = "none";
    }
  });
}

function setTextToolMode(mode) {
  textToolMode = mode;
  const tools = {
    cuadro: document.getElementById("btn-text-tool-cuadro"),
    label: document.getElementById("btn-text-tool-label"),
    input: document.getElementById("btn-text-tool-input"),
    select: document.getElementById("btn-text-tool-select"),
  };

  Object.entries(tools).forEach(([m, btn]) => {
    if (btn) {
      btn.classList.remove("btn-primary", "active");
      btn.classList.add("btn-secondary");
    }
  });

  if (tools[mode]) {
    tools[mode].classList.remove("btn-secondary");
    tools[mode].classList.add("btn-primary", "active");
  }

  const consoleEl = document.getElementById("text-console");
  if (consoleEl) {
    consoleEl.style.cursor = mode === "select" ? "default" : "crosshair";
  }
}

function getConsoleCoords(e) {
  const consoleEl = document.getElementById("text-console");
  const rect = consoleEl.getBoundingClientRect();
  const colWidth = rect.width / 80;
  const rowHeight = rect.height / 25;
  let col = Math.floor((e.clientX - rect.left) / colWidth);
  let row = Math.floor((e.clientY - rect.top) / rowHeight);
  return {
    row: Math.max(0, Math.min(24, row)),
    col: Math.max(0, Math.min(79, col)),
  };
}

function getTextObjectAtCoords(row, col) {
  for (let i = textBoardObjects.length - 1; i >= 0; i--) {
    const obj = textBoardObjects[i];
    if (obj.type === "cuadro") {
      const minR = Math.min(obj.r1, obj.r2),
        maxR = Math.max(obj.r1, obj.r2);
      const minC = Math.min(obj.c1, obj.c2),
        maxC = Math.max(obj.c1, obj.c2);
      if (row >= minR && row <= maxR && col >= minC && col <= maxC) return obj;
    } else if (obj.type === "label") {
      if (
        row === obj.row &&
        col >= obj.col &&
        col < obj.col + (obj.text || "").length
      )
        return obj;
    } else if (obj.type === "input") {
      if (
        row === obj.row &&
        col >= obj.col &&
        col < obj.col + (obj.maxLen || 5)
      )
        return obj;
    }
  }
  return null;
}

function getCuadroBounds(obj) {
  return {
    minR: Math.min(obj.r1, obj.r2),
    maxR: Math.max(obj.r1, obj.r2),
    minC: Math.min(obj.c1, obj.c2),
    maxC: Math.max(obj.c1, obj.c2),
  };
}

function getResizeHandleAtCoords(obj, row, col) {
  if (!obj || obj.type !== "cuadro") return null;
  const { minR, maxR, minC, maxC } = getCuadroBounds(obj);
  const near = (a, b) => Math.abs(a - b) <= TEXT_RESIZE_GRIP_SIZE;

  if (near(row, minR) && near(col, minC)) return "nw";
  if (near(row, minR) && near(col, maxC)) return "ne";
  if (near(row, maxR) && near(col, minC)) return "sw";
  if (near(row, maxR) && near(col, maxC)) return "se";
  return null;
}

function clampTextCoords(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function applyResizeToCuadro(obj, handle, row, col) {
  const minSize = 0;
  if (!obj || obj.type !== "cuadro" || !handle) return;

  if (handle === "nw") {
    obj.r1 = clampTextCoords(row, 0, obj.r2 - minSize);
    obj.c1 = clampTextCoords(col, 0, obj.c2 - minSize);
  } else if (handle === "ne") {
    obj.r1 = clampTextCoords(row, 0, obj.r2 - minSize);
    obj.c2 = clampTextCoords(col, obj.c1 + minSize, 79);
  } else if (handle === "sw") {
    obj.r2 = clampTextCoords(row, obj.r1 + minSize, 24);
    obj.c1 = clampTextCoords(col, 0, obj.c2 - minSize);
  } else if (handle === "se") {
    obj.r2 = clampTextCoords(row, obj.r1 + minSize, 24);
    obj.c2 = clampTextCoords(col, obj.c1 + minSize, 79);
  }
}

function handleTextConsoleMouseMove(e) {
  const coords = getConsoleCoords(e);
  const hoverEl = document.getElementById("text-coords-hover");
  if (hoverEl) hoverEl.textContent = `Col: ${coords.col}  Row: ${coords.row}`;

  const hoveredObj = getTextObjectAtCoords(coords.row, coords.col);
  const hoveredHandle = hoveredObj
    ? getResizeHandleAtCoords(hoveredObj, coords.row, coords.col)
    : null;

  if (!isDraggingTextObj && !isResizingTextObj) {
    const consoleEl = document.getElementById("text-console");
    if (consoleEl) {
      if (hoveredHandle === "nw" || hoveredHandle === "se") {
        consoleEl.style.cursor = "nwse-resize";
      } else if (hoveredHandle === "ne" || hoveredHandle === "sw") {
        consoleEl.style.cursor = "nesw-resize";
      } else if (hoveredObj) {
        consoleEl.style.cursor =
          textToolMode === "select" ? "move" : "crosshair";
      } else {
        consoleEl.style.cursor =
          textToolMode === "select" ? "default" : "crosshair";
      }
    }
  }

  if (isResizingTextObj && activeSelectedTextObjId !== null) {
    const obj = textBoardObjects.find((o) => o.id === activeSelectedTextObjId);
    if (obj) {
      applyResizeToCuadro(obj, textResizeHandle, coords.row, coords.col);
      renderTextModeConsole();
      updateTextFieldsUI();
    }
  } else if (isDraggingTextObj && activeSelectedTextObjId !== null) {
    const obj = textBoardObjects.find((o) => o.id === activeSelectedTextObjId);
    if (obj) {
      if (obj.type === "cuadro") {
        const width = Math.abs(obj.c2 - obj.c1),
          height = Math.abs(obj.r2 - obj.r1);
        const newR1 = Math.max(
          0,
          Math.min(24 - height, coords.row - textDragOffset.r),
        );
        const newC1 = Math.max(
          0,
          Math.min(79 - width, coords.col - textDragOffset.c),
        );
        obj.r1 = newR1;
        obj.c1 = newC1;
        obj.r2 = newR1 + height;
        obj.c2 = newC1 + width;
      } else {
        obj.row = Math.max(0, Math.min(24, coords.row - textDragOffset.r));
        obj.col = Math.max(0, Math.min(79, coords.col - textDragOffset.c));
      }
      renderTextModeConsole();
      updateTextFieldsUI();
    }
  }
}

function handleTextConsoleMouseDown(e) {
  if (e.button === 2) return;
  const coords = getConsoleCoords(e);
  const hitObj = getTextObjectAtCoords(coords.row, coords.col);

  if (hitObj && (textToolMode === "select" || e.shiftKey)) {
    activeSelectedTextObjId = hitObj.id;
    const resizeHandle = getResizeHandleAtCoords(
      hitObj,
      coords.row,
      coords.col,
    );
    isResizingTextObj = hitObj.type === "cuadro" && resizeHandle !== null;
    isDraggingTextObj = !isResizingTextObj;
    textResizeHandle = isResizingTextObj ? resizeHandle : null;

    textDragOffset = {
      r: coords.row - (hitObj.type === "cuadro" ? hitObj.r1 : hitObj.row),
      c: coords.col - (hitObj.type === "cuadro" ? hitObj.c1 : hitObj.col),
    };
    renderTextModeConsole();
    updateTextFieldsUI();
    return;
  }

  if (textToolMode === "cuadro") {
    if (!isDrawingTextRect) {
      isDrawingTextRect = true;
      textRectStart = coords;
    } else {
      isDrawingTextRect = false;
      const newCuadro = {
        id: ++textObjectIdCounter,
        type: "cuadro",
        r1: textRectStart.row,
        c1: textRectStart.col,
        r2: coords.row,
        c2: coords.col,
        color: "016H",
      };
      textBoardObjects.push(newCuadro);
      activeSelectedTextObjId = newCuadro.id;
      renderTextModeConsole();
      updateTextFieldsUI();
    }
  } else if (textToolMode === "label") {
    const textVal = prompt("Texto:", "Texto:");
    if (textVal !== null) {
      const newLabel = {
        id: ++textObjectIdCounter,
        type: "label",
        row: coords.row,
        col: coords.col,
        text: textVal,
        varName: `lbl_${textObjectIdCounter}`,
        color: "71H",
      };
      textBoardObjects.push(newLabel);
      activeSelectedTextObjId = newLabel.id;
      renderTextModeConsole();
      updateTextFieldsUI();
    }
  } else if (textToolMode === "input") {
    const maxLenVal = parseInt(prompt("Máx caracteres:", "10"), 10) || 10;
    const newInput = {
      id: ++textObjectIdCounter,
      type: "input",
      row: coords.row,
      col: coords.col,
      maxLen: maxLenVal,
      varName: `e_campo${textObjectIdCounter}`,
      color: "21H",
    };
    textBoardObjects.push(newInput);
    activeSelectedTextObjId = newInput.id;
    renderTextModeConsole();
    updateTextFieldsUI();
  }
}

function handleTextConsoleMouseUp() {
  isDraggingTextObj = false;
  isResizingTextObj = false;
  textResizeHandle = null;
}

function handleTextConsoleContextMenu(e) {
  e.preventDefault();
  const coords = getConsoleCoords(e);
  const obj = getTextObjectAtCoords(coords.row, coords.col);
  const ctxMenu = document.getElementById("text-context-menu");
  if (!obj || !ctxMenu) {
    if (ctxMenu) ctxMenu.style.display = "none";
    return;
  }
  activeSelectedTextObjId = obj.id;
  renderTextModeConsole();
  syncTextContextMenuUI(obj);
  ctxMenu.style.display = "block";
  ctxMenu.style.left = `${Math.min(window.innerWidth - 240, e.clientX + 10)}px`;
  ctxMenu.style.top = `${Math.min(window.innerHeight - 250, e.clientY + 10)}px`;
}

function saveContextMenuProps() {
  document.getElementById("text-context-menu").style.display = "none";
  renderTextModeConsole();
  updateTextFieldsUI();
}

function syncTextContextMenuUI(obj) {
  const ctxTitle = document.getElementById("ctx-title");
  const fieldText = document.getElementById("ctx-field-text");
  const fieldPos = document.getElementById("ctx-field-pos");
  const fieldMaxLen = document.getElementById("ctx-field-maxlen");
  const fieldColor = document.getElementById("ctx-field-color");
  const currentText = document.getElementById("ctx-current-text");
  const inputText = document.getElementById("ctx-input-text");
  const inputRow = document.getElementById("ctx-input-row");
  const inputCol = document.getElementById("ctx-input-col");
  const inputMaxLen = document.getElementById("ctx-input-maxlen");

  if (ctxTitle)
    ctxTitle.textContent = `Propiedades (${obj.type.toUpperCase()})`;
  if (fieldText)
    fieldText.style.display = obj.type === "label" ? "block" : "none";
  if (fieldPos)
    fieldPos.style.display =
      obj.type === "label" || obj.type === "input" ? "block" : "none";
  if (fieldMaxLen)
    fieldMaxLen.style.display = obj.type === "input" ? "block" : "none";
  if (fieldColor) fieldColor.style.display = "block";

  if (currentText) currentText.textContent = `Actual: ${obj.text || "(vacío)"}`;
  if (inputText) inputText.value = obj.text || "";
  if (inputRow) inputRow.value = typeof obj.row === "number" ? obj.row : 0;
  if (inputCol) inputCol.value = typeof obj.col === "number" ? obj.col : 0;
  if (inputMaxLen) inputMaxLen.value = obj.maxLen || 5;

  renderContextColorPalette(obj.color || "71H");

  setTimeout(() => {
    if (obj.type === "label" && inputText) inputText.focus();
    if (obj.type === "input" && inputMaxLen) inputMaxLen.focus();
  }, 0);
}

function renderContextColorPalette(activeColor) {
  const palette = document.getElementById("ctx-color-palette");
  if (!palette) return;

  palette.innerHTML = "";
  BIOS_ATTR_COLOR_KEYS.forEach((colorKey) => {
    const color = BIOS_ATTR_COLORS[colorKey];
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className =
      "ctx-color-swatch" + (colorKey === activeColor ? " active" : "");
    swatch.dataset.color = colorKey;
    swatch.title = colorKey;
    swatch.style.background = `linear-gradient(180deg, ${color.bg}, ${color.fg})`;
    palette.appendChild(swatch);
  });
}

function applyContextMenuText() {
  if (activeSelectedTextObjId === null) return;
  const obj = textBoardObjects.find((o) => o.id === activeSelectedTextObjId);
  const inputText = document.getElementById("ctx-input-text");
  if (!obj || !inputText) return;

  if (obj.type === "label") {
    obj.text = inputText.value || "";
    const currentText = document.getElementById("ctx-current-text");
    if (currentText)
      currentText.textContent = `Actual: ${obj.text || "(vacío)"}`;
  }

  renderTextModeConsole();
  updateTextFieldsUI();
}

function applyContextMenuPosition() {
  if (activeSelectedTextObjId === null) return;
  const obj = textBoardObjects.find((o) => o.id === activeSelectedTextObjId);
  const inputRow = document.getElementById("ctx-input-row");
  const inputCol = document.getElementById("ctx-input-col");
  if (!obj || !inputRow || !inputCol) return;

  const nextRow = parseInt(inputRow.value, 10);
  const nextCol = parseInt(inputCol.value, 10);
  if (!Number.isNaN(nextRow)) {
    obj.row = clampTextCoords(nextRow, 0, 24);
  }
  if (!Number.isNaN(nextCol)) {
    obj.col = clampTextCoords(nextCol, 0, 79);
  }

  renderTextModeConsole();
  updateTextFieldsUI();
}

function applyContextMenuSize() {
  if (activeSelectedTextObjId === null) return;
  const obj = textBoardObjects.find((o) => o.id === activeSelectedTextObjId);
  const inputMaxLen = document.getElementById("ctx-input-maxlen");
  if (!obj || !inputMaxLen) return;

  if (obj.type === "input") {
    const nextValue = parseInt(inputMaxLen.value, 10);
    obj.maxLen =
      Number.isFinite(nextValue) && nextValue > 0 ? nextValue : obj.maxLen;
  }

  renderTextModeConsole();
  updateTextFieldsUI();
}

function applyContextMenuColor(colorKey) {
  if (activeSelectedTextObjId === null) return;
  const obj = textBoardObjects.find((o) => o.id === activeSelectedTextObjId);
  if (!obj || !colorKey) return;

  obj.color = colorKey;
  renderContextColorPalette(colorKey);
  renderTextModeConsole();
  updateTextFieldsUI();
}

function deleteContextMenuObj() {
  if (activeSelectedTextObjId === null) return;
  textBoardObjects = textBoardObjects.filter(
    (o) => o.id !== activeSelectedTextObjId,
  );
  activeSelectedTextObjId = null;
  document.getElementById("text-context-menu").style.display = "none";
  renderTextModeConsole();
  updateTextFieldsUI();
}

function switchEnvironment(env) {
  currentEnvironment = env;
  const btnEnvVideo = document.getElementById("btn-env-video");
  const btnEnvText = document.getElementById("btn-env-text");
  const videoLayout = document.getElementById("video-mode-container");
  const textLayout = document.getElementById("text-mode-container");

  if (env === "text") {
    if (btnEnvVideo) {
      btnEnvVideo.classList.remove("btn-primary", "active");
      btnEnvVideo.classList.add("btn-secondary");
    }
    if (btnEnvText) {
      btnEnvText.classList.remove("btn-secondary");
      btnEnvText.classList.add("btn-primary", "active");
    }

    if (videoLayout) videoLayout.style.display = "none";
    if (textLayout) textLayout.style.display = "grid";
    renderTextModeConsole();
  } else {
    if (btnEnvText) {
      btnEnvText.classList.remove("btn-primary", "active");
      btnEnvText.classList.add("btn-secondary");
    }
    if (btnEnvVideo) {
      btnEnvVideo.classList.remove("btn-secondary");
      btnEnvVideo.classList.add("btn-primary", "active");
    }

    if (textLayout) textLayout.style.display = "none";
    if (videoLayout) videoLayout.style.display = "grid";
    draw();
  }
}

function renderTextModeConsole() {
  const consoleEl = document.getElementById("text-console");
  if (!consoleEl) return;

  const grid = Array.from({ length: 25 }, () =>
    Array(80).fill({ char: " ", bg: "#c0c0c0", fg: "#0000aa" }),
  );

  textBoardObjects.forEach((obj) => {
    const isSelected = obj.id === activeSelectedTextObjId;
    const cColor = BIOS_ATTR_COLORS[obj.color] || { bg: "#000", fg: "#f00" };

    if (obj.type === "cuadro") {
      const minR = Math.min(obj.r1, obj.r2),
        maxR = Math.max(obj.r1, obj.r2);
      const minC = Math.min(obj.c1, obj.c2),
        maxC = Math.max(obj.c1, obj.c2);
      for (let r = minR; r <= maxR; r++) {
        for (let c = minC; c <= maxC; c++) {
          if (r < 25 && c < 80) {
            grid[r][c] = {
              char: " ",
              bg: cColor.bg,
              fg: cColor.fg,
            };
          }
        }
      }

      if (isSelected) {
        for (let c = minC; c <= maxC; c++) {
          if (minR < 25 && c < 80) {
            grid[minR][c] = { char: " ", bg: "#a855f7", fg: "#ffffff" };
          }
          if (maxR < 25 && c < 80) {
            grid[maxR][c] = { char: " ", bg: "#a855f7", fg: "#ffffff" };
          }
        }
        for (let r = minR; r <= maxR; r++) {
          if (r < 25 && minC < 80) {
            grid[r][minC] = { char: " ", bg: "#a855f7", fg: "#ffffff" };
          }
          if (r < 25 && maxC < 80) {
            grid[r][maxC] = { char: " ", bg: "#a855f7", fg: "#ffffff" };
          }
        }
        const corners = [
          [minR, minC],
          [minR, maxC],
          [maxR, minC],
          [maxR, maxC],
        ];
        corners.forEach(([r, c]) => {
          if (r < 25 && c < 80) {
            grid[r][c] = { char: "■", bg: "#a855f7", fg: "#ffffff" };
          }
        });
      }
    } else if (obj.type === "label") {
      const txt = obj.text || "";
      const attr = obj.color || "71H";
      let cursorCol = obj.col;
      for (let i = 0; i < txt.length; i++) {
        if (obj.row < 25 && obj.col + i < 80) {
          grid[obj.row][obj.col + i] = {
            char: txt[i],
            bg: isSelected ? "#a855f7" : cColor.bg,
            fg: isSelected ? "#fff" : cColor.fg,
          };
          cursorCol = obj.col + i;
        }
      }
    } else if (obj.type === "input") {
      const attr = obj.color || "21H";
      for (let i = 0; i < (obj.maxLen || 5); i++) {
        if (obj.row < 25 && obj.col + i < 80) {
          grid[obj.row][obj.col + i] = {
            char: "_",
            bg: isSelected ? "#a855f7" : cColor.bg,
            fg: isSelected ? "#fff" : cColor.fg,
          };
        }
      }
    }
  });

  let html = "";
  for (let r = 0; r < 25; r++) {
    for (let c = 0; c < 80; c++) {
      const cell = grid[r][c];
      const char = cell.char === " " ? "&nbsp;" : cell.char;
      html += `<span style="background:${cell.bg};color:${cell.fg}">${char}</span>`;
    }
    html += "\n";
  }
  consoleEl.innerHTML = html;
}

function updateTextFieldsUI() {
  const listEl = document.getElementById("text-fields-list");
  const countEl = document.getElementById("text-fields-count");
  if (!listEl) return;

  listEl.innerHTML = "";
  if (countEl) countEl.textContent = `${textBoardObjects.length} Objetos`;

  if (textBoardObjects.length === 0) {
    listEl.innerHTML = `<li class="empty-state">La pizarra de texto está vacía. Usas los botones superiores para colocar cuadros o textos.</li>`;
    return;
  }

  textBoardObjects.forEach((obj, idx) => {
    const item = document.createElement("li");
    item.className =
      "history-item" +
      (obj.id === activeSelectedTextObjId ? " sprite-selected" : "");
    item.style.cssText =
      "display:flex;justify-content:space-between;align-items:center;padding:6px 10px;margin-bottom:4px;border-radius:6px;cursor:pointer;";
    item.addEventListener("click", () => {
      activeSelectedTextObjId = obj.id;
      renderTextModeConsole();
      updateTextFieldsUI();
    });

    const info = document.createElement("div");
    let icon =
      obj.type === "cuadro"
        ? "🔲 Cuadro"
        : obj.type === "label"
          ? "🔤 Texto"
          : "📥 Entrada";
    let detailStr = "";
    if (obj.type === "cuadro")
      detailStr = `[${obj.r1},${obj.c1}] → [${obj.r2},${obj.c2}] (${obj.color})`;
    else if (obj.type === "label")
      detailStr = `"${obj.text}" en (${obj.row},${obj.col})`;
    else
      detailStr = `${obj.varName} max:${obj.maxLen} en (${obj.row},${obj.col})`;

    info.innerHTML = `<strong style="color:#a5b4fc">${icon} #${idx + 1}</strong><br><small style="color:#94a3b8;">${detailStr}</small>`;

    const delBtn = document.createElement("button");
    delBtn.className = "btn-delete-item";
    delBtn.innerHTML = "🗑️";
    delBtn.title = "Eliminar objeto";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      textBoardObjects = textBoardObjects.filter((o) => o.id !== obj.id);
      if (activeSelectedTextObjId === obj.id) activeSelectedTextObjId = null;
      updateTextFieldsUI();
      renderTextModeConsole();
    });

    item.appendChild(info);
    item.appendChild(delBtn);
    listEl.appendChild(item);
  });
}

function generateMode2ASM() {
  let macros = [];
  let dataLines = [];
  let codeExecutions = [];

  const escapeAsmText = (value) =>
    String(value)
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '""')
      .replace(/\r?\n/g, " ");

  textBoardObjects.forEach((obj, idx) => {
    if (obj.type === "cuadro") {
      const minRow = Math.min(obj.r1, obj.r2);
      const minCol = Math.min(obj.c1, obj.c2);
      const maxRow = Math.max(obj.r1, obj.r2);
      const maxCol = Math.max(obj.c1, obj.c2);
      const cxHex =
        (((minRow & 0xff) << 8) | (minCol & 0xff))
          .toString(16)
          .padStart(4, "0")
          .toUpperCase() + "H";
      const dxHex =
        (((maxRow & 0xff) << 8) | (maxCol & 0xff))
          .toString(16)
          .padStart(4, "0")
          .toUpperCase() + "H";

      const macroName = `cuadro_${idx + 1}`;
      macros.push(
        `${macroName} MACRO\n` +
          `MOV AX, 0600H\n` +
          `MOV BH, ${obj.color || "71H"}\n` +
          `MOV CX, ${cxHex}\n` +
          `MOV DX, ${dxHex}\n` +
          `INT 10H\n` +
          `ENDM\n`,
      );
      codeExecutions.push(macroName);
    } else if (obj.type === "label") {
      const varName = obj.varName || `lbl_${idx + 1}`;
      const rowHex = obj.row.toString(16).padStart(2, "0").toUpperCase() + "H";
      const colHex = obj.col.toString(16).padStart(2, "0").toUpperCase() + "H";
      const colorAttr = obj.color || "71H";

      macros.push(
        `text_${varName} MACRO\n` +
          `MOV AH, 02H\n` +
          `MOV BH, 00\n` +
          `MOV DH, ${rowHex}\n` +
          `MOV DL, ${colHex}\n` +
          `INT 10H\n` +
          `LEA SI, ${varName}\n` +
          `MOV BL, ${colorAttr}\n` +
          `text_${varName}_loop:\n` +
          `LODSB\n` +
          `CMP AL, '$'\n` +
          `JE text_${varName}_end\n` +
          `MOV AH, 09H\n` +
          `MOV BH, 00\n` +
          `MOV CX, 1\n` +
          `INT 10H\n` +
          `JMP text_${varName}_loop\n` +
          `text_${varName}_end:\n` +
          `ENDM\n`,
      );

      dataLines.push(`${varName} DB "${escapeAsmText(obj.text || "")}", '$'`);
      codeExecutions.push(`text_${varName}`);
    } else if (obj.type === "input") {
      const varName = obj.varName || `e_input${idx + 1}`;
      const rowHex = obj.row.toString(16).padStart(2, "0").toUpperCase() + "H";
      const colHex = obj.col.toString(16).padStart(2, "0").toUpperCase() + "H";
      const reservLen = (obj.maxLen || 5) + 4;
      const colorAttr = obj.color || "21H";

      macros.push(
        `entrada_${varName} MACRO\n` +
          `MOV AH, 02H\n` +
          `MOV BH, 00\n` +
          `MOV DH, ${rowHex}\n` +
          `MOV DL, ${colHex}\n` +
          `INT 10H\n` +
          `MOV AH, 09H\n` +
          `MOV AL, ' '\n` +
          `MOV BH, 00\n` +
          `MOV BL, ${colorAttr}\n` +
          `MOV CX, ${obj.maxLen || 5}\n` +
          `INT 10H\n` +
          `MOV AH, 02H\n` +
          `MOV BH, 00\n` +
          `MOV DH, ${rowHex}\n` +
          `MOV DL, ${colHex}\n` +
          `INT 10H\n` +
          `MOV AH, 0AH\n` +
          `LEA DX, e${varName}\n` +
          `INT 21H\n` +
          `ENDM\n`,
      );

      macros.push(
        `ee_${varName} MACRO\n` +
          `e${varName} LABEL BYTE\n` +
          `MAX_${varName} DB ${obj.maxLen || 5}\n` +
          `ACTUAL_${varName} DB ?\n` +
          `RESER_${varName} DB ${reservLen} DUP (' ')\n` +
          `ENDM\n`,
      );

      codeExecutions.push(`entrada_${varName}`);
      codeExecutions.push(`ee_${varName}`);
    }
  });

  return [
    "; ==========================================",
    "; PROYECTO MODO TEXTO BIOS 80x25 - mt1.asm",
    "; ==========================================",
    "",
    macros.join("\n"),
    ".MODEL SMALL",
    ".STACK 64",
    ".DATA",
    "",
    dataLines.length > 0 ? dataLines.join("\n") : "; (sin variables de texto)",
    "",
    ".CODE",
    "PRIN PROC FAR",
    "MOV AX,@DATA",
    "MOV DS,AX",
    "",
    codeExecutions.length > 0
      ? codeExecutions.join("\n")
      : "    ; (pizarra vacía)",
    "",
    "; Finalización limpia del programa en modo texto",
    "MOV AX, 4C00H",
    "INT 21H",
    "",
    "PRIN ENDP",
    "END PRIN",
    "",
  ].join("\n");
}

function generateTextoBAT() {
  return (
    [
      "@echo off",
      "echo Compilando mt1.asm...",
      "tasm mt1.asm",
      "if errorlevel 1 goto error",
      "",
      "echo Enlazando mt1.exe...",
      "tlink mt1.obj",
      "if errorlevel 1 goto error",
      "",
      "echo Ejecutando mt1...",
      "mt1",
      "goto end",
      "",
      ":error",
      "echo Error al compilar o enlazar mt1.asm.",
      "",
      ":end",
    ].join("\r\n") + "\r\n"
  );
}

async function exportTextModeASM() {
  const asmContent = generateMode2ASM();
  const batContent = generateTextoBAT();

  if (typeof JSZip !== "undefined") {
    const zip = new JSZip();
    zip.file("mt1.asm", asmContent);
    zip.file("texto.bat", batContent);
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, `modo_texto_asm_${Date.now()}.zip`);
  } else {
    downloadBlob(
      new Blob([asmContent], { type: "text/plain;charset=utf-8" }),
      "mt1.asm",
    );
    downloadBlob(
      new Blob([batContent], { type: "text/plain;charset=utf-8" }),
      "texto.bat",
    );
  }
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
      const sprite = layer.sprites.find((s) => s.id === activeSelectedSpriteId);
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
      const [r, g, b] = VGA_PALETTE_SAFE[bgRect.colorIndex] || [0, 0, 0];
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
      const [r, g, b] = VGA_PALETTE_SAFE[found.colorIndex] || [0, 0, 0];
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
  const spriteUnderCursor = activeLayer
    ? getSpriteAtCoords(activeLayer, coords)
    : null;
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
  sprite.rects.forEach((rect) => {
    let fillColor;
    if (mixBlue) {
      const [r, g, b] = VGA_PALETTE_SAFE[rect.colorIndex] || [0, 0, 0];
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
    const minX = Math.min(x1, x2),
      maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2),
      maxY = Math.max(y1, y2);
    ctx.fillRect(minX, minY, maxX - minX + 1, maxY - minY + 1);
  });

  ctx.globalAlpha = 1.0;
  // Resaltado de selección si es la capa que se está editando
  if (isLayerEditable && activeSelectedSpriteId === sprite.id) {
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    sprite.rects.forEach((r) => {
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
    ? frames.length > 0
      ? frames.length - 1
      : -1
    : frames.findIndex((f) => f.id === activeFrameId);

  // 1. Fondo siempre al 100%
  if (backgroundLayer.visible) {
    ctx.globalAlpha = 1.0;
    if (backgroundLayer.bitmap) {
      drawBitmap(backgroundLayer.bitmap, 1.0);
    } else {
      backgroundLayer.rectangles.forEach((rect) => drawRect(rect));
      if (backgroundLayer.sprites) {
        backgroundLayer.sprites.forEach((sprite) => {
          drawSprite(sprite, 1.0, null, editingBackground);
        });
      }
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
      if (frame.bitmap) {
        drawBitmap(frame.bitmap, 1.0);
      } else {
        frame.rectangles.forEach((rect) => drawRect(rect));
        if (frame.sprites) {
          frame.sprites.forEach((sprite) => {
            drawSprite(sprite, 1.0, null, isEditable);
          });
        }
      }
    } else {
      const opacitySteps = [0.35, 0.2, 0.1, 0.05];
      const opacity =
        opacitySteps[Math.min(distance - 1, opacitySteps.length - 1)];
      const mixBlue = Math.min(0.5, distance * 0.2);

      if (frame.bitmap) {
        drawBitmap(frame.bitmap, opacity, mixBlue);
      } else {
        frame.rectangles.forEach((rect) => {
          // Tinte azul para onion skin
          const [r, g, b] = VGA_PALETTE_SAFE[rect.colorIndex] || [0, 0, 0];
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

function drawBitmap(bitmap, opacity = 1, mixBlue = null) {
  if (!bitmap || bitmap.length !== CANVAS_WIDTH * CANVAS_HEIGHT) return;

  const imageData = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);
  const pixels = imageData.data;

  for (let i = 0; i < CANVAS_WIDTH * CANVAS_HEIGHT; i++) {
    const colorIndex = bitmap[i];
    if (colorIndex === BITMAP_SKIP_INDEX) continue;

    let [r, g, b] = VGA_PALETTE_SAFE[colorIndex] || [0, 0, 0];
    if (mixBlue !== null) {
      r = Math.round(r * (1 - mixBlue) + 60 * mixBlue);
      g = Math.round(g * (1 - mixBlue) + 80 * mixBlue);
      b = Math.round(b * (1 - mixBlue) + 200 * mixBlue);
    }

    const offset = i * 4;
    pixels[offset] = r;
    pixels[offset + 1] = g;
    pixels[offset + 2] = b;
    pixels[offset + 3] = 255;
  }

  ctx.globalAlpha = opacity;
  ctx.putImageData(imageData, 0, 0);
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
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    s.rects.forEach((r) => {
      const x1 = r.x1 + s.x;
      const x2 = r.x2 + s.x;
      const y1 = r.y1 + s.y;
      const y2 = r.y2 + s.y;
      minX = Math.min(minX, x1, x2);
      maxX = Math.max(maxX, x1, x2);
      minY = Math.min(minY, y1, y2);
      maxY = Math.max(maxY, y1, y2);
    });
    if (
      coords.x >= minX &&
      coords.x <= maxX &&
      coords.y >= minY &&
      coords.y <= maxY
    ) {
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
      rects: tmpl.rects.map((r) => ({ ...r })),
    };

    if (!layer.sprites) layer.sprites = [];
    layer.sprites.push(newSprite);

    tmpl.rects.forEach((r) => {
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

function normalizeExportRect(rect) {
  const x1 = Math.min(rect.x1, rect.x2);
  const y1 = Math.min(rect.y1, rect.y2);
  const x2 = Math.max(rect.x1, rect.x2);
  const y2 = Math.max(rect.y1, rect.y2);
  return {
    ...rect,
    x1,
    y1,
    x2,
    y2,
    type: x1 === x2 && y1 === y2 ? "pixel" : "rect",
  };
}

function countDrawCommands(rects, sprites) {
  let total = (rects || []).length;
  (sprites || []).forEach((sprite) => {
    total += (sprite.rects || []).length;
  });
  return total;
}

function layerHasContent(layer) {
  if (!layer) return false;
  if (layer.bitmap) return true;
  return (
    (layer.rectangles || []).length > 0 || (layer.sprites || []).length > 0
  );
}

/** Pinta rects/sprites en un buffer 320×200 de índices VGA. */
function rasterizeLayerToBitmap(rects, sprites, width, height, fillIndex = 0) {
  const bitmap = new Uint8Array(width * height);
  bitmap.fill(fillIndex);

  const paintRect = (rect, offsetX, offsetY) => {
    const normalized = normalizeExportRect(rect);
    const x1 = clamp(normalized.x1 + offsetX, 0, width - 1);
    const y1 = clamp(normalized.y1 + offsetY, 0, height - 1);
    const x2 = clamp(normalized.x2 + offsetX, 0, width - 1);
    const y2 = clamp(normalized.y2 + offsetY, 0, height - 1);
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        bitmap[y * width + x] = normalized.colorIndex;
      }
    }
  };

  (rects || []).forEach((rect) => paintRect(rect, 0, 0));
  (sprites || []).forEach((sprite) => {
    (sprite.rects || []).forEach((rect) =>
      paintRect(rect, sprite.x || 0, sprite.y || 0),
    );
  });

  return bitmap;
}

/**
 * Convierte ImageData RGBA a bitmap VGA (solo filas horizontales en ASM).
 */
function imageDataToBitmap(data, width, height, getColorIndex, options = {}) {
  const {
    ignoreTransparent = true,
    ignoreColorIndex = null,
    fillIndex = BITMAP_SKIP_INDEX,
  } = options;
  const bitmap = new Uint8Array(width * height);
  bitmap.fill(fillIndex);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      const isTransparent = ignoreTransparent && a < 128;
      if (isTransparent) continue;

      const mappedColor = getColorIndex(r, g, b);
      if (ignoreColorIndex !== null && mappedColor === ignoreColorIndex)
        continue;
      bitmap[y * width + x] = mappedColor;
    }
  }

  return bitmap;
}

// ==========================================
// GESTIÓN DE CAPAS / FRAMES
// ==========================================
function getActiveEditingLayer() {
  if (typeof editingBackground !== "undefined" && editingBackground)
    return backgroundLayer;
  return (
    (typeof frames !== "undefined"
      ? frames.find((f) => f.id === activeFrameId)
      : null) || backgroundLayer
  );
}

function getActiveFrame() {
  return typeof frames !== "undefined"
    ? frames.find((f) => f.id === activeFrameId) || null
    : null;
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
    btnToggleOnion.innerHTML = '<span class="btn-icon">🧅</span> Cebolla: OFF';
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
  const totalRectCount =
    rects.length + sprites.reduce((a, s) => a + s.rects.length, 0);
  const spriteCount = sprites.length;
  let badgeText = `${totalRectCount} ${totalRectCount === 1 ? "Rect" : "Rects"}`;
  if (spriteCount > 0) badgeText += ` · ${spriteCount} Spr`;
  rectCountBadge.textContent = badgeText;

  // Sincronizar memoria: rects sueltos + rects dentro de sprites
  const allRectsForMemory = [...rects, ...sprites.flatMap((s) => s.rects)];
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
    header.className =
      "history-item sprite-header" +
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
    spriteIcon.style.cssText =
      "background:linear-gradient(135deg,#a855f7,#6366f1);border-radius:4px;";

    const spriteLabel = document.createElement("span");
    spriteLabel.className = "history-coords";
    spriteLabel.innerHTML =
      `<strong style="color:#c4b5fd;">\ud83c\udfad Sprite ${sIdx + 1}</strong>` +
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
      subItem.className =
        "history-item sprite-sub-item" +
        (activeSelectedSpriteId === sprite.id ? " sprite-selected-child" : "");
      subItem.style.cssText =
        "padding-left:24px;opacity:0.85;border-left:3px solid rgba(168,85,247,0.3);";

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
    btnToggleGrid.innerHTML = '<span class="btn-icon">🌐</span> Cuadrícula: ON';
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
      sprite.rects.forEach((r) =>
        eliminarInstruccion(getTipoInstruccion(r) || "DRAW_REGION"),
      ),
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
 * Formatea un bitmap 320×200 como filas DB (máx. 200 líneas — seguro para TASM).
 */
function formatBitmapAsDBRows(bitmap, width, height) {
  const lines = [];
  for (let y = 0; y < height; y++) {
    const rowStart = y * width;
    const row = bitmap.slice(rowStart, rowStart + width);
    const first = row[0];
    if (row.every((value) => value === first)) {
      lines.push(`    DB ${width} DUP(${first})`);
    } else {
      lines.push(`    DB ${Array.from(row).join(",")}`);
    }
  }
  return lines.join("\n");
}

/** Rutina compartida: copia bitmap completo a memoria de video VGA. */
function generateDibujarASM() {
  return [
    "INCLUDE LIBRO.LIB",
    "INCLUDE M.LIB",
    "",
    ".MODEL LARGE",
    ".CODE",
    "",
    "PUBLIC DIBUJAR_FONDO",
    "PUBLIC DIBUJAR_FRAME",
    "",
    "; Copia 320×200 bytes de DS:SI a pantalla VGA (modo 13h)",
    "DIBUJAR_FONDO PROC FAR",
    "    PUSH DS",
    "    MOV AX, 0A000H",
    "    MOV ES, AX",
    "    CLD",
    "    XOR DI, DI",
    "    MOV CX, 320*200",
    "    REP MOVSB",
    "    POP DS",
    "    RET",
    "DIBUJAR_FONDO ENDP",
    "",
    "; Copia 320×200 bytes omitiendo píxeles con índice BL (transparentes)",
    "DIBUJAR_FRAME PROC FAR",
    "    PUSH DS",
    "    PUSH BX",
    "    MOV AX, 0A000H",
    "    MOV ES, AX",
    "    CLD",
    "    XOR DI, DI",
    "    MOV CX, 320*200",
    "@@loop:",
    "    LODSB",
    "    CMP AL, BL",
    "    JE @@skip",
    "    MOV ES:[DI], AL",
    "@@skip:",
    "    INC DI",
    "    LOOP @@loop",
    "    POP BX",
    "    POP DS",
    "    RET",
    "DIBUJAR_FRAME ENDP",
    "",
    "END",
    "",
  ].join("\n");
}

/**
 * Genera un .asm compacto con bitmap en .DATA (1 archivo por capa).
 */
function generateBitmapASM(
  procName,
  bitmap,
  mode = "frame",
  width = CANVAS_WIDTH,
  height = CANVAS_HEIGHT,
) {
  const pixelCount = width * height;
  const chunkRows = Math.max(
    1,
    Math.floor(BITMAP_CHUNK_MAX_BYTES / Math.max(1, width)),
  );
  const dataBlocks = [];
  const copyBlocks = [];
  let chunkIndex = 0;

  for (let startRow = 0; startRow < height; startRow += chunkRows) {
    const currentChunkHeight = Math.min(chunkRows, height - startRow);
    const startOffset = startRow * width;
    const endOffset = startOffset + currentChunkHeight * width;
    const chunkBitmap = bitmap.slice(startOffset, endOffset);
    const chunkLabel = `${procName}_IMG_${chunkIndex}`;
    const chunkPixelCount = currentChunkHeight * width;

    dataBlocks.push(`${chunkLabel} LABEL BYTE`);
    dataBlocks.push(
      formatBitmapAsDBRows(chunkBitmap, width, currentChunkHeight),
    );
    dataBlocks.push("");

    copyBlocks.push(`    LEA SI, ${chunkLabel}`);
    copyBlocks.push(`    MOV CX,${chunkPixelCount}`);
    copyBlocks.push(`@@copy_chunk_${chunkIndex}:`);
    copyBlocks.push("    LODSB");
    if (mode === "fondo") {
      copyBlocks.push("    MOV ES:[DI],AL");
    } else {
      copyBlocks.push("    CMP AL,BL");
      copyBlocks.push(`    JE @@skip_pixel_${chunkIndex}`);
      copyBlocks.push("    MOV ES:[DI],AL");
      copyBlocks.push(`@@skip_pixel_${chunkIndex}:`);
    }
    copyBlocks.push("    INC DI");
    copyBlocks.push(`    LOOP @@copy_chunk_${chunkIndex}`);
    copyBlocks.push("");
    chunkIndex += 1;
  }

  const drawBody = [
    "    PUSH DS",
    "    PUSH BX",
    "    MOV AX,@DATA",
    "    MOV DS,AX",
    "    MOV AX,0A000H",
    "    MOV ES,AX",
    "    CLD",
    "    XOR DI,DI",
    ...copyBlocks,
    "    POP BX",
    "    POP DS",
    "    RET",
  ].join("\n");

  return [
    "INCLUDE LIBRO.LIB",
    "INCLUDE M.LIB",
    "",
    ".MODEL LARGE",
    "",
    ".DATA",
    `PUBLIC ${procName}_IMG_0`,
    ...dataBlocks,
    "",
    ".CODE",
    `PUBLIC ${procName}`,
    `${procName} PROC`,
    "",
    "MOV AX,@DATA",
    "MOV DS,AX",
    `LEA SI, ${procName}_IMG`,
    drawBody,
    "",
    "RET",
    `${procName} ENDP`,
    "",
    `END ${procName}`,
    "",
  ].join("\n");
}

/**
 * Genera un procedimiento ASM con bloque DRAW_REGION / PINTAR_PIXEL (capas pequeñas).
 */
function generateSimpleProcASM(procName, rects, sprites) {
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
 * Genera export ASM para una capa: bitmap (GIF/denso) o DRAW_REGION (manual/sparse).
 * @returns {{ files: Record<string,string>, compileOrder: string[], linkObjects: string[] }}
 */
function generateLayerASMExport(baseName, rects, sprites, options = {}) {
  const result = {
    files: {},
    compileOrder: [],
    linkObjects: [],
  };

  const safeRects = (rects || []).map(normalizeExportRect);
  const safeSprites = sprites || [];
  let bitmap = options.bitmap || null;
  const layerMode = options.mode || (baseName === "fondo" ? "fondo" : "frame");
  const bitmapWidth = options.width || CANVAS_WIDTH;
  const bitmapHeight = options.height || CANVAS_HEIGHT;

  if (!bitmap) {
    if (options.forceBitmap) {
      bitmap = rasterizeLayerToBitmap(
        safeRects,
        safeSprites,
        bitmapWidth,
        bitmapHeight,
        layerMode === "fondo" ? 0 : BITMAP_SKIP_INDEX,
      );
    }
  }

  const filename = `${baseName}.asm`;

  if (bitmap) {
    result.files[filename] = generateBitmapASM(
      baseName,
      bitmap,
      layerMode,
      bitmapWidth,
      bitmapHeight,
    );
  } else {
    result.files[filename] = generateSimpleProcASM(
      baseName,
      safeRects,
      safeSprites,
    );
  }

  result.compileOrder.push(filename);
  result.linkObjects.push(`${baseName}.obj`);
  return result;
}

/**
 * Genera fondo.asm — Capa de fondo persistente.
 * Proc name: "fondo"
 */
function generateFondoASM(rects, sprites, bitmap = null) {
  if (bitmap) {
    return generateBitmapASM("fondo", bitmap, "fondo");
  }
  return generateSimpleProcASM("fondo", rects, sprites);
}

/**
 * Genera F1.asm ... Fn.asm — Un frame de animación.
 * @param {string} procName  "F1", "F2", etc.
 * @param {Array}  rects     rectángulos del frame
 */
function generateFrameASM(procName, rects, sprites, bitmap = null) {
  if (bitmap) {
    return generateBitmapASM(procName, bitmap, "frame");
  }
  return generateSimpleProcASM(procName, rects, sprites);
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

function generateBuildBAT(compileOrder) {
  const lines = ["@echo off", ""];

  compileOrder.forEach((asmFile) => {
    lines.push(`echo Compilando ${asmFile}...`);
    lines.push(`tasm ${asmFile}`);
    lines.push("if errorlevel 1 goto error");
    lines.push("");
  });

  lines.push(
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

function generateLinkResponse(linkObjects) {
  const objects = [
    "Orquesta.obj",
    ...linkObjects.filter((obj) => obj !== "Orquesta.obj"),
  ];

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
  const totalRects = allLayers.reduce(
    (a, l) => a + l.rectangles.length + (l.sprites || []).length,
    0,
  );

  if (totalRects === 0) {
    alert("No hay datos que exportar. Dibuja algo primero.");
    return;
  }

  // Generar archivos
  const files = {};

  files["fondo.asm"] = generateLayerASMExport(
    "fondo",
    backgroundLayer.rectangles,
    backgroundLayer.sprites,
    {
      mode: "fondo",
      width: backgroundLayer.canvasWidth || CANVAS_WIDTH,
      height: backgroundLayer.canvasHeight || CANVAS_HEIGHT,
      forceBitmap: false,
    },
  ).files["fondo.asm"];

  frames.forEach((frame, i) => {
    const procName = `F${i + 1}`;
    files[`${procName}.asm`] = generateLayerASMExport(
      procName,
      frame.rectangles,
      frame.sprites || [],
      {
        mode: "frame",
        width: frame.canvasWidth || CANVAS_WIDTH,
        height: frame.canvasHeight || CANVAS_HEIGHT,
        forceBitmap: frame.exportAsBitmap === true,
      },
    ).files[`${procName}.asm`];
  });

  files["Orquesta.asm"] = generateOrquestaASM(frames.length);

  // Construir orden de compilación y lista de objetos para el enlazador
  const compileOrder = ["fondo.asm"];
  const linkObjects = ["fondo.obj"];
  frames.forEach((_, i) => {
    compileOrder.push(`F${i + 1}.asm`);
    linkObjects.push(`F${i + 1}.obj`);
  });
  compileOrder.push("Orquesta.asm");

  files["build.bat"] = generateBuildBAT(compileOrder);
  files["link.rsp"] = generateLinkResponse(linkObjects);

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
  const pixelRegex =
    /PINTAR_PIXEL\s*\(?\s*(\d+)\s*\)?\s*,\s*\(?\s*(\d+)\s*\)?\s*,\s*\(?\s*(\d+)\s*\)?/i;

  // DRAW_REGION X1,Y1, X2,Y2 , COLOR_HEX - ej: DRAW_REGION 10,20, 30,40 , 00FFH o (00FF)H
  const rectRegex =
    /DRAW_REGION\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*\(?\s*([0-9A-F]+)\s*\)?H/i;

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
      colorIndex: colorIndex,
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
      colorIndex: colorIndex,
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

  const spriteStartRegex =
    /;\s*Sprite\s+(\d+)\s*(?:-\s*(.*?))?(?:\(pos:\s*(\d+)\s*,\s*(\d+)\s*\))?/i;
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
      const spriteName =
        (startMatch[2] || "").trim() || `Sprite ${startMatch[1]}`;
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

// ==========================================
// IMPORTACIÓN Y PROCESAMIENTO DE GIF ANIMADO
// ==========================================

let currentGifInfo = {
  frames: [],
  width: 0,
  height: 0,
  filename: "",
};

/**
 * Reconstruye los fotogramas de un GIF teniendo en cuenta los métodos de descarte (Disposal Methods).
 */
function reconstructGIF(gifFrames, gifWidth, gifHeight) {
  const canvas = document.createElement("canvas");
  canvas.width = gifWidth;
  canvas.height = gifHeight;
  const ctx = canvas.getContext("2d");

  const frameImages = []; // Array de ImageData
  const canvasStates = []; // Historial de estados para disposalType === 3

  for (let index = 0; index < gifFrames.length; index++) {
    const frame = gifFrames[index];

    // Guardar el estado actual del lienzo (antes de dibujar) para disposalType === 3
    const backup = ctx.getImageData(0, 0, gifWidth, gifHeight);

    // Procesar el descarte del frame anterior
    if (index > 0) {
      const prevFrame = gifFrames[index - 1];
      if (prevFrame.disposalType === 2) {
        // Limpiar el área del fotograma anterior
        ctx.clearRect(
          prevFrame.dims.left,
          prevFrame.dims.top,
          prevFrame.dims.width,
          prevFrame.dims.height,
        );
      } else if (prevFrame.disposalType === 3) {
        // Restaurar al estado previo
        const prevState = canvasStates.pop();
        if (prevState) {
          ctx.putImageData(prevState, 0, 0);
        }
      }
    }

    // Guardar el backup en el historial
    canvasStates.push(backup);

    // Dibujar el parche del frame actual
    const patchCanvas = document.createElement("canvas");
    patchCanvas.width = frame.dims.width;
    patchCanvas.height = frame.dims.height;
    const patchCtx = patchCanvas.getContext("2d");
    const imgData = patchCtx.createImageData(
      frame.dims.width,
      frame.dims.height,
    );
    imgData.data.set(frame.patch);
    patchCtx.putImageData(imgData, 0, 0);

    ctx.drawImage(patchCanvas, frame.dims.left, frame.dims.top);

    // Guardar imagen final compuesta de este fotograma
    frameImages.push(ctx.getImageData(0, 0, gifWidth, gifHeight));
  }

  return frameImages;
}

/**
 * Maneja la selección del archivo GIF y abre el modal de opciones de importación.
 */
async function handleImportGIFFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const gifImportModal = document.getElementById("gif-import-modal");
  const gifInfoDetails = document.getElementById("gif-info-details");
  const btnConfirm = document.getElementById("btn-confirm-gif-import");
  const scaleRow = document
    .getElementById("gif-scale-factor")
    ?.closest(".modal-row");
  const detailLevelExisting = document.getElementById("gif-detail-level");

  if (!gifImportModal || !gifInfoDetails) return;

  if (!detailLevelExisting && scaleRow && scaleRow.nextElementSibling) {
    const detailRow = document.createElement("div");
    detailRow.className = "modal-row";
    detailRow.innerHTML = `
      <div class="modal-field">
        <label for="gif-detail-level">Nivel de detalle ASM</label>
        <select id="gif-detail-level">
          <option value="320x200">Alto: 320x200</option>
          <option value="160x100" selected>Medio: 160x100 (Recomendado)</option>
          <option value="80x50">Bajo: 80x50 (Muy liviano)</option>
        </select>
      </div>
      <div class="modal-field">
        <span style="display:block; margin-top: 1.5rem; font-size: 0.75rem; color: var(--text-muted);">Menos detalle = menos pixeles = ASM mas liviano para TASM/DOSBox.</span>
      </div>
    `;
    scaleRow.insertAdjacentElement("afterend", detailRow);
  }

  try {
    gifInfoDetails.innerHTML =
      '<span style="color: var(--accent);">Cargando archivo y dependencias...</span>';
    gifImportModal.classList.add("active");
    btnConfirm.disabled = true;

    // Importación dinámica de la librería de descompresión de GIF
    const { parseGIF, decompressFrames } =
      await import("https://cdn.jsdelivr.net/npm/gifuct-js@2.1.2/+esm");

    // Leer el archivo como ArrayBuffer
    const arrayBuffer = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });

    gifInfoDetails.innerHTML =
      '<span style="color: var(--accent);">Decodificando fotogramas de la animación...</span>';
    const parsedGif = parseGIF(arrayBuffer);
    const decompressed = decompressFrames(parsedGif, true);

    if (!decompressed || decompressed.length === 0) {
      throw new Error(
        "No se encontraron fotogramas válidos en el archivo GIF.",
      );
    }

    currentGifInfo = {
      frames: decompressed,
      width: decompressed[0].dims.width,
      height: decompressed[0].dims.height,
      filename: file.name,
    };

    gifInfoDetails.innerHTML = `
      <strong>Archivo:</strong> ${file.name}<br>
      <strong>Dimensiones originales:</strong> ${currentGifInfo.width}x${currentGifInfo.height} px<br>
      <strong>Total fotogramas:</strong> ${decompressed.length}
    `;

    if (currentGifInfo.width > 320 || currentGifInfo.height > 200) {
      gifInfoDetails.innerHTML += `<br><span style="color: var(--accent-orange); font-weight: 600;">⚠️ El GIF es mayor que 320x200 px. Se escalará proporcionalmente de forma automática.</span>`;
    }

    btnConfirm.disabled = false;
  } catch (err) {
    console.error(err);
    gifInfoDetails.innerHTML = `<span style="color: var(--danger);">Error: ${err.message}</span>`;
    btnConfirm.disabled = true;
  } finally {
    e.target.value = "";
  }
}

/**
 * Procesa los fotogramas según la configuración elegida e integra los datos de fotogramas ASM.
 */
async function processSelectedGIF() {
  if (!currentGifInfo || currentGifInfo.frames.length === 0) {
    alert("No hay datos de GIF cargados.");
    return;
  }

  const gifImportModal = document.getElementById("gif-import-modal");
  const scaling = document.getElementById("gif-scaling").value;
  const scaleFactorInput = document.getElementById("gif-scale-factor");
  const scaleFactor = parseInt(scaleFactorInput.value, 10) || 1;
  const offsetMode = document.getElementById("gif-offset-mode").value;
  const offsetXInput = document.getElementById("gif-offset-x");
  const offsetYInput = document.getElementById("gif-offset-y");
  const customOffsetX = parseInt(offsetXInput.value, 10) || 0;
  const customOffsetY = parseInt(offsetYInput.value, 10) || 0;
  const detailLevel =
    document.getElementById("gif-detail-level")?.value || "160x100";
  const optimization = document.getElementById("gif-optimization").value;
  const importMode = document.getElementById("gif-import-mode").value;
  const maxFramesInput = document.getElementById("gif-max-frames");
  const maxFramesLimit = parseInt(maxFramesInput.value, 10) || 0;
  const ignoreTransparent = document.getElementById(
    "gif-ignore-background",
  ).checked;
  const ignoreColorMode =
    document.getElementById("gif-ignore-color-mode")?.value || "none";
  const ignoreColorCustom = parseInt(
    document.getElementById("gif-ignore-color-index")?.value || "0",
    10,
  );
  let ignoreColorIndex = null;
  if (ignoreColorMode === "index0") {
    ignoreColorIndex = 0;
  } else if (ignoreColorMode === "custom") {
    ignoreColorIndex = Number.isFinite(ignoreColorCustom)
      ? ignoreColorCustom
      : 0;
  }

  if (gifImportModal) {
    gifImportModal.classList.remove("active");
  }

  const detailSizeMap = {
    "320x200": { width: 320, height: 200 },
    "160x100": { width: 160, height: 100 },
    "80x50": { width: 80, height: 50 },
  };
  const detailSize = detailSizeMap[detailLevel] || detailSizeMap["160x100"];

  // Reconstruir fotogramas completos
  const renderedFrames = reconstructGIF(
    currentGifInfo.frames,
    currentGifInfo.width,
    currentGifInfo.height,
  );

  let framesToImport = renderedFrames;
  if (maxFramesLimit > 0 && maxFramesLimit < renderedFrames.length) {
    framesToImport = renderedFrames.slice(0, maxFramesLimit);
  }

  // Limpiar o anexar
  if (importMode === "replace") {
    frames = [];
    frameIdCounter = 0;
    rectangleIdCounter = 0;
  }

  // Caché de colores VGA para un mapeo veloz
  const colorCache = new Map();
  function getCachedClosestVGAColor(r, g, b) {
    const key = (r << 16) | (g << 8) | b;
    if (colorCache.has(key)) return colorCache.get(key);

    let minDistance = Infinity;
    let closestIndex = 15; // default blanco
    for (let i = 0; i < VGA_PALETTE.length; i++) {
      const [vr, vg, vb] = VGA_PALETTE_SAFE[i] || [0, 0, 0];
      const dist = (r - vr) ** 2 + (g - vg) ** 2 + (b - vb) ** 2;
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    }
    colorCache.set(key, closestIndex);
    return closestIndex;
  }

  const targetWidth = detailSize.width;
  const targetHeight = detailSize.height;
  const newImportedFrames = [];

  for (let fIdx = 0; fIdx < framesToImport.length; fIdx++) {
    const imgData = framesToImport[fIdx];

    // Lienzo del fotograma original
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = currentGifInfo.width;
    tempCanvas.height = currentGifInfo.height;
    tempCanvas.getContext("2d").putImageData(imgData, 0, 0);

    // Lienzo escalado de destino (VGA 320x200)
    const vgaCanvas = document.createElement("canvas");
    vgaCanvas.width = targetWidth;
    vgaCanvas.height = targetHeight;
    const vgaCtx = vgaCanvas.getContext("2d");
    vgaCtx.imageSmoothingEnabled = false; // Mapeo exacto pixel art sin difuminados

    let sw = currentGifInfo.width;
    let sh = currentGifInfo.height;

    if (scaling === "center-fit") {
      const scale = Math.min(
        targetWidth / currentGifInfo.width,
        targetHeight / currentGifInfo.height,
      );
      sw = currentGifInfo.width * scale;
      sh = currentGifInfo.height * scale;
    } else if (scaling === "stretch") {
      sw = targetWidth;
      sh = targetHeight;
    } else if (scaling === "factor") {
      sw = currentGifInfo.width * scaleFactor;
      sh = currentGifInfo.height * scaleFactor;
    }

    let dx = 0;
    let dy = 0;
    if (offsetMode === "center") {
      dx = Math.floor((targetWidth - sw) / 2);
      dy = Math.floor((targetHeight - sh) / 2);
    } else {
      dx = customOffsetX;
      dy = customOffsetY;
    }

    // Dibujar frame redimensionado en el buffer VGA
    vgaCtx.drawImage(
      tempCanvas,
      0,
      0,
      currentGifInfo.width,
      currentGifInfo.height,
      dx,
      dy,
      sw,
      sh,
    );

    const vgaImgData = vgaCtx.getImageData(0, 0, targetWidth, targetHeight);
    const data = vgaImgData.data;

    const frameRectangles = [];

    if (optimization === "row-span") {
      // Optimización: Scanlines con DRAW_REGION
      for (let y = 0; y < targetHeight; y++) {
        let startX = -1;
        let currentColorIndex = -1;

        for (let x = 0; x <= targetWidth; x++) {
          let hasPixel = false;
          let mappedColor = -1;

          if (x < targetWidth) {
            const idx = (y * targetWidth + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];

            const isTransparent = ignoreTransparent && a < 128;
            const isIgnoredColor =
              ignoreColorIndex !== null &&
              getCachedClosestVGAColor(r, g, b) === ignoreColorIndex;
            if (!isTransparent && !isIgnoredColor) {
              hasPixel = true;
              mappedColor = getCachedClosestVGAColor(r, g, b);
            }
          }

          if (currentColorIndex !== -1) {
            if (
              x === targetWidth ||
              !hasPixel ||
              mappedColor !== currentColorIndex
            ) {
              const length = x - startX;
              if (length === 1) {
                frameRectangles.push({
                  id: ++rectangleIdCounter,
                  type: "pixel",
                  x1: startX,
                  y1: y,
                  x2: startX,
                  y2: y,
                  colorIndex: currentColorIndex,
                });
              } else {
                frameRectangles.push({
                  id: ++rectangleIdCounter,
                  type: "rect",
                  x1: startX,
                  y1: y,
                  x2: x - 1,
                  y2: y,
                  colorIndex: currentColorIndex,
                });
              }
              if (x < targetWidth && hasPixel) {
                startX = x;
                currentColorIndex = mappedColor;
              } else {
                startX = -1;
                currentColorIndex = -1;
              }
            }
          } else if (x < targetWidth && hasPixel) {
            startX = x;
            currentColorIndex = mappedColor;
          }
        }
      }
    } else {
      // Sin optimización: PINTAR_PIXEL para cada uno
      for (let y = 0; y < targetHeight; y++) {
        for (let x = 0; x < targetWidth; x++) {
          const idx = (y * targetWidth + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          const isTransparent = ignoreTransparent && a < 128;
          const isIgnoredColor =
            ignoreColorIndex !== null &&
            getCachedClosestVGAColor(r, g, b) === ignoreColorIndex;
          if (!isTransparent && !isIgnoredColor) {
            const mappedColor = getCachedClosestVGAColor(r, g, b);
            frameRectangles.push({
              id: ++rectangleIdCounter,
              type: "pixel",
              x1: x,
              y1: y,
              x2: x,
              y2: y,
              colorIndex: mappedColor,
            });
          }
        }
      }
    }

    const fObj = {
      id: ++frameIdCounter,
      name: `GIF F${fIdx + 1}`,
      rectangles: frameRectangles,
      sprites: [],
      canvasWidth: targetWidth,
      canvasHeight: targetHeight,
      exportAsBitmap: false,
      source: "gif",
      visible: true,
    };
    frames.push(fObj);
    newImportedFrames.push(fObj);
  }

  if (newImportedFrames.length > 0) {
    switchToFrame(newImportedFrames[0].id);
  } else {
    switchToBackground();
  }

  alert(
    `Importación exitosa. Se han generado ${framesToImport.length} fotogramas en la secuencia, compatibles con TASM.`,
  );
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
          entry: zipEntry,
        });
      }
    });

    frameFiles.sort((a, b) => a.num - b.num);

    if (frameFiles.length === 0) {
      alert(
        "No se encontraron archivos de frames de animación (F1.asm, F2.asm...) en el ZIP.",
      );
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
        visible: true,
      });
    }

    // 3. Reemplazar estado de la aplicación
    let localRectId = 0;
    let localSpriteId = 0;

    backgroundLayer.rectangles = bgParsed.rectangles;
    backgroundLayer.rectangles.forEach((r) => {
      r.id = ++localRectId;
    });
    backgroundLayer.sprites = bgParsed.sprites;
    backgroundLayer.sprites.forEach((s) => {
      s.id = ++localSpriteId;
    });

    frames = [];
    frameIdCounter = 0;
    importedFrames.forEach((f) => {
      f.id = ++frameIdCounter;
      f.rectangles.forEach((r) => {
        r.id = ++localRectId;
      });
      (f.sprites || []).forEach((s) => {
        s.id = ++localSpriteId;
      });
      frames.push(f);
    });

    rectangleIdCounter = localRectId;
    spriteIdCounter = localSpriteId;
    activeSelectedSpriteId = null;

    // Volver a la capa de fondo y actualizar la UI
    switchToBackground();
    const totalSprites =
      bgParsed.sprites.length +
      importedFrames.reduce((a, f) => a + (f.sprites || []).length, 0);
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

  const sprite = layer.sprites.find((s) => s.id === activeSelectedSpriteId);
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
  if (
    (e.key === "Delete" || e.key === "Backspace") &&
    activeSelectedSpriteId !== null
  ) {
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

// ==========================================
// MODO PHOTO IMPORT
// ==========================================
let currentPhotoToProcess = null;

async function handleImportPhotoFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const photoImportModal = document.getElementById("photo-import-modal");
  const photoInfoDetails = document.getElementById("photo-info-details");
  if (!photoImportModal || !photoInfoDetails) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      currentPhotoToProcess = img;
      photoInfoDetails.innerHTML = `
        <strong>Archivo:</strong> ${file.name}<br>
        <strong>Tamaño original:</strong> ${img.width}x${img.height} px<br>
        <strong>Peso:</strong> ${(file.size / 1024).toFixed(1)} KB
      `;
      photoImportModal.classList.add("active");
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
  e.target.value = ""; // reset
}

async function processSelectedPhoto() {
  if (!currentPhotoToProcess) return;

  const modal = document.getElementById("photo-import-modal");
  const scalingMode = document.getElementById("photo-scaling")?.value || "center-fit";
  const scaleFactor = parseInt(document.getElementById("photo-scale-factor")?.value || "1");
  const detailLevel = document.getElementById("photo-detail-level")?.value || "160x100";
  const offsetMode = document.getElementById("photo-offset-mode")?.value || "center";
  const offsetX = parseInt(document.getElementById("photo-offset-x")?.value || "0");
  const offsetY = parseInt(document.getElementById("photo-offset-y")?.value || "0");
  const optimizationMode = document.getElementById("photo-optimization")?.value || "row-span";
  
  const ignoreColorMode = document.getElementById("photo-ignore-color-mode")?.value || "none";
  let ignoreColorIndex = -1;
  if (ignoreColorMode === "index0") ignoreColorIndex = 0;
  else if (ignoreColorMode === "custom") {
    ignoreColorIndex = parseInt(document.getElementById("photo-ignore-color-index")?.value || "0");
  }

  let finalWidth = 320, finalHeight = 200;
  if (detailLevel === "160x100") { finalWidth = 160; finalHeight = 100; }
  else if (detailLevel === "80x50") { finalWidth = 80; finalHeight = 50; }

  const offscreen = document.createElement("canvas");
  offscreen.width = finalWidth;
  offscreen.height = finalHeight;
  const offCtx = offscreen.getContext("2d");
  offCtx.clearRect(0, 0, finalWidth, finalHeight);

  const imgW = currentPhotoToProcess.width;
  const imgH = currentPhotoToProcess.height;
  let drawX = 0, drawY = 0, drawW = finalWidth, drawH = finalHeight;

  if (scalingMode === "center-fit") {
    const scale = Math.min(finalWidth / imgW, finalHeight / imgH);
    drawW = Math.floor(imgW * scale);
    drawH = Math.floor(imgH * scale);
    if (offsetMode === "center") {
      drawX = Math.floor((finalWidth - drawW) / 2);
      drawY = Math.floor((finalHeight - drawH) / 2);
    } else { drawX = offsetX; drawY = offsetY; }
  } else if (scalingMode === "stretch") {
    drawW = finalWidth; drawH = finalHeight;
    if (offsetMode === "custom") { drawX = offsetX; drawY = offsetY; }
  } else if (scalingMode === "none") {
    drawW = imgW; drawH = imgH;
    if (offsetMode === "center") {
      drawX = Math.floor((finalWidth - drawW) / 2);
      drawY = Math.floor((finalHeight - drawH) / 2);
    } else { drawX = offsetX; drawY = offsetY; }
  } else if (scalingMode === "factor") {
    drawW = Math.floor(imgW * scaleFactor);
    drawH = Math.floor(imgH * scaleFactor);
    if (offsetMode === "center") {
      drawX = Math.floor((finalWidth - drawW) / 2);
      drawY = Math.floor((finalHeight - drawH) / 2);
    } else { drawX = offsetX; drawY = offsetY; }
  }

  offCtx.drawImage(currentPhotoToProcess, drawX, drawY, drawW, drawH);
  const imgData = offCtx.getImageData(0, 0, finalWidth, finalHeight).data;

  const scaleX = CANVAS_WIDTH / finalWidth;
  const scaleY = CANVAS_HEIGHT / finalHeight;
  
  const rects = [];
  
  if (optimizationMode === "row-span") {
    for (let y = 0; y < finalHeight; y++) {
      let startX = -1;
      let currentColor = -1;
      for (let x = 0; x < finalWidth; x++) {
        const idx = (y * finalWidth + x) * 4;
        const r = imgData[idx], g = imgData[idx+1], b = imgData[idx+2], a = imgData[idx+3];
        let mappedIndex = mapToVGAPalette(r, g, b);
        if (a < 128 || mappedIndex === ignoreColorIndex) {
          mappedIndex = -1;
        }

        if (mappedIndex !== currentColor) {
          if (currentColor !== -1 && startX !== -1) {
            rects.push({
              type: "rect",
              x1: Math.floor(startX * scaleX),
              y1: Math.floor(y * scaleY),
              x2: Math.floor(x * scaleX) - 1,
              y2: Math.floor((y + 1) * scaleY) - 1,
              colorIndex: currentColor
            });
          }
          startX = (mappedIndex !== -1) ? x : -1;
          currentColor = mappedIndex;
        }
      }
      if (currentColor !== -1 && startX !== -1) {
        rects.push({
          type: "rect",
          x1: Math.floor(startX * scaleX),
          y1: Math.floor(y * scaleY),
          x2: Math.floor(finalWidth * scaleX) - 1,
          y2: Math.floor((y + 1) * scaleY) - 1,
          colorIndex: currentColor
        });
      }
    }
  } else {
    for (let y = 0; y < finalHeight; y++) {
      for (let x = 0; x < finalWidth; x++) {
        const idx = (y * finalWidth + x) * 4;
        const r = imgData[idx], g = imgData[idx+1], b = imgData[idx+2], a = imgData[idx+3];
        const mappedIndex = mapToVGAPalette(r, g, b);
        if (a >= 128 && mappedIndex !== ignoreColorIndex) {
          rects.push({
            type: "rect", 
            x1: Math.floor(x * scaleX),
            y1: Math.floor(y * scaleY),
            x2: Math.floor((x + 1) * scaleX) - 1,
            y2: Math.floor((y + 1) * scaleY) - 1,
            colorIndex: mappedIndex
          });
        }
      }
    }
  }

  modal.classList.remove("active");
  exportPhotoASM(rects);
}

function exportPhotoASM(rects) {
  const safeRects = (rects || []).map(normalizeExportRect);
  const commands = buildCommandsBlock(safeRects, []);
  
  const photoAsm = [
    "INCLUDE LIBRO.LIB",
    "INCLUDE M.LIB",
    "",
    ".MODEL LARGE",
    ".DATA",
    ".CODE",
    "",
    "main PROC",
    "MOV AX,@DATA",
    "MOV DS,AX",
    "",
    "MODO_VGA",
    "",
    commands.trimEnd(),
    "",
    "MOV AH,00H",
    "INT 16H",
    "",
    "MODO_TXT",
    "EXIT",
    "main ENDP",
    "END main"
  ].join("\\r\\n");
  
  const buildBat = [
    "@echo off",
    "echo Compilando Foto a ASM...",
    "tasm /zi photo.asm",
    "if errorlevel 1 goto error",
    "tlink /v /3 photo.obj",
    "if errorlevel 1 goto error",
    "echo Compilacion exitosa.",
    "goto end",
    ":error",
    "echo Hubo errores en la compilacion.",
    ":end"
  ].join("\\r\\n");

  const files = {
    "photo.asm": photoAsm,
    "build.bat": buildBat
  };

  if (typeof JSZip !== "undefined") {
    const zip = new JSZip();
    zip.file("photo.asm", files["photo.asm"]);
    zip.file("build.bat", files["build.bat"]);
    zip.generateAsync({ type: "blob" }).then(blob => {
      downloadBlob(blob, \`photo_asm_\${Date.now()}.zip\`);
    });
  } else {
    Object.entries(files).forEach(([name, content]) => {
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      downloadBlob(blob, name);
    });
  }
}

window.addEventListener("DOMContentLoaded", init);
