import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {PrismaModule} from "./prisma/prisma.module";

@Module({
  imports: [RecipeModule, UserModule, AuthModule, PrismaModule],
})
export class AppModule {}
