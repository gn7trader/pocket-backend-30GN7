README.md com exemplos de uso da API

Aqui está um modelo para você colar no README.md:

# API PocketOption Backend 🚀

Simulação de API para integração com indicadores e bots da **PocketOption**.  
Este backend usa **Node.js + Express** e já vem com rotas simuladas.

---

## 🔹 Rotas disponíveis

### `POST /saldo`
Retorna saldo da conta.

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha",
  "ssid": null,
  "balance_type": "practice"
}


Resposta:

{
  "success": true,
  "balance": 1234.56,
  "balance_type": "practice"
}

POST /ordem

Cria uma ordem simulada.

Body:

{
  "symbol": "EURUSD_otc",
  "amount": 10,
  "direction": "call"
}


Resposta:

{
  "success": true,
  "order": {
    "orderId": "ORD123456",
    "symbol": "EURUSD_otc",
    "amount": 10,
    "direction": "call",
    "status": "executada"
  }
}

POST /resultado

Consulta resultado de uma ordem.

Body:

{
  "orderId": "ORD123456"
}


Resposta:

{
  "success": true,
  "result": {
    "orderId": "ORD123456",
    "profit": 20,
    "status": "finalizada"
  }
}

POST /candles

Retorna candles simulados.

Body:

{
  "symbol": "EURUSD_otc",
  "timeframe": 1,
  "count": 5
}


Resposta:

{
  "success": true,
  "candles": [
    {
      "time": "2025-09-09T23:55:00.000Z",
      "open": "52.13",
      "close": "54.10",
      "high": "55.32",
      "low": "51.89"
    }
  ]
}

🔹 Teste rápido

Abra no navegador:

https://SEU_APP.onrender.com/


Você verá:

{ "message": "API PocketOption Backend rodando 🚀" }