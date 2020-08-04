//waapi-timing-properties v1.4.2 https://github.com/webanimate/waapi-timing-properties#readme
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).WTProperties={})}(this,(function(e){"use strict";var t=function(e){var t=typeof e;return!!e&&("object"==t||"function"==t)},r=Object.prototype.toString,n=Array.isArray;var i=function(e){return"string"==typeof e||!n(e)&&function(e){return!!e&&"object"==typeof e}(e)&&"[object String]"==r.call(e)},u=Object.prototype.toString;var a=function(e){return"number"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Number]"==u.call(e)};const s={id:{type:"String"},delay:{type:"Number",min:0,max:Number.MAX_VALUE,default:0},direction:{type:"String",values:["normal","reverse","alternate","alternate-reverse"],default:"normal"},duration:{type:"Number",min:0,max:Number.MAX_VALUE,default:0},easing:{type:"String",values:["linear","cubic-bezier(","ease","ease-in","ease-out","ease-in-out","steps(","step-start","step-end"],valuesCubicBezier:{linear:"0.25, 0.25, 0.75, 0.75",ease:"0.25, 0.1, 0.25, 1","ease-in":"0.42, 0, 1, 1","ease-out":"0, 0, 0.58, 1","ease-in-out":"0.42, 0, 0.58, 1"},valuesSteps:{"step-start":"1, jump-start","step-end":"1, jump-end"},default:"linear"},endDelay:{type:"Number",min:0,max:Number.MAX_VALUE,default:0},fill:{type:"String",values:["none","forwards","backwards","both","auto"],default:"auto"},iterationStart:{type:"Number",min:0,max:Number.MAX_VALUE,default:0},iterations:{type:"Number",min:0,max:1/0,default:1},composite:{type:"String",values:["add","accumulate","replace","auto"],default:"replace"},iterationComposite:{type:"String",values:["accumulate","replace"],default:"replace"}},o=[];Object.keys(s).forEach(e=>{o.push(e)});const l=e=>{const t=e.substring(6,e.length-1).split(",");return!(t.length>2)&&(r=t[0],!!(/^[+]?\d+?$/.test(r.trim())&&Number(r)>0)&&!(t[1]&&!["end","start","jump-both","jump-none","jump-end","jump-start"].includes(t[1].trim())));var r},f=(e,t)=>{if(!a(t)&&!i(t))return!1;const r=s[e];if("Number"!==r.type){if(r.values){const n=(t=t.toString()).indexOf("(");if(n>0){if("easing"===e)return")"===t.substring(t.length-1)&&("cubic-bezier("===t.substring(0,13)?(e=>{const t=e.substring(13,e.length-1).split(",");if(4===t.length){for(const e of t.keys()){if(r=t[e],!/^[-+]?\d*\.?\d+([eE]?[-+]?\d+)?$/.test(r.trim()))return!1;if([0,2].includes(e)&&(Number(t[e])<0||Number(t[e])>1))return!1}return!0}var r;return!1})(t):"steps("===t.substring(0,6)&&l(t));t=t.substring(0,n+1)}for(const e of r.values)if(t===e)return!0;return!1}return!0}return t>=r.min&&t<=r.max},c=e=>(i(e)&&(e=e.trim().replace(/\s+/g," ").replace(/\( /,"(").replace(/ \)/,")").replace(" ,",",")),e),p=(e,r=!0,n=!1)=>{if(Object.keys(e).length){if(Array.isArray(e)){for(const t of e)if(!o.includes(t))return!!n&&t;return!0}if(t(e)){for(const t of Object.keys(e)){if(!(t in s))return!!n&&`${t}: ${e[t]}`;if(r&&(e[t]=c(e[t]),!f(t,e[t])))return!!n&&`${t}: ${e[t]}`}return!0}if(i(e)&&o.includes(e))return!0}return!1};e.properties=s,e.propertiesNames=o,e.sanitize=(e,r=!0,n=!0)=>{let i;if(Array.isArray(e)?i=[]:t(e)&&(i={}),Object.keys(e).length)if(Array.isArray(e))for(const t of e)o.includes(t)&&i.push(t);else t(e)?Object.keys(e).forEach(t=>{t in s&&(e[t]=c(e[t]),r?f(t,e[t])?i[t]=e[t]:n&&void 0!==s[t].default&&(i[t]=s[t].default):i[t]=e[t])}):(i="",p(e)&&(i=e));return i},e.validate=p,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=wtproperties.js.map
