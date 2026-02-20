
  // ─── ESTADO ───
  let currentModule = 'cesar';

  // ─── MÓDULO ───
  function selectModule(mod) {
    currentModule = mod;
    document.querySelectorAll('.module-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.module-btn.${mod}`).classList.add('active');

    const isCesar = mod === 'cesar';
    document.getElementById('shiftSection').style.display = isCesar ? 'grid' : 'none';
    document.getElementById('panelTitle').textContent = isCesar ? 'Módulo César' : 'Módulo Atbash';
    
    const badge = document.getElementById('moduleBadge');
    badge.textContent = isCesar ? 'CÉSAR' : 'ATBASH';
    badge.className = isCesar ? 'badge' : 'badge atbash-badge';

    renderAlphaTable();
  }

  // ─── DESPLAZAMIENTO ───
  function updateShift() {
    const val = document.getElementById('shiftRange').value;
    document.getElementById('shiftVal').textContent = val;
    renderAlphaTable();
  }

  // ─── LÓGICA CENTRAL ───
  function getCharset() {
    return document.getElementById('charset').value;
  }

  function cesarCipher(text, charset, shift, decrypt) {
    const n = charset.length;
    const d = decrypt ? -shift : shift;
    return text.split('').map(ch => {
      const idx = charset.indexOf(ch);
      if (idx === -1) return ch; // carácter no en charset → pasa sin cambio
      return charset[((idx + d) % n + n) % n];
    }).join('');
  }

  function atbashCipher(text, charset) {
    const n = charset.length;
    return text.split('').map(ch => {
      const idx = charset.indexOf(ch);
      if (idx === -1) return ch;
      return charset[n - 1 - idx];
    }).join('');
  }

  // ─── PROCESO ───
  function process(mode) {
    const text = document.getElementById('inputText').value;
    const charset = getCharset();
    const shift = parseInt(document.getElementById('shiftRange').value);

    if (!text.trim()) {
      showResult('⚠ Ingresa un texto primero.', mode);
      return;
    }

    let result;
    if (currentModule === 'cesar') {
      result = cesarCipher(text, charset, shift, mode === 'decipher');
    } else {
      // Atbash es su propio inverso
      result = atbashCipher(text, charset);
    }

    showResult(result, mode);
    renderAlphaTable();
  }

  function showResult(text, mode) {
    const label = mode === 'cipher' ? '🔒 Texto Cifrado' : '🔓 Texto Descifrado';
    document.getElementById('resultLabel').textContent = label;
    const el = document.getElementById('resultText');
    el.textContent = text;
    el.classList.remove('flash');
    void el.offsetWidth; // reflow
    el.classList.add('flash');
  }

  // ─── COPIAR ───
  function copyResult() {
    const text = document.getElementById('resultText').textContent;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.querySelector('.copy-btn');
      btn.textContent = '✓ Copiado';
      setTimeout(() => btn.textContent = 'Copiar', 1500);
    });
  }

  // ─── LIMPIAR ───
  function clearAll() {
    document.getElementById('inputText').value = '';
    document.getElementById('resultText').textContent = 'El resultado aparecerá aquí...';
    document.getElementById('resultLabel').textContent = 'Resultado';
  }

  // ─── TABLA DE SUSTITUCIÓN ───
  function renderAlphaTable() {
    const charset = getCharset();
    const shift = parseInt(document.getElementById('shiftRange').value);
    const table = document.getElementById('alphaTable');
    table.innerHTML = '';

    // Mostrar solo los primeros 40 para no saturar la UI
    const display = charset.slice(0, 40);

    display.split('').forEach(ch => {
      let enc;
      if (currentModule === 'cesar') {
        enc = cesarCipher(ch, charset, shift, false);
      } else {
        enc = atbashCipher(ch, charset);
      }

      const pair = document.createElement('div');
      pair.className = 'alpha-pair';
      pair.innerHTML = `
        <div class="alpha-char alpha-orig" title="ASCII: ${ch.charCodeAt(0)}">${ch === ' ' ? '·' : escapeHtml(ch)}</div>
        <div class="alpha-arrow">↓</div>
        <div class="alpha-char alpha-enc" title="ASCII: ${enc.charCodeAt(0)}">${enc === ' ' ? '·' : escapeHtml(enc)}</div>
      `;
      table.appendChild(pair);
    });

    if (charset.length > 40) {
      const more = document.createElement('div');
      more.style.cssText = 'display:flex;align-items:center;color:var(--muted);font-size:11px;padding:0 8px;';
      more.textContent = `+${charset.length - 40} más`;
      table.appendChild(more);
    }
  }

  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ─── INIT ───
  renderAlphaTable();

  // Actualizar tabla al cambiar charset
  document.getElementById('charset').addEventListener('input', renderAlphaTable);
