
// ==UserScript==
// @name 			12306.CN 订票助手 For Firefox&Chrome
// @namespace		http://www.u-tide.com/fish/
// @author			iFish@FishLee.net <ifish@fishlee.net> http://www.fishlee.net/
// @developer		iFish
// @contributor		
// @description		帮你订票的小助手 :-)
// @match			http://dynamic.12306.cn/otsweb/*
// @match			https://dynamic.12306.cn/otsweb/*
// @match			https://www.12306.cn/otsweb/*
// @require			http://lib.sinaapp.com/js/jquery/1.8.3/jquery.min.js
// @icon			http://www.12306.cn/mormhweb/images/favicon.ico
// @run-at			document-idle
// @version 		4.6.4
// @updateURL		http://static.fishlee.net/_softdownload/12306_ticket_helper.user.js
// @supportURL		http://www.fishlee.net/soft/44/
// @homepage		http://www.fishlee.net/soft/44/
// @contributionURL	https://me.alipay.com/imfish
// @contributionAmount	￥5.00
// ==/UserScript==

//=======START=======

var version = "4.6.4";
var updates = [
	"修正部分情况下余票数显示不正常",
	"其它细节修改"
];

var faqUrl = "http://www.fishlee.net/soft/44/faq.html";
//标记
var utility_emabed = false;
var compVersion = "5.71";


//#region -----------------UI界面--------------------------

function initUIDisplay() {
	injectStyle();
}

/**
 * 将使用的样式加入到当前页面中
 */
