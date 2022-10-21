import { DataSource, Repository } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { ResponseHttp } from '../../common/interfaces/response.http';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Image } from '../images/entities/image.entity';
import { Banner } from './entities/banner.entity';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(createBannerDto: CreateBannerDto): Promise<ResponseHttp> {
    const { image, ...toCreateBanner } = createBannerDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const banner = this.bannerRepository.create({
        ...toCreateBanner,
      });

      if (image) this.imageRepository.create(image);

      this.bannerRepository.save(banner);
      await queryRunner.commitTransaction();

      return this.handle.success({
        data: banner,
        statusCode: HttpStatus.OK,
        message: 'Banner creado exitosamente.',
      });
    } catch (error) {
      this.handle.throw(error);
    } finally {
      queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseHttp> {
    const filters = {};
    const relations = [];

    try {
      const banners = await this.bannerRepository.find({
        where: filters,
        relations,
      });

      return this.handle.success({
        data: banners,
        statusCode: HttpStatus.OK,
        message: 'Banners encontrados con exito.',
      });
    } catch (error) {
      this.handle.throw(error);
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id };
    const relations = [];

    const banner: Banner = await this.bannerRepository.findOne({
      relations,
      where: filters,
    });

    if (!banner)
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Banner con id: "${id}" no pudo ser encontrado`,
      );

    return this.handle.success({
      statusCode: HttpStatus.OK,
      data: banner,
      message: 'Banner encontrado exitosamente!',
    });
  }

  async update(id: number, updateBannerDto: UpdateBannerDto): Promise<any> {
    const { ...toUpdateBanner } = updateBannerDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const banner: Banner = await this.bannerRepository.preload({
      id,
      ...toUpdateBanner,
    });

    if (!banner) {
      this.handle.throw(
        { code: HttpStatus.BAD_REQUEST },
        'Lo sentimos, no se ha podido actualizar los datos del banner.',
      );
    }

    try {
      this.bannerRepository.save(banner);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: banner,
        statusCode: HttpStatus.OK,
        message: `Banner ${banner.name} has sido actualizado exitosamente,`,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(error, 'Algo salió mal al actualizar el banner');
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<any> {
    const banner = await this.bannerRepository.findOne({
      where: { id },
    });

    if (!banner) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Banner con id: "${id}" no pudo ser encontrado`,
      );
    }

    try {
      const result = await this.bannerRepository.delete(id);

      return this.handle.success({
        data: result,
        statusCode: HttpStatus.OK,
        message: `Banner ha sido eliminado exitosamente,`,
      });
    } catch (error) {
      this.handle.throw(error, 'Algo salió mal al eliminar el banner.');
    }
  }
}
