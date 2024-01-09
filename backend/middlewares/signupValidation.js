import {body, validationResult} from 'express-validator';


export const userValidationRules = [
    body('password', 'Minimum characters must be 6').isLength({ min: 6 }),
  ];  
  
export  const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

