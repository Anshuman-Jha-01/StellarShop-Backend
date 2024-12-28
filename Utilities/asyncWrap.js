import CustomError from "./CustomError.js";

// Create a  function handle async errors
function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((error) => {next(new CustomError(400,false, error));});        
    }    
}

export default asyncWrap;