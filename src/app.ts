import Server from './server';
import { logger } from '@utils/logger';
import Config from '@config/config';

Server.listen(Config.PORT, () => {
  logger.info(`> Ready on http://localhost:${Config.PORT}`);
});
