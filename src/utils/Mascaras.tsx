import React from "react";
import MaskedInput from 'react-text-mask';

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
                                if(valorAtual.length == 12){
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
                value=value.replace(/\D/g,"")
                value=value.replace(/(\d{2})(\d)/,"$1.$2")
                value=value.replace(/(\d{3})(\d)/,"$1.$2")
                value=value.replace(/(\d{3})(\d)/,"$1.$2")
                value=value.replace(/(\d{3})(\d{1,2})$/,"$1/$2")
        
        }else{
                value=value.replace(/\D/g,"")
                value=value.replace(/(\d{3})(\d)/,"$1.$2")
                value=value.replace(/(\d{3})(\d)/,"$1.$2")
                value=value.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
        }
        
        return (
                value
        );    
}




