/**
 * Tiny cross-island UI store: lets any client component on a dashboard
 * open the shared paywall bottom-sheet (hosted inside BottomNav).
 */

let open = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function openPaywallPopup() {
  open = true;
  emit();
}

export function closePaywallPopup() {
  open = false;
  emit();
}

export function subscribePaywallPopup(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getPaywallPopupOpen(): boolean {
  return open;
}

export function getServerPaywallPopupOpen(): boolean {
  return false;
}