function injectStyle() {
	var s = document.createElement("style");
	s.id = "12306_ticket_helper";
	s.type = "text/css";
	s.textContent = "\
.fish_running, .fish_clock, .fish_error, .fish_ok {line-height:20px;text-indent:18px;background-repeat:no-repeat;background-position:2px 50%;font-size:12px;}\
.fish_running{background-image:url(data:image/gif;base64,R0lGODlhEAAQALMPAHp6evf394qKiry8vJOTk83NzYKCgubm5t7e3qysrMXFxe7u7pubm7S0tKOjo////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCAAPACwAAAAAEAAQAAAETPDJSau9NRDAgWxDYGmdZADCkQnlU7CCOA3oNgXsQG2FRhUAAoWDIU6MGeSDR0m4ghRa7JjIUXCogqQzpRxYhi2HILsOGuJxGcNuTyIAIfkECQgADwAsAAAAABAAEAAABGLwSXmMmjhLAQjSWDAYQHmAz8GVQPIESxZwggIYS0AIATYAvAdh8OIQJwRAQbJkdjAlUCA6KfU0VEmyGWgWnpNfcEAoAo6SmWtBUtCuk9gjwQKeQAeWYQAHIZICKBoKBncTEQAh+QQJCAAPACwAAAAAEAAQAAAEWvDJORejGCtQsgwDAQAGGWSHMK7jgAWq0CGj0VEDIJxPnvAU0a13eAQKrsnI81gqAZ6AUzIonA7JRwFAyAQSgCQsjCmUAIhjDEhlrQTFV+lMGLApWwUzw1jsIwAh+QQJCAAPACwAAAAAEAAQAAAETvDJSau9L4QaBgEAMWgEQh0CqALCZ0pBKhRSkYLvM7Ab/OGThoE2+QExyAdiuexhVglKwdCgqKKTGGBgBc00Np7VcVsJDpVo5ydyJt/wCAAh+QQJCAAPACwAAAAAEAAQAAAEWvDJSau9OAwCABnBtQhdCQjHlQhFWJBCOKWPLAXk8KQIkCwWBcAgMDw4Q5CkgOwohCVCYTIwdAgPolVhWSQAiN1jcLLVQrQbrBV4EcySA8l0Alo0yA8cw+9TIgAh+QQFCAAPACwAAAAAEAAQAAAEWvDJSau9WA4AyAhWMChPwXHCQRUGYARgKQBCzJxAQgXzIC2KFkc1MREoHMTAhwQ0Y5oBgkMhAAqUw8mgWGho0EcCx5DwaAUQrGXATg6zE7bwCQ2sAGZmz7dEAAA7); color: green;}\
.fish_clock{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG/SURBVHjapJM/S8NQFMVvpaVfoEKojWL9U3DLIqjoooJDu/sFmnQoiIujQz+Aix3a1FUQXIR2UFA6+WeRUhBprERroGTopg6lSeo7iY1pq4sNHPpy3+8c7n0v9XW7XRrl8SFAlmVvbYFpmynOJHzXKkwlphOmxx4oiiL5sbAsi1KpFOVyuWQwGMzEYjEuGo0Sx3E2qOu6oKqqoChKst1u7zO2wNifDrLZLNbJUCgkLy2vEM/zv7araRrd3lxTq9US2WshnU7TGDZM01zwBwKZxaVlCkd4MtmxQDXlyVbvHXtgwMIDrx3Q6XS2Z2bnufDEJJkWuWIt2/LWwICFxw0wDCM+PTPXB0K4IGiwDhYeeP3fHQjjXIQMq3/mev3J/l0fqIOFxxtAxi+fg/rsBOztSE7QVpwpQT2PN6Dy1mgIYX7KNZcvipQ5yA+Fosum1rA93jMo1R6q7oxX50Va20wMzd4TWHi8t3BSvb/T1bpz4qsbf5vBgIXHDWB3+vj58b5fPj9jc9fcex8U9sCAhcc7Au1mDgtN7VU8Oz7SL0un9PbyTBYzQVijhj0wYOFxP2VJkv71Z8rn807AKM+XAAMArp1CsEFrDIIAAAAASUVORK5CYII=); color: blue;}\
.fish_error{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJFSURBVHjapJO/T1pRFMe/Dx7ypEXri4lUGUhsHF40hODSpQ61cTH+2HSoZaF1dHSxpU7+Ca04NE7dyuBiapcuLFokTdD4A01awNdBSkAf8ut5zhUoxq3e5OS+nPv5nnvuyfdJpmniPksSBd68aM1pFDMU4xS+ei5GsUHxmSLRJD9+hcx7rVqFZWwMtc3NIGy2Zam31yX19ABdXTdgNuszdd1nptNBlMtviQ0TC0ujg1LgGWNByelctQ4M4G8qhfN4HLmDA6HvpJzq9eJRXx+qlDPz+deUDrd9+i6KoFouazVg2erx4M/uLn5FItGLk5NX/qUliYO+I2o2C4vLBWaYZQ1rRYFyqTQDVXXl02mcb29HbXb7S+/CwjqKRSAaDXlHRqYwOoqdxUUww6zQNApUSqVxuaMDF8kk2hTlgxYIHMMwaHSxEB2/a4g7u7sjzDDLmn8dXF35ZJsNVWrzycTEOtxuYH//lpjWezqbZoZZ1rQ+AXyj3eEQO7a27oj9s7OhVkZoWjqIFXUdD1QVub29L3fEk5MhXF7y2RwzzLKmdQYb+UwGiqLwO6duiVdWxM2GrvfTfOaZYZY1TScmvE7NKsvf3B6PyzE8jB9ra6DJR2TTnBYXSNIcbfN021Mjl8Pv09OzaqXyXIvnE6LAT00RRlLa21cfk1kesgNpULBab5xITiUHokADzJDJioYhjDSUKNafUKlgaHAwXCCHJQ8Pz1JHRyhQm2RhEfzNOT5jhlnWNJ+w0y/918/kPzbrf+M91rUAAwCuQDz94e2kLwAAAABJRU5ErkJggg==); color: blue;}\
.fish_ok{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHsSURBVHjapFNBSBtBFH2xgoqmKipEC6XkYqhUWXOxUAQhpyJ4Wgi0l0rNsdBbL/WgF2/eV8hNSBF68uhFkOrFhCAGS8mWgmYjG9lCKVGTuP1vsrvuIac68HZm/n/vz5/9fyKu6+IhI8IA5k4kbHsuSAsWBZpnKwh2BTlBySfGdTmcAX7kOJc5r5hfhyw7/86t21/EVVbgmjb6yPG4SqsyONtWGaz0Dk8aYzMf0R+b65ju3+oR7OImrp3vGdluJd646KKj1ZK0H0XXRqfeo390Emg6HUEfOeQqjQwVoNFAOvpkPjYw8kw2NRgfFtQchm8jh1xqggDNJhYHY3Jy41IhmXodrDvZyKWG2m4vA23gcR9wa6m7Jue1YO2PsI1casIB5GPBWM8ilZLyvFzu+BPNwyz29oDM5+W2JhSg8NsqaRSTMHycxfg4MDHRJlUqgCWHO/IvyRGu0gQB5D671Z+mlpiZFXEejjSInrw/OS4wjiWwNFx8ehZnRVNpwlXI/SrXqvbFOfS3TxWRAtNpwxfTRw651AQZSE1Lrfrd6mmhZky96IGejuJgX5rL9HpbrvBKbHbFxunJDa6F67e0X0YsLWHr6uouc/StXi3m/yCRkNTjbXBNG33kkEtN8Jh2Pv3fY9I3vLfwkPFPgAEApRUigcIVl3AAAAAASUVORK5CYII=); color: purple;}\
.outerbox{font-family:'Microsoft Yahei','Apple LiGothic Medium',Arial,Helvetica,Sans-serif;color:#4c4c4c;width:100%;margin: 10px auto;}\
.box{border:1px solid #c6c6c6;}\
.box .title{padding:5px;line-height:23px;color:#fff;background:-webkit-linear-gradient(#707070,#2c2c2c 90%);background:-moz-linear-gradient(#707070,#2c2c2c 90%);background-color:#707070; position: relative;}\
.box .title a{color:#fff;}\
.box .time-comp{color:#fff;position:absolute;margin:2px;right:2px;top:2px;padding:1px 12px;border-radius:12px;text-shadow:0px 1px 2px rgba(0,0,0,0.6);box-shadow:0px 1px 1px rgba(255,255,255,0.2),inset 0px 0px 8px rgba(0,0,0,0.8);}\
.box .content{padding:5px;background-color:#fff}\
.box table{border-collapse:collapse;width:98%}\
.box table td{padding:5px;}\
.box table .tfooter{text-align:center;height:24px;background:-webkit-linear-gradient(#ffffff,#fafafa 90%);background:-moz-linear-gradient(#ffffff,#fafafa 90%);color:#707070;text-shadow:1px 1px 1px #fff,2px 2px 1px rgba(0,0,0,0.2);}\
.box table .tfooter a{color:#707070;}\
.box input[type=button],.fish_button{font-size:12px;font-family:'Microsoft Yahei','Apple LiGothic Medium',Arial,Helvetica,Sans-serif;padding:3px 6px;letter-spacing:1px;border-radius:3px;cursor:pointer;}\
.box .name,.box .caption,.box .caption td{font-weight:bold;-webkit-transition:all linear 0.2s;-moz-transition:all linear 0.2s;background:-webkit-linear-gradient(#fafafa,#f0f0f0 90%);background:-moz-linear-gradient(#fafafa,#f0f0f0 90%);background-color:#fafafa;}\
.box .lineButton{margin:4px 6px 4px 2px;}\
.lineButton{font-family:'Microsoft Yahei','Apple LiGothic Medium',Arial,Helvetica,Sans-serif;line-height:16px;margin-right:6px;padding:2px 4px;color:#4c4c4c;backround:#f5f5f5;background:-webkit-linear-gradient(#fff,#f0f0f0);background:-moz-linear-gradient(#fff,#f0f0f0);border:1px solid #c8c8c8;border-radius:3px;box-shadow:inset 0 1px 3px rgba(255,255,255,0.2),0 0 3px rgba(0,0,0,0.2);text-shadow:.0em .1em .1em rgba(255,255,255,0.8);-webkit-transition:all linear 0.2s;-moz-transition:all linear 0.2s;cursor:pointer;}\
.lineButton:hover{background:#f0f0f0;text-shadow:.0em .1em .1em #fff;-webkit-transition:all linear 0.1s;-moz-transition:all linear 0.1s;}\
.lineButton:active{background:#f2f2f2;background:-webkit-gradient(linear,left bottom,left top,color-stop(0%,#f2f2f2),color-stop(90%,#f2f2f2));background:-moz-linear-gradient(center bottom,#f2f2f2 0%,#f2f2f2 100%);box-shadow:inset 0px 1px 3px #cccccc,0px 0px 0px #0968bb;border-color:#d6d6d6;border-top-color:#d0d0d0;border-left-color:#d0d0d0;border-right-color:#e2e2e2;border-bottom-color:#e2e2e2;}\
.fishTab{border:5px solid #E5D9EC;font-size:12px;font-family:'Microsoft Yahei','Apple LiGothic Medium',Arial,Helvetica,Sans-serif;}\
.fishTab .innerTab{border-width:1px;border-style:solid;border-color:#C7AED5;background-color:#fff}\
.fishTab .tabNav{font-weight:bold;color:#F5F1F8;background-color:#C7AED5;line-height:25px;overflow:hidden;margin:0px;padding:0px}\
.fishTab .tabNav li{float:left;list-style:none;cursor:pointer;padding-left:20px;padding-right:20px}\
.fishTab .tabNav li:hover{background-color:#DACAE3}\
.fishTab .tabNav li.current{background-color:#fff;color:#000}\
.fishTab .tabContent{padding:5px;display:none}\
.fishTab .tabContent p{margin:10px 0px 10px 0px}\
.fishTab div.current{display:block}\
.fishTab div.control{text-align:center;line-height:25px;background-color:#F0EAF4}\
.fishTab input[type=button]{padding:5px}\
.hide{display:none}\
.fish_sep td{border-top:1px solid #d0d0d0;}\
.fish_button{color:#fff;line-height:normal;margin:0 5px;background:#0f7edb;background:-webkit-linear-gradient(#0c96f8,#1960b7);background:-moz-linear-gradient(#0c96f8,#1960b7);border:1px solid #186fb7;box-shadow:inset 0 1px 3px rgba(255,255,255,0.2),0 0 3px rgba(0,0,0,0.3);text-shadow:.0em .1em .1em rgba(50,50,50,0.8);-webkit-transition:all linear 0.2s;-moz-transition:all linear 0.2s;}\
.fish_button:hover{background:#099bff;background:-webkit-gradient(linear,left bottom,left top,color-stop(0%,#077ccc),color-stop(90%,#0abaff));background:-moz-linear-gradient(center bottom,#077ccc 0%,#0abaff 100%);border-color:#088be5;-webkit-transition:all linear 0.1s;-moz-transition:all linear 0.1s;}\
.fish_button:active{background:#0885e7;background:-webkit-gradient(linear,left bottom,left top,color-stop(0%,#066ab8),color-stop(90%,#099fff));background:-moz-linear-gradient(center bottom,#066ab8 0%,#099fff 100%);border-color:#0777cf;box-shadow:inset 0px 1px 2px #0770c3,0px 0px 0px #000;border-top-color:#0775ca;border-left-color:#0775ca;border-right-color:#087edb;border-bottom-color:#087edb;}\
tr.steps td{background-color:#E8B7C2!important;-webkit-transition:all linear 0.1s;-moz-transition:all linear 0.1s}\
tr.stepsok td{background-color:#BDE5BD!important;-webkit-transition:all linear 0.1s;-moz-transition:all linear 0.1s}\
tr.steps span.indicator{display:inline-block!important}\
tr.stepsok span.indicator{display:inline-block!important}\
.highlightrow td{background-color:#D0C0ED!important;color:red}\
#randCodeTxt{font-weight:bold;font-size:18px;text-align:center;padding:3px 10px 3px 10px;font-family:verdana!important;text-transform:uppercase}\
tr.append_row{font-family:'Microsoft Yahei','Apple LiGothic Medium',Arial,Helvetica,Sans-serif;}\
tr.append_row td{padding-left:37px;}\
tr.append_row td label{padding-right:4px;}\
#acathur{color:#fcfcfc;font-weight:bold;font-family:Segoe UI,Lucida Grande,Arial,Helvetica,Sans-serif;text-decoration:underline;text-shadow:0 0 1px #000,0px 0px 6px rgba(0,0,0,0.8);}\
div.gridbox_light .odd_light,div.gridbox_light .ev_light{background:-webkit-linear-gradient(#fff,#f6f6f6);background:-moz-linear-gradient(#fff,#f6f6f6);text-shadow:.0em .1em .1em rgba(255,255,255,0.8);}\
.validCell{ background:-webkit-linear-gradient(#e0ebff, #c7d9ff)!important; background:-moz-linear-gradient(#e0ebff, #c7d9ff)!important; color:green; }\
.validRow{background:-webkit-linear-gradient(#ffe0e5, #ffc7d0)!important;background:-moz-linear-gradient(#ffe0e5, #ffc7d0)!important;color:#700012;}\
.unValidRow{opacity:0.8;}\
.unValidCell{opacity:0.8;}\
.btn130_2 {text-shadow:none;}\
.warning{color:red;}\
input[type=checkbox].current{color:red;font-weight:bold;}\
span.leftTicketStatusSpan{color:green; font-weight:bold;}\
.gridtb { width:100%!important; }\
.gridtb th {text-align:center;padding: 5px; border-right: 1px solid #ccc; font-weight:bold;-webkit-transition:all linear 0.2s;-moz-transition:all linear 0.2s;background:-webkit-linear-gradient(#fafafa,#f0f0f0 90%);background:-moz-linear-gradient(#fafafa,#f0f0f0 90%);background-color:#fafafa;}\
.gridtb .last {border-right:none;}\
";

	document.head.appendChild(s);
}

