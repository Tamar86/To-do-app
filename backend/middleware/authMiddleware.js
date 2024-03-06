//imports jsonwebtoken library, which is used for creating and verifying JSON Web Tokens (JWT)
const jwt = require("jsonwebtoken");
//initializing an object named authMiddleware which will contain middleware functions
const authMiddleware = {};
//middleware function verifyEmail, that takes three arguments, third one is next()- a function to call the
//next middleware function in the stack
authMiddleware.verifyToken = (req, res, next) => {
  //defining variable token to extract the JWT token from the 'Authorization' header of the incoming HTTP
  const token = req.headers.authorization;
  //check if the token exists in the request header. if not returns status 401
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: Missing token",
    });
  }

  const tokenExtract = token.split(" ")[1];
  try {
    // Verify the token using the secret key
    const payload = jwt.verify(tokenExtract, process.env.SECRET_KEY);
console.log("payload", payload)
    // Attach the payload to the request object
    req.user = payload;

    //check if username ends with @gmail.com
    const { email } = payload;
    if (!email.endsWith("@gmail.com")) {
      return res.status(403).json({
        message: "Forbidden: Invalid email domain",
      });
    }
    // Proceed to the protected route
    next();
  } catch (error) {
    // If token verification fails, return a forbidden response
    res.status(403).json({ message: "Invalid token" });
  }
};

//another middleware function. it checks if the req.user object exists, indicating that user has been authenticated
//if the user in not authenticated, req.user is falsy, it returns a 401
//if user us authenticated it calls the next( function ) to proceed to the next middleware or route handler in the stack
authMiddleware.authenticateUser = (req, res, next) => {

  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: Missing token",
    });
  }
 
  try {
    const tokenExtract = token.split(" ")[1];
    const payload = jwt.verify(tokenExtract, process.env.SECRET_KEY);
    req.user = payload;
    next();
  
  } catch (error) {
    res.status(403).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;
