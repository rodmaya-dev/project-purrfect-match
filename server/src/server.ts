// Process entry point: loads configuration and starts listening on the configured port.
import { env } from './config/env';
import app from './app';

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`);
});