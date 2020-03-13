# latex2svg

simple node.js api to convert LaTeX to svg

<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/latex.svg"></img> to <img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/svg.svg"></img>

[Demo Site](https://rintaroutw-latex2svg.netlify.com/)

<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg"></img>(https://github.com/RintarouTW/latex2svg)

[![Netlify Status](https://api.netlify.com/api/v1/badges/28ed90bb-aaf5-4bdb-9025-61a8f31a9549/deploy-status)](https://app.netlify.com/sites/rintaroutw-latex2svg/deploys)

| API | /.netlify/functions/latex2svg |
|-----|----|
| METHOD | POST |
| BODY | { "latex" : "\$ <LATEX_MATH> $" } |

Example:

```python!
requests.post('https://rintaroutw-latex2svg.netlify.com/.netlify/functions/latex2svg',
    json = {"latex": "$$\\frac{1}{6}$$"})

{
  "svg": "<div><span  class=\"math-block \" >\n<latex style=\"display: none\">\\frac{1}{6}</latex><mjx-container class=\"MathJax\" jax=\"SVG\" display=\"true\"><svg style=\"vertical-align: -1.602ex\" xmlns=\"http://www.w3.org/2000/svg\" width=\"2.127ex\" height=\"4.638ex\" role=\"img\" focusable=\"false\" viewBox=\"0 -1342 940 2050\"><g stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" transform=\"matrix(1 0 0 -1 0 0)\"><g data-mml-node=\"math\"><g data-mml-node=\"mfrac\"><g data-mml-node=\"mn\" transform=\"translate(220, 676)\"><path data-c=\"31\" d=\"M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z\"></path></g><g data-mml-node=\"mn\" transform=\"translate(220, -686)\"><path data-c=\"36\" d=\"M42 313Q42 476 123 571T303 666Q372 666 402 630T432 550Q432 525 418 510T379 495Q356 495 341 509T326 548Q326 592 373 601Q351 623 311 626Q240 626 194 566Q147 500 147 364L148 360Q153 366 156 373Q197 433 263 433H267Q313 433 348 414Q372 400 396 374T435 317Q456 268 456 210V192Q456 169 451 149Q440 90 387 34T253 -22Q225 -22 199 -14T143 16T92 75T56 172T42 313ZM257 397Q227 397 205 380T171 335T154 278T148 216Q148 133 160 97T198 39Q222 21 251 21Q302 21 329 59Q342 77 347 104T352 209Q352 289 347 316T329 361Q302 397 257 397Z\"></path></g><rect width=\"700\" height=\"60\" x=\"120\" y=\"220\"></rect></g></g></g></svg></mjx-container></span></div>\n"
}
```

## Protocol

Request : { latex: \$<LATEX_MATH>$ }  
Response: { svg: \$SVG_TAG$ }

## npm
<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/npm.svg"></img> node package manager

> npm (un)install module

package.json required pacakges list

pacakge-lock.json snapshot of all required packages info.

## Useful pacakges

## express

request router

> express.use(path, module_handler);
> express.get(path, request_handler);

### nodemon

<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nodemon.svg"></img> node monitor, restart service automatically after source was modified.

```shell!
nodemon app.js
```

## Testing

### Auto Test via axios inside Node.js itself.

    npm install axios
Promise based HTTP client for the browser and node.js

```javascript=
// Automation Testing
console.log("=== Automation Testing ===");

const axios = require('axios');

axios.post('http://localhost/latex2svg', {
  latex: '$$\frac{1}{2}$$'
}).then(res => {
    console.log(`Response.data : `, res.data);
});
```

### Requester (Sublime Text Package)

HTTP Requester, even support GraphQL for automation tests.
Text based, fast and portable.
https://requester.org/#documentation

### Browser Web Fetch

[Using Fetch](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)

*index.html*

```javascript=
<html>
<script>
function latex2svg(latex) {

  fetch('/.netlify/functions/latex2svg', {
      method: 'POST',
      body: JSON.stringify(latex),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      mode: 'cors' // no-cors, cors, *same-origin
    }).then(response => {
      return response.json();
    }).then(json => {
      container = document.getElementById('svg_container');
      container.innerHTML = json.svg;
    }).catch( error => {
      console.log("Something Wrong");
   });;
}

latex2svg({ "latex" : '\$\$\\LaTeX \\frac{1}{3}\$\$'});
</script>
<body>
    <div id="container">
    </div>
</body>
</html>
```

:::warning
mode: no-cors
:::
no-cors is required to cross origin access when tring to load my service directly in your own html.

## Netlify Deployment

<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/netlify.svg"></img> Free serverless web service

### GitHub (Push = Auto Deploy)

git push and deploy, np at all.

### netlify-lambda functions

each function is a module.

Build command is required for lambda functions.
```
npm run netlify-lambda build functions
```

#### functions/lambda.js

source of lambda function, not compiled.

``` javascript
exports.handler = function(event, context, callback) {
   // event.body
   // context for dev/prod environment info
   callback(null, {
     statusCode: 200,
     body: {svg: "<svg></svg>"}
   });
}
```

### netlify.toml

```
[build]
    function = "lambda" // the compiled path of lambda functions
```


## Tests

<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/dev-dot-to.svg"></img>

```
nodemon app.js 
  or 
npm run start
```

<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/node-dot-js.svg"></img>

**axios** to send the test requests after launch automatically. It's possible to write the automation tests with assert too.


<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/sublimetext.svg"></img> Sublime Text with Requester(pacakge)

tests.pyr (ctrl+r to send requests/ cmd+r to resend)
```python!
## localhost node app.js test
requests.post('http://localhost/.netlify/functions/latex2svg',
    json = {"latex": "$$\frac{}$$"})

## localhost netlify-lambda serve functions test.
requests.post('http://localhost:9000/.netlify/functions/latex2svg',
    json = {"latex": "$$\\frac{1}{6}$$"})

## netlify-lambda function server test
requests.post('https://rintaroutw-latex2svg.netlify.com/.netlify/functions/latex2svg',
    json = {"latex": "$$\\frac{1}{6}$$"})
```

###### tags: `node.js` `netlify` `latex2svg`
