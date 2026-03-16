import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let svg;
let circles = [];

const width = 800;
const height = 600;
const duration = 500;
const maxCircles = 10;
let nextId = 0;

async function prepareVis() {
  svg = d3
    .select("#vis")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "#f8f8f8")
    .style("border", "2px solid black")
    .style("cursor", "crosshair");

  svg
    .append("text")
    .attr("x", 20)
    .attr("y", 30)
    .attr("font-size", 20)
    .attr("fill", "#222")
    .text("Click anywhere to add circles");

  svg
    .append("text")
    .attr("id", "counter")
    .attr("x", 20)
    .attr("y", 55)
    .attr("font-size", 14)
    .attr("fill", "#555")
    .text(`Circles: 0 / ${maxCircles}`);

  svg.on("click", addCircle);
}

async function drawVis() {
  updateCounter();
}

function addCircle(event) {
  if (circles.length >= maxCircles) {
    return;
  }

  const [x, y] = d3.pointer(event, svg.node());

  const newCircle = {
    id: nextId++,
    x: x,
    y: y,
    r: Math.random() * 20 + 10,
    color: d3.interpolateRainbow(Math.random())
  };

  circles.push(newCircle);
  updateVis();
}

function updateVis() {
  const selection = svg
    .selectAll("circle.data-circle")
    .data(circles, d => d.id);

  const enterSelection = selection
    .enter()
    .append("circle")
    .attr("class", "data-circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 0)
    .attr("fill", d => d.color)
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("opacity", 0.85);

  playAnimation(enterSelection);
  updateCounter();
}

function playAnimation(selection) {
  selection
    .transition()
    .duration(duration)
    .attr("r", d => d.r + 8)
    .transition()
    .duration(duration / 2)
    .attr("r", d => d.r);
}

function updateCounter() {
  let text = `Circles: ${circles.length} / ${maxCircles}`;
  if (circles.length === maxCircles) {
    text += " (maximum reached)";
  }
  svg.select("#counter").text(text);
}

async function runApp() {
  await prepareVis();
  await drawVis();
}

runApp();