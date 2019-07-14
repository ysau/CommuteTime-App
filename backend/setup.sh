#!/bin/bash

: '
A script for setting up CommuteTime App backend on EC2 (Ubuntu 18.04)
'

function setup() {
source ./upload.sh
ssh -i $PEM_PATH $EC2_LOGIN -t 'cd ~/backend; ./install.sh; bash -l'
}


setup
