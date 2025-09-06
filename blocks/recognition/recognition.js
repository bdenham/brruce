/**
 * Recognition Block
 * Transforms content into a recognition grid layout
 */

export default function decorate(block) {
  // Create the main recognition section
  const recognitionSection = document.createElement('div');
  recognitionSection.className = 'recognition';
  
  // Find the heading (first h2 or h3)
  const heading = block.querySelector('h2, h3');
  if (heading) {
    const title = document.createElement('h2');
    title.textContent = heading.textContent;
    recognitionSection.appendChild(title);
    heading.remove(); // Remove original heading
  }
  
  // Create the grid container
  const grid = document.createElement('div');
  grid.className = 'recognition-grid';
  
  // Process each recognition item
  const items = block.querySelectorAll('div');
  items.forEach((item) => {
    // Skip if this div is the block itself
    if (item === block) return;
    
    // Create recognition item
    const recognitionItem = document.createElement('div');
    recognitionItem.className = 'recognition-item';
    
    // Find heading and content within this item
    const itemHeading = item.querySelector('h3, h4, h5, h6');
    const itemContent = item.querySelector('p');
    
    if (itemHeading) {
      const h3 = document.createElement('h3');
      h3.textContent = itemHeading.textContent;
      recognitionItem.appendChild(h3);
    }
    
    if (itemContent) {
      const p = document.createElement('p');
      p.textContent = itemContent.textContent;
      recognitionItem.appendChild(p);
    }
    
    // If no structured content found, use the div's text content
    if (!itemHeading && !itemContent) {
      const textContent = item.textContent.trim();
      if (textContent) {
        // Try to split by emoji or common patterns
        const lines = textContent.split('\n').filter(line => line.trim());
        if (lines.length >= 2) {
          const h3 = document.createElement('h3');
          h3.textContent = lines[0].trim();
          recognitionItem.appendChild(h3);
          
          const p = document.createElement('p');
          p.textContent = lines.slice(1).join(' ').trim();
          recognitionItem.appendChild(p);
        } else {
          // Fallback: treat as paragraph
          const p = document.createElement('p');
          p.textContent = textContent;
          recognitionItem.appendChild(p);
        }
      }
    }
    
    grid.appendChild(recognitionItem);
  });
  
  recognitionSection.appendChild(grid);
  
  // Replace block content
  block.innerHTML = '';
  block.appendChild(recognitionSection);
}
