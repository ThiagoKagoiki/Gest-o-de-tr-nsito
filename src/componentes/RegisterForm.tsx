// src/components/RegisterForm.tsx
import React, { useState } from 'react';

interface UserData {
  name: string;
  cpf: string;
  carPlate: string;
  carModel: string;
  carColor: string;
  password: string;
}

interface RegisterFormProps {
  onSubmit: (userData: UserData) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    cpf: '',
    carPlate: '',
    carModel: '',
    carColor: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="form-group">
        <label htmlFor="name">Nome completo</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="cpf">CPF</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
          maxLength={11}
          placeholder="Apenas números"
        />
      </div>

      <div className="form-group">
        <label htmlFor="carPlate">Placa do carro</label>
        <input
          type="text"
          id="carPlate"
          name="carPlate"
          value={formData.carPlate}
          onChange={handleChange}
          required
          maxLength={7}
          placeholder="ABC1D23"
        />
      </div>

      <div className="form-group">
        <label htmlFor="carModel">Modelo do carro</label>
        <input
          type="text"
          id="carModel"
          name="carModel"
          value={formData.carModel}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="carColor">Cor do carro</label>
        <input
          type="text"
          id="carColor"
          name="carColor"
          value={formData.carColor}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />
      </div>

      <button type="submit" className="submit-button">Cadastrar</button>
    </form>
  );
};

export default RegisterForm;