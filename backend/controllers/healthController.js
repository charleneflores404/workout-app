// Ping backend, to pre-warm as Render has cold start
const healthPing = (req, res) => {
  res.status(200).json({ status: 'ok' });
};

module.exports = { healthPing };
