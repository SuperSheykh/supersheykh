-- NOTE: The 'imageUrl' values ('a2b1e4d4-8f1d-4a7b-9b0e-8c0f6a2b1e4d', 'e4d4a2b1-4a7b-8f1d-9b0e-8c0f6a2b1e4d') are placeholders.
-- Please replace them with actual IDs from your 'images' table for the billboards to work correctly.

-- Billboard 1: Philosophical
INSERT INTO billboards (id, greeting, greeting_fr, title, title_fr, description, description_fr, buttonText, buttonText_fr, buttonLink, imageUrl, imageAlt, subText, subText_fr, subLink, subLinkText, subLinkText_fr)
VALUES
('d4e4a2b1-8f1d-4a7b-9b0e-8c0f6a2b1e4d', 'Cogito, ergo sum', 'Je pense, donc je suis', 'Exploring the depths of thought', 'Explorer les profondeurs de la pensée', 'A collection of musings on life, logic, and the universe.', 'Une collection de réflexions sur la vie, la logique et l''univers.', 'Read my blog', 'Lire mon blog', '/blog', 'a2b1e4d4-8f1d-4a7b-9b0e-8c0f6a2b1e4d', 'A pensive image representing thought.', '“The unexamined life is not worth living.” - Socrates', '“Une vie sans examen ne vaut d''être vécue.” - Socrate', NULL, NULL, NULL);

-- Billboard 2: Techie and Fitness Lifestyle
INSERT INTO billboards (id, greeting, greeting_fr, title, title_fr, description, description_fr, buttonText, buttonText_fr, buttonLink, imageUrl, imageAlt, subText, subText_fr, subLink, subLinkText, subLinkText_fr)
VALUES
('b1e4d4a2-9b0e-4a7b-8f1d-8c0f6a2b1e4d', 'Code, Lift, Repeat.', 'Coder, Soulever, Répéter.', 'Building a stronger self, one line of code and one rep at a time.', 'Construire un moi plus fort, une ligne de code et une répétition à la fois.', 'Follow my journey in web development and physical fitness.', 'Suivez mon parcours en développement web et en conditionnement physique.', 'View my projects', 'Voir mes projets', '/portfolio', 'e4d4a2b1-4a7b-8f1d-9b0e-8c0f6a2b1e4d', 'An image showing a laptop and a dumbbell.', 'Pushing limits, both mental and physical.', 'Repousser les limites, mentales et physiques.', NULL, NULL, NULL);
