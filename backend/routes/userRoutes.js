import express from 'express'
import { checkoutUser, createuser, loginUser, showOrder } from '../controllers/userController.js';
import { userValidationRules, validate } from '../middlewares/signupValidation.js';

const router = express.Router();

router.post('/createuser', userValidationRules,validate , createuser);
router.post('/loginuser' , loginUser);
router.post('/checkout' , checkoutUser );
router.get('/myorders' , showOrder)


export default router;