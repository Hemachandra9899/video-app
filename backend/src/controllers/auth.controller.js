import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loadEnv } from "../config/env.js";
import User from "../models/User.js";
import Org from "../models/Org.js";

const { JWT_SECRET } = loadEnv();

export async function register(req, res, next) {
  try {
    const { orgName, email, password, role = "editor" } = req.body;
    const org = await Org.create({ name: orgName || "Default Org" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ orgId: org._id, email, passwordHash, role });
    const token = jwt.sign({ uid: user._id, orgId: org._id, role: user.role }, JWT_SECRET);
    res.json({ token });
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ uid: user._id, orgId: user.orgId, role: user.role }, JWT_SECRET);
    res.json({ token });
  } catch (e) { next(e); }
}
