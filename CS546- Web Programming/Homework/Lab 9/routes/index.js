//Here you will require route files and export them as used in previous labs.

import stuff from './textdecoder.js';
const methods = (app) => {
    app.use('/', stuff);
}
export default methods;

