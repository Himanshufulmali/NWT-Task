const { userLogin, registerUser } = require("../controllers/user-controller");
const {Router} = require("express");
const { validateSchema } = require("../middlewares/user-validation");
const { registerUserSchema, loginUserSchema } = require("../validators/user-validator");

const router = Router();

router.route("/register").post(validateSchema(registerUserSchema), registerUser);
router.route("/login").post(validateSchema(loginUserSchema), userLogin);

module.exports = router;