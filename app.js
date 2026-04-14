const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Configurable values
const VERSION = process.env.VERSION || "Hey Yo Mr. White!";
const MESSAGE = process.env.MESSAGE || "Say my name.";

// Serve static files if needed later
app.use(express.static("public"));

// 🎭 Character Data (Dynamic Content)
const characters = [
  {
    name: "Walter White",
    aka: "Heisenberg",
    image: "https://upload.wikimedia.org/wikipedia/en/0/03/Walter_White_S5B.png",
    quote: "I am the one who knocks.",
    description: "A high school chemistry teacher turned meth kingpin."
  },
  {
    name: "Jesse Pinkman",
    aka: "Cap n' Cook",
    image: "https://upload.wikimedia.org/wikipedia/en/c/c6/Jesse_Pinkman_S5B.png",
    quote: "Yeah, science!",
    description: "Former student and partner in the meth business."
  },
  {
    name: "Saul Goodman",
    aka: "Better Call Saul",
    image: "https://upload.wikimedia.org/wikipedia/en/3/34/Saul_Goodman.jpg",
    quote: "Did you know you have rights?",
    description: "A criminal lawyer who helps Walter and Jesse."
  },
  {
    name: "Gustavo Fring",
    aka: "Gus",
    image: "https://upload.wikimedia.org/wikipedia/en/6/6b/Gustavo_Fring_BCS_S3.png",
    quote: "I hide in plain sight.",
    description: "A calm and calculated drug lord."
  },
  {
    name: "Hank Schrader",
    aka: "ASAC Schrader",
    image: "https://upload.wikimedia.org/wikipedia/en/8/86/Hank_Schrader_S5B.png",
    quote: "Jesus Christ, Marie!",
    description: "DEA agent and Walter's brother-in-law."
  }
];

// 🎨 Main UI
app.get("/", (req, res) => {
  const cards = characters.map(char => `
    <div class="card">
      <img src="${char.image}" alt="${char.name}">
      <h2>${char.name}</h2>
      <h3>${char.aka}</h3>
      <p>${char.description}</p>
      <blockquote>"${char.quote}"</blockquote>
    </div>
  `).join("");

  res.send(`
    <html>
    <head>
      <title>Breaking Bad Fanpage</title>
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
          color: white;
          text-align: center;
        }

        h1 {
          margin-top: 20px;
          font-size: 3rem;
        }

        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 20px;
        }

        .card {
          background: rgba(255,255,255,0.1);
          border-radius: 15px;
          width: 250px;
          margin: 15px;
          padding: 15px;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .card:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0,0,0,0.5);
        }

        img {
          width: 100%;
          border-radius: 10px;
        }

        blockquote {
          font-style: italic;
          color: #f1c40f;
        }

        .footer {
          margin: 20px;
          font-size: 0.9rem;
          opacity: 0.7;
        }
      </style>
    </head>

    <body>
      <h1>🔥 Breaking Bad Fanpage</h1>
      <h3>${VERSION}</h3>
      <p>${MESSAGE}</p>

      <div class="container">
        ${cards}
      </div>

      <div class="footer">
        Powered by Express | CI/CD Ready 🚀
      </div>
    </body>
    </html>
  `);
});

// 📡 API Endpoint (Dynamic)
app.get("/api/characters", (req, res) => {
  res.json(characters);
});

// Existing API
app.get("/api/info", (req, res) => {
  res.json({
    version: VERSION,
    message: MESSAGE,
    timestamp: new Date()
  });
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});