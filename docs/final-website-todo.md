# Website Finalization TODO List

## 🎯 Overview

This document contains all final changes needed to complete the website. Each section includes specific tasks with implementation details.

---

## 1. 🏠 Hero Section

### Current Issues:

- Buttons are not functional (only secondary button has scroll functionality)
- Static featured image instead of dynamic gallery

### Tasks:

- [ ] **Connect Primary Button**

  - Add onClick handler to primary button
  - Rename button text to something more descriptive (e.g., "Get Started", "Book Now", "Our Services")
  - Implement appropriate action (scroll to services, open contact form, etc.)

- [ ] **Rename Secondary Button**

  - Change text from current placeholder to meaningful action
  - Keep existing scroll functionality or modify as needed

- [ ] **Create Dynamic Image Gallery**
  - Replace static `featuredImage` with dynamic gallery
  - Use service images from `services` data or create separate image array
  - Implement JavaScript rotation between 2-3 images
  - Add smooth transitions between images
  - Consider adding fade effects or carousel functionality

### Implementation Notes:

```typescript
// Example for dynamic gallery
const heroImages = services
  ?.map((service) => service._embedded?.["wp:featuredmedia"]?.[0]?.source_url)
  .filter(Boolean) || [featuredImage];
```

---

## 2. 🖼️ Gallery Section

### Current Issues:

- `description2` text needs fixing
- Button text could be more descriptive

### Tasks:

- [ ] **Fix Description 2 Text**

  - Check WordPress ACF field for `posts_description_2`
  - Ensure proper text formatting and content
  - Verify it displays correctly in the component

- [ ] **Improve Button**
  - Rename "Show more"/"Show less" to more descriptive text
  - Consider: "View All Projects", "See More Work", "Browse Gallery"
  - Ensure consistent styling with other buttons

---

## 3. 📢 CTA Section (First Instance)

### Current Issues:

- Not needed since no social media integration
- Redundant with second CTA section

### Tasks:

- [ ] **Remove First CTA Section**
  - Delete the first `<Cta1>` component from `page.tsx`
  - Clean up any related imports if not used elsewhere
  - Ensure proper spacing between remaining sections

---

## 4. 🛠️ Services Section

### Current Issues:

- Needs visual distinction from other sections
- Background color or styling could be improved

### Tasks:

- [ ] **Add Visual Distinction**
  - Change background color (consider light gray, blue tint, or brand color)
  - Add subtle pattern or texture
  - Consider adding section dividers or borders
  - Ensure good contrast with text content

### Implementation Ideas:

```css
/* Example styling options */
.services-section {
  background-color: #f8f9fa; /* Light gray */
  /* OR */
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  /* OR */
  background-color: #e3f2fd; /* Light blue */
}
```

---

## 5. 📞 CTA Button (Second Instance)

### Current Issues:

- Button has no functionality
- Needs meaningful action

### Tasks:

- [ ] **Add Button Functionality**
  - Implement phone call functionality (as previously done)
  - OR add scroll to contact section
  - OR open contact modal/form
  - Add proper aria-labels for accessibility

### Implementation:

```typescript
onClick={() => {
  const phoneNumber = page?.acf?.contact_phone;
  if (phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
  }
}}
```

---

## 6. 📍 Contact Section

### Current Issues:

- Map could be more visually appealing
- Fonts need improvement

### Tasks:

- [ ] **Improve Map**

  - Replace current map with better Google Maps embed
  - Add custom styling to map container
  - Consider adding map markers or custom styling
  - Ensure responsive design

- [ ] **Fix Fonts**
  - Review and update font sizes for better hierarchy
  - Ensure consistent font weights
  - Improve readability of contact information
  - Consider adding icons for contact details

### Implementation Ideas:

```typescript
// Better map embed
<iframe
  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
    address
  )}`}
  width="100%"
  height="300"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
```

---

## 7. 🧭 Navigation

### Current Issues:

- Links need proper naming and functionality
- Navigation structure could be improved

### Tasks:

- [ ] **Fix Navigation Links**
  - Rename links to be more descriptive
  - Ensure all links point to correct sections
  - Add smooth scrolling to all section links
  - Consider adding active state styling

### Suggested Link Names:

- "Home" → "Početna"
- "About" → "O nama"
- "Services" → "Usluge"
- "Gallery" → "Galerija"
- "Contact" → "Kontakt"

---

## 🔧 Technical Improvements

### Additional Tasks:

- [ ] **Performance Optimization**

  - Optimize images for web
  - Implement lazy loading for gallery images
  - Add proper loading states

- [ ] **Accessibility**

  - Ensure all interactive elements have proper ARIA labels
  - Test keyboard navigation
  - Verify color contrast ratios

- [ ] **Mobile Responsiveness**

  - Test all sections on mobile devices
  - Ensure touch targets are appropriate size
  - Verify text readability on small screens

- [ ] **SEO Optimization**
  - Add proper meta tags
  - Implement structured data
  - Optimize page titles and descriptions

---

## 📋 Priority Order

1. **High Priority** (Core Functionality):

   - Hero button functionality
   - CTA button phone call
   - Remove redundant CTA section

2. **Medium Priority** (User Experience):

   - Gallery description fix
   - Services visual distinction
   - Contact map improvement

3. **Low Priority** (Polish):
   - Navigation link renaming
   - Font improvements
   - Hero image gallery

---

## 🎨 Design Considerations

- Maintain consistent color scheme throughout
- Ensure proper spacing between sections
- Use consistent button styling
- Implement smooth transitions where appropriate
- Consider adding subtle animations for better UX

---

## 📝 Notes

- All changes should maintain the existing design system
- Test thoroughly after each major change
- Ensure WordPress ACF fields are properly configured
- Backup current state before making changes
- Consider creating a staging environment for testing

---

_Last Updated: [Current Date]_
_Status: In Progress_
