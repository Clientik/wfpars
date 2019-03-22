var ProxyLists = require('proxy-lists');
 
var options = {
    countries: ['us', 'ca']
};
 
// `gettingProxies` is an event emitter object. 
var gettingProxies = ProxyLists.getProxies(options);
 
gettingProxies.on('data', function(proxies) {
    // Received some proxies. 
     console.log(proxies[0].port);
});
 
gettingProxies.on('error', function(error) {
    // Some error has occurred. 
    console.error(error);
});
 
gettingProxies.once('end', function() {
    // Done getting proxies. 
});