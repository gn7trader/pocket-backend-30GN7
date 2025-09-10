import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simula conexão com a PocketOption
async function conectar(email, password, ssid = null) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Simulação: conectado ao PocketOption");
      resolve(true);
    }, 300);
  });
}

// 🔹 Funções simuladas
async function getBalance() {
  return 1234.56; // saldo fake
}

async function makeOrder(symbol, amount, direction) {
  return {
    orderId: "ORD123456",
    symbol,
    amount,
    direction,
    status: "executada",
  };
}

async function getResult(orderId) {
  return {
    orderId,
    profit: Math.random() > 0.5 ? 20 : -10, // simula ganho ou perda
    status: "finalizada",
  };
}

async function getCandles(symbol, timeframe, count) {
  const candles = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    candles.push({
      time: new Date(now - i * timeframe * 60000),
      open: (Math.random() * 100).toFixed(2),
      close: (Math.random() * 100).toFixed(2),
      high: (Math.random() * 100).toFixed(2),
      low: (Math.random() * 100).toFixed(2),
    });
  }
  return candles.reverse();
}

// 🔹 Rotas
app.post("/saldo", async (req, res) => {
  try {
    const { email, password, ssid, balance_type } = req.body;
    await conectar(email, password, ssid);
    const balance = await getBalance();
    res.json({ success: true, balance, balance_type: balance_type || "practice" });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

app.post("/ordem", async (req, res) => {
  try {
    const { symbol, amount, direction } = req.body;
    const order = await makeOrder(symbol, amount, direction);
    res.json({ success: true, order });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

app.post("/resultado", async (req, res) => {
  try {
    const { orderId } = req.body;
    const result = await getResult(orderId);
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

app.post("/candles", async (req, res) => {
  try {
    const { symbol, timeframe = 1, count = 10 } = req.body;
    const candles = await getCandles(symbol, timeframe, count);
    res.json({ success: true, candles });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Teste rápido
app.get("/", (req, res) => {
  res.json({ message: "API PocketOption Backend rodando 🚀" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor PocketOption rodando na porta ${PORT}`);
});
