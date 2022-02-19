import pluginLoader from '../../pluginLoader';
import mcPlugin from '../../mcPlugin';

window.addEventListener('message', (event) => {
  const { isMcPlugin, settings } = event.data;
  if (event.source != window || isMcPlugin !== true) {
    return null;
  }
  pluginLoader(mcPlugin, settings);
  return null;
});
