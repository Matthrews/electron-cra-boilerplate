let saveAs = () => {
  console.log('浏览器不支持Blob文件下载');
};

function download(url, name, opts) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    saveAs(xhr.response, name, opts);
  };
  xhr.onerror = function () {
    console.error('could not download file');
  };
  xhr.send();
}

function corsEnabled(url) {
  let xhr = new XMLHttpRequest();
  // use sync to avoid popup blocker
  xhr.open('HEAD', url, false);
  xhr.send();
  return xhr.status >= 200 && xhr.status <= 299;
}

// `a.click()` doesn't work for all browsers (#465)
function click(node) {
  try {
    node.dispatchEvent(new MouseEvent('click'));
  } catch (e) {
    let evt = document.createEvent('MouseEvents');
    evt.initMouseEvent(
      'click', true, true, window, 0, 0, 0, 80,
      20, false, false, false, false, 0, null
    );
    node.dispatchEvent(evt);
  }
}

function getName(blob) {
  return (blob && blob.name) || window.document.title || 'download';
}

let location = window.location;

if ('download' in HTMLAnchorElement.prototype) {
  saveAs = (blob, name, opts) => {
    let URL = window.URL || window.webkitURL;
    let a = document.createElement('a');
    name = name || getName(blob);

    a.download = name;
    a.rel = 'noopener'; // tabnabbing

    // TODO: detect chrome extensions & packaged apps
    // a.target = '_blank'

    if (typeof blob === 'string') {
      a.href = blob;
      // download属性在非同源情况下无效，此时可以尝试通过异步获取（有可能源已设置允许跨域访问）
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      // Support blobs
      a.href = URL.createObjectURL(blob);
      setTimeout(() => { URL.revokeObjectURL(a.href); }, 4E4); // 40s
      setTimeout(() => { click(a); }, 0);
    }
  };
} else if ('nativeSaveBase64File' in window) {
  // cosmos 旧版本浏览器使用私有api
  saveAs = (blob, name, opts) => {
    name = name || getName(blob);
    if (typeof blob === 'string') {
      download(blob, name, opts);
    } else {
      let reader = new FileReader();
      reader.onloadend = () => {
        let base64data = reader.result;
        window.nativeSaveBase64File(base64data, name);
      };
      reader.readAsDataURL(blob);
    }
  };
}

/*
saveAs(blob,name)
blob or url
name
*/
export default { saveAs };
