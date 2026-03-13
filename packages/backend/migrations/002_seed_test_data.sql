-- Seed test data for local development
INSERT INTO posts (id, title, content, author, created_at, updated_at) VALUES
('test-post-001', 'Hello World', 'This is a test post for local development. Welcome to bbki.ng!', 'bbki.ng', datetime('now'), datetime('now')),
('test-post-002', 'Second Post', 'Another test post to verify the posts list is working correctly.', 'bbki.ng', datetime('now', '-1 day'), datetime('now', '-1 day')),
('test-post-003', 'Testing Markdown', '# Markdown Test

This post tests **bold** and *italic* text.

## Code Block
```javascript
const hello = "world";
console.log(hello);
```

> A blockquote for testing.', 'bbki.ng', datetime('now', '-2 days'), datetime('now', '-2 days'));
