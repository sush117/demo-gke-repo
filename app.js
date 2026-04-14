const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Configurable values
const VERSION = process.env.VERSION || "Hey Yo Mr. White!";
const MESSAGE = process.env.MESSAGE || "Say my name.";

// 🎭 Character Data (Improved + Fixed Images)
const characters = [
  {
    name: "Walter White",
    aka: "Heisenberg",
    image: "https://upload.wikimedia.org/wikipedia/en/0/03/Walter_White_S5B.png",
    quote: "I am the one who knocks.",
    description: "A brilliant but underpaid chemistry teacher who transforms into the ruthless drug kingpin Heisenberg. His journey is driven by pride, ego, and survival."
  },
  {
    name: "Jesse Pinkman",
    aka: "Cap n' Cook",
    image: "https://upload.wikimedia.org/wikipedia/en/c/c6/Jesse_Pinkman_S5B.png",
    quote: "Yeah, science!",
    description: "Walter’s former student turned partner. Emotional, impulsive, yet deeply human—Jesse represents the moral conflict of the story."
  },
  {
    name: "Saul Goodman",
    aka: "Better Call Saul",
    image: "https://upload.wikimedia.org/wikipedia/en/8/8c/Saul_Goodman_BCS_S4.png",
    quote: "Did you know you have rights?",
    description: "A fast-talking criminal lawyer with a sharp mind and flexible ethics. Saul thrives in chaos and always has a plan (or at least a backup plan)."
  },
  {
    name: "Gustavo Fring",
    aka: "Gus",
    image: "https://upload.wikimedia.org/wikipedia/en/7/7a/Gustavo_Fring_Breaking_Bad.png",
    quote: "I hide in plain sight.",
    description: "A calm, calculated businessman and drug lord. Gus operates with precision, discipline, and terrifying composure."
  },
  {
    name: "Hank Schrader",
    aka: "ASAC Schrader",
    image: "https://upload.wikimedia.org/wikipedia/en/d/db/Hank_Schrader.png",
    quote: "Jesus Christ, Marie!",
    description: "A tough DEA agent with sharp instincts and a strong moral compass. Hank is relentless in his pursuit of justice."
  }
];

// 🎨 Main UI
app.get("/", (req, res) => {
  const cards = characters.map(char => `
    <div class="card">
      <div class="glow"></div>
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
          font-family: 'Courier New', monospace;
          background: radial-gradient(circle at top, #0b1f1a, #000);
          color: #d4f5d0;
          text-align: center;
          overflow-x: hidden;
        }

        h1 {
          margin-top: 20px;
          font-size: 3rem;
          color: #00ff99;
          text-shadow: 0 0 10px #00ff99;
          animation: flicker 2s infinite alternate;
        }

        @keyframes flicker {
          0% { opacity: 1; }
          100% { opacity: 0.7; }
        }

        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 20px;
        }

        .card {
          position: relative;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid #00ff99;
          border-radius: 15px;
          width: 260px;
          margin: 15px;
          padding: 15px;
          transition: transform 0.4s, box-shadow 0.4s;
          overflow: hidden;
        }

        .card:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 0 20px #00ff99;
        }

        .glow {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: radial-gradient(circle, rgba(0,255,150,0.2), transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }

        .card:hover .glow {
          opacity: 1;
        }

        img {
          width: 100%;
          border-radius: 10px;
          transition: transform 0.4s;
        }

        .card:hover img {
          transform: scale(1.1);
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

        /* 🔬 Chemical smoke animation */
        .smoke {
          position: fixed;
          bottom: -50px;
          width: 10px;
          height: 10px;
          background: rgba(0,255,150,0.3);
          border-radius: 50%;
          animation: rise 10s infinite ease-in;
        }

        @keyframes rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) scale(3);
            opacity: 0;
          }
        }
      </style>
    </head>

    <body>
      <h1>🧪 Breaking Bad Fanpage</h1>
      <h3>${VERSION}</h3>
      <p>${MESSAGE}</p>

      <div class="container">
        ${cards}
      </div>

      <div class="footer">
        Cooked with Express ⚗️ | CI/CD Ready 🚀
      </div>

      <script>
        // 💨 Generate dynamic "chemical smoke"
        function createSmoke() {
          const smoke = document.createElement("div");
          smoke.classList.add("smoke");
          smoke.style.left = Math.random() * window.innerWidth + "px";
          smoke.style.animationDuration = (5 + Math.random() * 5) + "s";
          document.body.appendChild(smoke);

          setTimeout(() => {
            smoke.remove();
          }, 10000);
        }

        setInterval(createSmoke, 500);
      </script>
    </body>
    </html>
  `);
});

// 📡 API Endpoint
app.get("/api/characters", (req, res) => {
  res.json(characters);
});

// Info API
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
  console.log("Server running on port \${PORT}");
});