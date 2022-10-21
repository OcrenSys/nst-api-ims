import { setSeederFactory } from 'typeorm-extension';
import { Percent } from '../../api/percents/entities/percent.entity';

export default setSeederFactory(Percent, () => {
  const percent = new Percent();
  return percent;
});
