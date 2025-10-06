# Find Nearby Cafes

A React + TypeScript + Vite web app to locate nearby cafes, show them on a Leaflet map, and trace a path from your location to a selected cafe.

---

Deplyment Link: https://cafe-maps-meeclpc2z-jaya-dubeys-projects.vercel.app/
## Features

- Responsive map view for desktop and mobile
- Custom markers for user and cafes
- Recenter button to return to your current location
- Solid blue tracing line from user to selected cafe
- Mobile-friendly UI using Tailwind CSS

---

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/jaya6400/cafe-maps-app.git
cd cafe-maps-app
```
### 2. Install dependencies
```
npm install
```
### 3. Run the development server
```
npm run dev
```

Open your browser at http://localhost:5173 to see the app.

Build for Production
```
npm run build
```
Production-ready files will be generated in the dist/ folder.

### Using Docker:
# Build Docker image
docker build -t cafe-maps-app .

# Run container
docker run -p 3000:3000 cafe-maps-app

### Deployment
This app can be deployed on Vercel or any static hosting service.

### Screenshot
- <Image width="954" height="422" alt="Capture" src="https://github.com/user-attachments/assets/560cfdb7-eeef-448c-9b1f-26dc6fb05811" />