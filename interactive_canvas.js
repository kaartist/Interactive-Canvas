const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const clearCanvasButton = document.getElementById('clearCanvas');

let circles = [];
let selectedCircle = null;
let isDragging = false;

// Function to draw a circle
function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
}

// Function to add a new circle
function addCircle(x, y) {
    const newCircle = {
        x: x,
        y: y,
        radius: 20,
        color: 'blue',
        isSelected: false
    };
    circles.push(newCircle);
    drawCircle(newCircle.x, newCircle.y, newCircle.radius, newCircle.color);
}

// Function to find the circle at a given point (from topmost)
function findCircle(x, y) {
    for (let i = circles.length - 1; i >= 0; i--) {
        const circle = circles[i];
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < circle.radius) {
            return circle;
        }
    }
    return null;
}

// Redraw all circles
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => {
        const color = circle.isSelected ? 'red' : 'blue';
        drawCircle(circle.x, circle.y, circle.radius, color);
    });
}

// Clear all
function clearCanvas() {
    circles = [];
    selectedCircle = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Attach event listeners using anonymous functions (unobtrusive)
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedCircle = findCircle(x, y);

    if (clickedCircle) {
        if (selectedCircle) selectedCircle.isSelected = false;
        selectedCircle = clickedCircle;
        selectedCircle.isSelected = true;
        selectedCircle.color = 'red';
        isDragging = true;
    } else {
        if (selectedCircle) {
            selectedCircle.isSelected = false;
            selectedCircle.color = 'blue';
            selectedCircle = null;
        }
        addCircle(x, y);
    }
    redrawCanvas();
});

canvas.addEventListener('mousemove', function(event) {
    if (isDragging && selectedCircle) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        selectedCircle.x = Math.min(Math.max(x, selectedCircle.radius), canvas.width - selectedCircle.radius);
        selectedCircle.y = Math.min(Math.max(y, selectedCircle.radius), canvas.height - selectedCircle.radius);
        redrawCanvas();
    }
});

canvas.addEventListener('mouseup', function() {
    isDragging = false;
});

canvas.addEventListener('wheel', function(event) {
    if (selectedCircle) {
        const delta = event.deltaY;
        if (delta < 0) {
            selectedCircle.radius += 2;
        } else {
            selectedCircle.radius -= 2;
        }
        selectedCircle.radius = Math.max(selectedCircle.radius, 5);
        redrawCanvas();
        event.preventDefault(); // prevent page scroll
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete' && selectedCircle) {
        const index = circles.indexOf(selectedCircle);
        if (index > -1) {
            circles.splice(index, 1);
        }
        selectedCircle = null;
        redrawCanvas();
    }
});

clearCanvasButton.addEventListener('click', function() {
    clearCanvas();
});
