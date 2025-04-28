import React, { useState, useEffect } from 'react';

interface AnimatedTextProps {
    text: string;
    police?: string; // Taille de la police (par exemple : "2rem", "24px")
    boolDeleting?: boolean; // Indique si le texte doit être supprimé ou non
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, police = "2rem", boolDeleting = true }) => {
    const [displayedText, setDisplayedText] = useState(''); // Texte affiché
    const [index, setIndex] = useState(0); // Index actuel
    const [isDeleting, setIsDeleting] = useState(false); // Indique si on est en train de supprimer
    const [showCursor, setShowCursor] = useState(true); // Indique si la barre clignotante est visible
    const [delay, setDelay] = useState(150); // Durée dynamique entre chaque étape

    // Gestion de l'animation de la barre clignotante
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev); // Alterne la visibilité de la barre
        }, 500); // Clignote toutes les 500ms

        return () => clearInterval(cursorInterval); // Nettoyage de l'intervalle
    }, []);

    // Gestion de l'écriture et de la suppression du texte
    useEffect(() => {
        console.log(`Effect triggered: isDeleting=${isDeleting}, index=${index}, displayedText="${displayedText}"`);

        const timeout = setTimeout(() => {
            if (!isDeleting && index < text.length) {
                console.log(`Adding letter: ${text[index]}`);
                // Ajoute une lettre
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prevIndex) => prevIndex + 1);
                setDelay(100); // Réinitialise la durée pour l'écriture
            } else if (boolDeleting && isDeleting && displayedText.length > 0) {
                console.log(`Deleting letter: ${displayedText[displayedText.length - 1]}`);
                // Supprime une lettre
                setDisplayedText((prev) => prev.slice(0, -1));
                setDelay(100 + Math.random() * 100); // Durée ératique entre 100ms et 400ms
            } else if (index === text.length && !isDeleting) {
                console.log('Text fully displayed, starting deletion after pause');
                // Une fois le texte entièrement affiché, commence à supprimer après une pause
                if (boolDeleting) {
                    setTimeout(() => setIsDeleting(true), 1000);
                }
            } else if (displayedText.length === 0 && isDeleting) {
                console.log('Text fully deleted, restarting animation');
                // Une fois tout supprimé, recommence l'animation
                setIsDeleting(false);
                setIndex(0);
                setDelay(150); // Réinitialise la durée pour l'écriture
            }
        }, delay); // Utilise la durée dynamique

        return () => clearTimeout(timeout); // Nettoyage du timeout
    }, [index, isDeleting, displayedText, text, delay, boolDeleting]);

    return (
        <h1 style={{ minHeight: '1em', fontSize: police }}>
            {displayedText}
            <span style={{ visibility: showCursor ? 'visible' : 'hidden' }}>|</span>
        </h1>
    );
};

export default AnimatedText;