import { Injectable } from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { from, map } from 'rxjs';

@Injectable()
export class VariantsService {
  create(createVariantDto: CreateVariantDto) {
    return 'This action adds a new variant';
  }

  async findAll(): Promise<any> {
    let variants: Variant[] = [];
    const filters = {};
    const relations = [];

    try {
      variants = await this.variantRepository.find({
        where: { ...filters },
        relations: [...relations],
      });

      return this.handle.success({
        data: [...variants],
        statusCode: HttpStatus.OK,
        message: 'Variante encontradas exitosamente!',
      });
    } catch (error) {
      this.handle.throw(error, 'Algo salió mal al encontrar las variantes.');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} variant`;
  }

  update(id: number, updateVariantDto: UpdateVariantDto) {
    return `This action updates a #${id} variant`;
  }

  remove(id: number) {
    return `This action removes a #${id} variant`;
  }
}
