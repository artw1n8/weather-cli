import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(chalk.bgRed("ERROR") + " " + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen("SUCCESS") + " " + message);
};

const printHelp = () => {
	console.log(
    dedent`${chalk.bgCyan("HELP")}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`,
  );
};

const printWeather = (weather) => {
  console.log(
    dedent`${chalk.bold(`${chalk.bgYellow("WEATHER")} ПОГОДА СЕГОДНЯ В ${chalk.green(weather.name)}`)}
		Состояние: ${chalk.green(weather.weather[0].description)}
		Температура: ${chalk.green(weather.main.temp)} ощущается как ${chalk.green(weather.main.feels_like)}
		Влажность: ${chalk.green(weather.main.humidity)}
		Скорость ветра: ${chalk.green(weather.wind.speed)}
		`,
  );
};

export {printError, printSuccess, printHelp, printWeather};