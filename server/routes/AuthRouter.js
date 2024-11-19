const { signup, login } = require("../controllers/AuthController");
const { sigupValidation, loginValidation } = require("../middlewares/AuthValidation");

const router = require("express").Router();

router.post('/login', loginValidation, login);
router.post('/signup', sigupValidation, signup);

module.exports = router;