function injectDom() {
	var html = [];
	html.push('<div id="fishOption" style="width: 600px; display:none; box-shadow: 7px 7px 10px #A67EBC;">');
	html.push('<div class="innerTab">');
	html.push('<ul class="tabNav" default="tabVersion">');
	html.push('<li tab="tabLogin">常规设置</li>');
	html.push('<li tab="tabReg">注册</li>');
	html.push('<li tab="tabFaq">常见问题</li>');
	html.push('<li tab="tabVersion">版本信息</li>');
	html.push('<li tab="tabLog">运行日志</li>');
	html.push('<li tab="tabLoginIE">登录到IE</li>');//获取登录到IE的代码 Add By XPHelper
	html.push('</ul>');
	html.push('<div class="tabContent tabLogin">');
	html.push('<table>');
	html.push('<tr>');
	html.push('<td>重试时间 ');
	html.push('<td>');
	html.push('<td><input type="text" name="login.retryLimit" size="6" value="2000" />');
	html.push('(ms)</td>');
	html.push('<td>');
	html.push('</td>');
	html.push('<td></td>');
	html.push('</tr>');
	html.push('</table>');
	html.push('</div>');
	html.push('<div class="tabContent tabReg" style="text-indent: 20px">');
	html.push('<p>为了阻止地球人他喵地拿作者无偿奉献的助手去卖钱钱，请注册唷。<strong>完全免费申请</strong>。</p>');
	html.push('<p style="color: red;"> <strong style="font-size:16px;">啊嘞……看这里！本助手完全免费啊诸位大人！</strong>任何在第三方网站上出售的软件全他喵的是侵权出售啊！！看到的时候请亲务必记得退款退货打差评向青天大老爷举报啊！！</p>');
	html.push('<p style="color:purple;"> 回家是一个单纯而简单的心愿，希望我们不会变得太复杂……</p>');
	html.push('<p>任何版本之间，功能上没有任何区别，So……不要问作者万一资助的话会有神马新功能，木有的说…… (=￣ω￣=) </p>');
	html.push('<p class="registered" style="display:none;">很高兴认识你，，<strong>fishcn@foxmail.com</strong>，谢谢你的出现~~~~已注册版本：<strong>正式版</strong>【<a href="javascript:;" id="unReg">重新注册</a>】</p>');
	html.push('<table class="regTable" style="display:none;width:98%;">');
	html.push('<tr>');
	html.push('<td>请粘贴注册码 【<a href="http://www.fishlee.net/Apps/Cn12306/GetNormalRegKey?v=1" target="_blank" style="color:blue;font-weight:bold;text-decoration:underline;">戳我直接申请注册码啊！为什么你们舍不得戳我啊 ╮(╯▽╰)╭</a>】</td>');
	html.push('</tr><tr>');
	html.push('<td style="text-align:center;"><textarea id="regContent" style="width:98%; height:50px;"></textarea></td>');
	html.push('</tr><tr>');
	html.push('<td><input type="button" id="regButton" value="注册" /></td>');
	html.push('</tr>');
	html.push('</table>');
	html.push('</div>');
	html.push('<div class="tabContent tabVersion" style="text-indent: 20px">');
	html.push('<h4 style="font-size:18px; font-weight:bold; margin: 0px; line-height: 26px; border-bottom: 1px dotted #ccc;">12306 订票助手 <small>ver ' + window.helperVersion + '</small></h4>');
	html.push('<p> 12306 订票助手是一款用于订票的助手软件，嗯……看到这里相信你已经知道它支持神马浏览器了 =。=<strong>完全免费，无需付费使用，仅接受捐助。</strong> </p>');
	html.push('<p style="color: red;"> <strong style="font-size:16px;">啊嘞……看这里！本助手完全免费啊诸位大人！</strong>任何在第三方网站上出售的软件全他喵的是侵权出售啊！！看到的时候请亲务必记得退款退货打差评向青天大老爷举报啊！！</p>');
	html.push('<p style="color:purple;"> 回家是一个单纯而简单的心愿，希望我们不会变得太复杂……</p>');
	html.push('<p> 有很多朋友资助作者，正在木有暖气的南方饱受煎熬的作者感激涕零 ≥ω≤。<a href="http://www.fishlee.net/soft/44/donate.html" target="_blank">戳这里了解捐助详情</a>。 </p>');
	html.push('<p style="font-weight:bold;">当前版本更新内容</p>');
	html.push('<ol>');
	$.each(utility.getPref("updates").split('\t'), function (i, n) {
		html.push("<li style='padding:0 0 6px 20px;list-style:disc inside;'>" + n + "</li>");
	});
	html.push('</ol>');
	html.push('</div>');
	html.push('<div class="tabContent tabFaq">');
	html.push('<table>');
	html.push('<tr>');
	html.push('<td colspan="4"> 你在订票过程中可能……会遇到各种问题，由于介个12306网站本身呢……木有没有任何介绍 ╮(╯▽╰)╭ ，所以老衲整理了相关问题，供客官参考。如果还有不明白的问题，加群讨论呗  (=￣ω￣=) 。 <br /><br />');
	html.push('1.放票非正点也，So在将近放票的时候，务必保持刷新状态哈，而且……当整点没有放票时，不要放弃继续刷新喔；<br />\
2.动车都是11点放票撒，切记切记；<br />\
3.第一波放票悲催地木有订到时，请耐心等待，因为现在放票有N多节点，随时会有票出来，晚很久才放票也正常，铁老大经常秀下限嘀；<br />\
4.如果您的车票很难买，请尽量发动你的七大姑八大姨神马的一堆朋友过来集体帮忙，同时建议用多个浏览器刷票，因为缓存的关系不同的浏览器出现票的时间可能不同；<br />\
5.最新版3.9.0中的预先选择铺位功能有点淡化了……要用的话，使用优选席别，第一个优选的将会被自动选中 ^_^<br />\
<br />\
好了，废话说完鸟，祝大家买票顺利，贫僧只希望不会帮倒忙就好了 ╮(╯▽╰)╭<br />\
如果您还有问题的话，<a href="http://www.fishlee.net/soft/44/tour.html" target="_blank">建议点击这里查看教程~~~~</a>\
');
	html.push('</td></tr>');
	html.push('<tr style="display:none;">');
	html.push('<td><a href="http://www.fishlee.net/soft/44/12306faq.html" target="_blank">订票常见问题</a></td>');
	html.push('<td><a href="http://www.fishlee.net/soft/44/faq.html" target="_blank">助手运行常见问题</a></td>');
	html.push('</tr>');
	html.push('</table>');
	html.push('</div><div class="tabLog tabContent"><div>下面是当前页面的记录。如果您的助手遇到功能上的问题，请全部复制后发成邮件给作者：ifish@fishlee.net 以便于老衲解决问题。<span style="color:red;font-weight:bold;">请在发送前务必剔除记录中包含的个人隐私如密码等信息。</span></div><textarea id="runningLog" style="width:100%;height:200px;"></textarea></div>');
	//获取登录到IE的代码 Add By XPHelper
	html.push('<div class="tabLoginIE tabContent"><div><strong>先在IE中打开 https://dynamic.12306.cn/otsweb，</strong>再将以下代码复制到IE浏览器的地址栏。确认地址栏最前面有“javascript:”字样，没有请手动加上（IE10会自动删除这样的代码），然后敲回车，等待页面刷新后，即可自动登录。</div><textarea id="LoginIECode" style="width:100%;height:200px;"></textarea></div>');
	html.push('<div class="control">');
	html.push('<input type="button" class="close_button" value="关闭" />');
	html.push('</div>');
	html.push('</div>');
	html.push('</div>');

	$("body").append(html.join(""));

	var opt = $("#fishOption");
	$("#regButton").click(function () {
		var sn = $.trim($("#regContent").val());

		var rt = utility.verifySn(false, "", sn);
		if (rt.result != 0) {
			alert("很抱歉, 注册失败. 代码 " + rt.result + ", " + rt.msg);
		} else {
			utility.setSnInfo("", sn);
			alert("注册成功, 请刷新浏览器。\n注册给 - " + rt.name + " , 注册类型 - " + rt.typeDesc.replace(/<[^>]*>/gi, ""));

			try {
				utility.getTopWindow().location.reload();
			} catch (e) {
				alert("权限不足无法刷新页面， 请手动刷新当前页！");
			}
		}
	});
	$("#unReg, a.reSignHelper").live("click", function () {
		if (utility.regInfo.result == 0) {
			if (!confirm("确定要重新注册吗?")) return;

			utility.setSnInfo("", "");
			utility.getTopWindow().location.reload();
		} else {
			utility.getTopWindow().utility.showOptionDialog("tabReg");
		}
	});

	//初始化设置
	utility.configTab = utility.fishTab(opt);
	opt.find("input[name]").each(function () {
		var el = $(this);
		var key = el.attr("name");
		var value = window.localStorage.getItem(key);
		if (!value) return;

		if (el.attr("type") == "checkbox") {
			el.attr("checked", value == "1");
		} else {
			el.val(value);
		}
	}).change(function () {
		var el = $(this);
		var key = el.attr("name");

		if (el.attr("type") == "checkbox") {
			window.localStorage.setItem(key, el[0].checked ? 1 : 0);
		} else {
			window.localStorage.setItem(key, el.val());
		}
	});
	$("#configLink, .configLink").live("click", function () {
		var el = $(this);
		var dp = el.attr("tab");
		console.log("require to show tab " + dp);

		utility.getTopWindow().utility.showLoginIE();
		utility.getTopWindow().utility.showOptionDialog(dp || "");
	});
	//新版本更新显示提示
	if (utility.getPref("helperVersion") != window.helperVersion) {
		//清空禁止标记位
		utility.clearFeatrueDisabled();
		//加入已知的不可用的功能标记
		var preDisabled = ['ontimequeuecount'];
		if (!utility.isAdvancedSupport()) preDisabled.push("ontimeleftticket");
		utility.setPref("disabled", preDisabled.join("|"));
		utility.disabledFeaturesCache = null;
		//删除Cookies，反检测。
		(function () { var p = new Date(); p.setTime(p.getTime() - 1000); for (var i = 0; i < arguments.length; i++) document.cookie = (arguments[i] + "=; path=/; domain=.12306.cn; expires=" + p.toGMTString()); })("helper.regUser", "helper.regSn");
		//删除联系人
		utility.setPref("pas", "");

		//检测老版本设置
		if (utility.getAudioUrl().indexOf("github") != -1 || utility.getAudioUrl().indexOf("resbak.") != -1) {
			utility.resetAudioUrl();
		}

		utility.setPref("helperVersion", window.helperVersion);
		//仅顶层页面显示
		try {
			if (parent == self)
				utility.showOptionDialog("tabVersion");
		} catch (ex) {
			//跨域了，也是顶级
			utility.showOptionDialog("tabVersion");
		}
	}

	//注册
	var result = utility.verifySn(true);
	if (result.result == 0) {
		var info = opt.find(".registered").show().find("strong");
		info.eq(0).html(result.name);
		info.eq(1).html(result.typeDesc);


	} else {
		opt.find(".regTable").show();

		if (location.pathname == "/otsweb/" || location.pathname == "/otsweb/main.jsp") {
			alert("为了阻止地球人趁火打劫然后拿着老衲免费奉献的东东去卖钱，贫僧斗胆麻烦客官……啊不，施主注册下下，一下子就好了啦！");
			window.open("http://www.fishlee.net/Apps/Cn12306/GetNormalRegKey");
			utility.showOptionDialog("tabReg");
		}
	}
	utility.regInfo = result;
}

