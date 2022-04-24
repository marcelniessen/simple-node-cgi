
# CGI Helper for Apache Servers

```
Disclaimer: This project is right now at a very early stage. Do not use for production yet.
```

simple-node-cgi provides a simple way of running your nodejs scripts on your backend without the need of having to spin up an extra webserver. Just write your script and copy it to your Webserver running Apache, just like you would do with a php script.


# Getting Started

There are a lot of ways to make this work. I'll explain here the method I reagard as most versatile and easy to use.

## Step 1
Install node Version > `TODO` on your webserver. https://nodejs.org/

## Step 2
Install `simple-node-cgi` by running `npm install simple-node-cgi`

## Step 3
Create a file named `.htaccess` at the root of your html directory and add these lines to activate `simple-node-cgi`
```
# Activate simple-node-cgi
Options +ExecCGI
AddHandler cgi-script "mjs"
```

## Step 4
Write your node script using node. The script needs to start with the following 3 lines and use `import` instead of `require()` for imports
```
#!/usr/bin/node
import server from 'simple-node-cgi';
const {req, res} = server({debug: true});
```
## Step 5
Finish by calling `res.send("Hello World!");`

## Step 6
Save your file with the extension `.mjs` and copy it to your Apache Server.

## Step 7
Make your file executable by calling `sudo chmod a+x your-file.mjs`.

## Step 8
Call your script by visiting your server `www.yourserver.com/your-file.mjs`


# API
I designed the API to be similar to the node express API.

```
request.init({
    debug?: boolean // if set to true all uncaught errors will be printed in detail
}): void
```

```
type request = {

    ...

    query: {},
    send: SendType

}
```

```
type SendType = (body: string, headers?: HeadersType) => void

```

```
type HeadersType = {

}

```



# Motivation & Alternatives
I wanted to write and deploy scripts and small concepts without the hassle of having to spin up and map a whole node express server for every single small standalone script. I wanted something that was as easy to use as `PHP`, but with the syntax and concept of `node-express`. Thats the reason I've created this.

I've found two alternatives doing something similar. One is `node-cgi` and the other is `cgi-node`. However the approach they took was more like having a php-like templating syntax. So they are more like PHP for node.

# TODO

These are the next items which have to be done

- Rewrite in TypeScript
- test if working with `deno`
- make the script work without having to call `chmod` on them each time the file gets replaced
- block public access to all folders called `node_modules` by entry in `.htaccess` file
- create compatibilty with `require()` as well

# License MIT

```
Begin license text.

Copyright 2022 Marcel Frederik Niessen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

End license text.
```