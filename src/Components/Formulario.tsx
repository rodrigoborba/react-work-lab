
import React from 'react';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {Container, Page, Fieldset, Buttons, ButtonGroup, Row, Col } from 'bnb-ui/dist';
import { TextField, RadioGroup, FormControlLabel, Radio, FormLabel, Checkbox, Switch, FormControl, FormGroup, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import brLocale from "date-fns/locale/pt-BR";

const useStyles = makeStyles((theme: Theme) =>
        createStyles({
                container: {
                        display: 'flex',
                        flexWrap: 'wrap',
                },
                formControl: {
                        margin: theme.spacing(1),
                },
        }),
);

const estado = [
        {
                value: '',
                label: '',
        },
        {
                value: 'Acre',
                label: 'AC',
        },
        {
                value: 'Bahia',
                label: 'BA',
        },
        {
                value: 'Ceara',
                label: 'CE',
        },
        {
                value: 'Pernambuco',
                label: 'PB',
        },
];

interface TextMaskCustomProps {
        inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskCustom(props: TextMaskCustomProps) {
        const { inputRef, ...other } = props;

        return (
                <MaskedInput
                        {...other}
                        ref={(ref: any) => {
                                inputRef(ref ? ref.inputElement : null);
                        }}
                        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        placeholderChar={'\u2000'}
                        showMask
                />
        );
}

interface NumberFormatCustomProps {
        inputRef: (instance: NumberFormat | null) => void;
        onChange: (event: { target: { value: string } }) => void;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
        const { inputRef, onChange, ...other } = props;

        return (
                <NumberFormat
                        {...other}
                        getInputRef={inputRef}
                        onValueChange={values => {
                                onChange({
                                        target: {
                                                value: values.value,
                                        },
                                });
                        }}
                        thousandSeparator
                        prefix="$"
                />
        );
}

export interface State {
        textmask: string;
        numberformat: string;
        nome: string;
        estado: string;
        genero: string;
        comentario: string;
        data: Date;
        rock: boolean;
        mpb: boolean;
        samba: boolean;
        checkedA: true;
}


export default function Formulario(props: any) {
        const classes = useStyles();
        const [values, setValues] = React.useState<State>({
                textmask: '(  )    -    ',
                numberformat: '1320',
                nome: '',
                estado: '',
                genero: '',
                comentario: '',
                data: new Date(),
                rock: false,
                mpb: false,
                samba: false,
                checkedA: true,
        });

        const [state, setState] = React.useState({
                rock: true,
                samba: false,
                mpb: false,
        });

        const [value, setValue] = React.useState('feminino');
        // const [value, setValue] = React.useState({
        //         feminino: true,
        //         masculino: false,
        //         outros: false,
        // });

        const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
                setValues({
                        ...values,
                        [name]: event.target.value,
                });
        };

        const handleChange2 = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
                setState({ ...state, [name]: event.target.checked });
        };

        // const handleChange3 = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        //         setState({ ...state, [name]: event.target.value });
        // };

        function handleChange3(event: React.ChangeEvent<HTMLInputElement>) {
                setValue((event.target as HTMLInputElement).value);
        }

        const { rock, samba, mpb } = state;
        const error = [rock, samba, mpb].filter(v => v).length !== 2;

        return (
                <Container>
                        <Page pagetitle="Formulario" history={props.history}>
                                <Fieldset subtitle="Dados pessoais">
                                        <Row>
                                                <Grid item xs={12} md={8}>
                                                        <TextField
                                                                id="nome"
                                                                label="Nome"
                                                                value={values.nome}
                                                                onChange={handleChange('nome')}
                                                                variant="outlined"
                                                                fullWidth
                                                                required
                                                        />
                                                </Grid>
                                                <Grid item xs={12} md={4} lg={2}>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
                                                                <KeyboardDatePicker
                                                                        id="mui-pickers-date"
                                                                        label="Data de nascimento"
                                                                        value={values.data}
                                                                        onChange={date => handleChange('data')}
                                                                        inputVariant='outlined'
                                                                        format="dd/MM/yyyy"
                                                                        fullWidth
                                                                        KeyboardButtonProps={{
                                                                                'aria-label': 'mudar data',
                                                                        }}
                                                                />
                                                        </MuiPickersUtilsProvider>
                                                </Grid>
                                                <Grid item xs={12} md={6} lg={2}>
                                                        <TextField
                                                                id="select"
                                                                select
                                                                label="Estado"
                                                                value={values.estado}
                                                                onChange={handleChange('estado')}
                                                                SelectProps={{
                                                                        native: true,
                                                                }}
                                                                fullWidth
                                                                variant="outlined"
                                                        >
                                                                {estado.map(option => (
                                                                        <option key={option.value} value={option.value}>
                                                                                {option.label}
                                                                        </option>
                                                                ))}
                                                        </TextField>
                                                </Grid>
                                        </Row>
                                        <Row>
                                                <Grid item xs={12} md={6} lg={8}>
                                                        <TextField
                                                                id="comentario"
                                                                label="Comentários"
                                                                value={values.comentario}
                                                                onChange={handleChange('comentario')}
                                                                multiline
                                                                rows="6"
                                                                variant="outlined"
                                                                fullWidth
                                                        />
                                                </Grid>
                                                <Grid item xs={12} md={4} lg={2}>
                                                        <FormLabel component="legend">Gênero</FormLabel>
                                                        <RadioGroup
                                                                arial-label="genero"
                                                                name="genero"
                                                                value={value}
                                                        onChange={handleChange3}
                                                        >
                                                                <FormControlLabel value="feminino" control={<Radio></Radio>} label="feminino"></FormControlLabel>
                                                                <FormControlLabel value="msculino" control={<Radio></Radio>} label="masculino"></FormControlLabel>
                                                                <FormControlLabel value="outros" control={<Radio></Radio>} label="outros"></FormControlLabel>
                                                        </RadioGroup>
                                                </Grid>
                                                <Grid item xs={12} md={4} lg={2}>
                                                        <FormControl>
                                                                <FormLabel component="legend">Gosto Musical</FormLabel>
                                                                <FormGroup>
                                                                        <FormControlLabel
                                                                                control={
                                                                                        <Checkbox checked={rock} onChange={handleChange2('rock')} value="rock" />
                                                                                }
                                                                                label="Rock"
                                                                        />
                                                                        <FormControlLabel
                                                                                control={
                                                                                        <Checkbox checked={mpb} onChange={handleChange2('mpb')} value="mpb" />
                                                                                }
                                                                                label="MPB"
                                                                        />
                                                                        <FormControlLabel
                                                                                control={
                                                                                        <Checkbox checked={samba} onChange={handleChange2('samba')} value="samba" />
                                                                                }
                                                                                label="Samba"
                                                                        />
                                                                </FormGroup>
                                                        </FormControl>
                                                </Grid>
                                        </Row>
                                        <Row>
                                                <Grid item xs={12} md={4} lg={2}>
                                                        <FormControlLabel
                                                                control={
                                                                        <Switch
                                                                                checked={values.checkedA}
                                                                                onChange={handleChange('checkedA')}
                                                                                value="checkedA"
                                                                        />
                                                                }
                                                                label="Deseja receber notificações?"
                                                        />
                                                </Grid>
                                        </Row>
                                </Fieldset>
                                <Fieldset subtitle="Dados empresariais">
                                        <Row>
                                                <Grid item xs={12} md={4} lg={3}>
                                                        <TextField
                                                                label="Celular"
                                                                value={values.textmask}
                                                                onChange={handleChange('textmask')}
                                                                id="formatted-text-mask-input"
                                                                fullWidth
                                                                variant="outlined"
                                                                helperText="DDD+Número"
                                                                InputProps={{
                                                                        inputComponent: TextMaskCustom as any,
                                                                }}
                                                        />
                                                </Grid>
                                                <Grid item xs={12} md={4} lg={3}>
                                                        <TextField
                                                                label="Salário"
                                                                value={values.numberformat}
                                                                onChange={handleChange('numberformat')}
                                                                id="formatted-numberformat-input"
                                                                fullWidth
                                                                variant="outlined"
                                                                InputProps={{
                                                                        inputComponent: NumberFormatCustom as any,
                                                                }}
                                                        />
                                                </Grid>
                                        </Row>
                                </Fieldset>
                                <ButtonGroup>
                                        <Buttons >Cancelar</Buttons>
                                        <Buttons variant="outlined" color="secondary" >Imprimir</Buttons>
                                        <Buttons variant="contained" color="secondary" >Salvar</Buttons>
                                </ButtonGroup>
                        </Page>
                </Container>
        );
}
