import { Invoice } from '../../invoices/entities/invoice.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { InvoiceData } from '../data/04_invoice.data';

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
