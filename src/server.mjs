import querystring from 'querystring';

// initializes and paresed the request
export default ({debug} = {}) => {

    // catch all uncaught errors
    process.on('uncaughtException', error => {
        console.log("Status: 500 Internal Server Error\n");
        console.log("Content-type: text/html\n");
        console.log("\n");

        // if debug has been set also show the error
        if(debug === true) console.log(error);
    });

    // parse request
    // TODO make keys Camelcase
    const req = {...process.env, query: querystring.decode(process.env.QUERY_STRING)};

    const res = {send};

    return {req, res};


}

// send the result to the user
export const send = (body, headers) => {

    // TODO Make header setting also possible with camel case

    // create status from statuscode
    if (headers.statusCode) {

        // TODO

        // remove it again
        delete headers.statusCode;
    }

    // set headers
    if (headers) {
        for (let key of Object.keys(headers)) {
            console.log(`${key}: ${headers[key]}\n`)
        }
    } else {
        // no headers have been provided, set default
        console.log("Content-type: text/html\n");
    }

}





const resolve = (body, headers) => {




    // spacing between headers and body
    console.log("\n");

    // render body

    console.log(body);

}

// process.env.replaceAll(/\s([A-Z_]{1,})[:]{1,1}/g, " '$1':");

//const request = {...process.env, query: querystring.decode(process.env.QUERY_STRING)};


resolve("hello world");



