(function(e){function t(t){for(var a,r,o=t[0],l=t[1],u=t[2],d=0,s=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(c,r)&&c[r]&&s.push(c[r][0]),c[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);b&&b(t);while(s.length)s.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,r=1;r<n.length;r++){var o=n[r];0!==c[o]&&(a=!1)}a&&(i.splice(t--,1),e=l(l.s=n[0]))}return e}var a={},r={app:0},c={app:0},i=[];function o(e){return l.p+"js/"+({}[e]||e)+"."+{"chunk-10f6c022":"5fe1a4ac"}[e]+".js"}function l(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n={"chunk-10f6c022":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-10f6c022":"d19cedb0"}[e]+".css",c=l.p+a,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var u=i[o],d=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(d===a||d===c))return t()}var s=document.getElementsByTagName("style");for(o=0;o<s.length;o++){u=s[o],d=u.getAttribute("data-href");if(d===a||d===c)return t()}var b=document.createElement("link");b.rel="stylesheet",b.type="text/css",b.onload=t,b.onerror=function(t){var a=t&&t.target&&t.target.src||c,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete r[e],b.parentNode.removeChild(b),n(i)},b.href=c;var v=document.getElementsByTagName("head")[0];v.appendChild(b)})).then((function(){r[e]=0})));var a=c[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise((function(t,n){a=c[e]=[t,n]}));t.push(a[2]=i);var u,d=document.createElement("script");d.charset="utf-8",d.timeout=120,l.nc&&d.setAttribute("nonce",l.nc),d.src=o(e);var s=new Error;u=function(t){d.onerror=d.onload=null,clearTimeout(b);var n=c[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",s.name="ChunkLoadError",s.type=a,s.request=r,n[1](s)}c[e]=void 0}};var b=setTimeout((function(){u({type:"timeout",target:d})}),12e4);d.onerror=d.onload=u,document.head.appendChild(d)}return Promise.all(t)},l.m=e,l.c=a,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)l.d(n,a,function(t){return e[t]}.bind(null,a));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="",l.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],d=u.push.bind(u);u.push=t,u=u.slice();for(var s=0;s<u.length;s++)t(u[s]);var b=d;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0910":function(e,t,n){"use strict";n("262e")},"262e":function(e,t,n){},3116:function(e){e.exports=JSON.parse('[{"key":"WWU","name":"University of Muenster","longitude":7.6261,"latitude":51.9607},{"key":"CESNET","name":"CESNET a.l.e.","longitude":14.390702,"latitude":50.1018},{"key":"CERN","name":"CERN","longitude":6.039289,"latitude":46.235176},{"key":"SURFSARA","name":"SURFSARA","longitude":4.95459,"latitude":52.35673},{"key":"CUBBIT","name":"CUBBIT","longitude":11.34021,"latitude":44.49512},{"key":"AILLERON","name":"Ailleron/Softwaremind","longitude":19.94498,"latitude":50.06465},{"key":"SWITCH","name":"SWITCH","longitude":8.55,"latitude":47.36667},{"key":"DTU","name":"Danmarks Tekniske Universitet","longitude":12.568337,"latitude":55.676098},{"key":"CERNBox","name":"CERNBox","longitude":0,"latitude":0},{"key":"Sciebo","name":"Sciebo","longitude":0,"latitude":0},{"key":"ownCloud@CESNET","name":"ownCloud@CESNET","longitude":0,"latitude":0},{"key":"Ailleron","name":"Ailleron","longitude":0,"latitude":0}]')},"4b3a":function(e,t,n){},"52d0":function(e,t,n){"use strict";n("4b3a")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("7a23"),r={class:"nav-container"},c={key:0,class:"hero"},i={class:"meshselect content"},o={class:"subtitle text-description"},l=Object(a["i"])("p",null,"Accept an invitation to collaborate from",-1),u={class:"provider-title"},d=Object(a["i"])("p",null,"using your account at",-1),s={key:1,class:"full invalid-link"};function b(e,t,n,b,v,f){var O=Object(a["t"])("navbar"),p=Object(a["t"])("navbar-links"),j=Object(a["t"])("mesh-map"),m=Object(a["t"])("provider-select"),g=Object(a["t"])("link-invalid"),h=Object(a["t"])("mesh-footer");return Object(a["o"])(),Object(a["f"])("div",{class:[[b.md?"main__md":"",b.lg?"main__lg":""],"main"]},[Object(a["i"])("div",r,[Object(a["i"])(O),Object(a["i"])(p)]),b.validLink?(Object(a["o"])(),Object(a["f"])("section",c,[b.loaded&&b.md?(Object(a["o"])(),Object(a["f"])(a["b"],{key:0},[Object(a["i"])(j)],1024)):Object(a["g"])("",!0),Object(a["i"])("div",i,[Object(a["i"])("div",o,[l,Object(a["i"])("p",u,Object(a["u"])(b.originator.full_name),1),d]),Object(a["i"])(m)])])):(Object(a["o"])(),Object(a["f"])("section",s,[Object(a["i"])(g)])),Object(a["i"])("section",null,[Object(a["i"])(h)])],2)}n("d3b7"),n("3ca3"),n("ddb0");var v=n("9f67"),f=Object(a["A"])("data-v-317ef896");Object(a["q"])("data-v-317ef896");var O=Object(a["i"])("div",{class:"row"},[Object(a["i"])("a",{class:"brand-link",href:"/"},[Object(a["i"])("div",{class:"logo"})]),Object(a["i"])("span",{class:"app-title"},"DIRECTORY")],-1);Object(a["p"])();var p=f((function(e,t,n,r,c,i){return Object(a["o"])(),Object(a["f"])("header",{class:[[r.md?"nav__md":"",r.lg?"nav__lg":""],"nav"]},[O],2)})),j=n("f947");function m(){var e={xs:1,sm:599,md:1024,lg:1439,xl:1920},t=Object(j["a"])(e),n=t.current,a=t.xs,r=t.sm,c=t.md,i=t.lg,o=t.xl;return{current:n,xs:a,sm:r,md:c,lg:i,xl:o}}var g={name:"Navbar",setup:function(){var e=m(),t=e.md,n=e.lg;return{md:t,lg:n}}};n("7b57");g.render=p,g.__scopeId="data-v-317ef896";var h=g,k=n("ba28"),y=Object(a["A"])("data-v-4342b242");Object(a["q"])("data-v-4342b242");var w={class:"not-found"},_=Object(a["i"])("div",{class:"wrapper"},[Object(a["i"])("h1",null,"404"),Object(a["i"])("h3",null,"Page Not Found")],-1);Object(a["p"])();var x=y((function(e,t,n,r,c,i){return Object(a["o"])(),Object(a["f"])("div",w,[_])})),S={name:"LinkInvalid"};n("9b23");S.render=x,S.__scopeId="data-v-4342b242";var E=S,L=(n("b0c0"),n("a4d3"),n("e01a"),Object(a["A"])("data-v-3f950430"));Object(a["q"])("data-v-3f950430");var C={class:"container"},T={id:"scroll-container"},A={ref:"ulScroll",class:"ul-scroll"},N={class:"item"},P={class:"close-btn"},D=Object(a["i"])("pre",null,"x",-1),U={class:"subtitle text-description"},I={class:"provider-title"},R=Object(a["i"])("p",{class:"provider-detail-label"},"Operated By",-1),B=Object(a["i"])("svg",null,[Object(a["i"])("defs",null,[Object(a["i"])("linearGradient",{id:"gradient",x1:"0",x2:"0",y1:"0%",y2:"50%"},[Object(a["i"])("stop",{offset:"0","stop-color":"black"}),Object(a["i"])("stop",{offset:"0.5","stop-color":"white"}),Object(a["i"])("stop",{offset:"1","stop-color":"black"})]),Object(a["i"])("mask",{id:"masking",maskContentUnits:"objectBoundingBox",maskUnits:"objectBoundingBox"},[Object(a["i"])("rect",{fill:"url(#gradient)",height:"1",width:"1",y:"0"})])])],-1);Object(a["p"])();var M=L((function(e,t,n,r,c,i){var o,l,u,d,s;return Object(a["o"])(),Object(a["f"])("div",C,[Object(a["i"])("div",T,[Object(a["i"])("div",{ref:"wrapScroll",class:[[r.detailsExpanded?"provider-details__open":""],"wrap-container"],style:{maxHeight:"".concat(n.wrapHeight,"px"),minHeight:"".concat(n.wrapHeight,"px")}},[Object(a["i"])("ul",A,[(Object(a["o"])(!0),Object(a["f"])(a["a"],null,Object(a["s"])(r.internalProviders,(function(e,t){var n;return Object(a["y"])((Object(a["o"])(),Object(a["f"])("li",{key:e.name,ref:function(e){e&&(r.providerOptions[t]=e)},class:[e.name===(null===(n=r.target)||void 0===n?void 0:n.name)?"active":""],onClick:function(t){var n;return e.name===(null===(n=r.target)||void 0===n?void 0:n.name)?r.detailsExpanded=!0:null}},[Object(a["i"])("span",N,Object(a["u"])(e.full_name),1)],10,["onClick"])),[[a["v"],!r.detailsExpanded]])})),128))],512),Object(a["i"])("div",{class:[[r.detailsExpanded?"provider-details__open":"",r.md?"provider-details__md":""],"provider-details"]},[Object(a["i"])("div",P,[Object(a["i"])("button",{onClick:t[1]||(t[1]=function(){return r.closeDetails&&r.closeDetails.apply(r,arguments)})},[D])]),Object(a["i"])("div",U,[Object(a["i"])("p",I,Object(a["u"])(null===(o=r.target)||void 0===o?void 0:o.full_name),1),Object(a["i"])("p",null,Object(a["u"])(null===(l=r.target)||void 0===l?void 0:l.description),1),R,Object(a["i"])("p",null,Object(a["u"])(null===(u=r.target)||void 0===u?void 0:u.organization),1),null!==(d=r.target)&&void 0!==d&&d.homepage?(Object(a["o"])(),Object(a["f"])("a",{key:0,href:null===(s=r.target)||void 0===s?void 0:s.homepage,class:"provider-detail-home",target:"_new"},Object(a["u"])(r.target.homepage),9,["href"])):Object(a["g"])("",!0)]),Object(a["i"])("a",{href:r.targetLink,class:"accept-btn"},"Accept",8,["href"])],2)],6)]),B])})),H=(n("a9e3"),n("4de4"),n("c740"),{name:"ProviderSelect",props:{wrapHeight:{type:Number,default:350}},setup:function(){var e=Object(v["a"])(),t=e.providers,n=e.target,r=e.setTarget,c=e.targetLink,i=e.originator,o=e.detailsExpanded,l=e.expandDetails,u=e.hideDetails,d=m(),s=d.md,b=Object(a["r"])(null),f=Object(j["b"])(b),O=f.scrollTop,p=f.scrollTopTo,g=Object(a["r"])([]),h=Object(a["d"])((function(){return t.value.filter((function(e){return e.name!==i.value.name}))})),k=Object(a["d"])((function(){if(O.value>0){var e=O.value/b.value.clientHeight;return Math.round(e*Math.abs(h.value.length))}return 0})),y=Object(a["d"])((function(){return n.value?h.value.findIndex((function(e){return e.name===n.value.name})):-1}));function w(){var e=g.value[y.value];e&&p(e.clientTop+e.offsetTop)}function _(){u(),w()}return Object(a["m"])((function(){g.value=[]})),Object(a["w"])([n],(function(){w()})),Object(a["w"])([O],(function(){var e;if(!o.value){var t=h.value[k.value];t.name!==(null===(e=n.value)||void 0===e?void 0:e.name)&&r(t)}})),{internalProviders:h,target:n,scrollTop:O,wrapScroll:b,providerOptions:g,detailsExpanded:o,expandDetails:l,hideDetails:u,closeDetails:_,targetLink:c,md:s}}});n("866a");H.render=M,H.__scopeId="data-v-3f950430";var q=H,F=Object(a["A"])("data-v-258d5688");Object(a["q"])("data-v-258d5688");var G={class:"row"},J=Object(a["i"])("div",{class:"col"},[Object(a["i"])("div",{class:"footer-logo center-align"})],-1),W={class:"footer-resource-links col-md-3 col-xs-12"},z=Object(a["i"])("h4",null,"Resources",-1),$=Object(a["i"])("div",{class:"row"},[Object(a["i"])("div",{class:"col center-align funding"},[Object(a["i"])("p",null,[Object(a["i"])("a",{href:"https://cs3mesh4eosc.eu/",target:"_new"},"CS3MESH4EOSC"),Object(a["h"])(" has received funding from the European Union's Horizon 2020 research and innovation programme under the Grant Agreement no 863353 ")])])],-1);Object(a["p"])();var K=F((function(e,t,n,r,c,i){var o=Object(a["t"])("fa-icon");return Object(a["o"])(),Object(a["f"])("footer",null,[Object(a["i"])("div",{class:[[r.md?"container__md":""],"container"]},[Object(a["i"])("div",G,[J,Object(a["i"])("div",W,[z,Object(a["i"])("ul",null,[(Object(a["o"])(!0),Object(a["f"])(a["a"],null,Object(a["s"])(r.resourcesLinks,(function(e){return Object(a["o"])(),Object(a["f"])("li",{key:e.name},[Object(a["i"])(o,{class:"link-icon",icon:e.icon},null,8,["icon"]),Object(a["i"])("a",{href:e.target,target:"_new"},Object(a["u"])(e.name),9,["href"])])})),128))])])]),$],2)])})),Y={name:"MeshFooter",setup:function(){var e=m(),t=e.md,n=Object(a["r"])([{name:"GitHub",target:"https://github.com/sciencemesh/sciencemesh",icon:["fab","github"]},{name:"Gitter",target:"https://gitter.im/sciencemesh/community",icon:["fab","gitter"]},{name:"Documentation",target:"https://developer.sciencemesh.io/docs/",icon:"book"},{name:"Deploy",target:"https://developer.sciencemesh.io/docs/iop/deployment/",icon:"rocket"}]);return{md:t,resourcesLinks:n}}};n("cd3c");Y.render=K,Y.__scopeId="data-v-258d5688";var Q=Y,V=Object(a["A"])("data-v-77527f7a");Object(a["q"])("data-v-77527f7a");var X={class:"row"},Z={class:"row"},ee={class:"link-label"};Object(a["p"])();var te=V((function(e,t,n,r,c,i){var o=Object(a["t"])("fa-icon");return Object(a["o"])(),Object(a["f"])("div",{class:[[r.md?"links-header__md":"",r.lg?"links-header__lg":""],"links-header"]},[Object(a["i"])("ul",X,[(Object(a["o"])(!0),Object(a["f"])(a["a"],null,Object(a["s"])(r.navLinks,(function(e){return Object(a["o"])(),Object(a["f"])("li",{key:e.name,class:e.class},[Object(a["i"])("a",{href:e.target,target:"_new"},[Object(a["i"])("div",Z,[Object(a["i"])(o,{icon:e.icon},null,8,["icon"]),Object(a["i"])("span",ee,Object(a["u"])(e.name),1)])],8,["href"])],2)})),128))])],2)})),ne={name:"NavbarLinks",setup:function(){var e=m(),t=e.md,n=e.lg,r=Object(a["r"])([{icon:"sign-in-alt",name:"JOIN",target:"https://developer.sciencemesh.io/docs/how-to-join-sciencemesh/",class:""},{icon:"book",name:"DOCS",target:"https://developer.sciencemesh.io/docs/",class:"outlined"}]);return{md:t,lg:n,navLinks:r}}};n("52d0");ne.render=te,ne.__scopeId="data-v-77527f7a";var ae=ne,re=Object(a["j"])((function(){return n.e("chunk-10f6c022").then(n.bind(null,"eb22"))})),ce={name:"App",components:{NavbarLinks:ae,MeshFooter:Q,ProviderSelect:q,LinkInvalid:E,Navbar:h,MeshMap:re},setup:function(){var e=Object(v["a"])(),t=e.fetchProviders,n=e.fetchLocations,a=e.loaded,r=e.providers,c=e.originator,i=Object(k["a"])(),o=i.validLink,l=i.baseUrl,u=m(),d=u.md,s=u.lg;return t("".concat(l.value,"providers")),n(),{originator:c,loaded:a,validLink:o,providers:r,md:d,lg:s}}};n("0910");ce.render=b;var ie=ce,oe=n("ecee"),le=n("c074"),ue=n("f2d1"),de=n("ad3d");oe["c"].add(le["a"],le["c"],le["b"],ue["a"],ue["b"]);var se=Object(a["e"])(ie);se.component("fa-icon",de["a"]),se.mount("#app")},"6d5e":function(e,t,n){},"7b57":function(e,t,n){"use strict";n("7c5e")},"7c5e":function(e,t,n){},"866a":function(e,t,n){"use strict";n("8772")},8772:function(e,t,n){},"9b23":function(e,t,n){"use strict";n("6d5e")},"9f67":function(e,t,n){"use strict";n.d(t,"a",(function(){return O}));n("7db0"),n("2b3d"),n("d3b7"),n("3ca3"),n("ddb0"),n("25f0"),n("5319"),n("ac1f"),n("b0c0");var a=n("7a23"),r=n("ba28");function c(){function e(e,t){fetch(e,{headers:{Accept:"application/json"}}).then((function(e){e.json().then((function(e){t(e)}))})).catch((function(e){console.log(e)}))}return{load:e}}var i=Object(r["a"])(),o=i.searchParams,l=i.validLink,u=c(),d=u.load,s=Object(a["r"])([]),b=Object(a["r"])([]),v=Object(a["r"])(null),f=Object(a["r"])(!1);function O(){var e=s,t=b,r=v,c=Object(a["r"])(!1),i=Object(a["r"])(!1),u=Object(a["r"])(!1),O=Object(a["d"])((function(){var t=e.value.find((function(e){return e.domain===o.value.get("providerDomain")}));return t||{full_name:""}})),p=Object(a["d"])((function(){return r.value&&l?new URL("?".concat(encodeURI(o.value.toString())),new URL("invites/forward",new URL(j.value.endpoint.path.replace(/\/?$/,"/")))):"#"})),j=Object(a["d"])((function(){var e;return null===(e=r.value)||void 0===e?void 0:e.services.find((function(e){return"OCM"===e.endpoint.type.name}))}));function m(t){d(t,(function(t){e.value=t,i.value=!0,u.value&&(c.value=!0)}))}function g(){t.value=n("3116"),u.value=!0,c.value=!0}function h(t){return Object(a["r"])(e.value.find((function(e){return e.name===t.key})))}function k(e){return Object(a["r"])(t.value.find((function(t){return t.key===e.value.name})))}function y(){f.value=!0}function w(){f.value=!1}function _(e){r.value=e}return{providers:Object(a["d"])((function(){return e.value})),locations:Object(a["d"])((function(){return t.value})),target:Object(a["d"])((function(){return r.value})),targetLink:p,originator:O,detailsExpanded:f,providersLoaded:Object(a["d"])((function(){return i.value})),locationsLoaded:Object(a["d"])((function(){return u.value})),loaded:Object(a["d"])((function(){return c.value})),fetchProviders:m,fetchLocations:g,getLocation:k,setTarget:_,getProvider:h,expandDetails:y,hideDetails:w}}},ba28:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n("2b3d"),n("d3b7"),n("3ca3"),n("ddb0"),n("841c"),n("ac1f"),n("5319");var a=n("7a23");function r(){var e=Object(a["d"])((function(){return new URLSearchParams(window.location.search)})),t=Object(a["d"])((function(){return window.location.pathname.replace(/\/?$/,"/")})),n=Object(a["d"])((function(){return e.value.has("providerDomain")&&e.value.has("token")}));return{searchParams:e,validLink:n,baseUrl:t}}},cd3c:function(e,t,n){"use strict";n("d8bc")},d8bc:function(e,t,n){}});
//# sourceMappingURL=app.64d303c5.js.map