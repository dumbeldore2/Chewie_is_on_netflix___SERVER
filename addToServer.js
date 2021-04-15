const Mongoose = require('mongoose')
const mongo = require('./mongo.js')
const shema = require('./shema.js')

const fs = require('fs');
var data = fs.readFileSync('combo.json');
var dataV1 = JSON.parse(data);

const connectToMongoDB = async () => {
    await mongo().then(async (Mongoos) => {

        try {
            
            const dbData = await shema.find({});
            console.log(dbData.slice().length + "is de lengte")

            const object = {
                _id: dbData.slice().length,
                naam : dataV1[0].persoon,
                plaats : dataV1[0].plaats,
                date : dataV1[0].date
            };
            
            await new shema(object).save()
        } finally {
            Mongoose.connection.close()
        }
    })
}

connectToMongoDB();