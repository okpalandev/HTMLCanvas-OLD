# Refining the User Interface
Being a game the UI should be rich,so this in module we will focus on enrich the UI.
We will use ES6 Modules to organize our code and abstact the logic modules.We partly focus on using media queries to support mobile devices and use `CanvasRenderingContext2D`.

## Our directory structure
```bash
src/
├── index.js # the main entry for our program.
├── ui.css
└── utils
    ├── board.js # the board logic
    └── index.js
```

```js
export {createBoard, drawBoard, drawO, drawX} from './board.js'; 
```
In the `utils/index.js` directory, we have a factory module. We export an object without using a default export, which allows us to consume the modules and is good pratice as code is maintable for each directory we create.



```html
 <div class="container">
        <canvas id="tic-tac-toe"></canvas>
        <div class="context-menu">
            <div class="player-x">
                <p>Player 1</p>
            </div>
            <div class="player-o">
                <p>Player 2</p>
            </div>
        </div>
    </div>
```

In the context ui.css ,we have added responsive styles for both mobile:
The snippet is not the full code,which is desinged with responsive-web-design a mobile freindly  design princple.
```css

/* For tablet devices and screens with a maximum width of 480px */
@media (max-width: 480px) {
    .container canvas {
        width: 100vw;
        height: 50vh;
    }
    
    .context-menu {
        height: 50px;
        font-size: 14px;
    }

    .player-x::before,
    .player-o::before {
        font-size: 30px;
    }
}

```