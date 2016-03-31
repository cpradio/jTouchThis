/************************************
 *  Taken from hibbard_eu's         *
 *  jsFiddle (w/ permission)        *
 *  jsfiddle.net/hibbard_eu/k8jX7/  *
 * DON'T EDIT BELOW THIS BOX        *
 ************************************/

var colour="random";
var sparkles=50;

/****************************
 *  Tinkerbell Magic Sparkle *
 *(c)2005-13 mf2fm web-design*
 *  http://www.mf2fm.com/rv  *
 * DON'T EDIT BELOW THIS BOX *
 ****************************/
var sparkle_x=ox=400;
var sparkle_y=oy=300;
var swide=800;
var shigh=600;
var sleft=sdown=0;
var tiny=[];
var star=[];
var starv=[];
var starx=[];
var stary=[];
var tinyx=[];
var tinyy=[];
var tinyv=[];

function initSparkles() {
    var i, rats, rlef, rdow;
    for (i=0; i<sparkles; i++) {
        rats=createDiv(3, 3);
        rats.style.visibility="hidden";
        rats.style.zIndex="999";
        document.body.appendChild(tiny[i]=rats);
        starv[i]=0;
        tinyv[i]=0;
        rats=createDiv(5, 5);
        rats.style.backgroundColor="transparent";
        rats.style.visibility="hidden";
        rats.style.zIndex="999";
        rlef=createDiv(1, 5);
        rdow=createDiv(5, 1);
        rats.appendChild(rlef);
        rats.appendChild(rdow);
        rlef.style.top="2px";
        rlef.style.left="0px";
        rdow.style.top="0px";
        rdow.style.left="2px";
        document.body.appendChild(star[i]=rats);
    }
    set_width();
    sparkle();
}

function sparkle() {
    var c;
    if (Math.abs(sparkle_x-ox)>1 || Math.abs(sparkle_y-oy)>1) {
        ox=sparkle_x;
        oy=sparkle_y;
        for (c=0; c<sparkles; c++) if (!starv[c]) {
            star[c].style.left=(starx[c]=sparkle_x)+"px";
            star[c].style.top=(stary[c]=sparkle_y+1)+"px";
            star[c].style.clip="rect(0px, 5px, 5px, 0px)";
            star[c].childNodes[0].style.backgroundColor=star[c].childNodes[1].style.backgroundColor=(colour=="random")?newColour():colour;
            star[c].style.visibility="visible";
            starv[c]=50;
            break;
        }
    }
    for (c=0; c<sparkles; c++) {
        if (starv[c]) update_star(c);
        if (tinyv[c]) update_tiny(c);
    }
    setTimeout(sparkle, 40);
}

function update_star(i) {
    if (--starv[i]==25) star[i].style.clip="rect(1px, 4px, 4px, 1px)";
    if (starv[i]) {
        stary[i]+=1+Math.random()*3;
        starx[i]+=(i%5-2)/5;
        if (stary[i]<shigh+sdown) {
            star[i].style.top=stary[i]+"px";
            star[i].style.left=starx[i]+"px";
        }
        else {
            star[i].style.visibility="hidden";
            starv[i]=0;
            return;
        }
    }
    else {
        tinyv[i]=50;
        tiny[i].style.top=(tinyy[i]=stary[i])+"px";
        tiny[i].style.left=(tinyx[i]=starx[i])+"px";
        tiny[i].style.width="2px";
        tiny[i].style.height="2px";
        tiny[i].style.backgroundColor=star[i].childNodes[0].style.backgroundColor;
        star[i].style.visibility="hidden";
        tiny[i].style.visibility="visible";
    }
}

function update_tiny(i) {
    if (--tinyv[i]==25) {
        tiny[i].style.width="1px";
        tiny[i].style.height="1px";
    }
    if (tinyv[i]) {
        tinyy[i]+=1+Math.random()*3;
        tinyx[i]+=(i%5-2)/5;
        if (tinyy[i]<shigh+sdown) {
            tiny[i].style.top=tinyy[i]+"px";
            tiny[i].style.left=tinyx[i]+"px";
        }
        else {
            tiny[i].style.visibility="hidden";
            tinyv[i]=0;
            return;
        }
    }
    else tiny[i].style.visibility="hidden";
}

