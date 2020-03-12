# latex2svg

simple node.js api to convert LaTeX to svg

[![Netlify Status](https://api.netlify.com/api/v1/badges/28ed90bb-aaf5-4bdb-9025-61a8f31a9549/deploy-status)](https://app.netlify.com/sites/rintaroutw-latex2svg/deploys)

[Demo Site](https://rintaroutw-latex2svg.netlify.com/)  


| API | https://rintaroutw-latex2svg.netlify.com/.netlify/functions/latex2svg |
|----|----|
| METHOD | POST |
| BODY | { "latex" : "\$$ <latex_math> $$" }  |

``` example  
requests.post('https://rintaroutw-latex2svg.netlify.com/.netlify/functions/latex2svg',
    json = {"latex": "$$\\frac{1}{6}$$"})
```
