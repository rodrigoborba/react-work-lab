import React from "react";
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format'

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

export function textMaskOperacao(props: TextMaskCustomProps) {
        const { inputRef, ...other } = props;

        return (
                <MaskedInput
                        {...other}
                        ref={(ref: any) => {
                                inputRef(ref ? ref.inputElement : null);
                        }}
                        mask={[/\d/, '.',/\d/,/\d/, '.', /\w/, /\d/, /\d/, /\d/, /\d/,/\d/, /\d/, /\d/, /\d/, /\d/, '.', /\d/]}
                        placeholderChar={'\u2000'}
                        showMask
                />
        );
}

export function textMaskCPF(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props;

  return (
          <MaskedInput
                  {...other}
                  ref={(ref: any) => {
                        inputRef(ref ? ref.inputElement : null);
                  }}
                  mask={[/\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]}
                  placeholderChar={'\u2000'}
                  showMask
          />
  );
}

export function textMaskCNPJ(props: TextMaskCustomProps) {
    const { inputRef, ...other } = props;
  
    return (
            <MaskedInput
                    {...other}
                    ref={(ref: any) => {
                        if(ref){
                                let valorAtual = ref.inputElement.value;
                                valorAtual = removerMascaraDocumento(valorAtual);
                                if(valorAtual.length === 12){
                                        ref.inputElement.setSelectionRange(15,15);    
                                }
                                inputRef(ref.inputElement); 
                        }else{
                                inputRef(null)
                        }
                   }}
                    mask={[/\d/, /\d/,'.',/\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/, '-',/\d/, /\d/]}
                    placeholderChar={'\u2000'}
                    showMask
            />
    );
}


export function removerMascaraDocumento(documento: string) {
        if(null !== documento){
                documento = documento
                                .replace(/\./g,'')
                                .replace(/\//g,'')
                                .replace(/-/g,'')
                                .trim();
        }
    return (
        documento
    );    
}


export function formatarDocumento(value: string) {
        value = value.toString();
        if(value.length > 11){
                if(value.length === 13){
                        value = "0" + "" + value;        
                }
                value=value.replace(/\D/g,"")
                value=value.replace(/(\d{2})(\d)/,"$1.$2")
                value=value.replace(/(\d{3})(\d)/,"$1.$2")
                value=value.replace(/(\d{3})(\d)/,"$1.$2")
                value=value.replace(/(\d{3})(\d{1,2})$/,"$1/$2")
        
        }else{
                if(value.length === 10){
                        value = "0" + "" + value;        
                }
                value=value.replace(/\D/g,"")
                value=value.replace(/(\d{3})(\d)/,"$1.$2")
                value=value.replace(/(\d{3})(\d)/,"$1.$2")
                value=value.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
        }
        
        return (
                value
        );    
}


export function formatarValorMoedaReal (valor: number): string {
        if(undefined === valor || null === valor){
                return "";       
        }
        if (valor < 0) {
                return `(${Math.abs(valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })})`
        }
        return `${valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`
}

export function removerMascaraMonetaria(valor: any) {
    
        if(undefined ===valor){
                return undefined;       
        }
        
        valor = valor.replace(/[^0-9,]+/g, '');
        valor = valor.replace(/[,]+/g, '.');
        return Number(valor);
}

export function mascaraMonetaria(valor: string) {
    
        if(undefined === valor || null === valor){
                return undefined;       
        }
        valor = valor.toString(); 

        if(valor.slice(-1) === ',' || valor.slice(-1) === '.'){
                return valor;        
        }
        
        valor = valor.replace(/[^0-9,]+/g, '');
        valor = valor.replace(/[,]+/g, '.');
        let valorExtraido = Number(valor);
        let valorFormatado = undefined;
        try {
                valorFormatado = `${Math.abs(valorExtraido).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`        
        } catch (error) {
                return valor;
        }
        return valorFormatado; 
}
    




