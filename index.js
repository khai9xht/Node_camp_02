const  http = require('http');
const url= require('url');
const host= process.env.HOST;
const port= process.env.PORT;

function get () {
    return 'world';
}
function post() {
    return 'world created'
}
function put() {
    return 'world updated'
}
function remove() {
    return 'world deleted';
}
function other() {
    return 'Invalid method';

}

var config = [ {
    path: '/hello',
    data:
        {
            'GET': get(),
            'POST': post(),
            'PUT': put(),
            'DELETE': remove()
        }
}]

var server=  http.createServer(function (req, res)  {

    const location = url.parse(req.url);
    const pathconfig = config.find(function (element) {
        return (element.path === location.pathname);
    })
     const message = pathconfig ?  (pathconfig.data[req.method] || other() ) : 'Invalid';
        res.write(message);
        res.end();
})
server.listen(port,host, function (err) {
    if(!err) {console.log('Server is running......')}
});