import { setSeederFactory } from 'typeorm-extension';
import { Percent } from '../../percents/entities/percent.entity';

export default setSeederFactory(Percent, (faker) => {
  const percent = new Percent();
  return percent;
});
