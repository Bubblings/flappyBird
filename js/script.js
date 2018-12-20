!function(a,b,c){"use strict";var d=b.getElementById("main"),e=b.getElementById("score"),f=b.getElementById("ready"),g=b.getElementById("over"),h=b.getElementById("panel"),i=b.getElementById("restart"),j=b.getElementById("start"),k=b.getElementById("fly"),l=b.getElementById("across"),m=b.getElementById("end"),n="start",o=200,p=0,q={ele:b.getElementById("lawn"),start:function(){var a=this.ele,b=parseInt(util.getStyle(a,"width"),10);a.timer=setInterval(function(){a.offsetLeft<-b/2&&(a.style.left=0),a.style.left=a.offsetLeft-5+"px"},30)},stop:function(){clearInterval(this.ele.timer)}},r={ele:b.getElementById("pillar"),init:function(){for(var a="",b=0;b<3;b++){var c=this._randomPillarHeight();a+='<div class="item" style="left: '+o*b+'px"><div class="item-up" style="height: '+c.up+'px"></div><div class="item-down" style="height: '+c.down+'px"></div></div>'}this.ele.innerHTML=a,this.ele.style.left=2*d.offsetWidth+"px"},start:function(){var a=this,b=a.ele;b.timer=setInterval(function(){b.style.left=b.offsetLeft-4+"px";for(var c=b.children,d=0,e=c.length;d<e;d++)a._check(s,c[d])&&u.over(),u.updateScore(a.bird,c[d]);if(b.offsetLeft<=-o){var f=b.appendChild(b.children[0]),g=a._randomPillarHeight();f.children[0].style.height=g.up,f.children[1].style.height=g.down,a._setPillarPosition(),b.style.left=0}},30)},stop:function(){clearInterval(this.ele.timer)},_randomPillarHeight:function(){var a=d.offsetHeight,b=parseInt(Math.random()*(a-140-140),10)+70;return{up:b,down:a-140-b}},_setPillarPosition:function(){for(var a=0;a<3;a++)this.ele.children[a].style.left=o*a+"px"},_overlay:function(a,b,c,d,e,f,g,h){return e<a+c&&a<e+e&&f<b+d&&b<f+h},_check:function(a,b){var c=r.ele.offsetLeft,d=10,e={x:b.offsetLeft+c+d,y:0,w:69-2*d,h:b.children[0].offsetHeight},f={x:b.offsetLeft+c+d,y:b.children[1].offsetTop,w:69-2*d,h:b.children[1].offsetHeight};return this._overlay(a.x,a.y,a.w,a.h,e.x,e.y,e.w,e.h)||this._overlay(a.x,a.y,a.w,a.h,f.x,f.y,f.w,f.h)}},s={ele:b.getElementById("bird"),x:90,y:0,w:44,h:30,g:1.5,jumpHeight:60,fly:function(){var a=this,b=a.ele,c=0,e=0,f=Math.sqrt(2*a.g*a.jumpHeight),g=parseInt(b.style.bottom,10),h=d.offsetHeight-b.offsetHeight;g>=h||(clearInterval(b.timer),b.timer=setInterval(function(){c+=.9;var d=f*c-a.g*c*c*.5,h=g+d;h<=0&&u.over(),e=parseInt(g-h)/2,e>90&&(e=90),e<-30&&(e=-30),a.rotate(e),b.style.bottom=h+"px",a.y=b.offsetTop},30))},rotate:function(a){this.ele.style.webkitTransform="rotate("+a+"deg)",this.ele.style.mozTransform="rotate("+a+"deg)",this.ele.style.transform="rotate("+a+"deg)"},died:function(){clearInterval(this.ele.timer),util.addClass(s.ele,"died"),parseInt(this.ele.style.bottom,10)>30&&util.animate(this.ele,{bottom:0},{duration:500,easing:"easeIn"}),util.animate(g,{top:140},{duration:500,type:"easeInOut"}),this.rotate(90)}},t={start:function(){j.play()},fly:function(){k.play()},across:function(){l.play()},end:function(){m.play()}},u={init:function(){f.style.display="block",r.init(),q.start(),this.addEvent()},addEvent:function(){var a=this;util.bindEvent(b,"keydown",function(b){32===(b||event).keyCode&&"over"!==n&&(a.paly(),t.fly())}),util.bindEvent(b,"touchstart",function(){"over"!==n&&(a.paly(),t.fly())}),util.bindEvent(i,"click",function(){a.reset()}),util.bindEvent(i,"touchstart",function(){a.reset()})},paly:function(){"start"===n&&(this.start(),n="play"),s.fly()},start:function(){r.start(),util.animate(f,{opacity:0},{duration:500})},reset:function(){n="start",e.style.cssText="",f.style.cssText="",f.style.display="block",g.style.cssText="",s.ele.style.bottom="200px",s.rotate(0),util.removeClass(s.ele,"died"),e.innerHTML=0,p=0,this.init(),t.start()},over:function(){n="over",q.stop(),r.stop(),s.died(),t.end(),e.style.display="none",h.children[0].innerHTML=p;try{var a=localStorage.getItem("flappyBirdBestScore")||0;p>=a&&(a=p),h.children[1].innerHTML=a,localStorage.setItem("flappyBirdBestScore",a)}catch(a){h.children[1].innerHTML=p}},updateScore:function(a,b){var c={x:90},d={x:b.offsetLeft+r.ele.offsetLeft,w:69};c.x>d.x&&c.x<=d.x+d.w&&(b.crossing=!0),c.x>d.x+d.w&&b.crossing&&(p+=1,b.crossing=!1,e.innerHTML=p,t.across())}};a.game=u}(window,document),function(a,b,c){"use strict";var d={linear:function(a,b,c,d){return c*a/d+b},easeIn:function(a,b,c,d){return c*(a/=d)*a+b},easeOut:function(a,b,c,d){return-c*(a/=d)*(a-2)+b},easeInOut:function(a,b,c,d){return(a/=d/2)<1?c/2*a*a+b:-c/2*(--a*(a-2)-1)+b}};a.console||(a.console={log:function(){},error:function(){}}),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xa0\u3000\u00A0]+|[\s\uFEFF\xa0\u3000\u00A0]+$/g,"")});var e={getStyle:function(a,b){return a.currentStyle?a.currentStyle[b]:getComputedStyle(a,!1)[b]},getByClass:function(a,c){if(c=c||b,c.getElementsByClassName)return c.getElementsByClassName(a);for(var d=new RegExp("(^|\\s)"+a+"($|\\s)","i"),e=[],f=c.getElementsByTagName("*"),g=0,h=f.length;g<h;g++)d.test(f[g].className)&&e.push(f[g]);return e},bindEvent:function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,function(){c.call(a,event)}):a["on"+b]=function(a){var b=a||event;c(b)}},hasClass:function(a,b){return a.classList?a.classList.contains(b):new RegExp("(^|\\s)"+b+"($|\\s)","i").test(a.className)},addClass:function(a,b){e.hasClass(a,b)||(a.classList?a.classList.add(b):a.className=(a.className.trim()+" "+b).trim())},removeClass:function(a,b){if(e.hasClass(a,b))if(a.classList)a.classList.remove(b);else{var c=new RegExp("(^|\\s+)"+b+"($|\\s+)","ig");a.className=a.className.replace(c," ").trim()}},toggleClass:function(a,b){e.hasClass(a,b)?e.removeClass(a,b):e.addClass(a,b)},animate:function(a,b,c){c=c||{},c.duration=c.duration||400,c.easing=c.easing||"linear";var f=+new Date,g={};for(var h in b)g[h]="opacity"===h?Math.round(100*e.getStyle(a,h)):parseInt(e.getStyle(a,h),10);clearInterval(a.timer),a.timer=setInterval(function(){var e=Math.min(+new Date-f,c.duration);for(var h in b){var i=d[c.easing](e,g[h],parseInt(b[h],10)-g[h],c.duration);"opacity"===h?(a.style.opacity=i/100,a.style.filter="alpha(opacity = "+i+")"):a.style[h]=i+"px"}e>=c.duration&&(clearInterval(a.timer),c.complete&&c.complete())},20)}};a.util=e}(window,document);