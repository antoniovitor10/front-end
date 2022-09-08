import React from 'react';
import { Formik, Field, Form } from 'formik';
import './App.css';


function App() {
  //função para reeber os valores do formulário
  function onSubmit(values, actions) {
    console.log('SUBMIT', values);
  }

  //Função pra obter o valor do cep, quando o usuário clicar fora do campo 
  function onBlurCep(ev, setFieldValue) {
    const { value } = ev.target;
    
    //definição da variável cep para que só interprete números
    const cep = value?.replace(/[^0-9]/g, '');

    //definição para que a variável só interprete se tiver 8 números
    if (cep?.length !== 8) {
      return;
    }
    //buscando dados na api 
    fetch(`http://localhost:4567/${cep}`)
      .then((res) => res.json())
      .then((data) => {
        setFieldValue('logradouro', data.logradouro);
        setFieldValue('bairro', data.bairro);
        setFieldValue('cidade', data.localidade);
        setFieldValue('uf', data.uf);
      });
  }

  return (
    <div className="App">
      <Formik
        onSubmit={onSubmit}
        validateOnMount
        // Valores iniciais
        initialValues={{
          cep: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          uf: '',
        }}
        render={({ isValid, setFieldValue }) => (
          //Campos do formulário 
          <Form>
            <div>
              <h1 className='h1'>
                Descubra seu endereço através do seu cep
              </h1>
            </div>
            <div className="form-control-group">
              
              
              <Field placeholder="Insira seu Cep" name="cep" type="text" required onBlur={(ev) => onBlurCep(ev, setFieldValue)} />
              <button type="submit" disabled={!isValid}>Descobrir Endereço</button>
            </div>
            <div className="form-control-group">
              <label>Logradouro</label>
              <Field name="logradouro" type="text" />
            </div>
            <div className="form-control-group">
              <label>Número</label>
              <Field name="numero" type="text" />
            </div>
            <div className="form-control-group">
              <label>Complemento</label>
              <Field name="complemento" type="text" />
            </div>
            <div className="form-control-group">
              <label>bairro</label>
              <Field name="bairro" type="text" />
            </div>
            <div className="form-control-group">
              <label>Cidade</label>
              <Field name="cidade" type="text" />
            </div>
            <div className="form-control-group">
              <label>UF</label>
              <Field type="text" name="uf">
                
              </Field>
              
            </div>
            
           
          </Form>
        )}
      />
    </div>
  );
}

export default App;
