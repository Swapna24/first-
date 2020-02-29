const http = require('http');
const fs = require('fs');
const jsFile = require('jsonfile')

var express = require('express');
var app = express();


var jsonfile = require('jsonfile');    
var file = '/store.json';

var url = 'https://play.google.com/store/apps/details?id=bbc.iplayer.android'
var url1 = 'https://play.google.com/store/apps/details?id=uk.co.bbc.iplayer.kids'
var url2 = 'https://apps.apple.com/gb/app/bbc-iplayer/id416580485'
var url3 = 'https://apps.apple.com/gb/app/iplayer-kids/id1088767558'
var url4 = 'https://www.amazon.co.uk/BBC-MEDIA-APPLICATIONS-TECHNOLOGIES-LIMITED/dp/B009SPY7PW/ref=sr_1_3?keywords=bbc+iplayer&qid=1568900229&s=mobile-apps&sr=1-3'
var url5 = 'https://www.amazon.co.uk/BBC-MEDIA-APPLICATIONS-TECHNOLOGIES-LIMITED/dp/B01CY9PEJQ/ref=sr_1_1?keywords=bbc+iplayer+kids&qid=1568901555&s=mobile-apps&sr=1-1'
 



const getScript = (url) => {
  let data = '';
  return new Promise((resolve, reject) => {
      const http = require('http'),
          https = require('https');
      let client = http;
      if (url.toString().indexOf("https") === 0) {
          client = https;
      }
      client.get(url, {headers: {'Cache-Control': 'no-cache', 'User-Agent': 'nodeapp'}}, (resp) => {
          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
              data += chunk;
          });
          // The whole response has been received. Print out the result.
          resp.on('end', () => {
              resolve(data);
          });
      }).on("error", (err) => {
          reject(err);
      });
  });
};

