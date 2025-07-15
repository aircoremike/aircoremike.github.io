# Materials Modal System

This directory contains the HTML files for each material modal on the materials page.

## Adding a New Material

To add a new material modal:

1. **Create the modal HTML file** in this `modals/` directory:
   ```html
   <!-- New Material Modal -->
   <div id="newmaterial-modal" class="modal-overlay" data-material="newmaterial">
     <div class="modal-container">
       <div class="modal-header">
         <h1>New Material Name</h1>
       </div>
       <div class="modal-content">
         <div class="modal-hero">
           <img src="assets/newmaterial.png" alt="New Material" class="modal-hero-image">
         </div>
         <div class="modal-body">
           <div class="modal-images">
             <div class="modal-image-item">
               <img src="assets/application1.jpg" alt="New Material application">
             </div>
             <!-- Add more images as needed -->
           </div>
           <div class="modal-description">
             <p>Description of the new material...</p>
           </div>
         </div>
       </div>
     </div>
   </div>
   ```

2. **Add the material to the configuration** in `materials-config.js`:
   ```javascript
   {
     id: 'newmaterial',
     name: 'New Material Name',
     modalFile: 'newmaterial-modal.html'
   }
   ```

3. **Add a carousel slide** in `materials.html` with the appropriate button:
   ```html
   <div class="carousel-slide" data-slide="X">
     <div class="slide-content">
       <div class="slide-text">
         <div class="slide-title">
           <h2>New Material Name</h2>
         </div>
         <div class="slide-desc">
           <p>Brief description...</p>
           <button class="learn-more-btn" data-material="newmaterial">Learn More</button>
         </div>
       </div>
       <div class="slide-image">
         <img src="assets/newmaterial.png" alt="New Material">
       </div>
     </div>
   </div>
   ```

4. **Add the material image** to the `assets/` directory.

The system will automatically load the new modal and wire up the functionality.

## File Structure

```
modals/
├── README.md
├── stainless-modal.html
├── chrome-modal.html
├── titanium-modal.html
├── copper-modal.html
├── nickel-modal.html
└── tungsten-modal.html
```

## Benefits

- **SEO-friendly**: Modal content is in HTML and loaded with the page
- **Modular**: Each material has its own HTML file
- **Scalable**: Easy to add new materials
- **Maintainable**: Content is separated from JavaScript logic
- **Search-friendly**: All content is crawlable by search engines
