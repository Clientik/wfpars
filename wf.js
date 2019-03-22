//----------------------------Модули

var request = require('request');
var cheerio = require('cheerio'); 
var colors = require('colors/safe');
var brain = require('brain.js');
var fs = require("fs")
var HttpsProxyAgent = require('https-proxy-agent');
const log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'info' } }
});

const logger = log4js.getLogger('cheese');
//---------------------------------------------
var timerId = setInterval(function() {
   var clear = require('clear');
    clear();
    var readableStream = fs.createReadStream("cheese.log", "utf8");
 
readableStream.on("data", function(chunk){ 
    console.log(chunk);

});
}, 500);
//------------------------------
//var winston = require('winston');
//var logger = new (winston.Logger)({
 // transports: [
 // new (winston.transports.Console)(),
  //  new (winston.transports.File)({
   ///   name: 'debug-file',
     // filename: 'debug.log',
 //     level: 'debug'
 //   }),
  //  new (winston.transports.File)({
   //   name: 'error-file',
     // filename: 'filelog-error.log',
     // level: 'error'
   // })
  //]
//});
//---------------
data = generateSeed(['latin','digits'], 7, true); //Генератор кодов
s = 1000;//Задержка
l = ['95.161.228.186:8080','185.77.149.194:3128']
kl = -1;
//-----------------------настройка прокси
var proxy = 'https://'+l[0];  
var agent = new HttpsProxyAgent(proxy);  
var api = '127.0.0.1';
//--------------------------------ВИД ЗАПРОСА
var options = {
  url: 'https://wf.mail.ru/dynamic/pin/?a=activate',
  form:   {   
  	pin: 'Warfest70CDT16'
  },
  ///secureProtocol: 'SSLv3_method',
  //agent : agent,
  timeout: 15000,
  proxy:'http://192.168.0.1',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:55.0) Gecko/20100101 Firefox/55.0',
'Accept': 'application/json, text/javascript, */*; q=0.01',
'Proxy-Connections': 'keep-alive',
'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
'Referer': 'https://wf.mail.ru/pin/activate',
'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
'X-Requested-With': 'XMLHttpRequest',
'Cookie': 'n_js_t=1505656623; n_js_d=489609639; p=GjMBAJ3fOAAA; has_js=1; __atuvc=2%7C38; __atuvs=59be7f30ee90df94001; mrreferer=https://auth.mail.ru/cgi-bin/secstep; mrcurrentpath=/pin/activate; PHPSESSID=o8fhpr5d8iefbmgr2r3tr7otp0; mrssts=94dbf080b7377258ef99e4b48f52362a%3A1505656652; _ga=GA1.2.490863680.1505656626; _gid=GA1.2.1775059761.1505656626; _gat=1; mc2=wf.mail.ru; _ym_uid=1505656627231766897; _ym_isad=2; VID=3dBarL2kO1Hc0000070E14nc:::; tmr_detect=1%7C1505656654227; mrcu=6B6059BE7F35487E998329CE1205; _ym_visorc_27036375=w; mr1lad=59be7f3617543de6-0-100-; t_0=1; Mpop=1505656563:437977575952090e190502190805001b0b0d1d0105084b6a515f475a000b1e0a76001e5a5551545e455e5e445d5e4316505f5259401c404d:clientikshow@inbox.ru:; t=obLD1AAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAACAABAKzgcA; t_100=1; __utma=224113629.490863680.1505656626.1505656657.1505656657.1; __utmb=224113629.1.10.1505656657; __utmc=224113629; __utmz=224113629.1505656657.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmt=1',
'Host': 'wf.mail.ru',
  },
};
//-------------

