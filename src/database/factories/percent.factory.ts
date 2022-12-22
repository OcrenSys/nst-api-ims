import { setSeederFactory } from 'typeorm-extension';
import { Percent } from '../models/percent.entity';

export default setSeederFactory(Percent, () => {
  const percent = new Percent();
  return percent;
});
