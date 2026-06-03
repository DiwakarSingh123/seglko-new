# SEGLKO Project

## Setup for Contributors

### 1. Clone the repo
```bash
git clone https://github.com/DiwakarSingh123/seglko-new.git
cd seglko-new
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
```bash
cp .env.example .env.local
```
Then open `.env.local` and fill in the values — **ask the project owner for the credentials**.

### 4. Run the project

**Terminal 1 — Admin + API (Next.js)**
```bash
npm run dev
# runs on http://localhost:3000
```

**Terminal 2 — Frontend website (Vite)**
```bash
cd seg
npm install
npm run dev
# runs on http://localhost:5173
```

## Why images don't show without .env.local

- Images are stored on **Cloudinary** — needs `CLOUDINARY_*` keys
- Image URLs are saved in **MongoDB** — needs `MONGODB_URI`
- Without these, the gallery API returns empty and no images show

## Contact
Ask **Diwakar Singh** for the `.env.local` credentials.
