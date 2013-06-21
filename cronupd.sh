#!/bin/sh
#SHELL=/bin/sh
#PATH=/opt/bin:/sbin:/bin:/usr/sbin:/usr/bin
#*/5 * * * *	huxs /bin/sh /opt/galaxy/git/12306_ticket_helper_iccfish/cronupd.sh 2>&1 >/opt/galaxy/git/12306_ticket_helper_iccfish/uplog.user

export GIT_AUTHOR_NAME="Galaxy"
export GIT_AUTHOR_EMAIL=galaxy001@gmail.com
export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"

env
date

cd /opt/galaxy/git/12306_ticket_helper_iccfish/
mv 12306_ticket_helper.user.js 12306_ticket_helper.user.js.old
mv version.js version.js.old
mv 12306_ticket_helper.crx 12306_ticket_helper_last.crx
wget -S http://www.fishlee.net/service/update/44/version.js -o updatetime.log
wget -S http://www.fishlee.net/Service/Download.ashx/44/47/12306_ticket_helper.user.js -a updatetime.log
wget -S http://www.fishlee.net/Service/Download.ashx/44/63/12306_ticket_helper.crx -a updatetime.log

THEVER=`perl -MPOSIX -MFile::stat -lane 'if (/\bvar\s+version\b/) {@v=split /=/; $s=@v[-1]; $s=~s/[\s";]//g;$b=stat($ARGV)->[9];print "$s @ ",strftime("%Y-%m-%d %T %Z",localtime($b));exit;}' 12306_ticket_helper.user.js`
# 4.5.0 @ 2013-01-26 18:15:56 CST
#echo $THEVER|awk '{print $1}' > now.ver.user
JUSTVER=`echo $THEVER|awk '{gsub(/\./,"");print $1}'`

cmp 12306_ticket_helper.user.js 12306_ticket_helper.user.js.old
if [ $? -ne 0 ]; then
   unzip -oDDd chrome.new 12306_ticket_helper.crx
   if [ $? -eq 1 ]; then
      rm -fr chrome
      mv chrome.new chrome
      git add chrome
   else
      rm -fr chrome.new
   fi
   mv 12306_ticket_helper.crx bak/12306_ticket_helper_${JUSTVER}.crx
   git add bak/12306_ticket_helper_${JUSTVER}.crx
   git commit . -m "$THEVER" --author='Galaxy <galaxy001@gmail.com>'
   git push
   echo "Updated: $THEVER"
else
   echo "Still: $THEVER"
fi
