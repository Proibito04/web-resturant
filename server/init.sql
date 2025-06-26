CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE ingredients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  availability INTEGER NOT NULL,
  dependency TEXT,
  incompatibility TEXT
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  dish TEXT NOT NULL,
  size TEXT NOT NULL,
  ingredients TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Insert test data
INSERT INTO users (username, password) VALUES
  ('admin', '\$2b\$10$hashedPassword1'),
  ('user1', '\$2b\$10$hashedPassword2');

INSERT INTO ingredients (name, price, availability, dependency, incompatibility) VALUES
  ('mozzarella', 1.00, 3, 'tomatoes', NULL),
  ('tomatoes', 0.50, 5, NULL, 'eggs'),
  ('ham', 1.20, 2, NULL, 'mushrooms');