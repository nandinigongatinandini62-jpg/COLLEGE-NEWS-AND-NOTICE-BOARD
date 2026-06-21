// Simulates a network/Axios layer over local dummy JSON, with artificial latency
// so the UI can demonstrate loading states, skeleton screens, and error handling (CO4).
import type { ApiResponse } from '../types';

const LATENCY_MS = 450;
const FAILURE_RATE = 0; // set > 0 to simulate intermittent failures during demos

export function simulateRequest<T>(payload: T): Promise<ApiResponse<T>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        reject(new Error('Network request failed. Please try again.'));
        return;
      }
      resolve({ data: payload, success: true });
    }, LATENCY_MS);
  });
}

// Local-storage backed cache (CO4: data caching using Local Storage)
export function readCache<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeCache<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage may be unavailable (private mode) — fail silently
  }
}
