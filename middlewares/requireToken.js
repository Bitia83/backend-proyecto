import jwt from 'jsonwebtoken'




export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    console.log(token);
    if (!token)
      throw new Error("no existe token en el header usa bearer")
    
    token = token.split(" ")[1]
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid

    next()
  } catch (error) {
    console.log(error)

    const tokenVerificationErrors = {
      "invalid signature": "la firma del JWT no es valida",
      "jwt expired": "JWT expirado",
      "invalid token": "Token invalido",
      "no Bearer": "Utiliza formato Bearer",
      "jwt malformed": "JWT formato no valido",
    };
    return res.status(401)
      .send({ error: tokenVerificationErrors[error.message] });
  }
}