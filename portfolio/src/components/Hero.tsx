import React, { useEffect } from 'react';
import AnimatedText from './AnimatedText';
import NeonBackground from './NeonBackground';
interface HeroProps {
    scrolled: boolean;
    scrollToContent: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrolled, scrollToContent }) => {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const spotlight = document.querySelector('.spotlight') as HTMLElement;
            if (spotlight) {
                spotlight.style.setProperty('--x', `${e.clientX}px`);
                spotlight.style.setProperty('--y', `${e.clientY}px`);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className={`hero ${scrolled ? 'scrolled' : ''}`}>
            <NeonBackground />
            <div className="spotlight"></div>

            <h1 className="Nom">
                <AnimatedText text="Romain Pietri" police="5rem" boolDeleting={false} />
                <AnimatedText text="Étudiant Ingénieur Cybersécurité" police="2rem" boolDeleting={true} />
            </h1>
            <button className="scroll-instruction" onClick={scrollToContent}>
                <span className="arrow">↓</span>
            </button>
        </div>
    );
};

export default Hero;