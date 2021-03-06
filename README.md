<img src="src/assets/img/icon-128.png" width="64"/>

## Download extension

[Chrome Web Store](https://chrome.google.com/webstore/detail/mcchesscom-move-confirmat/hfckonpdalooejghjpbpimhcgighijck)

# mcChessCom - move confirmation for chess.com
Brings move confirmation in Live chess.  
Works only with new "Play" interface!

Inspired by pain from the topic https://www.chess.com/forum/view/livechess/move-confirmation

<img width="1121" alt="Fullscreen_19_02_2022__03_35-3" src="https://user-images.githubusercontent.com/555405/154803676-985f890d-fc36-42bb-8820-64bcad4c588d.png">

Native integration, using internal API.  
Fast toggle button on the right side panel(see screenshot).  

Settings:  
Confirm starting from N step.  
Stop confirm before N seconds.  
Alarm if not confirm after N seconds. 

Additionally:  
Confirm hotkeys - Y, Space, Enter.  
Cancel confirm - N, Esc, Backspace, Delete. 

## Installing and Running
[Download](https://github.com/VladimirPal/mcChessCom/releases) latest release and load extension to the browser.  

### Or Build from source:

1. Check if your [Node.js](https://nodejs.org/) version is >= **14**.
2. Clone this repository.
3. Run `npm install` to install the dependencies.
4. Run `npm start`
5. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.

## Packing

```
$ NODE_ENV=production npm run build
```
