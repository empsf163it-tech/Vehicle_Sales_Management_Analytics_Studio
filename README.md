# INAUBU — Vehicle Sales Management & Analytics Studio

A five-page static website concept built with HTML, CSS, and vanilla JavaScript.

## Pages
- `index.html` — Home (5+ sections)
- `about.html` — About (4 content sections)
- `services.html` — Services/capabilities
- `dashboard.html` — Inventory, analytics, and reports in one dashboard
- `contact.html` — Contact information and front-end form validation

## Features
- Shared navigation and footer across all five pages
- Black/white foundation, subtle greys, restrained dark-red accents
- Intro Rust display font setup (requires a licensed web-font file)
- Responsive desktop/tablet/mobile layout
- Login and sign-up modal popups
- Dashboard sample KPIs, charts, searchable/filterable/sortable inventory
- Vehicle detail modal and CSV export of sample data
- Newsletter and contact form front-end validation
- Back-to-top button and three social links

## Run locally
Open `index.html` in a browser, or serve the folder with a simple static server. No build step is required.

## Font setup
Place a licensed Intro Rust web-font file at `assets/fonts/intro-rust.woff2`. If you have a different filename or file format, update the `@font-face` declaration in `css/styles.css`. Check the font licence before web embedding.

## Images
Hero and showcase imagery currently references remote Unsplash image URLs and therefore requires internet access. For offline delivery, replace those URLs in `css/styles.css` with locally licensed images in `assets/images/`.

## Important scope note
This is a static front-end demo with fictional sample data. Login/sign-up, newsletter subscription, and contact submission are not connected to a server. No real accounts are created; inventory changes are not persisted; sample analytics are not live dealership data. Real authentication, shared storage, live reporting, and data security require a backend and database.
