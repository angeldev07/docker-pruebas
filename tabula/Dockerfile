# Usar una imagen de Python oficial como base
FROM python:3.12-slim as builder

# Establecer variables de entorno para Django
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE pdf.settings

# Instalar las dependencias del sistema necesarias para psycopg2 (si estás usando PostgreSQL)
RUN apt-get update \
    && apt-get install -y openjdk-17-jdk openjdk-17-jre

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo requirements.txt e instalar las dependencias de Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código de tu aplicación al contenedor
COPY . .

# Exponer el puerto 8000 para el servidor de desarrollo de Django
EXPOSE 8000

# Comando por defecto para arrancar el servidor de desarrollo de Django
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
