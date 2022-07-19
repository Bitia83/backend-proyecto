import mongoose from "mongoose";
try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log('connect DB OK')
} catch (error) {
  console.log('error de conexion a mongodb:' + error)
}


