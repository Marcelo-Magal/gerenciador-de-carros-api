"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware para parsear o corpo das requisições como JSON
app.use(express_1.default.json());
const path_1 = __importDefault(require("path"));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Rota para obter todos os carros
app.get('/carros', (req, res) => {
    // Lógica para obter todos os carros
    res.send('Todos os carros');
});
// Rota para obter um carro específico por ID
app.get('/carros/:id', (req, res) => {
    const id = req.params.id;
    // Lógica para obter um carro por ID
    res.send(`Carro com ID: ${id}`);
});
// Rota para adicionar um novo carro
app.post('/carros', (req, res) => {
    const novoCarro = req.body;
    // Lógica para adicionar um novo carro
    res.send('Novo carro adicionado');
});
// Rota para atualizar um carro existente
app.put('/carros/:id', (req, res) => {
    const id = req.params.id;
    const dadosAtualizados = req.body;
    // Lógica para atualizar um carro existente
    res.send(`Carro com ID: ${id} atualizado`);
});
// Rota para excluir um carro
app.delete('/carros/:id', (req, res) => {
    const id = req.params.id;
    // Lógica para excluir um carro
    res.send(`Carro com ID: ${id} excluído`);
});
// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
