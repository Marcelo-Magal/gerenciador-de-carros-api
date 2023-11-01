// Importa os módulos necessários
import express from 'express';  // Importa o módulo 'express' para criar e configurar o servidor HTTP.
import path from 'path';  // Importa o módulo 'path' para manipular caminhos de arquivos e diretórios.
import axios from 'axios';  // Importa o módulo 'axios' para fazer requisições HTTP.

// Inicializa o aplicativo Express
const app = express();  // Inicializa uma nova instância do aplicativo Express e armazena na variável 'app'.
const port = 3000;  // Define a porta 3000 como a porta onde o servidor vai escutar.

// Define a classe Carro
class Carro {  // Define uma classe chamada 'Carro'.
  // Declara as propriedades da classe
  marca: string;  // Declara a propriedade 'marca' do tipo string.
  modelo: string;  // Declara a propriedade 'modelo' do tipo string.
  categoria: string;  // Declara a propriedade 'categoria' do tipo string.
  ano: number;  // Declara a propriedade 'ano' do tipo number.
  quilometragem: number;  // Declara a propriedade 'quilometragem' do tipo number.
  valor: number;  // Declara a propriedade 'valor' do tipo number.

  // Construtor da classe
  constructor(marca: string, modelo: string, categoria: string, ano: number, quilometragem: number, valor: number) {  // Define o construtor da classe, que aceita seis argumentos.
    this.marca = marca;  // Inicializa a propriedade 'marca' com o valor fornecido.
    this.modelo = modelo;  // Inicializa a propriedade 'modelo' com o valor fornecido.
    this.categoria = categoria;  // Inicializa a propriedade 'categoria' com o valor fornecido.
    this.ano = ano;  // Inicializa a propriedade 'ano' com o valor fornecido.
    this.quilometragem = quilometragem;  // Inicializa a propriedade 'quilometragem' com o valor fornecido.
    this.valor = valor;  // Inicializa a propriedade 'valor' com o valor fornecido.
  }
}


// Define a interface para a API de carros
interface CarroAPI {  // Define uma interface chamada 'CarroAPI'.
  Marca: string;  // Declara a propriedade 'Marca' do tipo string.
  Modelo: string;  // Declara a propriedade 'Modelo' do tipo string.
  Categoria: string;  // Declara a propriedade 'Categoria' do tipo string.
  Ano: number;  // Declara a propriedade 'Ano' do tipo number.
  Quilometragem: number;  // Declara a propriedade 'Quilometragem' do tipo number.
  Valor: number;  // Declara a propriedade 'Valor' do tipo number.
  id: number;  // Declara a propriedade 'id' do tipo number.
}

// Inicializa a lista de carros
let carros: CarroAPI[] = [];  // Declara uma variável chamada 'carros' que é um array vazio do tipo 'CarroAPI'.

// Busca dados da API e armazena em 'carros'
axios.get('https://apigenerator.dronahq.com/api/XYiVwDBB/carro')  // Faz uma requisição GET para a URL especificada usando o Axios.
  .then(response => {  // Quando a requisição for bem-sucedida, executa a função que recebe a 'response' como argumento.
    carros = response.data;  // Atribui os dados recebidos à variável 'carros'.
  })
  .catch(error => {  // Se ocorrer um erro na requisição, executa a função que recebe 'error' como argumento.
    console.log('Erro ao buscar dados:', error);  // Exibe uma mensagem de erro no console.
  });

// Configura o middleware
app.use(express.json());  // Configura o aplicativo Express para usar o middleware que analisa corpos de requisição JSON.
app.use(express.static(path.join(__dirname, 'public')));  // Configura o aplicativo para servir arquivos estáticos do diretório 'public'.

// Rota para obter todos os carros
app.get('/carros', (req, res) => {  // Define uma rota GET para o endpoint '/carros'.
  res.json(carros);  // Envia a variável 'carros' como uma resposta JSON.
});

// Rota para obter um carro específico pelo ID
app.get('/carros/:id', async (req, res) => {  // Define uma rota GET assíncrona para o endpoint '/carros/:id', onde ':id' é um parâmetro.
  const id = parseInt(req.params.id);  // Converte o parâmetro 'id' para um número inteiro.
  try {  // Inicia um bloco try para capturar erros.
    const response = await axios.get(`https://apigenerator.dronahq.com/api/XYiVwDBB/carro/${id}`);  // Faz uma requisição GET assíncrona para buscar um carro específico pelo 'id'.
    res.json(response.data);  // Envia os dados recebidos como uma resposta JSON.
  } catch (error) {  // Captura qualquer erro que ocorra durante a execução do bloco try.
    res.status(404).send('Carro não encontrado');  // Envia uma resposta com status 404 e a mensagem 'Carro não encontrado'.
  }
});

