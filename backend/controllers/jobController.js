const { ErrorHandler } = require('../middlewares/error')
const catchAsyncError = require('../middlewares/catchAsyncError')
const Job = require('../models/jobModel')

const getAllJobs = catchAsyncError(async (req, res, next) => {
    const jobs = await Job.find({ expired: false });

    res.status(200).json({
        success: true,
        jobs,
    })
})


const postJob = catchAsyncError(async (req, res, next) => {

    const { role } = req.user
    if (role === 'Job Seeker') {
        return next(new ErrorHandler("Job seeker is not allowed to post a job", 400))
    }

    const { title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
    } = req.body


    if (!title ||
        !description ||
        !category ||
        !country ||
        !city ||
        !location) {
        return next(new ErrorHandler('Please provide all details', 400))
    }


    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
        return next(new ErrorHandler("Please provide fixed salary of variable salary", 400))
    }

    if (salaryFrom && salaryTo && fixedSalary) {
        return next(new ErrorHandler('cannot provide both fixed and variable salary', 400))
    }

    const postedBy = req.user._id

    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy
    })


    res.status(200).json({
        success: true,
        message: 'job posted successfully',
        job
    })

})

const getMyJobs = catchAsyncError(async (req, res, next) => {
    const { role } = req.user
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job seeker cannot get the posted jobs", 400))
    }

    const myjobs = await Job.find({ postedBy: req.user._id })

    res.status(200).json({
        success: true,
        myjobs
    })
})

const updateJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job seeker cannot get the posted jobs", 400))
    }

    const {id} = req.params

    let job = await Job.findById({_id:id})
    if(!job){
        return next(new ErrorHandler("No such job found ", 404))
    }

    job = await Job.findByIdAndUpdate(id, req.body, {
        new:true, //return updated data not the old one
        runValidators:true, //validate input fields
    })

    res.status(200).json({
        success:true,
        message:"Job has been updated successfully!",
        job
    })
})

const deleteJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job seeker cannot get the posted jobs", 400))
    }

    const {id} = req.params

    let job = await Job.findById({_id:id})
    if(!job){
        return next(new ErrorHandler("No such job found ", 404))
    }

    await job.deleteOne()

    res.status(200).json({
        success:true,
        message:"Job has been deleted successfully!",
    })
})

const getSingleJob = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    try {
        const job = await Job.findById(id);
        if (!job) {
            return next(new ErrorHandler("Job not found", 404));
        }

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        return next(new ErrorHandler("Invalid ID or CastError", 400));
    }
});


module.exports = { getAllJobs, postJob, getMyJobs, updateJob ,deleteJob, getSingleJob}