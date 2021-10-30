import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/user';
import { GlobalErrorHandler } from './middlewares/global-error-handler'

const app = createExpressServer({
    controllers: [UserController], // we specify controllers we want to use
    middlewares: [GlobalErrorHandler],
    defaultErrorHandler: false
});

import dotenv from 'dotenv'
import log4js from 'log4js';

dotenv.config();

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL || 'debug';

const port = process.env.PORT || 3000;

logger.info('log4js log info1');
logger.debug('log4js log debug');
logger.error('log4js log error');


app.listen(port, () => console.log(`Running on port ${port}`));