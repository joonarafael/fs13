CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  url VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES
('Dan Abramov', 'https://overreacted.io/', 'Writing Resilient Components', 0),
('Martin Fowler', 'https://martinfowler.com/', 'Is High Quality Software Worth the Cost?', 0);
