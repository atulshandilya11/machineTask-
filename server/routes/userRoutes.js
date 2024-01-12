const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const upload = require('../middleware/multer.middleware');
const auth = require('../middleware/auth.middleware');

router.post(
  '/register',
  upload.single('profilePic'),
  userController.registerUser
);
router.post('/login', userController.loginUser);
router.get('/:userId', userController.oneUser);
router.get(
  '/:userId/nearest',
  auth,
  userController.fetchThreeNearUser
);
router.get('/', userController.allUser);
router.put('/:userId/update', userController.updateUser);

module.exports = router;
