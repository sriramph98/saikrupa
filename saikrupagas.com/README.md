
# Sai Krupa Gas Agency Website

A modern, responsive website for Sai Krupa Gas Agency, a trusted LPG gas distributor in Chennai since 1984.

---

## Overview

This website serves as a digital platform for Sai Krupa Gas Agency, providing customers with easy access to essential services, information, and online booking options. The site features a clean, user-friendly interface with smooth animations and responsive design.

---

## Features

- **Responsive Design**: Works seamlessly on all devices.
- **Smooth Animations**: Powered by Anime.js.
- **Interactive Components**: Engaging UI elements.
- **Online Booking Integration**: Easy LPG refill booking.
- **Emergency Contact System**: Quick access to help.
- **Location Information**: Includes map and address details.
- **Service Directory**: Comprehensive list of services.
- **Payment Gateways**: Multiple secure payment options.

---

## Technologies Used

### Core Technologies
- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**

### Libraries & Dependencies
- [Anime.js](https://animejs.com/) - v3.2.1 for smooth animations.
- [Lottie Player](https://lottiefiles.com/) - For vector animations.
- [Material Icons](https://fonts.google.com/icons) - Google's Material Design icons.
- [Tailwind CSS](https://tailwindcss.com/) - v3.x for utility-first CSS.
- [M4 Macro Processor](https://www.gnu.org/software/m4/) - For template processing.

---

## Project Structure

```
saikrupagas.com/
├── assets/
│   ├── icons/          # SVG icons and images
│   ├── videos/         # Video content
│   └── favicon/        # Favicon files
├── components/
│   └── emergency-cta.html # Reusable emergency call-to-action component
├── style.css           # Global CSS styles
├── script.js           # Main JavaScript file
├── index.html.in       # Homepage template
├── privacy.html.in     # Privacy policy template
├── head.html           # Common head section for templates
├── header.html         # Common header component
├── footer.html         # Common footer component
└── Makefile            # Build and deployment scripts
```

---

## Setup & Development

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/saikrupagas.com.git
   cd saikrupagas.com
   ```

2. **Install Dependencies**:
   - On Ubuntu/Debian:
     ```bash
     sudo apt-get install m4
     ```
   - On macOS:
     ```bash
     brew install m4
     ```

3. **Build the Project**:
   ```bash
   make build
   ```

4. **Start Development with Live Reload**:
   ```bash
   make autorefresh
   ```

---

## Build System

The project uses the **m4 macro processor** for template processing. Key commands in the `Makefile`:

- `make build` - Build all files for production.
- `make deploy` - Deploy the project to the production server.
- `make autorefresh` - Start the development server with live reload.
- `make clean` - Remove build artifacts.

---

## Deployment

To deploy the website to the production server:
```bash
make deploy
```

This command will:
1. Build all HTML files from templates.
2. Copy assets to the server.
3. Update the live website.

---

## Browser Support

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)
- **Opera** (latest)

---

## Performance Optimizations

- **Lazy Loading**: Images load only when in the viewport.
- **Minified Assets**: CSS and JavaScript files are minified for faster load times.
- **Optimized SVGs**: Scalable and lightweight icons.
- **Responsive Images**: Dynamically adjusted for screen size.
- **Efficient Animations**: Using `requestAnimationFrame`.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request.

---

## License

This project is proprietary and confidential. All rights reserved.

---

## Credits

- **Icons**: [Icons8](https://icons8.com/)
- **Animations**: [LottieFiles](https://lottiefiles.com/)
- **Images**: Proprietary/Licensed.

---

## Contact

For queries regarding the website, please reach out:

- **Email**: saikrupabharatgas@gmail.com
- **Phone**: +91 98415 37575
- **Address**: Inner Ring Road, near BSNL Telephone Exchange, 15th Avenue, Chennai.

---

© 2024 Sai Krupa Gas Agency. All rights reserved.
