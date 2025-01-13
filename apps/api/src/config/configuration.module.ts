import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationService } from './configuration.service';
import configuration, { validate } from './configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate,
      isGlobal: true,
    }),
  ],
  providers: [ConfigService, ConfigurationService],
  exports: [ConfigurationService, ConfigService],
})
export class ConfigurationModule {}
