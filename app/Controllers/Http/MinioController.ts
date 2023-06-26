import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import * as Minio from 'minio';
//AccessKey
//LTBz9PSqlAMBD3rSeEd0
//Secret
//BOp3z5FdHSLP3JdV7BI6jc2H72v26jmrBziAqb1B
//bucketName
//pollosapp
//https://miniopollosapp.ricky.siael.com/api/v1/
export default class MinioController {
  public async getUrlUpload({ response, request }: HttpContextContract) {
    const { nombre } = request.all();
    if (!nombre) {
      console.log("No nombre");
      return response.status(400).json({
        error: "No se envio el nombre",
      });
    }
    const minioClient = new Minio.Client({
      endPoint: 'minio.arrzel.com',
      useSSL: true,

      secretKey: 'BOp3z5FdHSLP3JdV7BI6jc2H72v26jmrBziAqb1B',
      accessKey: 'LTBz9PSqlAMBD3rSeEd0',
    });
    //Log buckets
    const buckets = await minioClient.listBuckets();
    console.log(buckets, "Buckets");
    //log files in bucket


    const fecha = new Date();
    const nombre_base_fecha = String(fecha.getTime() + fecha.getMilliseconds()) + nombre;

    const url = await minioClient.presignedPutObject('pollosapp', nombre_base_fecha, 24 * 60 * 60);
    return response.status(200).json({
      url: url,
    });

  }

}
