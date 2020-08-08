import express from 'express';
//import data from '../src/testData';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';

let mdb;

MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err)
    // mongodb ^3 returns a client not db
    mdb = client.db('test')
})

const router = express.Router();
// const contests = data.contests.reduce((obj, contest) => {
//     // turn array into an obj
//     // each key will hold a contest obj
//     obj[contest.id] = contest;
//     return obj;
// }, {}); 

// multiple contests
router.get('/contests', (req, res) => {
    let contests = {}
   // console.log('database',mdb);
   mdb.collection('contests').find({})
        .project({
            id: 1,
            categoryName: 1,
            contestName: 1
        })
        .each((err, contest) => {
            assert.equal(null, err)
            if(!contest) {
                res.send({ contests });
                return
            }
            contests[contest.id] = contest
        })
})

// single contest
router.get('/contests/:contestId', (req, res) => {
    mdb.collection('contests')
        .findOne({id: Number(req.params.contestId)})
        .then(contest => res.send(contest))
        .catch(console.error)

    //let contest = contests[req.params.contestId];
    //contest.desciption = `Lorem ipsum dolor sit amet consectetur adipisicing elit.`
    
    //res.send(contest);
})

// name IDs
router.get('/names/:nameIds', (req, res) => {
    // 
    const nameIds = req.params.nameIds.split(',').map(Number)
    let names = {}
   // console.log('database',mdb);
   mdb.collection('names')
        .find({ id: { $in: nameIds } })
        .each((err, name) => {
            assert.equal(null, err)
            if(!name) {
                res.send({ names });
                return
            }
            names[name.id] = name
        })
})

export default router;