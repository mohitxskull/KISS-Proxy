#!/bin/bash

function SetupFun() {
    clear
    echo "Running New Setup Fun!!"
    echo ""
    rm -rf .git
    git init
    git add .

    echo ""
    echo "-----------------------"
    echo "Email!"
    echo "-----------------------"
    read -r useremail
    git config user.email "$useremail"
    echo ""
    echo "-----------------------"
    echo "Name!"
    echo "-----------------------"
    read -r username
    git config user.name "$username"
    echo ""
    git commit -m "first commit"
    git branch -M main
    echo "-----------------------"
    echo "Remote Addr!"
    echo "-----------------------"
    read -r remoteaddr
    git remote add origin "$remoteaddr"
    git push -u origin main
    echo ""

    echo "Setup completed, run ap.sh again!"
}

function PushFun() {

    if [[ "$1" == "U" ]]; then
        clear

        git pull --ff origin main
    fi

    git add .

    clear

    echo ""
    echo "------------------"
    echo "Enter your commit"
    echo "------------------"
    echo ""
    read -r commitmsg
    echo ""

    git commit -m "$commitmsg"

    clear
    echo ""

    git push -u origin main
}

echo ""
echo "-------------------------------"
echo "This is an script which will"
echo "help you with github cmds."
echo "-------------------------------"
echo ""

echo "Checking setup already done or not!"
echo ""

if [ -a ".git" ]; then

    echo "Setup already done!"
    echo ""
    echo "-------------------------------"
    echo "N for New Setup."
    echo "P for Push."
    echo "U for Update."
    echo "-------------------------------"
    echo ""
    read -r optiony
    echo ""

    if [[ "$optiony" == "N" ]]; then
        SetupFun
    elif [[ "$optiony" == "P" ]]; then
        PushFun
    elif [[ "$optiony" == "U" ]]; then
        PushFun "U"
    else
        echo ""
        echo 'Choose Something!'
        echo ""
    fi

else
    SetupFun
fi