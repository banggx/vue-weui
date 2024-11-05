import CryptoJs from 'crypto-js';
import encHex from 'crypto-js/enc-hex';

type Hasher = ReturnType<typeof CryptoJs.algo.SHA256.create>;

export default function fileHash(file: File) {
  const { size = 0 } = file;

  const chunkSize = 20 * 1024 * 1024; // 20MB 进行分片
  const hashFileInternal = (alog: Hasher) => {
    const hashBlob = (blob: Blob) => {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = ({ target }) => {
          if (target?.result) {
            const wordArray = CryptoJs.lib.WordArray.create(
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

  return hashFileInternal(CryptoJs.algo.SHA256.create());
}
