import {Controller, Get, UseGuards} from '@nestjs/common';
import {Roles} from "../auth/decorator/roles.decorator";
import {RolesGuard} from "../auth/guards/roles.guard";

@Controller('recipes')
export class RecipeController {

    @Get()
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    async getAllRecipes(): Promise<string> {
        return "All recipes"
    }

}
