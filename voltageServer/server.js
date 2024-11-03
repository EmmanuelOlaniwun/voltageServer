import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
let port = 3000;

app.use(express.json())
app.use(cors());

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/voltageServer');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const powerSchema = new mongoose.Schema({
    // date: Date,
	time: Date,
	startCurrent: Number,
	endCurrent: Number,
    hours: Number
});

const daySchema = new mongoose.Schema({
    date: Date,
    times: Number,
    hours: Number
});

const record = mongoose.model('record', powerSchema);
let Records = await record.find();

const dayRecord = mongoose.model('dayRecord', daySchema);
let dayRecords = await dayRecord.find();

app.get("/", (req, res) => {
    res.json(Records)
})

app.post("/", (req, res) => {
    const newRecord = new record({
        time: Date(),
        startCurrent: Math.floor(Math.random() * 231),
        endCurrent: Math.floor(Math.random() * 231),
        hours: Math.floor(Math.random() * 7)
    });
    newRecord.save()
    res.redirect("/")
})

app.get("/day", (req, res) => {
    res.json(dayRecords)
})

app.post("/day", (req, res) => {
    const newDayRecord = new dayRecord({
        date: Date(),
        times: Math.floor(Math.random() * 20),
        hours: Math.floor(Math.random() * 19)
    });
    newDayRecord.save()
    res.redirect("/day")
})

app.listen(port, console.log(`On ${port}`))