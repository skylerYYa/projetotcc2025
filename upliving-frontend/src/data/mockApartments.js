// Conteúdo fornecido na minha resposta anterior (Passo de correção do ERR_NAME_NOT_RESOLVED)
// Certifique-se de que ele está exatamente como o último que enviei, com URLs válidas do Unsplash e o campo generatedImageUrls.
// Vou colar novamente por segurança:
export const mockApartments = [
  {
    id: 'apt001',
    name: 'Cobertura Luxo com Vista Mar',
    address: 'Av. Atlântica, 1702, Copacabana, Rio de Janeiro',
    description: 'Desfrute de uma vista panorâmica do oceano nesta cobertura de luxo. Com 3 suítes, piscina privativa e acabamentos de alto padrão, é o refúgio perfeito na cidade maravilhosa. Amplo terraço com churrasqueira e área gourmet.',
    size: 280,
    rooms: 4,
    suites: 3,
    bathrooms: 5,
    parkingSpots: 3,
    features: ['Piscina Privativa', 'Vista Mar', 'Terraço Gourmet', 'Academia no Prédio', 'Portaria 24h', 'Ar Condicionado Central'],
    price: '7.500.000,00',
    type: 'Venda',
    imageUrls: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=700&q=60',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=60',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=60',
    ],
    generatedImageUrls: [
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=700&q=60', 
      'https://images.unsplash.com/photo-1631868017084-e26f1516f563?auto=format&fit=crop&w=700&q=60', 
    ],
    active: true,
    timestamp: new Date('2024-05-20T10:00:00Z'),
  },
  {
    id: 'apt002',
    name: 'Apartamento Moderno no Centro',
    address: 'Rua da Consolação, 1500, Consolação, São Paulo',
    description: 'Viva no coração de São Paulo neste apartamento moderno e bem iluminado. Próximo a metrôs, teatros e restaurantes. Ideal para quem busca praticidade e vida urbana intensa. Prédio com lazer completo.',
    size: 85,
    rooms: 2,
    suites: 1,
    bathrooms: 2,
    parkingSpots: 1,
    features: ['Academia', 'Piscina Aquecida', 'Salão de Festas', 'Coworking'],
    price: '950.000,00',
    type: 'Venda',
    imageUrls: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=700&q=60',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=700&q=60',
    ],
    generatedImageUrls: [
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?auto=format&fit=crop&w=700&q=60',
    ],
    active: true,
    timestamp: new Date('2024-05-18T14:30:00Z'),
  },
  {
    id: 'apt003',
    name: 'Casa Charmosa em Condomínio',
    address: 'Alameda das Palmeiras, 300, Granja Viana, Cotia',
    description: 'Tranquilidade e segurança para sua família nesta casa espaçosa em condomínio. 4 dormitórios e um lindo jardim privativo com piscina.',
    size: 320,
    rooms: 4,
    suites: 2,
    bathrooms: 4,
    parkingSpots: 4,
    features: ['Piscina', 'Churrasqueira', 'Jardim', 'Lareira', 'Condomínio Fechado'],
    price: '1.850.000,00',
    type: 'Venda',
    imageUrls: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2e0?auto=format&fit=crop&w=700&q=60',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=700&q=60',
    ],
    generatedImageUrls: [], // Sem imagens geradas, usará as imageUrls
    active: true,
    timestamp: new Date('2024-05-15T09:00:00Z'),
  },
  {
    id: 'apt004',
    name: 'Studio Inteligente Perto da Universidade',
    address: 'Rua dos Estudantes, 50, Butantã, São Paulo',
    description: 'Perfeito para estudantes ou investidores, este studio otimizado oferece conforto e praticidade. Totalmente mobiliado, com design moderno e a poucos passos da universidade e do metrô.',
    size: 35,
    rooms: 1,
    suites: 0,
    bathrooms: 1,
    parkingSpots: 0,
    features: ['Mobiliado', 'Próximo ao Metrô', 'Portaria', 'Bicicletário'],
    price: '350.000,00',
    type: 'Venda',
    imageUrls: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=700&q=60',
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=700&q=60'
    ],
    generatedImageUrls: [
        'https://images.unsplash.com/photo-1600566753102-66c46d4367b3?auto=format&fit=crop&w=700&q=60' // Studio concept
    ],
    active: true,
    timestamp: new Date('2024-05-12T11:00:00Z'),
  },
  {
    id: 'apt005',
    name: 'Apartamento para Alugar - Vila Madalena',
    address: 'Rua Harmonia, 700, Vila Madalena, São Paulo',
    description: 'Alugue este charmoso apartamento na Vila Madalena, conhecido por sua vibrante cena cultural e gastronômica. Apartamento com 2 quartos, varanda e excelente iluminação natural.',
    size: 70,
    rooms: 2,
    suites: 0,
    bathrooms: 1,
    parkingSpots: 1,
    features: ['Varanda', 'Armários Embutidos', 'Permite Animais', 'Próximo a Bares e Restaurantes'],
    price: '4.500,00',
    type: 'Aluguel',
    imageUrls: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=60',
      'https://images.unsplash.com/photo-1574873215043-4411946153bc?auto=format&fit=crop&w=700&q=60'
    ],
    // generatedImageUrls: undefined, // Omitido
    active: true,
    timestamp: new Date('2024-05-10T16:20:00Z'),
  },
];