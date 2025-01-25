import configuration from '@api/config/configuration';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOOKSEARCH',
        transport: Transport.GRPC,
        options: {
          package: 'booksearch',
          url: configuration().booksearch_grpc,
          protoPath: join(
            process.cwd(),
            'libs/grpc/src/protos/booksearch.proto',
          ),
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class SharedModule {}
