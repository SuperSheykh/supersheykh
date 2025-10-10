-- Dummy data for D1 Database

-- To execute this file:
-- wrangler d1 execute <DATABASE_NAME> --file=./drizzle/seed.sql --local

-- Clear existing data
DELETE FROM images;
DELETE FROM skill_categories;
DELETE FROM skills;
DELETE FROM socials;
DELETE FROM quotes;
DELETE FROM billboards;
DELETE FROM projects;
DELETE FROM blogs;

-- Seed Images
INSERT INTO images (id) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef'), -- Dummy Image 1
('b2c3d4e5-f6a7-8901-2345-67890abcdef1'), -- Dummy Image 2
('c3d4e5f6-a7b8-9012-3456-7890abcdef12'); -- Dummy Image 3

-- Seed Skill Categories
INSERT INTO skill_categories (id, name, name_fr) VALUES
('d4e5f6a7-b8c9-0123-4567-890abcdef123', 'Frontend', 'Frontend'),
('e5f6a7b8-c9d0-1234-5678-90abcdef1234', 'Backend', 'Backend'),
('f6a7b8c9-d0e1-2345-6789-0abcdef12345', 'Databases', 'Bases de données'),
('a7b8c9d0-e1f2-3456-7890-bcdef1234567', 'Tools', 'Outils');

-- Seed Skills
INSERT INTO skills (id, name, name_fr, category_id) VALUES
('b8c9d0e1-f2a3-4567-8901-cdef12345678', 'React', 'React', 'd4e5f6a7-b8c9-0123-4567-890abcdef123'),
('c9d0e1f2-a3b4-5678-9012-def123456789', 'Node.js', 'Node.js', 'e5f6a7b8-c9d0-1234-5678-90abcdef1234'),
('d0e1f2a3-b4c5-6789-0123-ef1234567890', 'PostgreSQL', 'PostgreSQL', 'f6a7b8c9-d0e1-2345-6789-0abcdef12345'),
('e1f2a3b4-c5d6-7890-1234-f12345678901', 'Docker', 'Docker', 'a7b8c9d0-e1f2-3456-7890-bcdef1234567');

-- Seed Socials
INSERT INTO socials (id, name, url) VALUES
('f2a3b4c5-d6e7-8901-2345-123456789012', 'GitHub', 'https://github.com'),
('a3b4c5d6-e7f8-9012-3456-234567890123', 'LinkedIn', 'https://linkedin.com'),
('b4c5d6e7-f8a9-0123-4567-345678901234', 'Twitter', 'https://twitter.com');

-- Seed Quotes
INSERT INTO quotes (id, quote, quote_fr, author, live) VALUES
('c5d6e7f8-a9b0-1234-5678-456789012345', 'Simplicity is the ultimate sophistication.', 'La simplicité est la sophistication suprême.', 'Leonardo da Vinci', '1'),
('d6e7f8a9-b0c1-2345-6789-567890123456', 'The only way to do great work is to love what you do.', 'La seule façon de faire du bon travail est d''aimer ce que vous faites.', 'Steve Jobs', '1');

-- Seed Billboards
INSERT INTO billboards (id, greeting, greeting_fr, title, title_fr, description, description_fr, button_text, button_text_fr, button_link, image_url, image_alt, sub_text, sub_text_fr, sub_link, sub_link_text, sub_link_text_fr) VALUES
('e7f8a9b0-c1d2-3456-7890-678901234567', 'Hello, World!', 'Bonjour, le monde!', 'Welcome to My Portfolio', 'Bienvenue sur mon portfolio', 'Discover my projects and skills.', 'Découvrez mes projets et compétences.', 'Contact Me', 'Contactez-moi', '/contact', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'A placeholder image', 'Need a developer?', 'Besoin d''un développeur?', '/about', 'About Me', 'À propos de moi');

-- Seed Projects
INSERT INTO projects (id, title, title_fr, description, description_fr, slug, cover, live, completion, github, created_at, updated_at) VALUES
('f8a9b0c1-d2e3-4567-8901-789012345678', 'E-commerce Platform', 'Plateforme E-commerce', 'A full-stack e-commerce platform.', 'Une plateforme e-commerce complète.', 'ecommerce-platform', 'b2c3d4e5-f6a7-8901-2345-67890abcdef1', '1', 0.9, 'https://github.com', '2023-10-27T10:00:00Z', '2023-10-27T10:00:00Z'),
('a9b0c1d2-e3f4-5678-9012-890123456789', 'Portfolio Website', 'Site web de portfolio', 'This very website.', 'Ce site web.', 'portfolio-website', 'c3d4e5f6-a7b8-9012-3456-7890abcdef12', '1', 1.0, 'https://github.com', '2023-10-27T10:00:00Z', '2023-10-27T10:00:00Z');

-- Seed Blogs
INSERT INTO blogs (id, slug, title, title_fr, content, content_fr, cover, createdAt) VALUES
('b0c1d2e3-f4a5-6789-0123-901234567890', 'first-post', 'My First Blog Post', 'Mon premier article de blog', 'This is the content of my first blog post.', 'Ceci est le contenu de mon premier article de blog.', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', '2023-10-27T10:00:00Z');