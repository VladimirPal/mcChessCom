import React from 'react';
import { render as reactRender, unmountComponentAtNode } from 'react-dom';
import ConfirmMove from './components/ConfirmMove';
import ToggleButton from './components/ToggleButton';

function insertElAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function f(arg) {
  return (props) => {
    try {
      return arg.try(props);
    } catch (err) {
      return arg.catch(props, err);
    }
  };
}

function getCastle({ from, to, piece }) {
  const castleMap = {
    e1_g1: ['f1', 'h1'],
    e8_g8: ['f8', 'h8'],
    e1_c1: ['d1', 'a1'],
    e8_c8: ['d8', 'a8'],
  };
  return piece === 'k' && castleMap[`${from}_${to}`];
}

function mcPlugin(boardEl, settings) {
  const { game } = boardEl;
  if (!game) {
    return null;
  }
  const { id: gameId } = game.getOptions();

  if (game.plugins.has('mcPlugin')) {
    game.plugins.remove('mcPlugin');
  }
  const isAllowedGame =
    gameId.includes('liveGame') ||
    ['vs-personalities', 'single', 'play-computer'].includes(gameId);
  const manageIconContainerId = 'confirm-move-manage-icon-container';
  const oldManageIconEl = document.getElementById(manageIconContainerId);
  if (oldManageIconEl) {
    oldManageIconEl.parentNode.removeChild(oldManageIconEl);
  }

  if (!settings.isEnabled || !isAllowedGame) {
    return null;
  }
  let isConfirmEnabled = true;
  // Manage button
  try {
    const manageIconContainerEl = document.createElement('div');
    manageIconContainerEl.setAttribute('id', manageIconContainerId);
    const controlsEl = document.getElementById('board-layout-controls');
    if (controlsEl) {
      controlsEl.appendChild(manageIconContainerEl);
      reactRender(
        <ToggleButton
          isSpan={gameId === 'vs-personalities'}
          icon="share"
          isInitialEnabled={isConfirmEnabled}
          onClick={(isEnabled) => {
            isConfirmEnabled = isEnabled;
          }}
        />,
        manageIconContainerEl
      );
    }
  } catch (err) {
    console.log(err);
  }

  game.plugins.add({
    name: 'mcPlugin',
    apiOverrides: {
      move: (gameContext) => {
        const { api: boardApi } = gameContext;
        const { move } = boardApi;
        let moveBeginTimestamp = +new Date();

        return (moveAction) => {
          try {
            const piecesBefore = {
              ...boardApi.getPieces(),
            };
            const pieces = boardApi.getPieces();

            const now = +new Date();
            const totalSteps = game.getCurrentFullLine().length;
            const moveNumber = Math.round(totalSteps / 2);
            const prevTimeSeconds = game.times.get(totalSteps - 2) / 10;
            const currentMoveSeconds = (now - moveBeginTimestamp) / 1000;
            const secondsLeft = prevTimeSeconds - currentMoveSeconds;
            const isMoveNumberAllow =
              moveNumber + 1 >= parseInt(settings.runFromMoveNumber, 10);
            const isSecondsAllow =
              isNaN(secondsLeft) ||
              secondsLeft > parseInt(settings.stopOnSecond, 10);

            if (
              moveAction.userGenerated &&
              isConfirmEnabled &&
              isMoveNumberAllow &&
              isSecondsAllow
            ) {
              pieces.deleteItem(moveAction.from);
              pieces.set(moveAction.to, {
                color: moveAction.color,
                promoted: typeof moveAction.promotion === 'string',
                square: moveAction.to,
                type: moveAction.promotion || moveAction.piece,
              });

              const castle = getCastle(moveAction);
              if (castle) {
                const [rookSquare, kinqSquare] = castle;
                pieces.deleteItem(kinqSquare);
                pieces.set(rookSquare, {
                  color: moveAction.color,
                  promoted: false,
                  square: rookSquare,
                  type: 'r',
                });
              }

              gameContext.respond('SetBoardPosition', {
                pieces,
              });

              const containerId = 'confirm-move-plugin-container';
              const oldEl = document.getElementById(containerId);
              if (oldEl) {
                // Happen only if premove made
                oldEl.parentNode.removeChild(oldEl);
              }
              const confirmContainerEl = document.createElement('div');
              confirmContainerEl.setAttribute('id', containerId);

              const targetEl = f({
                try: () => {
                  const el = document
                    .getElementById('board-layout-player-bottom')
                    .getElementsByClassName('player-tagline')[0];
                  if (el) {
                    return el;
                  }
                  throw new Error('No target el');
                },
                catch: () =>
                  document
                    .getElementsByClassName('player-component')[1]
                    .getElementsByClassName('player-row-container')[0],
              })();
              insertElAfter(targetEl, confirmContainerEl);

              reactRender(
                <ConfirmMove
                  alarmSeconds={parseInt(settings.alarmAfterSeconds, 10)}
                  onConfirm={() => {
                    unmountComponentAtNode(confirmContainerEl);
                    gameContext.respond('SetBoardPosition', {
                      pieces: piecesBefore,
                    });
                    move(moveAction);
                  }}
                  onCancel={() => {
                    unmountComponentAtNode(confirmContainerEl);
                    gameContext.respond('SetBoardPosition', {
                      pieces: piecesBefore,
                    });
                  }}
                />,
                confirmContainerEl
              );
            } else {
              if (!moveAction.userGenerated) {
                moveBeginTimestamp = +new Date();
              }
              move(moveAction);
            }
          } catch (err) {
            console.error(err);
            move(moveAction);
          }
        };
      },
    },
  });
  return null;
}

export default mcPlugin;
