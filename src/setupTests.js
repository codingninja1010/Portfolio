import '@testing-library/jest-dom';

// Polyfills and mocks for browser APIs used in components
if (!global.ResizeObserver) {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  });
}

if (!window.IntersectionObserver) {
  window.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  };
}

// Mock scrollTo to avoid errors
if (!window.scrollTo) {
  window.scrollTo = () => {};
}

// Make window.location.assign mockable in jsdom tests
try {
  const original = window.location;
  // Some environments require deleting before re-defining
  delete window.location;
  // Recreate with assign mocked; spread original to keep other props
  window.location = {
    ...original,
    assign: jest.fn(),
  };
} catch {}

// Mock createElement('link') usage in Hero preload
const originalCreateElement = document.createElement.bind(document);
document.createElement = (tag) => {
  const el = originalCreateElement(tag);
  if (tag === 'link') {
    // define fetchPriority for tests
    Object.defineProperty(el, 'fetchPriority', {
      configurable: true,
      writable: true,
      value: 'auto',
    });
  }
  return el;
};
