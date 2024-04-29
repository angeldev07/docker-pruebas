from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Img
import tabula


# Create your views here.
@api_view(["POST"])
def file(request):
    file = request.FILES.get("file")

    # Check if the file is a pdf or image
    if (
        not file.content_type == "application/pdf"
        and not file.content_type.split("/")[0] == "image"
    ):
        return Response({"error": "Invalid file type"}, status=400)

    img = Img.objects.create(image=file, title=file.name)

    return Response({"name": img.title, "url": img.image.url}, status=200)


@api_view(["GET"])
def file_list(resquest):
    files = Img.objects.all()
    # solo devolver las imagenes que existan en el sistema
    if len(files) == 0:
        return Response([], status=200)
    return Response(
        [
            {"name": file.title, "url": file.image.url}
            for file in files
            if file.image.url.split(".")[1] != "pdf"
        ],
        status=200,
    )
