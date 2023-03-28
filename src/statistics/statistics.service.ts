import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { Statistic, StatisticDocument } from './schemas/statistics.schema';
import { Model } from 'mongoose';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Statistic.name)
    private readonly statisticModel: Model<StatisticDocument>,
  ) {}

  create(createStatisticDto: CreateStatisticDto) {
    return this.statisticModel.create(createStatisticDto);
  }

  async findAll(): Promise<Statistic[]> {
    return this.statisticModel.find().exec();
  }

  findOne(register: string) {
    return this.statisticModel.findOne({ register });
  }

  async update(register: string, newStatistic: UpdateStatisticDto) {
    try {
      const statistic = await this.statisticModel.findOne({ register });
      console.log(statistic);
      if (statistic != null) {
        const updateStatistic = Object.assign(statistic, newStatistic);
        return this.statisticModel.findOneAndUpdate(
          { register },
          updateStatistic,
          {
            new: true,
          },
        );
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  }

  remove(register: string) {
    console.log({ register });
    return this.statisticModel.remove({ register });
  }
}
