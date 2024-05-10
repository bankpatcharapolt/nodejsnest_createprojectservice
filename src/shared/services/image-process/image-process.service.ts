import { Injectable } from '@nestjs/common';
import to from 'await-to-js';
import * as appRoot from 'app-root-path';
import * as Jimp from 'jimp';

@Injectable()
export class ImageProcessService {
  async addWatermarkImage(
    sourceImage: string,
    sourceImageMimeType: string,
  ): Promise<any> {
    const [errorImageRead, image] = await to(Jimp.read(sourceImage));
    if (errorImageRead) {
      console.error('Read Image Error', errorImageRead);
      return false;
    }
    const imageWidth = image.bitmap.width;
    const imageHeight = image.bitmap.height;

    const [errorWatermarkRead, watermark] = await to(
      Jimp.read(appRoot.resolve('assets/imgs/watermark-copyright.png')),
    );
    if (errorWatermarkRead) {
      console.error('Read Watermark Error', errorWatermarkRead);
      return Promise.reject(errorWatermarkRead);
    }
    const watermarkWidth = watermark.bitmap.width;
    const watermarkHeight = watermark.bitmap.height;
    let newWatermarkWidth: number;
    let newWatermarkHeight: number;
    if (imageWidth >= imageHeight) {
      newWatermarkWidth = (watermarkWidth / watermarkHeight) * imageHeight;
      newWatermarkHeight = imageHeight;

      if (newWatermarkWidth > imageWidth) {
        newWatermarkWidth = imageWidth;
        newWatermarkHeight = (watermarkHeight / watermarkWidth) * imageWidth;
      }
    } else {
      newWatermarkWidth = imageWidth;
      newWatermarkHeight = (watermarkHeight / watermarkWidth) * imageWidth;
    }

    watermark.resize(newWatermarkWidth, newWatermarkHeight);
    const watermarkPosX = (imageWidth - newWatermarkWidth) / 2;
    const watermarkPosY = (imageHeight - newWatermarkHeight) / 2;

    image.composite(watermark, watermarkPosX, watermarkPosY, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacityDest: 1,
      opacitySource: 0.5,
    });

    const result = await image.getBase64Async(sourceImageMimeType);
    return Promise.resolve(result.split(',')[1]);
  }
}
