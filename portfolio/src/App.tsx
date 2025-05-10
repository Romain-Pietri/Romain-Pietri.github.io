import React, { useEffect, useState } from 'react';
import './App.css';
import Hero from './components/Hero';
const App: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToContent = () => {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="App">
            {/* Section fixe pour l'animation */}
            
            <Hero scrolled={scrolled} scrollToContent={scrollToContent} />
           
            {/* Contenu principal */}
            <main className="main-content">
                <section>
                    <h2>À propos de moi</h2>
                    <p>
                        Je suis un développeur passionné par la création d'applications web modernes et performantes.
                    </p>
                </section>
                <section>
                    <h2>Projets</h2>
                    <ul>
                        <li>Projet 1 - Application de gestion de tâches</li>
                        <li>Projet 2 - Site e-commerce</li>
                        <li>Projet 3 - Portfolio personnel</li>
                        <li>Projet 4 - Application mobile</li>
                        <li>Projet 5 - Blog personnel</li>
                    </ul>
                </section>
                <section>
                    <h2>Contact</h2>
                    <p>Email : romain.pietri@example.com</p>
                    <p>Téléphone : +33 6 12 34 56 78</p>
                    <p>Adresse : 123 Rue de la Technologie, Paris, France</p>
                </section>
            </main>
        </div>
    );
};

export default App;