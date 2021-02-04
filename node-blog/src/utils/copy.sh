#!/bin/sh
cd /Users/yican/Desktop/nodeBlog/node-blog/logs 
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log