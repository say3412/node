import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { AuthUser } from '../common/current-user.decorator';
import { UPLOAD_DIR } from '../common/upload.config';
import { AzureBlobService } from '../azure/azure-blob/azure-blob.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService, 
    private readonly azureBlob: AzureBlobService, 

  ) {}

  async create(createProductDto: CreateProductDto, sellerId: number) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        stock: createProductDto.stock,
        sellerId: sellerId,
        // m:n [1,2,3]
        // connect -> 새 프로젝트가 들어오면, product insert 새로하고, 기존 카테고리에 연결 해줘
        // connect : [{id:1}, {id:1}]
        categories: {
          connect: createProductDto.categoryIds.map((id) => ({ id })),
        },
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        seller: {
          select: { id: true, name: true },
        },
        categories: true,
      },
    });
  }

  // include: {
  //   seller: true,
  //   categories: true,
  // },
  //
  // {
  //   "id": 1,
  //   "name": "파스텔 쉬폰 치마",
  //   "description": "살랑살랑 쉬폰 치마",
  //   "price": 15000,
  //   "stock": 30,
  //   "sellerId": 1,
  //   "createdAt": "2026-06-16T05:21:02.623Z",
  //   "seller": {
  //     "id": 1,
  //     "email": "seller1@email.com",
  //     "name": "Hana Lee",
  //     "createdAt": "2026-06-16T03:05:09.920Z"
  //   },
  //   "categories": [
  //     {
  //       "id": 5,
  //       "name": "치마"
  //     }
  //   ]
  // },

  findOne(id: number) {
    const product = this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException(`${id} 번 상품이 없습니다.`);
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    sellerId: number,
  ) {
    const product = await this.findOne(id);

    if (product?.sellerId !== sellerId) {
      throw new ForbiddenException('내가 등록한 상품만 수정할 수 있습니다.');
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        price: updateProductDto.price,
        stock: updateProductDto.stock,
        // 카테고리 키가 undefined인 경우 빈 객체가 들어가도록
        // set: 이 상품 카테고리 연결을 전달 해준 목록으로 전부 다시 정해
        // 기존 [1,2] -> [2,3] : 1은 삭제, 2는 유지, 3은 연결 추가
        ...(updateProductDto.categoryIds
          ? {
              categories: {
                set: updateProductDto.categoryIds.map((cid) => ({ id: cid })),
              },
            }
          : {}),
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async addImage(productId: number, user: AuthUser, file: Express.Multer.File) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, sellerId: true },
    });

    const {blobName, url} = await this.azureBlob.uploadPublic(file, 'products2');
    const image = await this.prisma.productImage.create({
      data: { productId, storeName: file.filename || 'productimage.png' },
    });

    // return { id: image.id, url: `${UPLOAD_DIR}/${image.storeName}` };
    return {id: image.id, url, blobName}
  }
}
