const express = require('express');
const router = express.Router();
const db = require('../config/db');


router.get('/product', (req, res, next) => {
    const product = db.query('Select * FROM product', (err, result) => {
if (err) next (err);
    res.send(result);
    });
});
router.post('/product', (req, res, next) => {

    const {name, price, qty} = req.body;

    const sql = 'insert into product(name, price, qty) values(?,?,?)';
    const param = [name, price, qty];

    const product = db.query(sql, param, (err, result) => {
        if (err) next(err);
            res.send("Insert success");
            });
});
router.put('/product', (req, res,next) => {
    
    const {name, price, qty, id} = req.body;

    const sql = 'Update product set name = ?, price = ?, qty=? where id = ?';
    const param = [name, price, qty, id];
    const product= db.query(sql, param, (err, result) => {
        if (err) next (err);
            res.send("Update success");
            }); 
});
router.delete('/product/:id', (req, res,next) => {
    
    const {id} = req.params;
    const sql = 'Delete from product where id = ?';
    const param = [id];
    const product = db.query(sql, param, (err, result) => {
        if (err) next (err);
            res.send("Delete success");
            }); 
});
module.exports = router;