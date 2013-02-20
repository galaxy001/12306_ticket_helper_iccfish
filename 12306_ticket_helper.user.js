
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
	html.push('<table class="regTable" style="display:none;wi