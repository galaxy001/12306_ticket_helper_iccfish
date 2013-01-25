#!/bin/sh
#SHELL=/bin/sh
#PATH=/opt/bin:/sbin:/bin:/usr/sbin:/usr/bin
#*/5 * * * *	huxs /bin/sh /opt/galaxy/git/12306_ticket_helper_iccfish/cronupd.sh 2>&1 >/opt/galaxy/git/12306_ticket_helper_iccfish/uplog.user

env
date

cd /opt/galaxy/git/12306_ticket_helper_iccfish/
wget -p http://static.liebao.cn/_softupdate/44/version.js
wget -p http://static.liebao.cn/_softdownload/12306_ticket_helper.user.js

THEVER=`perl -MPOSIX -lane 'if (/\bversion_12306_helper\b/) {@v=split /=/; $s=@v[-1]; $s=~s/[\s";]//g;print "$s @ ",POSIX::strftime( "%Y-%m-%d %R", localtime());exit;}' version.js`
# 4.4.2 @ 2013-01-25 13:12
echo $THEVER|awk '{print $1}' > now.ver.user

cmp now.ver.user last.ver.user
if [ $? -ne 0 ]; then
   git commit . -m "$THEVER" --author='Galaxy <galaxy001@gmail.com>'
   git push
   echo "Updated: $THEVER"
   mv now.ver.user last.ver.user
fi
