import Server from './server';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 3000;

Server.listen(PORT, () => {
  logger.info(`> Ready on http://localhost:${PORT}`);
});
