[![Build status](https://ci.appveyor.com/api/projects/status/pt5ectfh29nbv4eq?svg=true)](https://ci.appveyor.com/project/MKSInc/ahj-hw-7-http-1-helpdesk)
### [Gh-page](https://mksinc.github.io/AHJ-hw.-7-HTTP.-1-HelpDesk/)
# 7. Домашнее задание к лекции «Работа с HTTP»

Правила сдачи задания:

1. **Важно**: в рамках этого ДЗ можно использовать npm (а значит, никакого `yarn.lock` в репозитории быть не должно)
1. Frontend должен собираться через Webpack (включая картинки и стили) и выкладываться на Github Pages через Appveyor
1. В README.md должен быть размещён бейджик сборки и ссылка на Github Pages (Heroku для Backend'а)
1. В качестве результата присылайте проверяющему ссылки на ваши GitHub-проекты
1. Авто-тесты писать не требуется

**UPD: 04.07.2020 (если вы делали по предыдущей версии - ничего страшного, сдавайте так, как сделали).**

---

## 7.1 HelpDesk

### Легенда

Пока backend-разработчик находится в отпуске, вам поручили сделать прототип API для сервиса управления заявками на помощь (можете за себя порадоваться, так недалеко и до fullstack'а), к которому вам и нужно будет в дальнейшем прикруить frontend.

### Описание

Для хранения данных мы будем оперировать следующими структурами:
```javascript
Ticket {
    id // идентификатор (уникальный в пределах системы)
    name // краткое описание
    status // boolean - сделано или нет
    created // дата создания (timestamp)
}

TicketFull {
    id // идентификатор (уникальный в пределах системы)
    name // краткое описание
    description // полное описание
    status // boolean - сделано или нет
    created // дата создания (timestamp)
}
```

Напишите сервер с использованием koa, который работает по следующей схеме:
* GET    ?method=allTickets           - список тикетов
* GET    ?method=ticketById&id=`<id>` - полное описание тикета (где `<id>` - идентификатор тикета)
* POST   ?method=createTicket         - создание тикета (`<id>` генерируется на сервере, в теле формы `name`, `description`, `status`)

Соответственно:
* GET    ?method=allTickets           - массив объектов типа `Ticket` (т.е. без `description`)
* GET    ?method=ticketById&id=`<id>` - объект типа `TicketFull` (т.е. с `description`)
* POST   ?method=createTicket         - в теле запроса форма с полями для объекта типа `Ticket` (с `id` = `null`)

Сервер необходимо развернуть на Heroku. Авто-тесты писать не нужно.

Не забывайте про CORS.

Для упрощения тестирования можете при старте сервера добавлять туда несколько тикетов.

Для того, чтобы с сервера отдавать данные, достаточно в обработчиках koa написать:
```js
const tickets = [];

app.use(async ctx => {
    const { method } = ctx.request.querystring;

    switch (method) {
        case 'allTickets':
            ctx.response.body = tickets;
            return;
        // TODO: обработка остальных методов
        default:
            ctx.response.status = 404;
            return;
    }
});
```

Для того, чтобы обработать полученный ответ во Frontend, достаточно вот этого кода:
```js
xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
        try {
            const data = JSON.parse(xhr.responseText);
        } catch (e) {
            console.error(e);
        }
    }
});
```

В качестве результата пришлите проверяющему ссылку на Heroku и на ваш GitHub репозиторий.
