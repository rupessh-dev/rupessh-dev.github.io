let showModalFn = null;

export function setShowModal(fn) {
  showModalFn = fn;
}

export function showModal(message, type = 'info') {
  if (showModalFn) {
    showModalFn(message, type);
  } else {
    // fallback if modal not ready
    alert(message);
  }
} 