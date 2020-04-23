import 'dotenv/config';
import Server from './server';
import logger from '@config/winston';
import Config from '@config/config';

Server.listen(Config.PORT, () => {
  console.log(`Started server on PORT ${Config.PORT}`);
}).on('error', e => logger.error(e));
