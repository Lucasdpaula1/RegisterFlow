
FROM php:8.2-cli-alpine AS builder
WORKDIR /app
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
COPY composer.json ./
RUN composer install --no-dev --optimize-autoloader


FROM php:8.2-cli-alpine AS production
WORKDIR /app

RUN docker-php-ext-install sockets 

COPY --from=builder /app/vendor ./vendor
COPY . .

RUN mkdir -p /app/cache && chmod -R 777 /app/cache 

CMD ["php", "worker.php"]