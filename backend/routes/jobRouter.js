const express = require('express')
const isAuthorized = require('../middlewares/auth')
const {getAllJobs, postJob, getMyJobs, updateJob, deleteJob,getSingleJob} = require('../controllers/jobController')

const router = express.Router()

router.get('/getall',getAllJobs)
router.post('/post',isAuthorized,postJob)
router.get('/getmyjobs',isAuthorized,getMyJobs)
router.put('/update/:id',isAuthorized,updateJob)
router.delete('/delete/:id',isAuthorized,deleteJob)
router.get('/:id',isAuthorized,getSingleJob)

module.exports = router