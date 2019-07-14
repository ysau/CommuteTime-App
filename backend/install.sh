#!/bin/bash

: '
A script for installing CommuteTime App backend on EC2 (Ubuntu 18.04)
'


source ./.env


function main() {
`cd ~/`
install_nginx
config_nginx
install_SSL
install_app
install_supervisor
printf '%s\n' 'installing CommuteTime App backend... Done'
}


function install_nginx() {
printf '%s\n' 'Installing nginx... '
sudo apt-get update
sudo apt-get -y install nginx
printf '%s\n' 'Installing nginx... Done'
}


function config_nginx() {
printf '%s\n' 'configuring nginx... '
sudo rm /etc/nginx/sites-enabled/default
sudo rm /etc/nginx/sites-available/default
sudo touch /etc/nginx/sites-available/$DOMAIN_NAME
sudo chown -R $USER:$USER /etc/nginx/sites-available/$DOMAIN_NAME
write_nginx_config
sudo ln -f -s /etc/nginx/sites-available/$DOMAIN_NAME /etc/nginx/sites-enabled/$DOMAIN_NAME
sudo update-rc.d nginx enable
sudo service nginx restart
printf '%s\n' 'configuring nginx... Done'
}


function write_nginx_config() {
conf=/etc/nginx/sites-available/$DOMAIN_NAME
sudo printf 'server {\n\n' > $conf
sudo printf 'listen 80;\n\n' >> $conf
sudo printf 'server_name %s;\n\n' $DOMAIN_NAME >> $conf
sudo printf 'location / { \n\n' >> $conf
sudo printf 'proxy_pass http://127.0.0.1:8000/;\n\n' >> $conf
sudo printf '}\n\n' >> $conf
sudo printf '}' >> $conf
}


function install_SSL() {
printf '%s\n' 'installing SSL certificate... '
cd ~/
git clone https://github.com/letsencrypt/letsencrypt
cd letsencrypt
printf '\e[1;34m%-6s\e[m%s\n' 'Select "(2) Redirect - Make all requests redirect to secure HTTPS access" when prompted'
sudo ./letsencrypt-auto --nginx
printf '%s\n' 'installing SSL certificate... Done'
}


function install_app() {
printf '%s\n' 'installing CommuteTime API... '
cd ~/backend
sudo apt-get -y install python-pip
sudo pip install virtualenv
virtualenv venv-api
source venv-api/bin/activate
pip install gunicorn
pip install -r requirements.txt
printf '%s\n' 'installing CommuteTime API... Done'
}


function install_supervisor() {
printf '%s\n' 'installing supervisor... '
sudo apt-get -y install supervisor
write_supervisor_config
sudo supervisorctl reread
sudo service supervisor restart
printf '%s\n' 'installing supervisor... Done'
}


function write_supervisor_config() {
conf=~/backend/commutetime.conf
printf '[program:commutetime]\n' > $conf
printf 'directory=/home/ubuntu/backend\n' >> $conf
printf 'commend=source /home/ubuntu/backend/venv-api/bin/activate\n' >> $conf
printf 'command=/home/ubuntu/backend/venv-api/bin/gunicorn wsgi:app\n' >> $conf
printf 'autostart=true\n' >> $conf
printf 'autorestart=true\n' >> $conf
sudo mv ~/backend/commutetime.conf /etc/supervisor/conf.d
}


function server() {
sudo service nginx start
gunicorn wsgi:app
}


main "$@"
