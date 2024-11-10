import type CryptoJs from 'crypto-js';
import type encHexJs from 'crypto-js/enc-hex';

let CryptoJS: typeof CryptoJs;
let encHex: typeof encHexJs;
let cryptoPromise: Promise<void>;
type Hasher = ReturnType<typeof CryptoJs.algo.SHA256.create>;

export function loadCryptoJs() {
  cryptoPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.onload = () => {
      CryptoJS = window.CryptoJS;
      encHex = window.CryptoJS.enc.Hex;
      resolve();
    };
    script.onerror = () => {
      console.error(
        '[vue-weui] Failed to load CryptoJS! Please check your network or try again later.'
      );
      reject();
    };
    script.src = 'https://cdn.jsdelivr.net/npm/crypto-js@4.2.0/crypto-js.js';
    document.head?.appendChild(script);
  });
  return cryptoPromise;
}

export default function fileHash(file: File) {
  return cryptoPromise.then(() => {
    const { size = 0 } = file;

    const chunkSize = 20 * 1024 * 1024; // 20MB 进行分片
    const hashFileInternal = (alog: Hasher) => {
      const hashBlob = (blob: Blob) => {
        return new Promise<void>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = ({ target }) => {
            if (target?.result) {
              const wordArray = CryptoJS.lib.WordArray.create(
                target.result as any
              );
              alog.update(wordArray);
              resolve();
            } else {
              reject();
            }
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(blob);
        });
      };

      let chain = Promise.resolve();
      for (let index = 0; index < size; index += chunkSize) {
        chain = chain.then(() => {
          return hashBlob(file.slice(index, index + chunkSize));
        });
      }

      return chain.then(() => encHex.stringify(alog.finalize()));
    };

    return hashFileInternal(CryptoJS.algo.SHA256.create());
  });
}
