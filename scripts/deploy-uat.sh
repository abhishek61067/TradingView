#!/bin/bash

FILENAME="dist.tgz"
npm run build
tar zcf ${FILENAME} dist
scp $FILENAME root@idn-staging:/home/uat/paper-trading

ssh root@idn-staging /bin/bash << EOF
su - uat
cd paper-trading
tar zxf $FILENAME
logout
rm /home/uat/paper-trading/dist.tgz
/usr/bin/systemctl reload nginx
EOF


rm $FILENAME