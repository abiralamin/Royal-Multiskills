# Royal Multiskills & Safety Training Website

A modern, professional website recreated based on https://www.royalmultiskills.com.sg/ with enhanced design and functionality.

## 🌟 Features

- **Modern Design**: Clean, professional layout with gradient backgrounds and smooth animations
- **Responsive Design**: Fully responsive across all devices (desktop, tablet, mobile)
- **Interactive Elements**:
  - Smooth scrolling navigation
  - Mobile-friendly hamburger menu
  - Animated service cards and project gallery
  - Interactive FAQ section
  - Advanced contact form with validation
- **Professional Content**: Complete information about Royal Multiskills training programs
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 📁 File Structure

```
Website/
├── index.html          # Main homepage
├── contact.html        # Contact page
├── styles.css          # Main stylesheet
├── contact.css         # Contact page specific styles
├── script.js           # Main JavaScript functionality
├── contact.js          # Contact page specific JavaScript
└── README.md           # This file
```

## 🚀 How to Run

1. **Simple Method**:

   - Open `index.html` directly in your web browser
   - Navigate between pages using the menu

2. **Local Server Method** (Recommended):

   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js (if you have http-server installed)
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```

   Then visit `http://localhost:8000`

## 📱 Pages

### Homepage (`index.html`)

- **Hero Section**: Eye-catching banner with call-to-action buttons
- **About Section**: Company information with feature highlights
- **Services Section**: Six key training services with icons
- **Projects Section**: Training program showcases with images
- **Branches Section**: Contact information for both locations
- **Footer**: Quick links and contact information

### Contact Page (`contact.html`)

- **Contact Form**: Advanced form with validation and user feedback
- **Branch Details**: Detailed information about both locations
- **FAQ Section**: Common questions with expandable answers
- **Interactive Elements**: Form validation and success/error messages

## 🎨 Design Improvements

Compared to the original website, this version includes:

1. **Modern Color Scheme**: Professional blue and orange gradient theme
2. **Typography**: Clean Roboto and Poppins fonts
3. **Enhanced UX**: Smooth animations, hover effects, and transitions
4. **Better Layout**: Grid-based responsive design
5. **Interactive Elements**: FAQ accordion, form validation, mobile menu
6. **Professional Images**: High-quality construction and training images
7. **Accessibility**: Proper contrast ratios and semantic HTML

## 🔧 Technical Features

- **CSS Grid & Flexbox**: Modern layout techniques
- **Responsive Images**: Optimized loading with proper alt attributes
- **Form Validation**: Client-side validation with user-friendly feedback
- **Smooth Scrolling**: Enhanced navigation experience
- **Loading States**: Visual feedback for form submissions
- **Cross-browser Compatible**: Works on all modern browsers

## 📊 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🛠️ Customization

### Colors

Main colors can be changed in `styles.css`:

```css
:root {
  --primary-color: #3498db;
  --secondary-color: #e74c3c;
  --accent-color: #f39c12;
}
```

### Content

- Edit HTML files to update content
- Replace images with your own by updating the `src` attributes
- Modify contact information in both pages

### Functionality

- `script.js`: Main website functionality
- `contact.js`: Contact form and page-specific features

## 📞 Contact Information

Based on the original Royal Multiskills website:

**Head Office - Little India Branch**

- Address: 37A Veerasamy Road (2nd Floor), Singapore-207340
- Phone: (+65) 9336 0515, (+65) 8504 0032
- Email: training@royalmultiskills.com.sg
- Landmark: Near Tekka Centre

**Woodlands Branch**

- Address: 280 Woodlands Industrial Park E5, Harvest@Woodlands #01-22, Singapore-757322
- Phone: (+65) 9336 0515, (+65) 9182 1506, (+65) 9182 1708
- Tel: (+65) 6909 1420
- Landmark: Near Driving Centre

## 📝 License

This project is created for educational purposes, recreating the design of Royal Multiskills & Safety Training website with modern enhancements.

## 🔄 Future Enhancements

Potential improvements could include:

- Course catalog page
- Online enrollment system
- Student portal
- Blog/news section
- Multilingual support
- Integration with payment systems
- Live chat support
- Course progress tracking
