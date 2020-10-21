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

// export function textMaskCpf(props: TextMaskCustomProps) {
//     const { inputRef, ...other } = props;

//     return (
//         <MaskedInput
//             {...other}
//             ref={(ref: any) => {
//                 inputRef(ref ? ref.inputElement : null);
//             }}
//             mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
//             placeholderChar={'\u2000'}
//             showMask
//         />
//     );
// }

export function mascaraCpf(cpf: string) {
    
    cpf=cpf.replace(/\D/g,"")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    
    return (
        cpf
    );    
}



