import { Controller, Get, Param } from '@nestjs/common';
import { ResultsService } from './results.service';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get(':userId')
  async getResults(@Param('userId') userId: number) {
    return this.resultsService.getResultsByUser(userId);
  }

  @Get('total/:userId')
  async getTotalScore(@Param('userId') userId: number) {
    return {
      totalScore: await this.resultsService.getTotalScoreByUser(userId),
    };
  }
}
