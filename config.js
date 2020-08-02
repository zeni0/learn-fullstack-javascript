const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';

export const logStars = function(message) {
  console.info('**********');
  console.info(message);
  console.info('**********');
};

// 0.0.0.0 will bind to all API on the machine
// serverURL ready to consume as a property
export default {
  port: env.PORT || 8080,
  host: env.HOST || '0.0.0.0',
  get serverURL() {
    return `http://${this.host}:${this.port}`
  }
};