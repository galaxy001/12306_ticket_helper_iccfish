12306_ticket_helper_iccfish
===========================

This is not my work. it's his @iccfish job. (git://github.com/iccfish/12306_ticket_helper.git)
The official extension can be found at chrome web store http://goo.gl/2CZ1C
( https://chrome.google.com/webstore/detail/12306-%E8%AE%A2%E7%A5%A8%E5%8A%A9%E6%89%8B-for-chrome/idjgmabfihmhmojipdkcackbihbdceno )

I'm just manually updating the scripts to record the diffs that TDB had done (which is making no sense at all)!
The unpacked code from the offical crx (chrome extension) file is in ./chrome/ , crx files also archived in ./bak/ .

Notes
=====
Some historic versions are from https://github.com/goodbest/12306_helper
Who says himself "is just manually updating the scripts to record the diffs that TDB had done (which is making no sense at all)!"

Current URL used
================
http://static.liebao.cn/_softupdate/44/version.js
http://static.liebao.cn/_softdownload/12306_ticket_helper.user.js
http://static.liebao.cn/_softdownload/12306_ticket_helper.crx

	getUpdateUrl: function () {
		var ua = navigator.userAgent;
		if (ua.indexOf(" SE ") > 0) return "http://static.liebao.cn/_softdownload/32c8a36d-18f5-4600-9913-c7b83f484ee2.sext";
		else if (ua.indexOf("Maxthon") > 0) return "http://static.liebao.cn/_softdownload/12306_ticket_assistant_for_maxthon3.mxaddon";
		else if (ua.indexOf("LBBROWSER") > 0) return "http://static.liebao.cn/_softdownload/9d0d790e-d78f-43b3-8e4a-34f7ec57e851.crx";
		else if (ua.indexOf("TaoBrowser") > 0) return "http://static.liebao.cn/_softdownload/12306_ticket_helper_for_taobrowser.crx";
		else if (ua.indexOf("Firefox") > 0) return "http://static.liebao.cn/_softdownload/12306_ticket_helper.user.js";
		else return "http://static.liebao.cn/_softdownload/12306_ticket_helper.crx";
	}
