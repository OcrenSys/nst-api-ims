import { Percent } from '../../api/percents/entities/percent.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Percent, (faker) => {
  const percent = new Percent();
  return percent;
});
