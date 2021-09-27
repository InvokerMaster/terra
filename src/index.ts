import dotenv from "dotenv";
import express from "express";
import path from "path";
import Observer from "./utils/observer";
// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

let transactions: any[] = [];
const observer = new Observer();
observer.callback = (txs) => {
    transactions = txs;
};

const app = express();

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

app.get( "/", ( req, res ) => {
    // render the index template
    res.render( "index" );
} );

app.get( "/api", ( req, res ) => {
    res.json(transactions);
} );

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );