parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"g4tf":[function(require,module,exports) {
var t=document.getElementById("mainCanvas"),e=t.getContext("2d"),n=function(){function t(){this.lastTime=Date.now()}return t.prototype.tick=function(){var t=Date.now()-this.lastTime;return this.lastTime=Date.now(),t/1e3},t}(),i=function(){return function(t,e){this.x=t,this.y=e}}();function o(t,e){var n=t.getBoundingClientRect();return new i(e.clientX-n.left,e.clientY-n.top)}function s(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}var h=function(){function n(e,n){this.positionX=e,this.positionY=n,this.angle0=0,this.angle1=0,this.armLength=t.width/2.5}return n.prototype.getP0=function(){return new i(this.positionX+Math.cos(this.angle0)*this.armLength,this.positionY+Math.sin(this.angle0)*this.armLength)},n.prototype.getP1=function(){var t=this.getP0();return new i(t.x+Math.cos(this.angle1)*this.armLength,t.y+Math.sin(this.angle1)*this.armLength)},n.prototype.render=function(){e.beginPath(),e.ellipse(this.positionX,this.positionY,10,10,0,0,2*Math.PI),e.stroke();var t=this.getP0();e.beginPath(),e.moveTo(this.positionX,this.positionY),e.lineTo(t.x,t.y),e.stroke(),e.beginPath(),e.ellipse(t.x,t.y,10,10,0,0,2*Math.PI),e.stroke();var n=this.getP1();e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(n.x,n.y),e.stroke(),e.beginPath(),e.ellipse(n.x,n.y,10,10,0,0,2*Math.PI),e.stroke()},n.prototype.moveTowards=function(t){for(var e=s(t,this.getP1()),n=0,i=this.angle0,o=this.angle1;n<10&&s(t,this.getP1())>=e;)n++,this.angle0=i+(Math.random()-.5)/2e3,this.angle1=o+(Math.random()-.5)/2e3},n}(),a=new h(t.width/10,t.height/10),r=new i(0,0);function g(){e.clearRect(0,0,t.width,t.height),a.render()}t.addEventListener("mousemove",function(e){r=o(t,e)});var u=new n;function l(){for(var t=0;t<1e3;t++)a.moveTowards(r);g(),requestAnimationFrame(l)}requestAnimationFrame(l);
},{}]},{},["g4tf"], null)
//# sourceMappingURL=https://dustinroepsch.github.io/2jointarm/script.e737e3ba.map