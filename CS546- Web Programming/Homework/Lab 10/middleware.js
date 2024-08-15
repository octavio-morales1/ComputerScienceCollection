/*
You can choose to define all your middleware functions here, 
export them and then import them into your app.js and attach them that that.
add.use(myMiddleWare()). you can also just define them in the app.js if you like as seen in lecture 10's lecture code example. If you choose to write them in the app.js, you do not have to use this file. 
*/


const setupMiddlewares = (app) => {
    app.use((req, res, next) => {
        const isAuthenticated = req.session.auth ? 'Authenticated User' : 'Non-Authenticated User';
        console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (${isAuthenticated})`);
        next();
    });
    app.use("/login", (req, res, next) => {
        if (req.session.user && req.session.user.role === "admin") {
            return res.redirect("/admin");
        }
        else if (req.session.user && req.session.user.role === "user") {
            return res.redirect("/user");
        }
        next();
    });
    app.use("/register", (req, res, next) => {
        if (req.session.user && req.session.user.role === "admin") {
            return res.redirect("/admin");
        }
        else if (req.session.user && req.session.user.role === "user") {
            return res.redirect("/user");
        }
        next();
    });
    app.use("/user", (req, res, next) => {
        if (!req.session.user) return res.redirect("/login");
        next();
    });
    app.use("/admin", (req, res, next) => {
        if (!req.session.user || req.session.user.role !== "admin") {
            return res.redirect("/login");
        }
        next();
    });
    app.use('/logout', (req, res, next) => {
        if (!req.session.user) return res.redirect('/login');
        next();
    });
};

export default setupMiddlewares;
