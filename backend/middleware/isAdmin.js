import appError from "../utils/appError.js";
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return next(
      new appError("You do not have permission to perform this action.", 403)
    );
  }
  return next();
};

export default isAdmin;
