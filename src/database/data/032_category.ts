import { Category } from '../models/category.entity';
import { faker } from '@faker-js/faker';
import { ImageData } from './001_image.data';

const CategoryImages: string[] = [
  // calzado
  'https://www.zapatosoferta.es/wp-content/themes/yootheme/cache/popularidad-sneakers-portada-29ec0d88.jpeg',
  ,
  // ropa
  'https://media.istockphoto.com/id/1043113292/es/foto/estilo-de-vida-de-las-compras-de-ropa-para-mujeres.jpg?s=612x612&w=0&k=20&c=USKz4UuD6RBhTTyF0gzMksBDNkVaEWA15T5j2UUSJ-o=',
  ,
  // perfumes
  'https://blog.linio.com.mx/wp-content/uploads/2019/12/Portada_Fragancias.jpg',
  ,
  // bebes
  'https://www.ropitadenenes.com/blog/wp-content/uploads/2021/07/como-vestir-recien-nacido-invierno.jpg',
  ,
  // maquillaje
  'https://imagenes.expreso.ec/files/image_700_402/uploads/2020/03/04/5e5fcd5b1029c.jpeg',
  ,
  // higiene
  'https://www.shutterstock.com/image-photo/toiletries-towels-bathroom-personal-hygiene-260nw-2142794339.jpg',
  ,
  // joyeria
  'https://cdn.shopify.com/s/files/1/0491/4171/0998/files/Mas_que_joyas_historias_que_contar_46e569ee-72ae-4902-a7d9-29dc2a5f4261.jpg?v=1620699009',
];

const getCategories = (): Category[] => {
  return Array(20)
    .fill(null)
    .map((value, index) => ({
      position: 1,
      name: faker.commerce.product.name,
      description: faker.commerce.product.name,
      image: ImageData[51 + index],
    }));
};

export const CategoryData: Category[] = getCategories();
