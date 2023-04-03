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

  async update(register: string, newValue: UpdateStatisticDto) {
    try {
      const statistic = await this.statisticModel.findOne({ register });
      if (statistic != null) {
        statistic.value = newValue.value;
        return statistic.save();
      } else {
        throw new Error(`Statistic with register ${register} not found`);
      }
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to update statistic with register ${register}`);
    }
  }

  remove(register: string) {
    console.log({ register });
    return this.statisticModel.remove({ register });
  }
}
