## Tic Tac Toe Game with AI
## Createing the UI(User Interface) using HTML, CSS, and JavaScript

## HTML Implementation

1) For the HTML implementation,I created the ode by using an emmet abbrevation in the vscode text editor simply by pressing `!` then `enter` key on the keybaord.

2) Then i add the following the HTML code to support fullscreen in the future using element.requestFullScreen and created a `<canvas>` element.Below is the code:
[index.html][./index.html]
```html
  <div class="container">
        <canvas id="tic-tac-toe"></canvas>
    </div>
```
Here is the matching css code for the layout of 
the HTML5 Page. 
[./src/ui.css](./src/ui.css)
```css
.container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.container canvas {
    outline: 5px solid blue;
} 
```

I am using the canvas element as it a game.I walk you step by step on how to create the game which is a webstandard for graphics.These means I would  have to use the canvas ctx api(Application Programming Interface) javascirpt instead of the CSS to create the game layout.


To see the complete implement see [USER_INTERFACE Python Notebook](./docs/USER_INTERFACE.ipynb) 
and [README2.md](README2.md) which explains the algorithm.


