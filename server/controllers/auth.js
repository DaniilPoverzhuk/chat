import * as ErrorService from "../services/error.js";
import AuthService from "../services/auth.js";

class AuthController {
  async registration(req, res, next) {
    try {
      ErrorService.checkError(req);

      const user = AuthService.registration(req.body);
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
