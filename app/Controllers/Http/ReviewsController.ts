import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ReviewsController {

  public async calificar({ response, request, auth }: HttpContextContract) {
    console.log("Calificar");
    const { id_local, puntaje, comentario, imagen } = request.all();
    if (puntaje == null) {
      return response.status(400).json({
        error: "No se envio el puntaje",
      });
    }
    if (id_local == null) {
      return response.status(400).json({
        error: "No se envio el id_local",
      });
    }
    if (comentario == null) {
      return response.status(400).json({
        error: "No se envio el comentario",
      });
    }
    const review = await auth.user?.related('reviews').create({
      locales_id: id_local,
      puntaje: Math.floor(puntaje * 2),
      comentario: comentario,
      imagen: imagen,
      estado: true,
    });
    return response.status(200).json({
      review: review,
    });
  }


}
