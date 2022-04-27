import querystring from 'querystring';

import fs from 'fs';


const getStatusText = (code) => {

    // HTTP 1.1
    const codes = {
        100: "Continue",
        101: "Switching Protocols",
        200: "OK",
        201: "Created",
        202: "Accepted",
        203: "Non-Authoritative Information",
        204: "No Content",
        205: "Reset Content",
        206: "Partial Content",
        300: "Multiple Choices",
        301: "Moved Permanently",
        302: "Found",
        303: "See Other",
        304: "Not Modified",
        305: "Use Proxy",
        307: "Temporary Redirect",
        400: "Bad Request",
        401: "Unauthorized",
        402: "Payment Required",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        406: "Not Acceptable",
        407: "Proxy Authentication Required",
        408: "Request Time-out",
        409: "Conflict",
        410: "Gone",
        411: "Length Required",
        412: "Precondition Failed",
        413: "Request Entity Too Large",
        414: "Request-URI Too Large",
        415: "Unsupported Media Type",
        416: "Requested range not satisfiable",
        417: "Expectation Failed",
        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Time-out",
        505: "HTTP Version not supported"
    }

    let text = codes[code] || "No Status Code Text";

    return text;

}

export const getFilnameFromUri = (uri) => {

    if (!uri) return "";

    const matchGroups = uri.match(/(?<=\/)[^\/\?#]+(?=[^\/]*$)/);


    let filename = "";

    if (matchGroups && matchGroups.length) {
        filename = matchGroups[0]
    }

    return filename;


}

// initializes and paresed the request
const server = ({ debug } = {}) => {

    // catch all uncaught errors
    process.on('uncaughtException', error => {
        process.stdout.write("Status: 500 Internal Server Error\n");
        process.stdout.write("Content-type: text/html\n\n");

        // if debug has been set also show the error
        if (debug === true) process.stdout.write(error);
    });

    // parse request
    // TODO make keys Camelcase
    const req = { ...process.env, query: querystring.decode(process.env.QUERY_STRING), body: fs.readFileSync(0, "utf-8")};

    const res = { send };

    return { req, res, getFilnameFromUri };


}

// send the result to the user
export const send = (body, headers) => {

    headers = headers || {};

    // TODO Make header setting also possible with camel case


    // write custom status code
    if (headers.statusCode) {

        // TODO map status code number to real
        headers["Status"] = String(headers.statusCode) + " " + getStatusText(headers.statusCode);

        // remove the pure statusCode from header object
        delete headers.statusCode;
    }

    let contentType = "text/html";
    if (headers["Content-Type"]) {
        contentType = headers["Content-Type"];
        delete headers["Content-Type"];
    }

    // write rest of custom headers;
    for (let key of Object.keys(headers)) {
        process.stdout.write(`${key}: ${headers[key]}\n`);
    }

    process.stdout.write("Content-Type: " + contentType + "\n\n");

    process.stdout.write(body);

    process.exit(1);

}






export default server;
// module.exports = server;

