FROM bayrell/centos7_php71:latest

RUN yum install -y bind bind-utils

ADD router /

