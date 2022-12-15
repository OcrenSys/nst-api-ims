import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { InvoicesDetail } from '../../api/invoices-details/entities/invoices-detail.entity';
import { InvoiceDetailsData } from '../data/042_invoice-details.data';

export default class InvoiceSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(InvoicesDetail)
      .values(InvoiceDetailsData)
      .execute();
  }
}
