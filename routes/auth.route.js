import express  from "express";
import { login, register } from "../controller/auth.controller.js";
import {body } from 'express-validator';


const router = express.Router()

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
], register)
router.post('/login', login)

export default router;