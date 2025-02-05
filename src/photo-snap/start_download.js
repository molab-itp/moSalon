//

import axios from 'axios';
import { createWriteStream as fs_createWriteStream, existsSync as fs_existsSync } from 'fs';

export async function start_download(my, item) {
  attempt_download(my, item, 2);
}

async function attempt_download(my, item, retryCount) {
  // console.log('attempt_download item', item);
  if (!item.path) {
    // console.log('attempt_download no path', item);
    return;
  }
  if (!item.uploadedAt) {
    // console.log('attempt_download no uploadedAt', item);
    return;
  }
  if (!retryCount) {
    console.log('attempt_download retry failed item', item);
    return;
  }
  let url;
  let path = item.path;
  try {
    console.log('attempt_download url path', path);
    url = await my.dbase.fstorage_download_url({ path });
  } catch (err) {
    // console.log('attempt_download url err', err);
    console.log('attempt_download url err return');
    setTimeout(() => {
      attempt_download(my, item, retryCount - 1);
    }, 3000);
  }
  // console.log('test_download url', url);
  if (!url) return;
  // path yGt3ZocTRxWpZQu9bMymjI8zku32/001_-OI78nU3Ys1-VyJVmZTt.jpg
  //
  let outputPath = `${my.savePath}/${item.uid}_${item.name}_${item.key}.jpg`;
  if (!fs_existsSync(outputPath)) {
    downloadFile(url, outputPath)
      .then(() => console.log('Downloaded path', path))
      .catch((err) => console.error('Download failed', err));
  } else {
    console.log('exists path', path);
  }
}

async function downloadFile(url, outputPath) {
  const writer = fs_createWriteStream(outputPath);
  const response = await axios({
    method: 'get',
    url: url,
    responseType: 'stream',
  });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}
