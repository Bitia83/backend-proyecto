import { validationResult, body } from "express-validator";


export const validation = (req, res, next) => {
  const errors = validationResult(req);
if(!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
  }
  next()
}

export const bodyRegisterValidator =  [body("email", "formato de email oncorrecto")
.trim().isEmail().normalizeEmail(),
body("password", "minimo 6 caracteres")
.trim().isLength({ min: 6 }),
body("password", "formato password Incorrecto")
  .custom((value, { req }) => {
  if (value !== req.body.repassword) {
    throw new Error('No coinciden las contraseñas')
  } return value;
  }),
 validation,
]

export const bodyLoginValidator = [body("email", "formato de email oncorrecto")
.trim().isEmail().normalizeEmail(),
  body("password", "minimo 6 caracteres")
    .trim().isLength({ min: 6 }),
    validation,
]
  
