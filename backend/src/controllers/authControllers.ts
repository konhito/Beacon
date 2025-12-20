import { Request, Response } from "express";
const bcrypt = require("bcrypt");

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  

};

export const login = ()=>{

}

export const logout = ()=>{

}

export const me = ()=>{

}
