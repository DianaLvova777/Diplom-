/** Класс для автоматической проверки на ошибки */
export class ErrorTest {
  /**
   * Конструктор класса принимает массив данных,
   * которые необходимо проверить на наличие ошибок
   * 
   * @param {array} tests - массив данных для проверки
   * @public
   */
  constructor(tests) {
    this.tests = tests;
  }

  checkNotFound() {
    let err = { 
      success: false,
      message: "Success"
    };

    this.tests.forEach((el, i) => {
      if (!el) {
        err.message = `Элемент на ${i} позиции не найден.`;
        err.success = true;
      }
    });

    return err;
  }

  checkTypeData() {
    let err = { 
      success: false,
      message: "Success"
    };

    this.tests.forEach(el => {
      if (!el || typeof el.check != el.type) {
        err.message = `
          Необходимо передать тип данных который нужно проверить. ${el.name ? "Переменная: " + el.name : ""}
          Типы данных которые могут быть проверены: boolean, number, object, array, string, symbol, function
        `;
        err.success = true;
      }

      if (typeof el.check !== el.type) {
        err.message = `
          Ошибка: 
            В переменной ${el.name} (Тип: ${typeof el.check}).
            Необходимый тип: ${el.type}.
        `;
        err.success = true;
      }
    });

    return err;
  }
}
