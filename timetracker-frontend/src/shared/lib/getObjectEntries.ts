/**
 * Функция для типизированного получения Entries объекта
 *
 * @template TKey - Тип ключа (строки) в исходном объекте.
 * @template TVal - Тип значения в исходном объекте. По умолчанию, строка.
 *
 * @param {Record<TKey, TVal>} object - Исходный объект.
 *
 * @return {Array<[TKey, TVal]>} - Массив кортежей, представляющих записи объекта.
 */
export const getObjectEntries = <TKey extends string, TVal = any>(
	object: Record<TKey, TVal>
): Array<[TKey, TVal]> => {
	return Object.entries(object) as Array<[TKey, TVal]>;
};

// todo написать тесты
