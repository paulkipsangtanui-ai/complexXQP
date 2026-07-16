import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CbcModule } from './cbc/cbc.module';
import { FinanceModule } from './finance/finance.module';
import { AiAssistantModule } from './ai-assistant/ai-assistant.module';

@Module({
  imports: [PrismaModule, CbcModule, FinanceModule, AiAssistantModule],
})
export class AppModule {}