// Rota para adicionar um novo carro
app.post('/carros', async (req, res) => {  // Define uma rota POST assíncrona para o endpoint '/carros'.
  const novoCarro: CarroAPI = req.body;  // Extrai o corpo da requisição e o armazena na variável 'novoCarro' do tipo 'CarroAPI'.
  try {  // Inicia um bloco try para capturar erros.
    const response = await axios.post('https://apigenerator.dronahq.com/api/XYiVwDBB/carro', novoCarro);  // Faz uma requisição POST assíncrona para adicionar um novo carro.
    carros.push(response.data);  // Adiciona o novo carro ao array 'carros'.
    res.send('Novo carro adicionado');  // Envia uma resposta indicando que o novo carro foi adicionado.
  } catch (error) {  // Captura qualquer erro que ocorra durante a execução do bloco try.
    res.status(500).send('Erro ao adicionar carro');  // Envia uma resposta com status 500 e a mensagem 'Erro ao adicionar carro'.
  }
});

// Rota para atualizar um carro existente pelo ID
app.put('/carros/:id', async (req, res) => {  // Define uma rota PUT assíncrona para o endpoint '/carros/:id', onde ':id' é um parâmetro.
  const id = parseInt(req.params.id);  // Converte o parâmetro 'id' para um número inteiro.
  const dadosAtualizados: CarroAPI = req.body;  // Extrai o corpo da requisição e o armazena na variável 'dadosAtualizados' do tipo 'CarroAPI'.
  try {  // Inicia um bloco try para capturar erros.
    const response = await axios.put(`https://apigenerator.dronahq.com/api/XYiVwDBB/carro/${id}`, dadosAtualizados);  // Faz uma requisição PUT assíncrona para atualizar um carro específico pelo 'id'.
    const index = carros.findIndex(c => c.id === id);  // Encontra o índice do carro com o 'id' especificado no array 'carros'.
    if (index !== -1) {  // Verifica se o carro foi encontrado.
      carros[index] = response.data;  // Atualiza os dados do carro no array 'carros'.
    }
    carros.push(response.data);  // Adiciona os dados atualizados ao array 'carros'.
    res.send(`Carro com ID: ${id} atualizado`);  // Envia uma resposta indicando que o carro foi atualizado.
  } catch (error) {  // Captura qualquer erro que ocorra durante a execução do bloco try.
    res.status(500).send('Erro ao atualizar carro');  // Envia uma resposta com status 500 e a mensagem 'Erro ao atualizar carro'.
  }
});


// Rota para excluir um carro pelo ID
app.delete('/carros/:id', async (req, res) => {  // Define uma rota DELETE assíncrona para o endpoint '/carros/:id', onde ':id' é um parâmetro.
  const id = parseInt(req.params.id);  // Converte o parâmetro 'id' para um número inteiro.
  try {  // Inicia um bloco try para capturar erros.
    const response = await axios.delete(`https://apigenerator.dronahq.com/api/XYiVwDBB/carro/${id}`);  // Faz uma requisição DELETE assíncrona para excluir um carro específico pelo 'id'.
    const index = carros.findIndex(c => c.id === id);  // Encontra o índice do carro na array.
    if (index !== -1) {  // Verifica se o carro foi encontrado.
      carros.splice(index, 1);  // Remove o carro da array.
    }
    console.log("Array atualizada após exclusão: ", carros);  // Log da array atualizada.
    res.send(`Carro com ID: ${id} excluído`);  // Envia uma resposta indicando que o carro foi excluído.
  } catch (error) {  // Captura qualquer erro que ocorra durante a execução do bloco try.
    res.status(500).send('Erro ao excluir carro');  // Envia uma resposta com status 500 e a mensagem 'Erro ao excluir carro'.
  }
});

// Inicia o servidor na porta especificada
app.listen(port, () => {  // Inicia o servidor para escutar na porta especificada pela variável 'port'.
  console.log(`Servidor rodando na porta ${port}`);  // Exibe uma mensagem no console indicando que o servidor está rodando e em qual porta.
});