//#endregion

//#region -----------------执行环境兼容----------------------

var utility = {
	configTab: null,
	icon: "http://www.12306.cn/mormhweb/images/favicon.ico",
	notifyObj: null,
	timerObj: null,
	regInfo: null,
	disabledFeaturesCache: null,
	isWebKit: function () {
		return window.webkitNotifications || false;
	},
	isFirefox: function () {
		return !utility.isWebKit();
	},
	parseJSON: function (text) {
		if (!JSON || !JSON.parse) alert("您的浏览器版本过低，请升级浏览器！");
		else return JSON.parse(text);
	},
	toJSON: function (obj) {
		if (!JSON || !JSON.parse) alert("您的浏览器版本过低，请升级浏览器！");
		else return JSON.stringify(obj);
	},
	disabledFeatures: function () {
		/// <summary>获得当前禁止的功能</summary>
		if (!utility.disabledFeaturesCache) {
			utility.disabledFeaturesCache = (utility.getPref("disabled") || "").split('|');
		}
		return utility.disabledFeaturesCache;
	},
	isfeatureDisabled: function (flag) {
		/// <summary>测试指定的功能是否已经被禁止</summary>
		/// <param name="flag" type="String">测试的功能标记</param>
		return $.inArray(flag, utility.disabledFeatures()) != -1;
	},
	disableFeature: function (flag) {
		utility.disabledFeaturesCache.push(flag);
		utility.setPref("disabled", utility.disabledFeaturesCache.join('|'));
	},
	clearFeatrueDisabled: function () {
		/// <summary>清空禁止标记位</summary>
		utility.setPref("disabled", "");
		utility.disabledFeaturesCache = [];
	},
	getScriptVersion: function () {
		/// <summary>获得12306的网站脚本版本</summary>
		return /=([\d\.]+)$/i.exec($("script[src*=/otsweb/]:eq(0)").attr("src") + "")[1];
	},
	checkCompatible: function () {
		var sv = utility.getScriptVersion();
		if (sv != window.compVersion) {
			if (utility.getPref("compWarning") != sv) {
				utility.setPref("compWarning", sv);
				alert("警告：检测到12306已改版，助手功能可能会部分失效。请在正式购票前做好测试，以免耽误您的购票。\n出现任何异常时，请暂时手动或改用IE购票，并留意助手升级。");
			}
			$(".versionWarning").show();

			var istop = false;
			try {
				istop = self == parent;
			} catch (e) {
				istop = true;
			}
			if (!istop) {
				$("body").prepend("<div style='opacity:0.9;z-index:999; position:fixed; left:-350px; top:0px; width: 700px;margin-left:50%; color:#8A0023;border:1px solid #8A0023;line-height: 20px;background: -webkit-linear-gradient(#FFE4EA, #FFC3D1);background: -moz-linear-gradient(#FFE4EA, #FFC3D1);padding: 5px;'>亲，<strong>老衲用旁光发现网站改版鸟</strong>！由于还木有测试当前助手的兼容性，请务必在正式购票前做好测试哈！必要时请先用IE顶着喔。</div>");
			}
		} else {
			$(".versionWarning").hide();
		}
	},
	trim: function (data) {
		if (typeof ($) != 'undefined') return $.trim(data);

		return data.replace(/(^\s+|\s+$)/g, "");
	},
	getTopWindow: function () {
		try {
			if (parent == self) return self;
			else return parent.window.utility.getTopWindow();
		} catch (e) {
			//跨域的话，也是顶层
			return self;
		}
	},
	init: function () {
		$.extend({
			any: function (array, callback) {
				var flag = false;
				$.each(array, function (i, v) {
					flag = callback.call(this, i, v);
					if (flag) return false;
				});
				return flag;
			},
			first: function (array, callback) {
				var result = null;
				$.each(array, function (i, v) {
					result = callback.call(this, i, v);
					if (result) return false;
				});
				return result;
			}
		});


		if (utility.isWebKit) {
			$(document).ajaxSend(function (e, xhr, obj) { if (obj.refer) xhr.setRequestHeader("TRefer", obj.refer); });
		}
	},
	runningQueue: null,
	appendLog: function (settings) {
		/// <summary>记录日志</summary>
		if (!utility.runningQueue) utility.runningQueue = [];
		var log = { url: settings.url, data: settings.data, response: null, success: null };
		if (log.url.indexOf("Passenger") != -1) return;	//不记录对乘客的请求

		utility.runningQueue.push(log);
		settings.log = log;
	},
	showLog: function () {
		if (!utility.runningQueue) {
			alert("当前页面尚未产生日志记录。");
			return;
		}

		var log = [];
		$.each(utility.runningQueue, function () {
			log.push("成功：" + (this.success ? "是" : "否") + "\r\n地址：" + this.url + "\r\n提交数据：" + utility.formatData(this.data) + "\r\n返回数据：" + utility.formatData(this.response));
		});
		$("#runningLog").val(log.join("\r\n----------------------------------\r\n"));

		utility.showOptionDialog("tabLog");
	},
	//获取登录到IE的代码 Add By XPHelper
	showLoginIE: function () {
		var strCookie = document.cookie;
		var arrCookie = strCookie.split("; ");
		var IECode = "javascript:";
		var cookie = [];
		for (var i = 0; i < arrCookie.length; i++) {
			var arr = arrCookie[i].split("=");
			if (arr.length < 2 || arr[0].indexOf("helper.") != -1) continue;
			cookie.push("document.cookie=\"" + arr[0] + "=" + arr[1] + "\";");
		}
		IECode += cookie.join("");
		IECode += "self.location.reload();";
		$("#LoginIECode").val(IECode);
	},
	formatData: function (data) {
		if (!data) return "(null)";
		if (typeof (data) == "string") return data;
		var html = [];
		for (var i in data) {
			html.push('"' + i + '":\"' + (this[i] + "").replace(/(\r|\n|")/g, function (a) { "\\" + a; }) + '\"');
		}
		return "{" + html.join(",") + "}";
	},
	notify: function (msg, timeout) {
		console.log("信息提示: " + msg);
		if (window.webkitNotifications) {
			if (window.webkitNotifications.checkPermission() == 0) {
				utility.closeNotify();

				if (utility.notifyObj == null)
					utility.notifyObj = webkitNotifications.createNotification(utility.icon, '订票', msg);
				utility.notifyObj.show();
				if (!timeout || timeout != 0) utility.timerObj = setTimeout(utility.closeNotify, timeout || 5000);
			} else {
				alert("【啊喂！！桌面通知还木有开启！请戳界面中的『点击启用桌面通知』按钮来开启！】\n\n" + msg);
			}
		} else {
			if (typeof (GM_notification) != 'undefined') {
				GM_notification(msg);
			} else {
				console.log("主页面中脚本信息, 无法提示, 写入通知区域.");
				utility.notifyOnTop(msg);
			}
		}
	},
	notifyOnTop: function (msg) {
		window.localStorage.setItem("notify", msg);
	},
	closeNotify: function () {
		if (!utility.notifyObj) return;

		utility.notifyObj.cancel();
		if (utility.timerObj) {
			clearTimeout(utility.timerObj);
		}
		utility.timerObj = null;
		utility.notifyObj = null;
	},
	setPref: function (name, value) {
		window.localStorage.setItem(name, value);
	},
	getPref: function (name) {
		return window.localStorage.getItem(name);
	},
	unsafeCallback: function (callback) {
		if (typeof (unsafeInvoke) == "undefined") callback();
		else unsafeInvoke(callback);
	},
	getTimeInfo: function () {
		var d = new Date();
		return d.getHours() + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes() + ":" + (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();
	},
	savePrefs: function (obj, prefix) {
		var objs = obj.find("input");
		objs.change(function () {
			var type = this.getAttribute("type");
			if (type == "text") utility.setPref(prefix + "_" + this.getAttribute("id"), $(this).val());
			else if (type == "checkbox") utility.setPref(prefix + "_" + this.getAttribute("id"), this.checked ? 1 : 0);
		})
	},
	reloadPrefs: function (obj, prefix) {
		var objs = obj.find("input");
		prefix = prefix || "";
		objs.each(function () {
			var e = $(this);
			var type = e.attr("type");
			var id = e.attr("id");
			var value = utility.getPref(prefix + "_" + id);
			if (typeof (value) == "undefined" || value == null) return;

			if (type == "text") e.val(value);
			else if (type == "checkbox") this.checked = value == "1";
			e.change();
		});
		utility.savePrefs(obj, prefix);
	},
	getErrorMsg: function (msg) {
		/// <summary>获得给定信息中的错误信息</summary>
		var m = msg.match(/var\s+message\s*=\s*"([^"]*)/);
		return m && m[1] ? m[1] : "&lt;未知信息&gt;";
	},
	delayInvoke: function (target, callback, timeout) {
		target = target || "#countEle";
		var e = typeof (target) == "string" ? $(target) : target;
		if (timeout <= 0) {
			e.html("正在执行").removeClass("fish_clock").addClass("fish_running");
			callback();
		} else {
			var str = (Math.floor(timeout / 100) / 10) + '';
			if (str.indexOf(".") == -1) str += ".0";
			e.html(str + " 秒后再来!...").removeClass("fish_running").addClass("fish_clock");
			setTimeout(function () {
				utility.delayInvoke(target, callback, timeout - 500);
			}, 500);
		}
	},
	saveList: function (name) {
		/// <summary>将指定列表的值保存到配置中</summary>
		var dom = document.getElementById(name);
		window.localStorage["list_" + name] = utility.getOptionArray(dom).join("\t");
	},
	loadList: function (name) {
		/// <summary>将指定的列表的值从配置中加载</summary>
		var dom = document.getElementById(name);
		var data = window.localStorage["list_" + name];
		if (!data) return;

		if (data.indexOf("\t") != -1)
			data = data.split('\t');
		else data = data.split('|');
		$.each(data, function () {
			dom.options[dom.options.length] = new Option(this, this);
		});
	},
	addOption: function (dom, text, value) {
		/// <summary>在指定的列表中加入新的选项</summary>
		dom.options[dom.options.length] = new Option(text, value);
	},
	getOptionArray: function (dom) {
		/// <summary>获得选项的数组格式</summary>
		return $.map(dom.options, function (o) { return o.value; });
	},
	inOptionList: function (dom, value) {
		/// <summary>判断指定的值是否在列表中</summary>
		for (var i = 0; i < dom.options.length; i++) {
			if (dom.options[i].value == value) return true;
		}
		return false;
	},
	getAudioUrl: function () {
		/// <summary>获得音乐地址</summary>
		return window.localStorage["audioUrl"] || (navigator.userAgent.indexOf("Firefox") != -1 ? "http://static.fishlee.net/resources/audio/song.ogg" : "http://static.fishlee.net/resources/audio/song.ogg");
	},
	getFailAudioUrl: function () {
		return (utility.isWebKit() ? "http://static.fishlee.net/resources/audio/" : "http://static.fishlee.net/resources/audio/") + "music3.ogg";
	},
	playFailAudio: function () {
		if (!window.Audio) return;
		new Audio(utility.getFailAudioUrl()).play()
	},
	resetAudioUrl: function () {
		/// <summary>恢复音乐地址为默认</summary>
		window.localStorage.removeItem("audioUrl");
	},
	parseDate: function (s) { /(\d{4})[-/](\d{1,2})[-/](\d{1,2})/.exec(s); return new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3); },
	getDate: function (s) {
		/// <summary>获得指定日期的天单位</summary>
		return new Date(s.getFullYear(), s.getMonth(), s.getDate());
	},
	formatDate: function (d) {
		/// <summary>格式化日期</summary>
		var y = d.getFullYear();

		return y + "-" + utility.formatDateShort(d);
	},
	formatDateShort: function (d) {
		/// <summary>格式化日期</summary>
		var mm = d.getMonth() + 1;
		var d = d.getDate();

		return (mm > 9 ? mm : "0" + mm) + "-" + (d > 9 ? d : "0" + d);
	},
	formatTime: function (d) {
		function padTo2Digit(digit) {
			return digit < 10 ? '0' + digit : digit;
		}
		return utility.formatDate(d) + " " + padTo2Digit(d.getHours()) + ":" + padTo2Digit(d.getMinutes()) + ":" + padTo2Digit(d.getSeconds());
	},
	addTimeSpan: function (date, y, mm, d, h, m, s) {
		/// <summary>对指定的日期进行偏移</summary>
		return new Date(date.getFullYear() + y, date.getMonth() + mm, date.getDate() + d, date.getHours() + h, date.getMinutes() + m, date.getSeconds() + s);
	},
	serializeForm: function (form) {
		/// <summary>序列化表单为对象</summary>
		var v = {};
		var o = form.serializeArray();
		for (var i in o) {
			if (typeof (v[o[i].name]) == 'undefined') v[o[i].name] = o[i].value;
			else v[o[i].name] += "," + o[i].value;
		}
		return v;
	},
	getSecondInfo: function (second) {
		var show_time = "";
		var hour = parseInt(second / 3600);  //时
		if (hour > 0) {
			show_time = hour + "小时";
			second = second % 3600;
		}
		var minute = parseInt(second / 60);  //分
		if (minute >= 1) {
			show_time = show_time + minute + "分";
			second = second % 60;
		} else if (hour >= 1 && second > 0) {
			show_time = show_time + "0分";
		}
		if (second > 0) {
			show_time = show_time + second + "秒";
		}

		return show_time;
	},
	post: function (url, data, dataType, succCallback, errorCallback, featureFlag, refer) {
		var onError = function (xhr) {
			var code = utility.checkResponse(xhr);
			if (code < 1) {
				alert("警告：" + (code == 0 ? "操作失败" : "系统已强制退出登录") + "，可能是系统已升级。" +
					(featureFlag ? "\n为了保证您的安全，功能【" + featureFlag + "】已被自动禁用，请重新登录。\n在助手升级后，功能将会被自动重新开启。\n\n请重新登录。" : ""));
				utility.disableFeature(featureFlag);

				if (code == -1) {
					//被强退
					self.location = "/otsweb/loginAction.do?method=init";
				}
			} else {
				if (errorCallback) errorCallback.apply(this, arguments);
			}
		}
		$.ajax({
			url: url,
			data: data,
			timeout: 10000,
			type: "POST",
			success: function (data, state, xhr) {
				if (utility.checkResponse(xhr) < 1) onError(xhr);
				else {
					if (succCallback) succCallback.apply(this, arguments);
				}
			},
			error: onError,
			dataType: dataType,
			refer: utility.getFullUrl(refer)
		});
	},
	checkResponse: function (xhr) {
		var text = xhr.responseText;
		if (!text || text.indexOf("<title>登录</title>") != -1) return -1;
		if (text == "-1") return 0;
		return 1;
	},
	get: function (url, data, dataType, succCallback, errorCallback, featureFlag, refer) {
		var onError = function (xhr) {
			var code = utility.checkResponse(xhr);
			if (code < 1) {
				alert("警告：" + (code == 0 ? "操作失败" : "系统已强制退出登录") + "，可能是系统已升级。" +
					(featureFlag ? "\n为了保证您的安全，功能【" + featureFlag + "】已被自动禁用，请重新登录。\n在助手升级后，功能将会被自动重新开启。\n\n请重新登录。" : ""));
				utility.disableFeature(featureFlag);

				if (code == -1) {
					//被强退
					self.location = "/otsweb/loginAction.do?method=init";
				}
			} else {
				if (errorCallback) errorCallback.apply(this, arguments);
			}
		}
		$.ajax({
			url: url,
			data: data,
			timeout: 10000,
			type: "GET",
			success: function (data, state, xhr) {
				if (utility.checkResponse(xhr) < 1) onError(xhr);
				else {
					if (succCallback) succCallback.apply(this, arguments);
				}
			},
			error: onError,
			dataType: dataType,
			refer: utility.getFullUrl(refer)
		});
	},
	showDialog: function (object, optx) {
		/// <summary>显示对话框。其中带有 close_button 样式的控件会自动作为关闭按钮</summary>
		return (function (opt) {
			var dataKey = "fs_dlg_opt";
			if (this.data(dataKey)) {
				//this.data(dataKey).closeDialog();
				return;
			}

			opt = $.extend({ bindControl: null, removeDialog: this.attr("autoCreate") == "1", onClose: null, animationMove: 20, speed: "fast", fx: "linear", show: "fadeInDown", hide: "fadeOutUp", onShow: null, timeOut: 0 }, opt);
			this.data("fs_dlg_opt", opt);
			var top = "0px";
			var left = "50%";

			this.css({
				"position": opt.parent ? "absolute" : "fixed",
				"left": left,
				"top": top,
				"margin-left": "-" + (this.width() / 2) + "px",
				"margin-top": "0px",
				"z-index": "9999"
			});
			var obj = this;
			this.changeLoadingIcon = function (icon) {
				/// <summary>更改加载对话框的图标</summary>
				obj.removeClass().addClass("loadingDialog loadicon_" + (icon || "tip"));
				return obj;
			};
			this.autoCloseDialog = function (timeout) {
				/// <summary>设置当前对话框在指定时间后自动关闭</summary>
				setTimeout(function () { obj.closeDialog(); }, timeout || 2500);
				return obj;
			};
			this.setLoadingMessage = function (msgHtml) {
				obj.find("div").html(msgHtml);
				return obj;
			};
			this.closeDialog = function () {
				/// <summary>关闭对话框</summary>
				obj.removeData(dataKey);
				obj.animate({ "marginTop": "+=" + opt.animationMove + "px", "opacity": "hide" }, opt.speed, opt.fx, function () {
					if (opt.bindControl) opt.bindControl.enable();
					if (opt.onClose) opt.onClose.call(obj);
					if (opt.removeDialog) obj.remove();
				})

				return obj;
			};
			$('.close_button', this).unbind("click").click(obj.closeDialog);
			//auto close
			if (opt.timeOut > 0) {
				var handler = opt.onShow;
				opt.onShow = function () {
					setTimeout(function () { $(obj).closeDialog(); }, opt.timeOut);
					if (handler != null) handler.call(this);
				};
			}
			//show it
			if (opt.bindControl) opt.bindControl.disable();
			this.animate({ "marginTop": "+=" + opt.animationMove + "px", "opacity": "show" }, opt.speed, opt.fx, function () { opt.onShow && opt.onShow.call(obj); })
			this.data(dataKey, this);

			return this;
		}).call(object, optx);
	},
	fishTab: function (obj, opt) {
		return (function (opt) {
			var self = this;
			opt = $.extend({ switchOnHover: false, switchOnClick: true }, opt);
			this.addClass("fishTab");


			this.showTab = function (tabid) {
				self.find(".current").removeClass("current");
				self.find("ul.tabNav li[tab=" + tabid + "], div." + tabid).addClass("current");
			};
			self.find(".tabNav li").hover(function () {
				if (!opt.switchOnHover) return;
				self.showTab($(this).attr("tab"));
			}).click(function () {
				if (!opt.switchOnClick) return;
				self.showTab($(this).attr("tab"));
			});
			this.showTab(self.find(".tabNav").attr("default") || self.find(".tabNav li:eq(0)").attr("tab"));

			return this;
		}).call(obj, opt);
	},
	getLoginRetryTime: function () {
		return parseInt(window.localStorage.getItem("login.retryLimit")) || 2000;
	},
	showOptionDialog: function (tab) {
		if (tab) utility.configTab.showTab(tab);
		utility.showDialog($("#fishOption"));
	},
	addCookie: function (name, value, expDays) {
		var cook = name + "=" + value + "; path=/; domain=.12306.cn";
		if (expDays > 0) {
			cook += "; expires=" + new Date(new Date().getTime() + expDays * 3600 * 1000 * 24).toGMTString();
		}
		document.cookie = cook;
	},
	getCookie: function (name) {
		var cook = document.cookie;
		var arr = cook.split("; ");
		for (var i = 0; i < arr.length; i++) {
			var arg = arr[i].split('=');
			if (arg[0] == name) return arg[1];
		}
	},
	setSnInfo: function (name, sn) {
		utility.setPref("helper.regUser", name);
		utility.setPref("helper.regSn", sn);
		utility.addCookie("helper.regUser", name, 999);
		utility.addCookie("helper.regSn", sn, 999);
	},
	verifySn: function (skipTimeVerify, name, sn) {
		name = name || utility.getPref("helper.regUser") || utility.getCookie("helper.regUser");
		sn = sn || utility.getPref("helper.regSn") || utility.getCookie("helper.regSn");
		if (!name && sn) return utility.verifySn2(skipTimeVerify, sn);
		if (!name || !sn) return { result: 0, msg: "未注册", name: "基本用户", typeDesc: "基本版", type: "DEMO" };

		utility.setSnInfo(name, sn);

		var args = sn.split(',');
		if (!skipTimeVerify) {
			if ((new Date() - args[0]) / 60000 > 5) {
				return { result: -1, msg: "序列号注册已失效" };
			}
		}
		var dec = [];
		var encKey = args[0] + args[1];
		var j = 0;
		for (var i = 0; i < args[2].length; i += 4) {
			dec.push(String.fromCharCode(parseInt(args[2].substr(i, 4), 16) ^ encKey.charCodeAt(j)));
			j++;
			if (j >= encKey.length) j = 0;
		}
		var data = dec.join("");
		data = { result: null, type: data.substring(0, 4), name: data.substring(4) };
		data.result = data.name == name ? 0 : -3;
		data.msg = data.result == 0 ? "成功验证" : "注册无效"
		data.typeDesc = data.type == "NRML" ? "正式版" : (data.type == "GROP" ? "内部版, <span style='color:blue;'>感谢您参与我们之中</span>!" : "<span style='color:red;'>捐助版, 非常感谢您的支持</span>!");

		return data;
	},
	verifySn2: function (skipTimeVerify, data) {
		data = utility.trim(data);
		try {
			var nameLen = parseInt(data.substr(0, 2), 16);
			var name = data.substr(2, nameLen);
			data = data.substring(2 + nameLen);

			var arr = [];
			for (var i = 0; i < data.length; i++) {
				var c = data.charCodeAt(i);
				if (c >= 97) arr.push(String.fromCharCode(c - 49));
				else arr.push(data.charAt(i));
			}
			data = arr.join("");
			var ticket = parseInt(data.substr(0, 14), 16);
			var key = parseInt(data.substr(14, 1), 16);
			var encKey = ticket.toString(16).toUpperCase() + key.toString().toUpperCase();
			data = data.substring(15);
			var dec = [];
			var j = 0;
			for (var i = 0; i < data.length; i += 4) {
				dec.push(String.fromCharCode(parseInt(data.substr(i, 4), 16) ^ encKey.charCodeAt(j)));
				j++;
				if (j >= encKey.length) j = 0;
			}
			dec = dec.join("").split('|');
			var regVersion = dec[0].substr(0, 4);
			var regName = dec[0].substring(4);
			var bindAcc = dec.slice(1, dec.length);

			if (!bindAcc && !skipTimeVerify && (new Date() - ticket) / 60000 > 5) {
				return { result: -1, msg: "注册码已失效， 请重新申请" };
			}
			if (regName != name) {
				return { result: -3, msg: "注册失败，用户名不匹配" };
			}
			var data = { name: name, type: regVersion, bindAcc: bindAcc, ticket: ticket, result: 0, msg: "成功注册" };
			switch (data.type) {
				case "NRML": data.typeDesc = "正式版"; break;
				case "GROP": data.typeDesc = "内部版, <span style='color:blue;'>感谢您参与我们之中</span>!"; break;
				case "DONT": data.typeDesc = "<span style='color:red;'>捐助版, 非常感谢您的支持</span>!"; break;
				case "PART": data.typeDesc = "合作版，欢迎您的使用";
			}
			data.regTime = new Date(ticket);
			data.regVersion = 2;

			return data;
		} catch (e) {
			return { result: -4, msg: "数据错误" };
		}
	},
	allPassengers: null,
	getAllPassengers: function (callback, ignoreLocalCache) {
		if (utility.allPassengers) {
			callback(utility.allPassengers);
			return;
		}

		var tw = utility.getTopWindow();
		if (tw != self) return tw.utility.getAllPassengers(callback, ignoreLocalCache);
		if (utility.isfeatureDisabled("pasload"))
			return [];

		//开始加载所有乘客
		utility.allPassengers = [];
		var pageIndex = 0;

		function loadPage() {
			utility.post("/otsweb/passengerAction.do?method=getPagePassengerAll", { pageSize: 10, pageIndex: pageIndex }, "json", function (json) {
				$.each(json.rows, function () { utility.allPassengers.push(this); });

				if (utility.allPassengers.length >= json.recordCount) {
					callback(utility.allPassengers);
				} else {
					pageIndex++;
					setTimeout(loadPage, 1000);
				}
			}, function () {
				setTimeout(loadPage, 3000);
			}, "pasload", "/otsweb/passengerAction.do?method=initUsualPassenger12306");
		}

		loadPage();
	},
	getFullUrl: function (path) {
		if (typeof (path) == 'undefined' || !path) return "";
		return location.protocol + "//" + location.host + path;
	},
	regCache: {},
	getRegCache: function (value) {
		return utility.regCache[value] || (utility.regCache[value] = new RegExp("^(" + value + ")$", "i"));
	},
	preCompileReg: function (optionList) {
		var data = $.map(optionList, function (e) {
			return e.value;
		});
		return new RegExp("^(" + data.join("|") + ")$", "i");
	},
	enableLog: function () {
		$("body").append('<button class="fish_button" style="width:100px;position:fixed;left:265px;top:8px;height:30px;" onclick="utility.showLog();">显示运行日志</button>');
		$(document).ajaxSuccess(function (a, b, c) {
			if (!c.log) return;
			c.log.response = b.responseText;
			c.log.success = true;
		}).ajaxSend(function (a, b, c) {
			utility.appendLog(c);
		}).ajaxError(function (a, b, c) {
			if (!c.log) return;
			c.log.response = b.responseText;
		});
	},
	//获取登录到IE的代码 Add By XPHelper
	enableLoginIE: function () {
		$("body").append('<button class="fish_button configLink" style="width:150px;position:f