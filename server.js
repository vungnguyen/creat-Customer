const http = require('http');
const fs = require('fs');
const qs = require('qs');
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./templates/index.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    }else{
        let data = '';
        req.on('data', (chunk) => data += chunk)
        req.on('end', () =>{
            let name = qs.parse(data).name;
            fs.writeFile('./data/data.txt', name,err => {
                if(err){
                    console.log(err);
                }
                return res.end('creat successfully')
            })
        })
        req.on('error', () => {
            console.log('err');
        })
    }
})
server.listen(3000,() => {
    console.log('server is running at http://localhost:3000')
})