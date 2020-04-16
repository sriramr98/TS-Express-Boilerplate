import Server from './server';
import logger from '@config/winston';
import Config from '@config/config';

Server.listen(Config.PORT, () => {
  logger.info(`Server running on port ${Config.PORT}`);
}).on('error', e => logger.error(e));
