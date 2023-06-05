const mongoose = require('mongoose');
const app = require("./app");
const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    API_VERSION,
    DB_URL
} = require("./constants");

const PORT = process.env.POST || 3977;

const connectDB = async () => {
    try {
        await mongoose.connect(`${DB_URL}/${DB_NAME}`)

        app.listen(PORT,() => {
            console.log(`####################################`)
            console.log(`############## API WEB #############`)
            console.log(`####################################`)
            console.log(`http://localhost:${PORT}/api/v1`)
        })
    } catch (err) {
        console.log('Error al conectar a la base de datos', err);
    }
}

connectDB()