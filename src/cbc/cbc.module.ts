import { Module } from '@nestjs/common';
import { CbcService } from './cbc.service';
import { CbcController } from './cbc.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CbcService],
  controllers: [CbcController],
})
export class CbcModule {}