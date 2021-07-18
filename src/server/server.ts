import express = require('express');
import apiRouter from './routes';

const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static('public'));
app.use(apiRouter);

app.use(express.json());
app.use(express.urlencoded());

app.post('/api/purchases', (req, res, next) => {
    
    let ts = Date.now();

    var data = JSON.stringify(req.body, null, 2);

    var file_name = 'purchase_'+ts+'.json'; 
    var jsonPath = path.join(__dirname, '..', 'src', 'server', 'data', file_name);
    fs.writeFile(jsonPath, data, finished);

    function finished(){ 
        //console.log('all set');
        res.send("success");
    }

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));