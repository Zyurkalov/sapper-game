# Sapper-game 💣

> Тестовое задание. Реализация игры "Сапер" на `.vue` </br>
> Срок выполнения - одна неделя. Проверено на браузерах Firefox Chrome Edge

## Что сделано:

- реализована базовая логика игры
- добавлены три уровня сложности + кастомный
- добавлены необходимые страницы и подключены роуты
- рейтинг игроков, сохраняемый в localStorage

### Что добавлено (дополнительно):
- Кастомный режим, с пользовательским размером поля и количеством мин (максимальное поле: 100х100 и 2т. мин)
- Реализация такой генерации мин, чтобы при первом ходе невозможно было проиграть
- Автоматическая победа, если открыты все не заминированные клетки

### НЕ сделано (дополнительно):
- не реализована логика нажатия на среднюю кнопку мыши

### Изменено:
- Цветовая дифференциация ~~штанов~~ клеток
- Подсчет результатов изменен с классического, на более подходящий для кастомного режима. Счет зависит о веса клетки, оставшегося времени и размера поля
> во время разработки комп падал с синим экраном :)</br>
> в проекте не использовался сторонний UI Kit, о чем я конечно же пожалел</br>
> для оптимизации в проекте использовались классы и алгоритм поиска в ширину

## Установка / запуск:
- Для ознакомления достаточно перейти по ссылке: https://zyurkalov.github.io/sapper-game/
- Для развертывания проекта:
#### Склонируйте проект и установите зависимости
```sh
npm install
```
#### Запустите
```sh
npm run dev
```
#### Enjoy!


## Замеченные баги (исправлено):
>если на игровом поле расставить флажки, а затем открыть "пустую" клетку из-за чего по цепочке начинают открываться соседние (включая те что с флагом), то счетчик мин не будет сброшен обратно

## Используемые инструменты:
- Vue.js
- Pinia 
- TypeScript
