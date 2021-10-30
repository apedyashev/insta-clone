import { useExpressServer } from 'routing-controllers';
import { GlobalErrorHandler } from '../middlewares/global-error-handler'
import { UserController } from './user'
import {User} from '../models/user'
import request from 'supertest'
import express from 'express'
import bodyParser from 'body-parser'

describe('UserController', () => {
  let server;

  beforeAll(async () => {
    server = express();
    server.use(bodyParser.json());
    useExpressServer(server, {
      controllers: [UserController], // we specify controllers we want to use
      middlewares: [GlobalErrorHandler],
      defaultErrorHandler: false
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('postOne with validations', done => {
    request(server)
      .post('/users/1')
      .send({
        country: 'Russia',
        city: 'SPb'
      } as User)
      .expect(204)
      .end((err, res) => {
        if (err) throw new Error(JSON.stringify(res.body));
        done();
      });
  });
})