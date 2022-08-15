import axios from "axios";
import { validationResult, body, param } from "express-validator";


export const validation = (req, res, next) => {
  const errors = validationResult(req);
if(!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
  }
  next()
}
export const paramLinkValidator = [
  param("id", "formato no valido (express validator)").trim().notEmpty().escape(),
  validation,
]




export const bodyLinkValidator = [
  body("longLink", "formato link incorrecto")
      .trim()
      .notEmpty()
      .custom(async (value) => {
          try {
              if (!value.startsWith("https://")) {
                  value = "https://" + value;
              }
              await axios.get(value);
              return value;
          } catch (error) {
              // console.log(error);
              throw new Error("not found longlink 404");
          }
      }),
  validation,
];
export const bodyRegisterValidator = [body("email", "formato de email oncorrecto")
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
];

export const bodyLoginValidator = [body("email", "formato de email oncorrecto")
  .trim().isEmail().normalizeEmail(),
body("password", "minimo 6 caracteres")
  .trim().isLength({ min: 6 }),
  validation,
];
  
