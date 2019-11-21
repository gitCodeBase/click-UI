const express = require('express'),
  path = require('path'),
  fs = require('fs');
const bodyParser = require('body-parser')
const api = require('./node-server/api')

const app = express()
app.use(bodyParser.json());
app.set('port',process.env.PORT||8081);

app.use(express.static(path.join(__dirname, 'dist/')));
app.use('/api', api)
app.use(function(req,res,next){

var accept = req.accepts('html', 'json','xml');
if(accept!=='html'){
  return next;
}
var ext = path.extname(req.path);
if(ext!==''){
  return next;
}
/*res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept');
next();*/
res.sendFile(__dirname +'/dist/click/index.html');


});
app.listen(app.get('port'), () => {
  console.log('Server started..',app.get('port'))
}) 