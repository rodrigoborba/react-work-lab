import React from "react";
import MaskedInput from 'react-text-mask';

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
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
                            inputRef(ref ? ref.inputElement : null);
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

export function limparFormatacao(value: string) {
        if(null !== value){
                value = value.slice(0, -1); ;
        }
    return (
        value
    );    
}




