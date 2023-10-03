<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS with Typescript'
description: 'This template demonstrates how to make a simple HTTP API with Node.js and Typescript running on AWS Lambda and API Gateway using the Serverless Framework v3.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node with Typescript HTTP API on AWS

## Setup

Run this command to initialize a new project in a new working directory.

```
npm install
```

## Usage

**Deploy**

```
$ serverless deploy
```


**Create example data**

```
curl https://xxxxxxxxx.execute-api.eu-west-1.amazonaws.com/gen
```

**Test a domain**

```
curl --location 'https://xxxxxxxxx.execute-api.eu-west-1.amazonaws.com/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer secret' \
--data '{
    "domain": "www.testdomain.com"
}'
```

**Test a malicious domain**
```
curl --location 'https://xxxxxxxxx.execute-api.eu-west-1.amazonaws.com/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer secret' \
--data '{
    "domain": "www.malicious.com"
}'
```

**Test an unknown domain**
```
curl --location 'https://xxxxxxxxx.execute-api.eu-west-1.amazonaws.com/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer secret' \
--data '{
    "domain": "www.somedomain.com"
}'
```