http.createServer(function (req, res) {
 var body = '';
 if(req.url === "/TrainBoard.html" || req.url === "/"){
  fs.readFile('TrainBoard.html', function(err, data) {
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write(data);
     res.end();
   });
 } else if(req.url === "/main.css"){
   fs.readFile('main.css', function(err, data) {
     res.writeHead(200, {'Content-Type': 'text/css'});
     res.write(data);
     res.end();
   });
 }
 if (req.url == "/iPlayer.jpg") {

    var img = fs.readFileSync('./iPlayer.jpg');
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');

    return;

 }

 //Android Main
 if (req.url == "/releaseversion") {
  getScript(url).then(function(data) {
      let returnedData = data.match("Current Version</div><span class=\"htlgb\"><div class=\"IQ1z0d\"><span class=\"htlgb\">(.*)</span>")
      returnedData = returnedData[returnedData.length - 1]
      versionNumber = returnedData.substring(0, (JSON.stringify(returnedData)).indexOf('</span') - 1)
      console.log(versionNumber);
      res.writeHead(200, {'Content-Type': 'text/html' });
      res.end(versionNumber, 'binary');    
      return;
  })
}

// Android Kids
if (req.url == "/releaseversion1") {
  getScript(url1).then(function(data) {
      let returnedData1 = data.match("Current Version</div><span class=\"htlgb\"><div class=\"IQ1z0d\"><span class=\"htlgb\">(.*)</span>")
      returnedData1 = returnedData1[returnedData1.length - 1]
      versionNumber1 = returnedData1.substring(0, (JSON.stringify(returnedData1)).indexOf('</span') - 1)
      console.log(versionNumber1);
      res.writeHead(200, {'Content-Type': 'text/html' });
      res.end(versionNumber1, 'binary');    
      return;
  })
}

//iOS Main
if (req.url == "/releaseversion2") {
  getScript(url2).then(function(data) {
    let returnedData2 = data.match("<p class=\"l-column small-6 medium-12 whats-new__latest__version\">(.*)</p>")
     returnedData2 = returnedData2[returnedData2.length - 1]
     console.log(returnedData2)
      //versionNumber2 = returnedData2.substring(0, (JSON.stringify(returnedData2)).indexOf('</p') - 1)
     // console.log(versionNumber2)
      res.writeHead(200, {'Content-Type': 'text/html' }, {'Cache-Control': 'no-store, no-cache, must-revalidate, private'});
      res.end(returnedData2, 'binary');   
      //console.log(returnedData2) 
      return;
  })
}

//iOS Kids
if (req.url == "/releaseversion3") {
  getScript(url3).then(function(data) {
    let returnedData3 = data.match("<p class=\"l-column small-6 medium-12 whats-new__latest__version\">(.*)</p>")
    //console.log(returnedData)
     returnedData3 = returnedData3[returnedData3.length - 1]
     console.log(returnedData3)
      //versionNumber3 = returnedData3.substring(0, (JSON.stringify(returnedData3)).indexOf('</p') - 1)
      //console.log(versionNumber3)
      res.writeHead(200, {'Content-Type': 'text/html' });
      res.end(returnedData3, 'binary');    
      return;
  })
}

//Amazon Main
if (req.url == "/releaseversion4") {
  getScript(url4).then(function(data) {
    let returnedData4 = data.match("<div class=\"a-section a-spacing-none\"><strong>Version:</strong>(.*)</div>")
    //console.log(returnedData)
     returnedData4 = returnedData4[returnedData4.length - 1]
     console.log(returnedData4)
      res.writeHead(200, {'Content-Type': 'text/html' });
      res.end(returnedData4, 'binary'); 
      //console.log(returnedData4)   
      return;
  })
}

//Amazon Kids
if (req.url == "/releaseversion5") {
  getScript(url5).then(function(data) {

    let returnedData5 = data.match("<div class=\"a-section a-spacing-none\"><strong>Version:</strong>(.*)</div>")
    //console.log(returnedData)
     returnedData5 = returnedData5[returnedData5.length - 1]
     console.log(returnedData5)
      res.writeHead(200, {'Content-Type': 'text/html' });
      res.end(returnedData5, 'binary'); 
      //console.log(returnedData5)   
      return;
  })
}

if (req.url == "/writedata" && req.method == 'POST') {
  req.on('data', (data, err) => {
    if (err) res.status(404).send({error: "invalid json"});
    req.body = JSON.parse(data);
    console.log(req.body);
    var file_name = req.body.Train_Name + ".json"
     const testFolder = './allfiles'
    const file = 'Pass.json'
    var f =  jsFile.readFileSync(file)
    original_pass = f.Password
    var password = req.body.Password
    if ( original_pass == password){
        fs.writeFile(testFolder+'/'+file_name, data, (err) => {
          if (err) throw err;
          console.log('json is saved');
          console.log(file_name);
        } );
        //res.write("OK");
        res.writeHead(200, {'Content-Type': 'application/json'});
        
    }
     else{
        res.writeHead(403, {'Content-Type': 'application/json'});
        
    }
  
    res.end();
  });
}

if (req.url == "/writedata-2" && req.method == 'POST') {
  req.on('data', (data, err) => {
    body += data;
    if (err) res.status(404).send({error: "invalid json"});
    jsonBody = JSON.parse(body);
    //console.log(jsonBody);
    var file_name = jsonBody.Train_Name + ".json"
    const testFolder = './allfiles'
    const file = 'Pass.json'
    var f =  jsFile.readFileSync(file)
    original_pass = f.Password
    var password = jsonBody.Password
    if ( original_pass == password){
        fs.writeFile(testFolder+'/'+file_name, data, (err) => {
          if (err) throw err;
          console.log('json is saved');
          //console.log(file_name);
        } );
        //res.write("OK");
        res.writeHead(200, {'Content-Type': 'application/json'});
    }
    else{
        res.writeHead(403, {'Content-Type': 'application/json'});
        
    }
    res.end();
  });
}

if (req.url == "/readdatafrotrain" && req.method == 'POST') {
  req.on('data', (data, err) => {
    if (err) res.status(404).send({error: "invalid json"})
    req.body = JSON.parse(data);
    console.log(req.body.Train_Name);
    //if (req.body.Train_Name)
    var file_name = req.body.Train_Name + ".json"
    const testFolder = './allfiles'
////
   
  ////
    console.log(file_name);

      var fileContents;
        try {
          fileContents = fs.readFileSync(testFolder+'/'+file_name);
          var abc = JSON.parse(fileContents);
        } catch (err) {

          if (err.code === 'ENOENT') {
            console.log('File not found!');
            res.writeHead(403, {'Content-Type': 'application/json' });
            res.end();
          } else {
            throw err;
            //res.writeHead(403, {'Content-Type': 'application/json' });
          }    
  }
  if (fs.existsSync(testFolder+'/'+file_name)) {
  // var  a = fs.readFileSync(file_name);
    console.log('Found file');
    res.writeHead(200, {'Content-Type': 'application/json' });
    res.write(JSON.stringify(abc, null, 2))
    res.end();
}  
  });
}

  if (req.url == "/readdata" && req.method == 'GET') {
    
   const testFolder = './allfiles'
   fs.readdir(testFolder, function(err, files) {
     numericFileNames = []
     for (file of files) {
       numericFileName = file.split(".")[0]
       numericFileNames.push(numericFileName)
     }
    
    numericFileNames = numericFileNames.filter(Boolean)
    var latest = numericFileNames.sort(function(a, b){return b - a})[0]
    var f = jsFile.readFileSync(testFolder +'/'+ latest + ".json", 'utf8')
    res.writeHead(200, {'Content-Type': 'application/json' });
    res.write(JSON.stringify(f, null, 2));
    res.end();
     
  });
  }

}).listen(8000);
