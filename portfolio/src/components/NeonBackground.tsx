import React, { useEffect, useRef } from "react";
function createNeonLinesAnimation(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configuration de base
    const lines: { segments: { x: number; y: number }[]; dx: number; dy: number; life: number }[] = [];
    const lineColor = "rgba(0, 255, 0, 0.8)"; // Couleur verte néon
    const shadowColor = "rgba(0, 255, 0, 0.4)"; // Effet lumineux
    const maxSegments = 40; // Nombre maximum de segments par "serpent"
    const speed = 2.5; // Vitesse des "serpents"
    const maxLife = 500; // Durée de vie des "serpents"

    let animationFrameId: number | null = null; // ID de l'animation
    let intervalId: NodeJS.Timeout | null = null; // ID de l'intervalle pour ajouter des serpents
    let isPaused = false; // Indique si l'animation est en pause

    // Ajuste la taille du canvas à la fenêtre
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Ajoute un nouveau "serpent"
    const addLine = () => {
        if (isPaused) return; // Ne pas ajouter de serpents si l'animation est en pause
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const directions = [
            { dx: speed, dy: 0 }, // Droite
            { dx: -speed, dy: 0 }, // Gauche
            { dx: 0, dy: speed }, // Bas
            { dx: 0, dy: -speed }, // Haut
        ];
        const direction = directions[Math.floor(Math.random() * directions.length)];
        lines.push({
            segments: [{ x: centerX, y: centerY }], // Le premier segment commence au centre
            dx: direction.dx,
            dy: direction.dy,
            life: maxLife,
        });
    };

    // Met à jour les "serpents"
    const updateLines = () => {
        for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i];

            // Ajoute un nouveau segment à la ligne
            const head = line.segments[line.segments.length - 1];
            const newSegment = { x: head.x + line.dx, y: head.y + line.dy };
            line.segments.push(newSegment);

            // Limite le nombre de segments
            if (line.segments.length > maxSegments) {
                line.segments.shift(); // Supprime le segment le plus ancien
            }

            // Réduit la durée de vie
            line.life--;

            // Change de direction aléatoirement
            if (Math.random() < 0.02) {
                const directions = [
                    { dx: speed, dy: 0 }, // Droite
                    { dx: -speed, dy: 0 }, // Gauche
                    { dx: 0, dy: speed }, // Bas
                    { dx: 0, dy: -speed }, // Haut
                ];
                const newDirection = directions[Math.floor(Math.random() * directions.length)];
                line.dx = newDirection.dx;
                line.dy = newDirection.dy;
            }

            // Supprime les lignes expirées
            if (line.life <= 0) {
                lines.splice(i, 1);
            }
        }
    };

    // Dessine les "serpents"
    const drawLines = () => {
        // Fond sombre avec effet de traînée
        ctx.fillStyle = "rgba(10, 10, 10, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const line of lines) {
            ctx.beginPath();
            for (let i = 0; i < line.segments.length - 1; i++) {
                const start = line.segments[i];
                const end = line.segments[i + 1];
                ctx.moveTo(start.x, start.y);
                ctx.lineTo(end.x, end.y);
            }
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 3;
            ctx.shadowBlur = 15;
            ctx.shadowColor = shadowColor;
            ctx.stroke();
        }
    };

    // Boucle d'animation
    const animate = () => {
        if (!isPaused) {
            updateLines();
            drawLines();
        }
        animationFrameId = requestAnimationFrame(animate);
    };

    // Vérifie si la fenêtre est active
    const checkWindowFocus = () => {
        isPaused = !document.hasFocus(); // Met en pause si la fenêtre n'est pas active
    };
    window.addEventListener("focus", checkWindowFocus);
    window.addEventListener("blur", checkWindowFocus);

    // Démarre l'animation
    intervalId = setInterval(addLine, 200); // Ajoute un "serpent" toutes les 200ms
    animate();

    // Nettoyage
    return () => {
        window.removeEventListener("resize", resizeCanvas);
        window.removeEventListener("focus", checkWindowFocus);
        window.removeEventListener("blur", checkWindowFocus);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (intervalId) clearInterval(intervalId);
    };
}
const NeonBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Initialise l'animation
        const cleanup = createNeonLinesAnimation(canvas);

        // Nettoyage à la fin
        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }} />;
};

export default NeonBackground;