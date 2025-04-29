const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const port = process.env.PORT || 3000;

// Configurar cliente de WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox']
  }
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('Escanea el código QR con tu WhatsApp');
});

client.on('ready', () => {
  console.log('✅ Cliente conectado y listo');
});

client.on('message', (msg) => {
  if (msg.body === 'ping') {
    msg.reply('pong');
  }
});

client.initialize();

// Servidor básico para mantener vivo en Render
app.get('/', (req, res) => {
  res.send('WhatsApp Bot funcionando 🔥');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
