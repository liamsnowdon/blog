var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(l){var u=/\blang(?:uage)?-([\w-]+)\b/i,t=0,j={manual:l.Prism&&l.Prism.manual,disableWorkerMessageHandler:l.Prism&&l.Prism.disableWorkerMessageHandler,util:{encode:function(e){return e instanceof O?new O(e.type,j.util.encode(e.content),e.alias):Array.isArray(e)?e.map(j.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function n(e,a){var r,t,i=j.util.type(e);switch(a=a||{},i){case"Object":if(t=j.util.objId(e),a[t])return a[t];for(var s in r={},a[t]=r,e)e.hasOwnProperty(s)&&(r[s]=n(e[s],a));return r;case"Array":return t=j.util.objId(e),a[t]||(r=[],a[t]=r,e.forEach(function(e,t){r[t]=n(e,a)}),r);default:return e}}},languages:{extend:function(e,t){var n,a=j.util.clone(j.languages[e]);for(n in t)a[n]=t[n];return a},insertBefore:function(n,e,t,a){var r,i=(a=a||j.languages)[n],s={};for(r in i)if(i.hasOwnProperty(r)){if(r==e)for(var o in t)t.hasOwnProperty(o)&&(s[o]=t[o]);t.hasOwnProperty(r)||(s[r]=i[r])}var l=a[n];return a[n]=s,j.languages.DFS(j.languages,function(e,t){t===l&&e!=n&&(this[e]=s)}),s},DFS:function e(t,n,a,r){r=r||{};var i,s,o,l=j.util.objId;for(i in t)t.hasOwnProperty(i)&&(n.call(t,i,t[i],a||i),s=t[i],"Object"!==(o=j.util.type(s))||r[l(s)]?"Array"!==o||r[l(s)]||(r[l(s)]=!0,e(s,n,i,r)):(r[l(s)]=!0,e(s,n,null,r)))}},plugins:{},highlightAll:function(e,t){j.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var a={callback:n,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};j.hooks.run("before-highlightall",a);for(var r,i=e.querySelectorAll(a.selector),s=0;r=i[s++];)j.highlightElement(r,!0===t,a.callback)},highlightElement:function(e,t,n){for(var a,r="none",i=e;i&&!u.test(i.className);)i=i.parentNode;i&&(r=(i.className.match(u)||[,"none"])[1].toLowerCase(),a=j.languages[r]),e.className=e.className.replace(u,"").replace(/\s+/g," ")+" language-"+r,e.parentNode&&(i=e.parentNode,/pre/i.test(i.nodeName)&&(i.className=i.className.replace(u,"").replace(/\s+/g," ")+" language-"+r));function s(e){o.highlightedCode=e,j.hooks.run("before-insert",o),o.element.innerHTML=o.highlightedCode,j.hooks.run("after-highlight",o),j.hooks.run("complete",o),n&&n.call(o.element)}var o={element:e,language:r,grammar:a,code:e.textContent};j.hooks.run("before-sanity-check",o),o.code?(j.hooks.run("before-highlight",o),o.grammar?t&&l.Worker?((t=new Worker(j.filename)).onmessage=function(e){s(e.data)},t.postMessage(JSON.stringify({language:o.language,code:o.code,immediateClose:!0}))):s(j.highlight(o.code,o.grammar,o.language)):s(j.util.encode(o.code))):j.hooks.run("complete",o)},highlight:function(e,t,n){n={code:e,grammar:t,language:n};return j.hooks.run("before-tokenize",n),n.tokens=j.tokenize(n.code,n.grammar),j.hooks.run("after-tokenize",n),O.stringify(j.util.encode(n.tokens),n.language)},matchGrammar:function(e,t,n,a,r,i,s){for(var o in n)if(n.hasOwnProperty(o)&&n[o]){if(o==s)return;for(var l=n[o],l="Array"===j.util.type(l)?l:[l],u=0;u<l.length;++u){var c,d=l[u],p=d.inside,g=!!d.lookbehind,m=!!d.greedy,f=0,h=d.alias;m&&!d.pattern.global&&(c=d.pattern.toString().match(/[imuy]*$/)[0],d.pattern=RegExp(d.pattern.source,c+"g")),d=d.pattern||d;for(var y=a,b=r;y<t.length;b+=t[y].length,++y){var w=t[y];if(t.length>e.length)return;if(!(w instanceof O)){if(m&&y!=t.length-1){if(d.lastIndex=b,!(x=d.exec(e)))break;for(var v=x.index+(g?x[1].length:0),F=x.index+x[0].length,k=y,A=b,S=t.length;k<S&&(A<F||!t[k].type&&!t[k-1].greedy);++k)(A+=t[k].length)<=v&&(++y,b=A);if(t[y]instanceof O)continue;P=k-y,w=e.slice(b,A),x.index-=b}else{d.lastIndex=0;var x=d.exec(w),P=1}if(x){g&&(f=x[1]?x[1].length:0),F=(v=x.index+f)+(x=x[0].slice(f)).length;var E=w.slice(0,v),$=w.slice(F),w=[y,P];E&&(++y,b+=E.length,w.push(E));E=new O(o,p?j.tokenize(x,p):x,h,x,m);if(w.push(E),$&&w.push($),Array.prototype.splice.apply(t,w),1!=P&&j.matchGrammar(e,t,n,y,b,!0,o),i)break}else if(i)break}}}}},tokenize:function(e,t){var n=[e],a=t.rest;if(a){for(var r in a)t[r]=a[r];delete t.rest}return j.matchGrammar(e,n,t,0,0,!1),n},hooks:{all:{},add:function(e,t){var n=j.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=j.hooks.all[e];if(n&&n.length)for(var a,r=0;a=n[r++];)a(t)}},Token:O};function O(e,t,n,a,r){this.type=e,this.content=t,this.alias=n,this.length=0|(a||"").length,this.greedy=!!r}if(l.Prism=j,O.stringify=function(e,t){if("string"==typeof e)return e;if(Array.isArray(e))return e.map(function(e){return O.stringify(e,t)}).join("");var n={type:e.type,content:O.stringify(e.content,t),tag:"span",classes:["token",e.type],attributes:{},language:t};e.alias&&(a=Array.isArray(e.alias)?e.alias:[e.alias],Array.prototype.push.apply(n.classes,a)),j.hooks.run("wrap",n);var a=Object.keys(n.attributes).map(function(e){return e+'="'+(n.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+n.tag+' class="'+n.classes.join(" ")+'"'+(a?" "+a:"")+">"+n.content+"</"+n.tag+">"},!l.document)return l.addEventListener&&(j.disableWorkerMessageHandler||l.addEventListener("message",function(e){var t=JSON.parse(e.data),n=t.language,e=t.code,t=t.immediateClose;l.postMessage(j.highlight(e,j.languages[n],n)),t&&l.close()},!1)),j;var e=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return e&&(j.filename=e.src,j.manual||e.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(j.highlightAll):window.setTimeout(j.highlightAll,16):document.addEventListener("DOMContentLoaded",j.highlightAll))),j}(_self);"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism),Prism.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:/<!DOCTYPE[\s\S]+?>/i,cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,inside:{punctuation:[/^=/,{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(e,t){var n={};n["language-"+t]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[t]},n.cdata=/^<!\[CDATA\[|\]\]>$/i;n={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:n}};n["language-"+t]={pattern:/[\s\S]+/,inside:Prism.languages[t]};t={};t[e]={pattern:RegExp("(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)".replace(/__/g,e),"i"),lookbehind:!0,greedy:!0,inside:n},Prism.languages.insertBefore("markup","cdata",t)}}),Prism.languages.xml=Prism.languages.extend("markup",{}),Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,function(e){var t=/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,inside:{rule:/@[\w-]+/}},url:{pattern:RegExp("url\\((?:"+t.source+"|[^\n\r()]*)\\)","i"),inside:{function:/^url/i,punctuation:/^\(|\)$/}},selector:RegExp("[^{}\\s](?:[^{};\"']|"+t.source+")*?(?=\\s*\\{)"),string:{pattern:t,greedy:!0},property:/[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,important:/!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css,(t=e.languages.markup)&&(t.tag.addInlined("style","css"),e.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:t.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:e.languages.css}},alias:"language-css"}},t.tag))}(Prism),Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,lookbehind:!0}],keyword:[{pattern:/((?:^|})\s*)(?:catch|finally)\b/,lookbehind:!0},{pattern:/(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],number:/\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,function:/#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/}),Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),Prism.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\${|}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.js=Prism.languages.javascript,function(o){var e=o.languages.javadoclike={parameter:{pattern:/(^\s*(?:\/{3}|\*|\/\*\*)\s*@(?:param|arg|arguments)\s+)\w+/m,lookbehind:!0},keyword:{pattern:/(^\s*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,lookbehind:!0},punctuation:/[{}]/};Object.defineProperty(e,"addSupport",{value:function(e,t){"string"==typeof e&&(e=[e]),e.forEach(function(s){!function(e){var t="doc-comment",n=o.languages[s];if(n){var a=n[t];if(a||(a=(n=o.languages.insertBefore(s,"comment",{"doc-comment":{pattern:/(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,alias:"comment"}}))[t]),a instanceof RegExp&&(a=n[t]={pattern:a}),Array.isArray(a))for(var r=0,i=a.length;r<i;r++)a[r]instanceof RegExp&&(a[r]={pattern:a[r]}),e(a[r]);else e(a)}}(function(e){e.inside||(e.inside={}),e.inside.rest=t})})}}),e.addSupport(["java","javascript","php"],e)}(Prism),Prism.languages.json={property:{pattern:/"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,greedy:!0},string:{pattern:/"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,greedy:!0},comment:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,number:/-?\d+\.?\d*(e[+-]?\d+)?/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:true|false)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}},function(e){var t=e.languages.javascript,n="{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})+}",a="(@(?:param|arg|argument|property)\\s+(?:"+n+"\\s+)?)";e.languages.jsdoc=e.languages.extend("javadoclike",{parameter:{pattern:RegExp(a+"[$\\w\\xA0-\\uFFFF.]+(?=\\s|$)"),lookbehind:!0,inside:{punctuation:/\./}}}),e.languages.insertBefore("jsdoc","keyword",{"optional-parameter":{pattern:RegExp(a+"\\[[$\\w\\xA0-\\uFFFF.]+(?:=[^[\\]]+)?\\](?=\\s|$)"),lookbehind:!0,inside:{parameter:{pattern:/(^\[)[$\w\xA0-\uFFFF\.]+/,lookbehind:!0,inside:{punctuation:/\./}},code:{pattern:/(=)[\s\S]*(?=\]$)/,lookbehind:!0,inside:t,alias:"language-javascript"},punctuation:/[=[\]]/}},"class-name":[{pattern:RegExp("(@[a-z]+\\s+)"+n),lookbehind:!0,inside:{punctuation:/[.,:?=<>|{}()[\]]/}},{pattern:/(@(?:augments|extends|class|interface|memberof!?|this)\s+)[A-Z]\w*(?:\.[A-Z]\w*)*/,lookbehind:!0,inside:{punctuation:/\./}}],example:{pattern:/(@example\s+)[^@]+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,lookbehind:!0,inside:{code:{pattern:/^(\s*(?:\*\s*)?).+$/m,lookbehind:!0,inside:t,alias:"language-javascript"}}}}),e.languages.javadoclike.addSupport("javascript",e.languages.jsdoc)}(Prism),Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,lookbehind:!0},atrule:{pattern:/@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,inside:{rule:/@[\w-]+/}},url:/(?:[-a-z]+-)?url(?=\()/i,selector:{pattern:/(?=\S)[^@;{}()]?(?:[^@;{}()]|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,inside:{parent:{pattern:/&/,alias:"important"},placeholder:/%[-\w]+/,variable:/\$[-\w]+|#\{\$[-\w]+\}/}},property:{pattern:/(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/,inside:{variable:/\$[-\w]+|#\{\$[-\w]+\}/}}}),Prism.languages.insertBefore("scss","atrule",{keyword:[/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,{pattern:/( +)(?:from|through)(?= )/,lookbehind:!0}]}),Prism.languages.insertBefore("scss","important",{variable:/\$[-\w]+|#\{\$[-\w]+\}/}),Prism.languages.insertBefore("scss","function",{placeholder:{pattern:/%[-\w]+/,alias:"selector"},statement:{pattern:/\B!(?:default|optional)\b/i,alias:"keyword"},boolean:/\b(?:true|false)\b/,null:{pattern:/\bnull\b/,alias:"keyword"},operator:{pattern:/(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,lookbehind:!0}}),Prism.languages.scss.atrule.inside.rest=Prism.languages.scss,function(e){e.languages.sass=e.languages.extend("css",{comment:{pattern:/^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,lookbehind:!0}}),e.languages.insertBefore("sass","atrule",{"atrule-line":{pattern:/^(?:[ \t]*)[@+=].+/m,inside:{atrule:/(?:@[\w-]+|[+=])/m}}}),delete e.languages.sass.atrule;var t=/\$[-\w]+|#\{\$[-\w]+\}/,n=[/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,{pattern:/(\s+)-(?=\s)/,lookbehind:!0}];e.languages.insertBefore("sass","property",{"variable-line":{pattern:/^[ \t]*\$.+/m,inside:{punctuation:/:/,variable:t,operator:n}},"property-line":{pattern:/^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,inside:{property:[/[^:\s]+(?=\s*:)/,{pattern:/(:)[^:\s]+/,lookbehind:!0}],punctuation:/:/,variable:t,operator:n,important:e.languages.sass.important}}}),delete e.languages.sass.property,delete e.languages.sass.important,e.languages.insertBefore("sass","punctuation",{selector:{pattern:/([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,lookbehind:!0}})}(Prism),window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),a=this;do{for(t=n.length;0<=--t&&n.item(t)!==a;);}while(t<0&&(a=a.parentElement));return a}),function(){function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}"function"!=typeof window.CustomEvent&&(e.prototype=window.Event.prototype,window.CustomEvent=e)}(),function(){for(var i=0,e=["ms","moz","webkit","o"],t=0;t<e.length&&!window.requestAnimationFrame;++t)window.requestAnimationFrame=window[e[t]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[t]+"CancelAnimationFrame"]||window[e[t]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,t){var n=(new Date).getTime(),a=Math.max(0,16-(n-i)),r=window.setTimeout(function(){e(n+a)},a);return i=n+a,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}(),function(e,t){"function"==typeof define&&define.amd?define([],function(){return t(e)}):"object"==typeof exports?module.exports=t(e):e.SmoothScroll=t(e)}("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,function(w){"use strict";function v(){var n={};return Array.prototype.forEach.call(arguments,function(e){for(var t in e){if(!e.hasOwnProperty(t))return;n[t]=e[t]}}),n}function s(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),a=n.length,r=-1,i="",s=n.charCodeAt(0);++r<a;){if(0===(t=n.charCodeAt(r)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");i+=1<=t&&t<=31||127==t||0===r&&48<=t&&t<=57||1===r&&48<=t&&t<=57&&45===s?"\\"+t.toString(16)+" ":128<=t||45===t||95===t||48<=t&&t<=57||65<=t&&t<=90||97<=t&&t<=122?n.charAt(r):"\\"+n.charAt(r)}return"#"+i}function F(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)}function k(e,t,n,a){t.emitEvents&&"function"==typeof w.CustomEvent&&(a=new CustomEvent(e,{bubbles:!0,detail:{anchor:n,toggle:a}}),document.dispatchEvent(a))}var A={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,speedAsDuration:!1,durationMax:null,durationMin:null,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0};return function(r,e){var h,i,n,y,b={cancelScroll:function(e){cancelAnimationFrame(y),y=null,e||k("scrollCancel",h)}};b.animateScroll=function(a,r,e){b.cancelScroll();var i,s,o,l,u,c,d,p,g,m=v(h||A,e||{}),f="[object Number]"===Object.prototype.toString.call(a),t=f||!a.tagName?null:a;(f||t)&&(i=w.pageYOffset,m.header&&!n&&(n=document.querySelector(m.header)),e=(e=n)?parseInt(w.getComputedStyle(e).height,10)+e.offsetTop:0,l=f?a:function(e,t,n,a){var r=0;if(e.offsetParent)for(;r+=e.offsetTop,e=e.offsetParent;);return r=Math.max(r-t-n,0),a&&(r=Math.min(r,F()-w.innerHeight)),r}(t,e,parseInt("function"==typeof m.offset?m.offset(a,r):m.offset,10),m.clip),u=l-i,c=F(),d=0,e=(t=m).speedAsDuration?t.speed:Math.abs(u/1e3*t.speed),p=t.durationMax&&e>t.durationMax?t.durationMax:t.durationMin&&e<t.durationMin?t.durationMin:parseInt(e,10),g=function(e){var t,n;d+=e-(s=s||e),o=i+u*(t=o=1<(o=0===p?0:d/p)?1:o,"easeInQuad"===m.easing&&(n=t*t),"easeOutQuad"===m.easing&&(n=t*(2-t)),"easeInOutQuad"===m.easing&&(n=t<.5?2*t*t:(4-2*t)*t-1),"easeInCubic"===m.easing&&(n=t*t*t),"easeOutCubic"===m.easing&&(n=--t*t*t+1),"easeInOutCubic"===m.easing&&(n=t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===m.easing&&(n=t*t*t*t),"easeOutQuart"===m.easing&&(n=1- --t*t*t*t),"easeInOutQuart"===m.easing&&(n=t<.5?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===m.easing&&(n=t*t*t*t*t),"easeOutQuint"===m.easing&&(n=1+--t*t*t*t*t),"easeInOutQuint"===m.easing&&(n=t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t),m.customEasing&&(n=m.customEasing(t)),n||t),w.scrollTo(0,Math.floor(o)),function(e,t){var n=w.pageYOffset;if(e==t||n==t||(i<t&&w.innerHeight+n)>=c)return b.cancelScroll(!0),e=t,n=f,0===(t=a)&&document.body.focus(),n||(t.focus(),document.activeElement!==t&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),w.scrollTo(0,e)),k("scrollStop",m,a,r),!(y=s=null)}(o,l)||(y=w.requestAnimationFrame(g),s=e)},0===w.pageYOffset&&w.scrollTo(0,0),e=a,f||history.pushState&&m.updateURL&&history.pushState({smoothScroll:JSON.stringify(m),anchor:e.id},document.title,e===document.documentElement?"#top":"#"+e.id),"matchMedia"in w&&w.matchMedia("(prefers-reduced-motion)").matches?w.scrollTo(0,Math.floor(l)):(k("scrollStart",m,a,r),b.cancelScroll(!0),w.requestAnimationFrame(g)))};function t(e){if(!e.defaultPrevented&&!(0!==e.button||e.metaKey||e.ctrlKey||e.shiftKey)&&"closest"in e.target&&(i=e.target.closest(r))&&"a"===i.tagName.toLowerCase()&&!e.target.closest(h.ignore)&&i.hostname===w.location.hostname&&i.pathname===w.location.pathname&&/#/.test(i.href)){var t,n;try{t=s(decodeURIComponent(i.hash))}catch(e){t=s(i.hash)}if(console.log(t),"#"===t){if(!h.topOnEmptyHash)return;n=document.documentElement}else n=document.querySelector(t);(n=n||"#top"!==t?n:document.documentElement)&&(e.preventDefault(),history.replaceState&&h.updateURL&&!history.state&&(a=(a=w.location.hash)||"",history.replaceState({smoothScroll:JSON.stringify(h),anchor:a||w.pageYOffset},document.title,a||w.location.href)),b.animateScroll(n,i))}var a}function a(e){var t;null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(h)&&("string"==typeof(t=history.state.anchor)&&t&&!(t=document.querySelector(s(history.state.anchor)))||b.animateScroll(t,null,{updateURL:!1}))}return b.destroy=function(){h&&(document.removeEventListener("click",t,!1),w.removeEventListener("popstate",a,!1),b.cancelScroll(),y=n=i=h=null)},function(){if(!("querySelector"in document&&"addEventListener"in w&&"requestAnimationFrame"in w&&"closest"in w.Element.prototype))throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";b.destroy(),h=v(A,e||{}),n=h.header?document.querySelector(h.header):null,document.addEventListener("click",t,!1),h.updateURL&&h.popstate&&w.addEventListener("popstate",a,!1)}(),b}}),function(){var e=function(n,a){var r,i;return function(){var e=this,t=arguments;i?(clearTimeout(r),r=setTimeout(function(){Date.now()-i>=a&&(n.apply(e,t),i=Date.now())},a-(Date.now()-i))):(n.apply(e,t),i=Date.now())}};({initialise:function(){this.scrollToTopButton=document.querySelector(".js-scroll-to-top-button"),this.scrollToTopButtonSmoothScrollInstance=new SmoothScroll(".js-scroll-to-top-button",{updateURL:!1}),this.connectEvents()},connectEvents:function(){window.addEventListener("scroll",e(this.setScrollToTopButtonClass,100).bind(this))},setScrollToTopButtonClass:function(){window.innerHeight<window.scrollY?this.scrollToTopButton.classList.add("c-scroll-to-top--active"):this.scrollToTopButton.classList.remove("c-scroll-to-top--active")}}).initialise()}();