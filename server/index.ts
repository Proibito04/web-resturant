import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import sqlite3 from "sqlite3";

// Initialize Express
const app = express();
const db = new sqlite3.Database("./restaurant.db");

// Middleware Setup
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: "exam_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// User Type
interface User {
  id: number;
  username: string;
  password: string;
}

// Passport.js Local Strategy
passport.use(
  new LocalStrategy((username: string, password: string, done: Function) => {
    db.get<User>(
      `SELECT * FROM users WHERE username = ?`,
      [username],
      (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: "User not found" });

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Invalid credentials" });
        }
        return done(null, user);
      }
    );
  })
);

passport.serializeUser((user: Express.User, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser((id: number, done) => {
  db.get<User>(`SELECT * FROM users WHERE id = ?`, [id], (err, user) => {
    if (err) return done(err);
    done(null, user || false);
  });
});

// Login Route
app.post("/login", passport.authenticate("local"), (req: Request, res: Response) => {
  res.json({ message: "Login successful!" });
});

// Logout Route
app.post("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.json({ message: "Logout successful!" });
  });
});

// Start the Server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});