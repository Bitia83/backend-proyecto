
import {Router} from "express";
import { login, register } from "../controller/auth.controller.js";
import {body } from 'express-validator';
import { validation } from "../middlewares/validation.js";


const router = Router()

router.post('/register', [body("email", "formato de email oncorrecto")
  .trim().isEmail().normalizeEmail(),
  body("password", "minimo 6 caracteres")
  .trim().isLength({ min: 6 }),
  body("password", "formato password Incorrecto")
    .custom((value, { req }) => {
    if (value !== req.body.repassword) {
      throw new Error('No coinciden las contraseñas')
    } return value;
  })
],
  validation,
  register)





  router.post('/login',[body("email", "formato de email oncorrecto")
  .trim().isEmail().normalizeEmail(),
    body("password", "minimo 6 caracteres")
    .trim().isLength({ min: 6 })],
    validation,
    login)

export default router;