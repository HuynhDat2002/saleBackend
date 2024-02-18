import mysql from 'mysql2';

// create connection to pool server
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'trongdat#1335',
    database:'shopDev',
    port:8811
})


const batchSize = 10;
const totalSize = 10000;

let currentId=1;

console.time('--------Timer---------');
const insertBatch =async ()=>{
    const values = [];
    for(let i=0;i<batchSize && currentId<=totalSize;i++){
        const name = `name ${currentId}`
        const age = currentId;
        const address  = `address ${currentId}`
        values.push([currentId,name,age,address])
        currentId+=1;
    }

    if(!values.length){
        console.timeEnd()
        pool.end(err=>{
            if(err){
                console.log(`error occurred while running batch`);
            }
            else{
                console.log(`connection pool closed successfully`);
            }
        })
        return;
    }
    
    const sql = `insert into test_table values ?`
    pool.query(sql,[values],async function (err, results){
        if(err) throw err
        console.log(`inserted ${results.affectedRows} records`);
        await insertBatch();
    })
}


insertBatch()