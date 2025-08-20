import { useState } from "react";
import { Link } from "react-router-dom";

// Função de validação de CPF
function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.charAt(10));
}

// Função de validação de Placa (padrão Mercosul ou antigo)
function validarPlaca(placa: string): boolean {
  const regex = /^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/;
  return regex.test(placa.toUpperCase());
}

export default function Cadastro() {
  const [form, setForm] = useState({
    placa: "",
    nome: "",
    cpf: "",
    modelo: "",
    cor: "",
    senha: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    // Máscara de CPF
    if (name === "cpf") {
      value = value.replace(/\D/g, "");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    // Placa sempre maiúscula
    if (name === "placa") {
      value = value.toUpperCase();
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!validarCPF(form.cpf)) {
      alert("CPF inválido!");
      return;
    }
    if (!validarPlaca(form.placa)) {
      alert("Placa inválida! Ex: ABC1234 ou ABC1D23");
      return;
    }

    console.log("Dados cadastrados:", form);
    alert("Cadastro realizado com sucesso!");
    // Aqui futuramente pode enviar para o backend
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Cadastro de Estacionamento</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="placa" placeholder="Placa do carro" value={form.placa} onChange={handleChange} required />
          <input type="text" name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} required />
          <input type="text" name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} required />
          <input type="text" name="modelo" placeholder="Modelo do carro" value={form.modelo} onChange={handleChange} required />
          <input type="text" name="cor" placeholder="Cor" value={form.cor} onChange={handleChange} required />
          <input type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} required />
          <button type="submit">Cadastrar</button>
        </form>
        <p>
          Já tem conta? <Link to="/">Faça login</Link>
        </p>
      </div>
    </div>
  );
}
