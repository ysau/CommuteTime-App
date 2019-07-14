#!/bin/bash

: '
A script for uploading CommuteTime App backend to AWS
'


function upload() {
source ./.env
printf '%s\n' 'uploading CommuteTime API backend to ~/backend/... '
ssh -i $PEM_PATH $EC2_LOGIN 'mkdir ~/backend'
scp -i $PEM_PATH .env $EC2_LOGIN:~/backend/
scp -i $PEM_PATH -r * $EC2_LOGIN:~/backend/
ssh -i $PEM_PATH $EC2_LOGIN 'chmod 700 ~/backend/install.sh'
printf '%s\n' 'uploading CommuteTime API backend to ~/backend/... Done'
}


upload
