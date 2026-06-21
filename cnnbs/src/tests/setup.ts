// CO6: Test environment setup (Vitest + Testing Library)
import '@testing-library/jest-dom';

// jsdom does not implement matchMedia — polyfill for components that read theme preference.
if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;
}
