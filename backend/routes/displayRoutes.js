import express from 'express';
import { foodData } from '../controllers/dataController.js';

const router = express.Router();

router.get('/fooddata' , foodData );


export default router;