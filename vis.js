const svgNS = "http://www.w3.org/2000/svg";
const canvas = document.getElementById("markers");

const svg = document.createElementNS(svgNS, "svg");
svg.setAttribute("width", "800");
svg.setAttribute("height", "200");
svg.style.backgroundColor = "#1a1a1a";
canvas.appendChild(svg);

// Timeline
const line = document.createElementNS(svgNS, "line");
line.setAttribute("x1", "50");
line.setAttribute("y1", "100");
line.setAttribute("x2", "750");
line.setAttribute("y2", "100");
line.setAttribute("stroke", "white");
svg.appendChild(line);


function addDelay(x, label, isFuture = false) {
    const dot = document.createElementNS(svgNS, "circle");
    dot.setAttribute("cx", x);
    dot.setAttribute("cy", "100");
    dot.setAttribute("r", "8");

    if (isFuture) {
        // HOLLOW
        dot.setAttribute("fill", "none"); 
        dot.setAttribute("stroke", "#ff4444");
        dot.setAttribute("stroke-width", "3");
    } else {
        // SOLID
        dot.setAttribute("fill", "#ff4444"); 
    }
    
    svg.appendChild(dot);

    const txt = document.createElementNS(svgNS, "text");
    txt.setAttribute("x", x - 25);
    txt.setAttribute("y", "140");
    txt.setAttribute("fill", "white");
    txt.textContent = label;
    txt.style.fontFamily = "monospace";
    svg.appendChild(txt);
}

// Plotting 
addDelay(150, "JUNE '25"); 
addDelay(550, "JAN '26");   
addDelay(700, "MAR '26", true); 

// SECTION 2: CREATIVE ART
const artBox = document.getElementById("creative-art");
const artSvg = document.createElementNS(svgNS, "svg");
artSvg.setAttribute("width", "600");
artSvg.setAttribute("height", "400");
artSvg.style.backgroundColor = "black";
artBox.appendChild(artSvg);


for (let i = 0; i < 100; i++) {
    let line = document.createElementNS(svgNS, "line");
    
    
    line.setAttribute("x1", Math.random() * 600);
    line.setAttribute("y1", Math.random() * 400);
    line.setAttribute("x2", Math.random() * 600);
    line.setAttribute("y2", Math.random() * 400);
    
    
    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "0.5");
    line.setAttribute("opacity", Math.random()); 
    
    artSvg.appendChild(line);
}