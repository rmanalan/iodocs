// XML to JSON Object jQuery plugin
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';5(10.M)(w($){$.N({11:w(j,k){5(!j)t{};w B(d,e){5(!d)t y;6 f=\'\',2=y,E=y;6 g=d.x,12=l(d.O||d.P);6 h=d.v||d.F||\'\';5(d.G){5(d.G.7>0){$.Q(d.G,w(n,a){6 b=a.x,u=l(a.O||a.P);6 c=a.v||a.F||\'\';5(b==8){t}z 5(b==3||b==4||!u){5(c.13(/^\\s+$/)){t};f+=c.H(/^\\s+/,\'\').H(/\\s+$/,\'\')}z{2=2||{};5(2[u]){5(!2[u].7)2[u]=p(2[u]);2[u][2[u].7]=B(a,R);2[u].7=2[u].7}z{2[u]=B(a)}}})}};5(d.I){5(d.I.7>0){E={};2=2||{};$.Q(d.I,w(a,b){6 c=l(b.14),C=b.15;E[c]=C;5(2[c]){5(!2[c].7)2[c]=p(2[c]);2[c][2[c].7]=C;2[c].7=2[c].7}z{2[c]=C}})}};5(2){2=$.N((f!=\'\'?A J(f):{}),2||{});f=(2.v)?(D(2.v)==\'16\'?2.v:[2.v||\'\']).17([f]):f;5(f)2.v=f;f=\'\'};6 i=2||f;5(k){5(f)i={};f=i.v||f||\'\';5(f)i.v=f;5(!e)i=p(i)};t i};6 l=w(s){t J(s||\'\').H(/-/g,"18")};6 m=w(s){t(D s=="19")||J((s&&D s=="K")?s:\'\').1a(/^((-)?([0-9]*)((\\.{0,1})([0-9]+))?$)/)};6 p=w(o){5(!o.7)o=[o];o.7=o.7;t o};5(D j==\'K\')j=$.S(j);5(!j.x)t;5(j.x==3||j.x==4)t j.F;6 q=(j.x==9)?j.1b:j;6 r=B(q,R);j=y;q=y;t r},S:w(a){6 b;T{6 c=($.U.V)?A 1c("1d.1e"):A 1f();c.1g=W}X(e){Y A L("Z 1h 1i 1j 1k 1l")};T{5($.U.V)b=(c.1m(a))?c:W;z b=c.1n(a,"v/1o")}X(e){Y A L("L 1p Z K")};t b}})})(M);',62,88,'||obj|||if|var|length||||||||||||||||||||||return|cnn|text|function|nodeType|null|else|new|parseXML|atv|typeof|att|nodeValue|childNodes|replace|attributes|String|string|Error|jQuery|extend|localName|nodeName|each|true|text2xml|try|browser|msie|false|catch|throw|XML|window|xml2json|nn|match|name|value|object|concat|_|number|test|documentElement|ActiveXObject|Microsoft|XMLDOM|DOMParser|async|Parser|could|not|be|instantiated|loadXML|parseFromString|xml|parsing'.split('|'),0,{}))

clear();
var out = {endpoints:[]}, dump={};

function processMethods(obj,resource,URI){
  obj.methods = {};
  URI = URI ? URI : '';
  if(resource.method) {
    if(!resource.method.length) resource.method = [resource.method];
    var params = [];
    var m = $.map(resource.method,function(method){
console.log(1,method)
      if (method.request && method.request.param && (method.request.param.length > 0 || method.request.param.name)) {
        if(!method.request.param.length) method.request.param = [method.request.param];
console.log(2,method.request.param);
        params = $.map(method.request.param, function(param){
console.log(3,param);
          return {
            Name: param.name,
            Required: "N",
            Default: "",
            Type: "string",
            Description: param.doc ? param.doc : ''
          }
        });
      }
      if(/^\//.test(resource.path)) resource.path = resource.path.substr(1,9999);
      resource.path = resource.path.replace(/{/g,':').replace(/}/g,'');
      URI = [URI+resource.path,method.path].join('/');
      return {
        MethodName: method.id,
        Synopsis: method.doc ? method.doc : '',
        HTTPMethod: method.name.toLowerCase(),
        URI: URI,
        RequiresOAuth: "N",
        parameters: params
      };
    });
    obj.methods = m;
  }
  if (resource.resource && resource.resource.method){
    $.each(processMethods({},resource.resource,URI).methods,function(){obj.methods.push(this)});
  }
  return obj;
}

$.get('http://docs.atlassian.com/jira/REST/5.0-resthack/jira-rest-plugin.wadl',function(d){
  var o = $.xml2json(d);
  dump = o;
  console.log('resources',o.resources.resource[21]);
  $.each([o.resources.resource[21]],function(){
    var resource = this;
    var rout = {
      name: ["<strong>",this.path,"</strong>",this.doc].join(' ')
    };
    var res = processMethods(rout,resource);
    out.endpoints.push(res);
  });
  dir(out);
});

