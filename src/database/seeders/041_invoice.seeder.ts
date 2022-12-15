import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Invoice } from '../../api/invoices/entities/invoice.entity';
import { InvoiceData } from '../data/041_invoice.data';

export default class InvoiceSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Invoice)
      .values(InvoiceData)
      .execute();
  }
}
