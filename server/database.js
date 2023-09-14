const mongoose = require( "mongoose" );

const dataConnect = async () => {                   
    try {
        mongoose.sanitizeFilter( 'strictQuery', false);          
                                                                        // CONNECTION TO MY DATABASE
        const conn = await mongoose.connect( process.env.MONGODB_URI );
        console.log( `Database Connected ${conn.connection.host}` );
    }
    catch ( error ) {
        console.log( error );
        process.exit(1);
    }
}

module.exports = dataConnect;