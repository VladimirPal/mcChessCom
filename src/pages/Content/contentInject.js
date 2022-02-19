import { getAllStorageSyncData } from '../../utils';
import { initialSettings } from '../../constants';

function injectScript(file_path, tag) {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file_path);
  node.appendChild(script);
}

injectScript(chrome.runtime.getURL('contentScript.bundle.js'), 'body');

async function init() {
  let settings = (await getAllStorageSyncData()) || {};
  window.postMessage({
    isMcPlugin: true,
    settings: {
      ...initialSettings,
      ...settings,
    },
  });
  chrome.storage.onChanged.addListener((changes) => {
    settings = {
      ...initialSettings,
      ...settings,
      ...Object.keys(changes).reduce((acc, settingKey) => {
        acc[settingKey] = changes[settingKey].newValue;
        return acc;
      }, {}),
    };
    window.postMessage({
      isMcPlugin: true,
      settings,
    });
  });
}
setTimeout(init, 1000);
