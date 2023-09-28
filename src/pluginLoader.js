function pluginLoader(applyPlugin, settings) {
  const boardEl = document.getElementsByTagName('wc-chess-board')[0];
  if (boardEl && boardEl.game) {
    const boardId = boardEl.id;
    const observer = new MutationObserver((e) => {
      const [removedNode] = e[0].removedNodes;
      if (
        removedNode &&
        removedNode.tagName === 'CHESS-BOARD' &&
        (removedNode.id !== boardId || removedNode.id === 'board-blank')
      ) {
        setTimeout(() => {
          const newBoardEl = document.getElementsByTagName('wc-chess-board')[0];
          applyPlugin(newBoardEl, settings);
        }, 200);
      }
    });

    observer.observe(boardEl.parentElement, {
      childList: true,
    });
    try {
      if (boardEl) {
        applyPlugin(boardEl, settings);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    setTimeout(() => {
      pluginLoader(applyPlugin, settings);
    }, 1000);
  }
}

export default pluginLoader;
