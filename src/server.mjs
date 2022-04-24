import querystring from 'querystring';

const write = process.stdout.write;

// initializes and paresed the request
const server = ({ debug } = {}) => {

    // catch all uncaught errors
    process.on('uncaughtException', error => {
        write("Status: 500 Internal Server Error\n");
        write("Content-type: text/html\n");
        write("\n");

        // if debug has been set also show the error
        if (debug === true) write(error);
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
            headers["Status"] = headers.statusCode;

            // remove the pure statusCode from header object
            delete headers.statusCode;
        }

        for (let key of Object.keys(headers)) {
            console.log(`${key}: ${headers[key]}\n`)
        }
    } else {
        // no headers have been provided, set default
        write("Content-type: text/html\n\n");
    }

    if (body) write(body);

    // terminate script, since execution is complete once everything has been sent
    process.exit(1);

}


// TODO 
export const sendFile = (file) => {


}


export default server;
module.exports = server;