document.onmousemove=mouse;
function mouse(e) {
    if (e) {
        sparkle_y=e.pageY;
        sparkle_x=e.pageX;
    }
    else {
        set_scroll();
        sparkle_y=event.y+sdown;
        sparkle_x=event.x+sleft;
    }
}

window.onscroll=set_scroll;
function set_scroll() {
    if (typeof(self.pageYOffset)=='number') {
        sdown=self.pageYOffset;
        sleft=self.pageXOffset;
    }
    else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
        sdown=document.body.scrollTop;
        sleft=document.body.scrollLeft;
    }
    else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
        sleft=document.documentElement.scrollLeft;
        sdown=document.documentElement.scrollTop;
    }
    else {
        sdown=0;
        sleft=0;
    }
}

window.onresize=set_width;
function set_width() {
    var sw_min=999999;
    var sh_min=999999;
    if (document.documentElement && document.documentElement.clientWidth) {
        if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
        if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
    }
    if (typeof(self.innerWidth)=='number' && self.innerWidth) {
        if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
        if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
    }
    if (document.body.clientWidth) {
        if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
        if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
    }
    if (sw_min==999999 || sh_min==999999) {
        sw_min=800;
        sh_min=600;
    }
    swide=sw_min;
    shigh=sh_min;
}

function createDiv(height, width) {
    var div=document.createElement("div");
    div.style.position="absolute";
    div.style.height=height+"px";
    div.style.width=width+"px";
    div.style.overflow="hidden";
    return (div);
}

function newColour() {
    var c=[];
    c[0]=255;
    c[1]=Math.floor(Math.random()*256);
    c[2]=Math.floor(Math.random()*(256-c[1]/2));
    c.sort(function(){return (0.5 - Math.random());});
    return ("rgb("+c[0]+", "+c[1]+", "+c[2]+")");
}

/*
 Flying Butterfly script (By BGAudioDr@aol.com)
 Modified slightly/ permission granted to Dynamic Drive to feature script in archive
 For full source, visit http://www.dynamicdrive.com
 */

var Ymax=8;                                //MAX # OF PIXEL STEPS IN THE "X" DIRECTION
var Xmax=8;                                //MAX # OF PIXEL STEPS IN THE "Y" DIRECTION
var Tmax=10000;                        //MAX # OF MILLISECONDS BETWEEN PARAMETER CHANGES

//FLOATING IMAGE URLS FOR EACH IMAGE. ADD OR DELETE ENTRIES. KEEP ELEMENT NUMERICAL ORDER STARTING WITH "0" !!

var floatimages=new Array();
floatimages[0]='http://24.media.tumblr.com/4cab05419bf1de1d33808c3ad2971d49/tumblr_mrai10ffnA1qb14uyo1_250.gif';
floatimages[1]='http://www.wilsoninfo.com/butterfly/butterfly-flying-away.gif';
floatimages[2] = 'http://www.sherv.net/cm/emoticons/memes/troll-meme-smiley-emoticon.gif';

//*********DO NOT EDIT BELOW***********
var NS4 = (navigator.appName.indexOf("Netscape")>=0 && parseFloat(navigator.appVersion) >= 4 && parseFloat(navigator.appVersion) < 5)? true : false;
var IE4 = (document.all)? true : false;
var NS6 = (parseFloat(navigator.appVersion) >= 5 && navigator.appName.indexOf("Netscape")>=0 )? true: false;
var wind_w, wind_h, t='', IDs=new Array();
for(i=0; i<floatimages.length; i++){
    t+=(NS4)?'<layer name="pic'+i+'" visibility="hide" width="10" height="10"><a href="javascript:hidebutterfly()">' : '<div id="pic'+i+'" style="position:absolute; visibility:hidden;width:10px; height:10px"><a href="javascript:hidebutterfly()">';
    t+='<img src="'+floatimages[i]+'" name="p'+i+'" border="0">';
    t+=(NS4)? '</a></layer>':'</a></div>';
}
document.body.innerHTML = t + document.body.innerHTML;

