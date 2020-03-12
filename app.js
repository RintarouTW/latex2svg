const latex2svg = require("./latex2svg.js");

var fs = require('fs');
var app = require('http').createServer(handler)
app.listen(80);

const resources = [ 
"/index.css",
"/index.js",
"/favicon.ico"
];

function handler (req, res) {

    console.log(req.url);
    
    if (resources.indexOf(req.url) >= 0) {
        
        var stream = fs.createReadStream(__dirname + "/public" + req.url);

        stream.on('error', function(error) {
            res.writeHead(404, 'Not Found');
            res.end();
        });

        stream.pipe(res);

    } else {

        if (req.url == "/.netlify/functions/latex2svg") {

            data = []
            req.on('data', chunk =>{
                console.log(`data = ${chunk}`);
                data.push(chunk);

            }).on('end', () => {

                // hard coding test
                if (data.length == 0)
                    data = '{ "latex" : "\$\$ \\\\frac{1}{2}\$\$"}';

                json = JSON.parse(data);
                console.log(`json =`, json.latex);                
                obj = latex2svg(json.latex);
                console.log(`obj = `, obj);
                res.writeHead(200);
                res.end(JSON.stringify(obj));
            });


        } else {
            console.log("index.html");
            fs.readFile(__dirname + '/public/index.html', function (err, data) {

                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading index.html');
                }

                res.writeHead(200);
                res.end(data);
            });
        }
    }
}


// Automation Testing
console.log("=== Automation Testing ===");

const axios = require('axios');

axios.post('/.netlify/functions/latex2svg', {
  "latex": '\$\$\\frac{1}{2}\$\$'
}).then(res => {
    console.log(`Response.data : `, res.data);
});
