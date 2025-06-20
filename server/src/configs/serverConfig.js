const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const corsConfig = require("./corsConfig");
const cookieParser = require("cookie-parser");

const serverConfig = (app) => {
  // Разрешаем запросы с других адресов (доменов), если они разрешены в настройках (corsConfig)
  // Это нужно, чтобы, например, фронтенд на другом порту мог общаться с этим сервером
  app.use(cors(corsConfig));

  // Логируем (выводим) все входящие запросы в консоль в режиме разработчика (удобно для отладки)
  app.use(morgan("dev"));

  // Позволяет серверу понимать данные из HTML-форм, отправленные методом POST
  app.use(express.urlencoded({ extended: true }));

  // Позволяет серверу понимать JSON-данные, отправленные в теле запроса
  // То есть, если фронтенд отправит JSON — сервер сможет его прочитать
  app.use(express.json());

  // Это нужно, чтобы раздавать статические файлы напрямую (например, изображения или стили)
  app.use(express.static("public"));

  // Позволяет серверу читать куки из запросов пользователей
  // Это нужно, если вы используете авторизацию или храните что-то в cookies
  app.use(cookieParser());
};

module.exports = serverConfig;
