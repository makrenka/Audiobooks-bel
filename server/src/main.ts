import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.use(
      session({
        secret: 'dkfhgnvrrfjoedkdkslfsfk',
        saveUninitialized: false,
        resave: false,
        cookie: {
          maxAge: 60000,
        },
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.enableCors();

    await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
