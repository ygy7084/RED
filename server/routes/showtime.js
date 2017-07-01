import express from 'express';
import {Showtime} from '../models';

const router = express.Router();

//공연 일정을 만든다.
router.post('/create', (req, res) => {
    const show = new Showtime(req.body);
    show.save((err, results) => {
        if(err) {
            console.error(err);
            return res.status(500).json({message:'Showtime Create Error - '+err.message});
        }
        else {
            return res.json({
                data : results
            });
        }
    });
});

//공연 일정을 조회한다.
router.get('/read/:id', (req, res) => {

    //source 파라미터가 all일 경우 모든 데이터 조회
    let query;
    if(req.params.id==='all')
        query = {};
    else
        query = {_id:req.params.id};

    //lean() -> 조회 속도 빠르게 하기 위함
    Showtime.find(query).lean().exec((err, results) => {
        if(err) {
            console.error(err);
            return res.status(500).json({message:'Showtime Read Error - '+err.message});
        }
        else {
            return res.json({
                data : results
            });
        }
    });
});

//공연 일정을 수정한다.
router.put('/update', (req, res) => {

    Showtime.update({_id:req.body._id}, {$set: req.body}, (err, results) => {
        if(err) {
            console.error(err);
            return res.status(500).json({message:'Showtime Modify Error - '+err.message});
        }
        else {
            return res.json({
                data : results
            });
        }
    });
});

//공연 일정을 삭제한다.
router.delete('/delete', (req, res) => {
    Showtime.remove({_id:req.body._id}, (err, results) => {
        if(err) {
            console.error(err);
            return res.status(500).json({message:'Showtime Delete Error - '+err.message});
        }
        else {
            return res.json({
                data : results.result
            });
        }
    });
});

export default router;