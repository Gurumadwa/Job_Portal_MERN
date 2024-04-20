const catchAsyncError = (fn) => {
    return (req,res,next) => {
        Promise.resolve(fn(req,res,next)).catch(next)
    }
}

module.exports = catchAsyncError

// fn is a function that it accepted like login , signup etc
// as it is taking a function it should return a function thats why its returning ---> (req,res,next) =>{}
