//an object named todoMiddleware which will contain middleware functions related to handling todo task
const todoMiddleware = {};
//this line defines middleware function named validateTaskLength.
todoMiddleware.validateTaskLength = (req, res, next) => {
  //extracts the task title from the request body
  const title = req.body.title;
  //checks if title exists and if its length exceeds the maximum allowed length (140 characters)
  if (title && title.length > 140) {
    return res.status(400).json({
      message: "Task title exceeds maximum length",
    });
  }
  next();
};
//another middleware function named 'ensureJSONContentType'
todoMiddleware.ensureJSONContentType = (req, res, next) => {
  //extracts the content type from the request headers
  const contentType = req.headers["content-type"];
  //checks if a content type exists and if it indicates JSON format
  if (!contentType || !contentType.includes("application/json")) {
    return res.status(400).json({
      message: "Request must be in json format",
    });
  }
  next();
};

module.exports = todoMiddleware;
