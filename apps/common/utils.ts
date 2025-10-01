export const dataURLtoFile = (dataurl: string, filename: string) => {
  const arr = dataurl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
export const formatRelativeNumber = (num: number, precision = 1): string => {
  return new Intl.NumberFormat('en-GB', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: precision,
  }).format(num);
};

// random.ts

// URL-safe alphabet used by NanoID
const URL_SAFE_ALPHABET =
  '_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Securely generate random bytes in TypeScript.
 * - Browser: crypto.getRandomValues
 * - Node (older versions): crypto.randomBytes
 */
function getSecureRandomBytes(size: number): Uint8Array {
  // Browser or Node 19+ where globalThis.crypto exists
  if (
    typeof globalThis.crypto !== 'undefined' &&
    'getRandomValues' in globalThis.crypto
  ) {
    const buf = new Uint8Array(size);
    globalThis.crypto.getRandomValues(buf);
    return buf;
  }

  // Node fallback for older versions
  try {
    const nodeCrypto: typeof import('crypto') = require('node:crypto');
    if (typeof nodeCrypto.randomBytes === 'function') {
      return new Uint8Array(nodeCrypto.randomBytes(size));
    }
  } catch {
    // ignore, will fall back below
  }

  // Non-secure fallback as a last resort (avoid in production)
  console.warn(
    '[random.nanoid] No secure RNG available; falling back to Math.random (NOT secure)',
  );
  const buf = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    buf[i] = Math.floor(Math.random() * 256);
  }
  return buf;
}

/**
 * Random utilities.
 */
export const random = {
  /**
   * Generate a URL-safe NanoID-like string.
   * @param length Number of characters; default 21. Use 15 for your case.
   * @returns Random ID string of requested length.
   */
  nanoid(length = 21): string {
    if (!Number.isFinite(length) || length <= 0 || length > 1024) {
      throw new Error(
        'random.nanoid: length must be a positive number <= 1024',
      );
    }

    const alphabet = URL_SAFE_ALPHABET;
    // Bitmask covering the nearest power-of-two range >= alphabet.length
    const mask = (1 << Math.ceil(Math.log2(alphabet.length))) - 1;
    // Heuristic buffer size to reduce rejections and ensure we collect enough chars
    const step = Math.ceil((1.6 * mask * length) / alphabet.length);

    const idChars: string[] = [];
    while (idChars.length < length) {
      const bytes = getSecureRandomBytes(step);
      for (let i = 0; i < bytes.length && idChars.length < length; i++) {
        const index = bytes[i] & mask;
        // Accept only indices within alphabet length to avoid modulo bias
        if (index < alphabet.length) {
          idChars.push(alphabet[index]);
        }
      }
    }

    return idChars.join('');
  },
};

// Example:
// const id: string = random.nanoid(15);
// console.log(id, id.length); // -> e.g. "x3mAq2_-W0n9ZpL", 15