function callback(error, response, body) {
	 //logger.info(response);
  setTimeout(() => {
         
 if (!error && response.statusCode == 200) {
  $ = '';
  clear = '';
    $ = cheerio.load(body);
    //logger.info(body.length);
    //logger.info($('.red_label').text().length);
    if(body.length === 55 ){
         logger.info('Необходимы прокси'+options.proxy);
              kl++;
				//logger.info(kl);
        request.get(get, back);
      			options.proxy = 'http://'+api;
            logger.info('Cмена прокси на:'+options.proxy); 
             request.post(options, callback);
            
    	}else{
    if($('.red_label').text().length === 0){      
         //logger.info($('div.pin_presents>div>div>div>p').text());
         clear = $('div.pin_presents>div>div>div>p').text().split('код".');       
        
        //logger.info(body); // John
        logger.info(colors.green.bold("["+options.form.pin+"]"+clear[1]));
        //Примеры
		options.form.pin = 'Warfest'+(generateSeed(['latin','digits'], 7, true)); //НбIZ
		s = 0 ;
		request.post(options, callback);
    }else{
    logger.info(colors.red.bold("["+options.form.pin+"]"+":"+$('.red_label').text()));	
    //logger.info($);
    options.form.pin = 'Warfest'+(generateSeed(['latin','digits'], 7, true)); //НбIZ
    s = 0 ;
	request.post(options, callback);
    }
  }
  }else {
  	logger.info(colors.yellow.bold('Непредвиденная ошибка.Прокси:'+options.proxy));
  	 			//logger.info(error); 
          s = 1000 ;
		kl++;
    request.get(get, back);
      options.proxy = 'http://'+api;
      logger.info('Cмена прокси на:'+options.proxy);
       request.post(options, callback);
  }}, s);
}

request.post(options, callback);

var get = {
  url: 'http://gimmeproxy.com/api/getProxy?minSpeed=50',
  headers: {
    'User-Agent': 'request'
  }
};

function back(error, response, body) {
  //logger.info(body);
  if (!error && response.statusCode == 200) {
   var info = JSON.parse(body);
    api = info.ip+':'+info.port;
    return(api);
  }
}
//var net = new brain.NeuralNetwork();
 //good = "good";
 //error = "error";
//net.train([{input: { pin: 12 }, output: { result:1 }},
  //         {input: { pin:  13 } , output: { result:2}},
    //       {input: { pin: 14 } , output: { result:3 }},
      //     {input:  { pin: 15}, output: { result:4 }}]);
 
//var output = net.run({ pin: 18 }); // [0.987]
//logger.info(output);
// @dict_type - Массив словарей (по умолчанию - латиница)
// Все элементы массива должны быть строкового типа
// В качестве элементов массива могут быть переданы следующие значения:
//    а) Ссылка на один [или несколько] из встроенных словарей
//       Доступны: 'latin', 'cyrillic', 'digits'
//    б) пользовательский словарь (набор [или наборы] любых символов)    
// @length - Длина генерируемой строки (по умолчанию 5 символов)    
// @sensetive - В обоих регистрах? (true | false, по умолчанию - false);
// Функция возвращает сгенерированную строку или false в случае неудачи

function generateSeed(dict_type, length, sensetive) {
    dict_type = typeof dict_type !== 'undefined' ? dict_type : ['latin'];
    length = typeof length !== 'undefined' ? length : 5;
    sensetive = typeof sensetive !== 'undefined' ? !! sensetive : false;
    if (checkArray(dict_type) && typeof length === 'number') {
        var text = "",
            dict = "",
            def = "",
            custom = "",
            possible = [];
        possible.latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        possible.cyrillic = "абвгдеёжзийклмнопрстуфхцчъыьэюя";
        possible.digits = "0123456789";
        for (j = 0; j < (dict_type.length); ++j) {
            def = possible[dict_type[j]];
            custom = dict_type[j];
            if (typeof def !== 'undefined') {
                dict += (sensetive) ? def + def.toUpperCase() : def;
            } else {
                dict += (sensetive) ? custom + custom.toUpperCase() : custom;
            }
        }
        for (i = 0; i < length; ++i) {
            text += dict.charAt(Math.floor(Math.random() * dict.length));
        }
        return (text === "") ? false : text;
    } else {
        return false;
    }
}

//Вспомогательная функция для проверки входного словаря
function checkArray(input) {
    if (input instanceof Array) {
        for (i = 0; i < input.length; ++i) {
            if (typeof input[i] !== 'string') {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}
//-------------Прокси
