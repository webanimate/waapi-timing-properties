//waapi-timing-properties v0.0.0-alpha.8 https://github.com/webanimate/waapi-timing-properties#readme
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).WTProperties={})}(this,(function(e){"use strict";var t=function(e){var t=typeof e;return!!e&&("object"==t||"function"==t)},r=Object.prototype.toString,n=Array.isArray;var o=function(e){return"string"==typeof e||!n(e)&&function(e){return!!e&&"object"==typeof e}(e)&&"[object String]"==r.call(e)},u="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var i=function(e,t){return e(t={exports:{}},t.exports),t.exports}((function(e,t){var r="[object Map]",n="[object Set]",o=/^\[object .+?Constructor\]$/,i="object"==typeof u&&u&&u.Object===Object&&u,a="object"==typeof self&&self&&self.Object===Object&&self,c=i||a||Function("return this")(),f=t&&!t.nodeType&&t,l=f&&e&&!e.nodeType&&e,s=l&&l.exports===f;var p,y,b,d=Function.prototype,m=Object.prototype,v=c["__core-js_shared__"],j=(p=/[^.]+$/.exec(v&&v.keys&&v.keys.IE_PROTO||""))?"Symbol(src)_1."+p:"",g=d.toString,O=m.hasOwnProperty,A=m.toString,h=RegExp("^"+g.call(O).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),S=s?c.Buffer:void 0,w=m.propertyIsEnumerable,x=S?S.isBuffer:void 0,_=(y=Object.keys,b=Object,function(e){return y(b(e))}),N=W(c,"DataView"),k=W(c,"Map"),M=W(c,"Promise"),$=W(c,"Set"),E=W(c,"WeakMap"),P=!w.call({valueOf:1},"valueOf"),V=z(N),T=z(k),D=z(M),F=z($),L=z(E);function U(e){return!(!q(e)||function(e){return!!j&&j in e}(e))&&(G(e)||function(e){var t=!1;if(null!=e&&"function"!=typeof e.toString)try{t=!!(e+"")}catch(e){}return t}(e)?h:o).test(z(e))}function W(e,t){var r=function(e,t){return null==e?void 0:e[t]}(e,t);return U(r)?r:void 0}var X=function(e){return A.call(e)};function z(e){if(null!=e){try{return g.call(e)}catch(e){}try{return e+""}catch(e){}}return""}function B(e){return function(e){return function(e){return!!e&&"object"==typeof e}(e)&&I(e)}(e)&&O.call(e,"callee")&&(!w.call(e,"callee")||"[object Arguments]"==A.call(e))}(N&&"[object DataView]"!=X(new N(new ArrayBuffer(1)))||k&&X(new k)!=r||M&&"[object Promise]"!=X(M.resolve())||$&&X(new $)!=n||E&&"[object WeakMap]"!=X(new E))&&(X=function(e){var t=A.call(e),o="[object Object]"==t?e.constructor:void 0,u=o?z(o):void 0;if(u)switch(u){case V:return"[object DataView]";case T:return r;case D:return"[object Promise]";case F:return n;case L:return"[object WeakMap]"}return t});var C=Array.isArray;function I(e){return null!=e&&function(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}(e.length)&&!G(e)}var R=x||function(){return!1};function G(e){var t=q(e)?A.call(e):"";return"[object Function]"==t||"[object GeneratorFunction]"==t}function q(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}e.exports=function(e){if(I(e)&&(C(e)||"string"==typeof e||"function"==typeof e.splice||R(e)||B(e)))return!e.length;var t=X(e);if(t==r||t==n)return!e.size;if(P||function(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||m)}(e))return!_(e).length;for(var o in e)if(O.call(e,o))return!1;return!0}})),a=Object.prototype.toString;var c=function(e){return"number"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Number]"==a.call(e)};const f={id:{type:"String"},delay:{type:"Number",min:0,max:Number.MAX_VALUE,default:0},direction:{type:"String",values:["normal","reverse","alternate","alternate-reverse"],default:"normal"},duration:{type:"Number",min:0,max:Number.MAX_VALUE,default:0},easing:{type:"String",values:["linear","cubic-bezier(","ease","ease-in","ease-out","ease-in-out","steps(","step-start","step-end"],default:"linear"},endDelay:{type:"Number",min:0,max:Number.MAX_VALUE,default:0},fill:{type:"String",values:["none","forwards","backwards","both","auto"],default:"auto"},iterationStart:{type:"Number",min:0,max:Number.MAX_VALUE,default:0},iterations:{type:"Number",min:0,max:1/0,default:0},composite:{type:"String",values:["add","accumulate","replace"],default:"replace"},iterationComposite:{type:"String",values:["accumulate","replace"],default:"replace"}},l=[];Object.keys(f).forEach(e=>{l.push(e)});const s=(e,t)=>{if(!c(t)&&!o(t))return!1;const r=f[e];if(r){if("Number"===r.type){if(!(t>=r.min&&t<=r.max))return!1}else if("String"===r.type){if(r.values){const e=(t=t.toString().replace(/\s+\(/g,"(").trim()).indexOf("(");e>0&&(t=t.substring(0,e+1));for(const e of r.values)if(t===e)return!0;return!1}return!0}return!0}return!1},p=(e,r=!0,n=!1)=>{if(!i(e)){if(Array.isArray(e)){for(const t of e)if(!l.includes(t))return!!n&&t;return!0}if(t(e)){for(const t of Object.keys(e)){if(!(t in f))return!!n&&`${t}: ${e[t]}`;if(r&&!s(t,e[t]))return!!n&&`${t}: ${e[t]}`}return!0}if(o(e)&&l.includes(e))return!0}return!1};e.properties=f,e.propertiesNames=l,e.sanitize=(e,r=!0,n=!0)=>{let u;if(Array.isArray(e)?u=[]:t(e)&&(u={}),!i(e))if(Array.isArray(e))for(const t of e)l.includes(t)&&u.push(t);else t(e)?Object.keys(e).forEach(t=>{t in f&&(r?s(t,e[t])?u[t]=e[t]:n&&void 0!==f[t].default&&(u[t]=f[t].default):u[t]=e[t])}):o(e)&&p(e)&&(u=e);return u},e.validate=p,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=wtproperties.js.map
