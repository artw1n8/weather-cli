#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printError, printHelp, printSuccess } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
	if(!token.length) {
		printError('Не передан token');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Токен сохранен');
	} catch (e) {
		printError(e.message);
	}
}

const saveCity = async (city) => {
  if (!city.length) {
    printError("Не передан город");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("Город сохранен");
  } catch (e) {
    printError(e.message);
  }
};

const getForcast = async () => {
	try {
		const weather = await getWeather(process.env.CITY);
    console.log(weather);
	} catch(e) {
		if(e?.response?.status == 404) {
			printError('Неверный город');
		} else if (e?.response?.status == 401) {
			printError('Неверный токен');
		} else {
			printError(e?.message);
		}
	}
}

const initCLI = () => {
	const args = getArgs(process.argv);
	console.log(args);
	if(args.h) {
		printHelp();
	}
	if(args.s) {
		saveCity(args.s);
	}
	if(args.t) {
		saveToken(args.t);
	}
	getForcast();
}

initCLI();