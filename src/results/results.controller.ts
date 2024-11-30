import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Result } from './entities/result.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { RolesUserGuard } from 'src/auth/RolesUserGuard';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @UseGuards(RolesUserGuard)
  @Post()
  create(
    @Headers('authorization') authorizationHeader: string,
    @Body() createResultDto: CreateResultDto,
  ): Promise<Result> {
    const token = authorizationHeader.split(' ')[1];
    return this.resultsService.create(token, createResultDto);
  }

  @Get()
  findAll(): Promise<Result[]> {
    return this.resultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Result> {
    return this.resultsService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateResultDto: UpdateResultDto,
  ): Promise<string> {
    return this.resultsService.update(+id, updateResultDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.resultsService.remove(+id);
  }
}