function moveimage(num){
    if(getidleft(num)+IDs[num].W+IDs[num].Xstep >= wind_w+getscrollx())IDs[num].Xdir=false;
    if(getidleft(num)-IDs[num].Xstep<=getscrollx())IDs[num].Xdir=true;
    if(getidtop(num)+IDs[num].H+IDs[num].Ystep >= wind_h+getscrolly())IDs[num].Ydir=false;
    if(getidtop(num)-IDs[num].Ystep<=getscrolly())IDs[num].Ydir=true;
    moveidby(num, (IDs[num].Xdir)? IDs[num].Xstep :  -IDs[num].Xstep , (IDs[num].Ydir)?  IDs[num].Ystep:  -IDs[num].Ystep);
}

function getnewprops(num){
    IDs[num].Ydir=Math.floor(Math.random()*2)>0;
    IDs[num].Xdir=Math.floor(Math.random()*2)>0;
    IDs[num].Ystep=Math.ceil(Math.random()*Ymax);
    IDs[num].Xstep=Math.ceil(Math.random()*Xmax)
    setTimeout('getnewprops('+num+')', Math.floor(Math.random()*Tmax));
}

function getscrollx(){
    if(NS4 || NS6)return window.pageXOffset;
    if(IE4)return document.body.scrollLeft;
}

function getscrolly(){
    if(NS4 || NS6)return window.pageYOffset;
    if(IE4)return document.body.scrollTop;
}

function getid(name){
    if(NS4)return document.layers[name];
    if(IE4)return document.all[name];
    if(NS6)return document.getElementById(name);
}

function moveidto(num,x,y){
    if(NS4)IDs[num].moveTo(x,y);
    if(IE4 || NS6){
        IDs[num].style.left=x+'px';
        IDs[num].style.top=y+'px';
    }}

function getidleft(num){
    if(NS4)return IDs[num].left;
    if(IE4 || NS6)return parseInt(IDs[num].style.left);
}

function getidtop(num){
    if(NS4)return IDs[num].top;
    if(IE4 || NS6)return parseInt(IDs[num].style.top);
}

function moveidby(num,dx,dy){
    if(NS4)IDs[num].moveBy(dx, dy);
    if(IE4 || NS6){
        IDs[num].style.left=(getidleft(num)+dx)+'px';
        IDs[num].style.top=(getidtop(num)+dy)+'px';
    }}

function getwindowwidth(){
    if(NS4 || NS6)return window.innerWidth;
    if(IE4)return document.body.clientWidth;
}

function getwindowheight(){
    if(NS4 || NS6)return window.innerHeight;
    if(IE4)return document.body.clientHeight;
}

function init(){
    initSparkles();

    wind_w=getwindowwidth();
    wind_h=getwindowheight();
    for(i=0; i<floatimages.length; i++){
        IDs[i]=getid('pic'+i);
        if(NS4){
            IDs[i].W=IDs[i].document.images["p"+i].width;
            IDs[i].H=IDs[i].document.images["p"+i].height;
        }
        if(NS6 || IE4){
            IDs[i].W=document.images["p"+i].width;
            IDs[i].H=document.images["p"+i].height;
        }
        getnewprops(i);
        moveidto(i , Math.floor(Math.random()*(wind_w-IDs[i].W)), Math.floor(Math.random()*(wind_h-IDs[i].H)));
        if(NS4)IDs[i].visibility = "show";
        if(IE4 || NS6)IDs[i].style.visibility = "visible";
        startfly=setInterval('moveimage('+i+')',Math.floor(Math.random()*100)+100);
    }}

function hidebutterfly(){
    for(i=0; i<floatimages.length; i++){
        if (IE4)
            eval("document.all.pic"+i+".style.visibility='hidden'")
        else if (NS6)
            document.getElementById("pic"+i).style.visibility='hidden'
        else if (NS4)
            eval("document.pic"+i+".visibility='hide'")
        clearInterval(startfly)
    }
}

if (NS4||NS6||IE4){
    window.onload=init;
    window.onresize=function(){ wind_w=getwindowwidth(); wind_h=getwindowheight(); }
}
