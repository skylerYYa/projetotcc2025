import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid'; // Adicionado ArrowPathIcon

const inputClass = "w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-upliving-primary focus:border-upliving-primary transition duration-150 text-sm placeholder:text-slate-400";
const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

const AddApartmentForm = ({ onSubmit, onCancel, initialData, isSubmitting }) => { // Adicionado isSubmitting
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');
  const [rooms, setRooms] = useState('');
  const [suites, setSuites] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [parkingSpots, setParkingSpots] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('Venda');
  const [features, setFeatures] = useState('');
  const [imageUrls, setImageUrls] = useState('');
  const [generatedImageUrls, setGeneratedImageUrls] = useState(''); // Novo campo
  const [isActive, setIsActive] = useState(true);
  const [isEditing, setIsEditing] = useState(false);


  const populateForm = (data) => {
    if (data) {
      setIsEditing(true);
      setName(data.name || '');
      setAddress(data.address || '');
      setDescription(data.description || '');
      setSize(data.size?.toString() || '');
      setRooms(data.rooms?.toString() || '');
      setSuites(data.suites?.toString() || '');
      setBathrooms(data.bathrooms?.toString() || '');
      setParkingSpots(data.parkingSpots?.toString() || '');
      setPrice(data.price || '');
      setType(data.type || 'Venda');
      setFeatures(Array.isArray(data.features) ? data.features.join(', ') : '');
      setImageUrls(Array.isArray(data.imageUrls) ? data.imageUrls.join(', ') : '');
      setGeneratedImageUrls(Array.isArray(data.generatedImageUrls) ? data.generatedImageUrls.join(', ') : ''); // Novo
      setIsActive(data.active !== undefined ? data.active : true);
    }
  };
  
  useEffect(() => {
    if (initialData) {
      populateForm(initialData);
    } else {
      clearForm(false); // Não chamar onCancel aqui, apenas limpar
    }
  }, [initialData]);

  const clearForm = (notifyCancel = true) => {
    setName(''); setAddress(''); setDescription(''); setSize(''); setRooms('');
    setSuites(''); setBathrooms(''); setParkingSpots(''); setPrice('');
    setType('Venda'); setFeatures(''); setImageUrls(''); setGeneratedImageUrls(''); setIsActive(true);
    setIsEditing(false);
    if (notifyCancel && onCancel) {
        onCancel(); // Chama onCancel se for uma ação explícita do usuário
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !size || !rooms || !price || !type) { // Descrição opcional
        alert('Por favor, preencha os campos obrigatórios marcados com (*).');
        return;
    }
    const apartmentData = {
      name, address, description,
      size: parseInt(size) || 0,
      rooms: parseInt(rooms) || 0,
      suites: suites ? parseInt(suites) : 0,
      bathrooms: bathrooms ? parseInt(bathrooms) : 0,
      parkingSpots: parkingSpots ? parseInt(parkingSpots) : 0,
      price, type,
      features: features.split(',').map(f => f.trim()).filter(f => f),
      imageUrls: imageUrls.split(',').map(url => url.trim()).filter(url => url),
      generatedImageUrls: generatedImageUrls.split(',').map(url => url.trim()).filter(url => url), // Novo
      active: isActive,
    };
    
    if (isEditing && initialData?.id) {
      onSubmit({ ...apartmentData, id: initialData.id });
    } else {
      onSubmit(apartmentData);
    }
    // Não limpar o formulário aqui se for edição, o componente pai (Dashboard) pode fechar o form.
    // Se for adição, o Dashboard também deve fechar o form.
    // clearForm(false); // O dashboard decide se limpa ou fecha.
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-200"
    >
      <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-6 border-b border-slate-200 pb-4">
        {isEditing ? 'Editar Imóvel' : 'Cadastrar Novo Imóvel'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label htmlFor="name" className={labelClass}>Nome do Empreendimento*</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="address" className={labelClass}>Endereço Completo*</label>
          <input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} required className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>Descrição Detalhada</label>
        <textarea id="description" rows="4" value={description} onChange={e => setDescription(e.target.value)} className={`${inputClass} min-h-[100px]`}></textarea>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5">
        <div><label htmlFor="size" className={labelClass}>Área (m²)*</label><input type="number" id="size" value={size} onChange={e => setSize(e.target.value)} required className={inputClass} /></div>
        <div><label htmlFor="rooms" className={labelClass}>Quartos*</label><input type="number" id="rooms" value={rooms} onChange={e => setRooms(e.target.value)} required className={inputClass} /></div>
        <div><label htmlFor="suites" className={labelClass}>Suítes</label><input type="number" id="suites" value={suites} onChange={e => setSuites(e.target.value)} className={inputClass} /></div>
        <div><label htmlFor="bathrooms" className={labelClass}>Banheiros</label><input type="number" id="bathrooms" value={bathrooms} onChange={e => setBathrooms(e.target.value)} className={inputClass} /></div>
        <div><label htmlFor="parkingSpots" className={labelClass}>Vagas</label><input type="number" id="parkingSpots" value={parkingSpots} onChange={e => setParkingSpots(e.target.value)} className={inputClass} /></div>
        <div>
            <label htmlFor="price" className={labelClass}>Preço (R$)*</label>
            <input type="text" id="price" value={price} onChange={e => setPrice(e.target.value)} required placeholder="Ex: 550.000,00 ou 2.500,00" className={inputClass} />
        </div>
        <div>
            <label htmlFor="type" className={labelClass}>Tipo*</label>
            <select id="type" value={type} onChange={e => setType(e.target.value)} required className={inputClass}>
                <option value="Venda">Venda</option>
                <option value="Aluguel">Aluguel</option>
            </select>
        </div>
        <div className="flex items-center col-span-full sm:col-span-1 mt-4 sm:mt-7">
            <input type="checkbox" id="isActive" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="h-5 w-5 text-upliving-primary rounded border-slate-300 focus:ring-upliving-primary shadow-sm cursor-pointer" />
            <label htmlFor="isActive" className="ml-2 text-sm text-slate-700 cursor-pointer">Imóvel Ativo</label>
        </div>
      </div>

      <div>
        <label htmlFor="features" className={labelClass}>Comodidades <span className="text-xs text-slate-400">(separadas por vírgula)</span></label>
        <input type="text" id="features" value={features} onChange={e => setFeatures(e.target.value)} placeholder="Piscina, Academia, Churrasqueira" className={inputClass} />
      </div>
      <div>
        <label htmlFor="imageUrls" className={labelClass}>URLs das Imagens <span className="text-xs text-slate-400">(reais, separadas por vírgula)</span></label>
        <textarea id="imageUrls" rows="3" value={imageUrls} onChange={e => setImageUrls(e.target.value)} placeholder="https://exemplo.com/foto_real1.jpg, https://exemplo.com/foto_real2.jpg" className={`${inputClass} min-h-[80px]`}></textarea>
      </div>
       <div>
        <label htmlFor="generatedImageUrls" className={labelClass}>URLs das Imagens Geradas <span className="text-xs text-slate-400">(conceituais/renders, separadas por vírgula)</span></label>
        <textarea id="generatedImageUrls" rows="3" value={generatedImageUrls} onChange={e => setGeneratedImageUrls(e.target.value)} placeholder="https://exemplo.com/render1.jpg, https://exemplo.com/render2.jpg" className={`${inputClass} min-h-[80px]`}></textarea>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-200 mt-4">
        {onCancel && ( // Renderiza botão de cancelar somente se onCancel for fornecido
            <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                type="button" onClick={() => clearForm(true)} // clearForm(true) vai chamar onCancel
                className="w-full sm:w-auto px-6 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors shadow-sm flex items-center justify-center"
            >
                <XCircleIcon className="w-5 h-5 inline mr-2" />
                Cancelar
            </motion.button>
        )}
        <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-2.5 bg-upliving-primary hover:bg-upliving-primary-dark text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {isSubmitting ? (
                <ArrowPathIcon className="w-5 h-5 inline mr-2 animate-spin" />
            ) : (
                 isEditing ? <PlusCircleIcon className="w-5 h-5 inline mr-2" /> : <PlusCircleIcon className="w-5 h-5 inline mr-2" /> // Pode usar ícone de salvar para edição
            )}
            {isSubmitting ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Adicionar Imóvel')}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default AddApartmentForm;