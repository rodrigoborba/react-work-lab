'use strict';

export interface RetornoValidacao {
  valido: boolean;
  mensagem: string;
}

function isRepeatingNumber(valor: string){
    return /^(\d)(\1){10}$/.test(valor);
}

export function validarCpf (input: string){
    if(null== input){
      return false;
    }
    const cpf = input.replace(/\D/g, '');

    if (
        cpf === '' ||
        cpf.length !== 11 ||
        !/^\d{11}$/.test(cpf) ||
        isRepeatingNumber(cpf)
    ) {
        return false;
    }

    const digitos = cpf.split('').map(x => parseInt(x));

    for (let j = 0; j < 2; j++) {
        let sum = 0;

        for (let i = 0; i < 9 + j; i++) {
            sum += digitos[i] * (10 + j - i);
        }

        let checkDigit = 11 - (sum % 11);

        if (checkDigit === 10 || checkDigit === 11) {
            checkDigit = 0;
        }

        if (checkDigit !== digitos[9 + j]) {
            return false;
        }
    }

    return true;
}

function isRepeatingNumberCNPJ(valor: string){
  return /^(\d)(\1){14}$/.test(valor);
}

export function validarCnpj(value: string){
  if (!value) return false

  // Aceita receber o valor como string, número ou array com todos os dígitos
  const validTypes =
    typeof value === 'string' || Number.isInteger(value) || Array.isArray(value)

  // Elimina valor em formato inválido
  if (!validTypes) return false

  // Guarda um array com todos os dígitos do valor
  const match = value.toString().match(/\d/g)
  const numbers = Array.isArray(match) ? match.map(Number) : []

  // Valida a quantidade de dígitos
  if (numbers.length !== 14) return false
  
  // Elimina inválidos com todos os dígitos iguais
  if (isRepeatingNumberCNPJ(numbers.toString())) return false;

  // Cálculo validador
  const calc = (x: number) => {
    const slice = numbers.slice(0, x)
    let factor = x - 7
    let sum = 0

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i]
      sum += n * factor--
      if (factor < 2) factor = 9
    }

    const result = 11 - (sum % 11)

    return result > 9 ? 0 : result
  }

  // Separa os 2 últimos dígitos de verificadores
  const digits = numbers.slice(12)
  
  // Valida 1o. dígito verificador
  const digit0 = calc(12)
  if (digit0 !== digits[0]) return false

  // Valida 2o. dígito verificador
  const digit1 = calc(13)
  return digit1 === digits[1]
}

