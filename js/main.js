// Create neural network effect in the background
document.addEventListener('DOMContentLoaded', function() {
    const neuralBg = document.getElementById('neuralNetworkBackground');
    const nodeCount = 40; // Number of nodes
    const nodes = [];
    const lines = [];
    const connections = 3; // Max connections per node
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        
        // Random positions
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        node.style.left = `${left}%`;
        node.style.top = `${top}%`;
        
        neuralBg.appendChild(node);
        nodes.push({
            element: node,
            x: left,
            y: top,
            connections: []
        });
    }
    
    // Create connections between nodes
    nodes.forEach((node, i) => {
        // Calculate distances to all other nodes
        const distances = nodes.map((otherNode, j) => {
            if (i === j) return Infinity;
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            return {
                index: j,
                distance: Math.sqrt(dx * dx + dy * dy)
            };
        }).sort((a, b) => a.distance - b.distance);
        
        // Connect to the closest nodes
        for (let j = 0; j < Math.min(connections, distances.length - 1); j++) {
            const connectionIndex = distances[j].index;
            
            // Avoid duplicate connections
            if (nodes[connectionIndex].connections.includes(i)) continue;
            
            // Create a line element
            const line = document.createElement('div');
            line.className = 'neural-line';
            
            // Calculate line position and length
            const x1 = node.x;
            const y1 = node.y;
            const x2 = nodes[connectionIndex].x;
            const y2 = nodes[connectionIndex].y;
            
            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            
            line.style.width = `${length}%`;
            line.style.left = `${x1}%`;
            line.style.top = `${y1}%`;
            line.style.transform = `rotate(${angle}deg)`;
            
            neuralBg.appendChild(line);
            lines.push(line);
            
            // Record connection
            node.connections.push(connectionIndex);
        }
    });
    
    // Animate nodes and connections
    function animateNodes() {
        nodes.forEach((node, i) => {
            // Subtle random movement for nodes
            const newX = node.x + (Math.random() - 0.5) * 0.1;
            const newY = node.y + (Math.random() - 0.5) * 0.1;
            
            if (newX > 0 && newX < 100 && newY > 0 && newY < 100) {
                node.x = newX;
                node.y = newY;
                node.element.style.left = `${newX}%`;
                node.element.style.top = `${newY}%`;
            }
        });
        
        requestAnimationFrame(animateNodes);
    }
    
    animateNodes();
    
    // Pulse animation for nodes
    nodes.forEach(node => {
        setInterval(() => {
            node.element.style.transform = 'scale(1.5)';
            node.element.style.opacity = '1';
            
            setTimeout(() => {
                node.element.style.transform = 'scale(1)';
                node.element.style.opacity = '0.7';
            }, 500);
        }, Math.random() * 3000 + 2000); // Random timing for each node
    });
});