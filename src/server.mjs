import querystring from 'querystring';

// initializes and paresed the request
export default ({ debug } = {}) => {

    // catch all uncaught errors
    process.on('uncaughtException', error => {
        console.log("Status: 500 Internal Server Error\n");
        console.log("Content-type: text/html\n");
        console.log("\n");

        // if debug has been set also show the error
        if (debug === true) console.log(error);
    });

    // parse request
    // TODO make keys Camelcase
    const req = { ...process.env, query: querystring.decode(process.env.QUERY_STRING) };

    const res = { send };

    return { req, res };


}

// send the result to the user
export const send = (body, headers) => {

    // TODO Make header setting also possible with camel case


    // set headers
    if (headers) {
        // create status from statuscode
        if (headers.statusCode) {

            // TODO map status code number to real
            // header["Status"] = ...

            // remove the pure statusCode from header object
            delete headers.statusCode;
        }

        for (let key of Object.keys(headers)) {
            console.log(`${key}: ${headers[key]}\n`)
        }
    } else {
        // no headers have been provided, set default
        console.log("Content-type: text/html\n");
    }

    if (body) console.log(body);

    // terminate script, since execution is complete once everything has been sent
    process.exit(1);

}

